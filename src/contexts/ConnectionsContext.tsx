import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  connectionsApi,
  type ConnectionRequest,
} from '@/lib/connectionsApi';
import { CURRENT_LAWYER_ID, type Lawyer } from '@/lib/mockData';
import { toast } from 'sonner';

export type ConnectionStatus = 'self' | 'connected' | 'pending' | 'incoming' | 'available';

export interface LawyerWithConnectionState extends Lawyer {
  isCurrentUser: boolean;
  connectionStatus: ConnectionStatus;
  requestId?: string;
}

export interface IncomingRequest extends ConnectionRequest {
  from: Lawyer;
}

interface ConnectionsContextValue {
  currentUserId: string;
  lawyers: LawyerWithConnectionState[];
  filteredLawyers: LawyerWithConnectionState[];
  incomingRequests: IncomingRequest[];
  sentRequests: ConnectionRequest[];
  specialties: string[];
  specialtyFilter: string;
  setSpecialtyFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isLoading: boolean;
  sendConnectionRequest: (lawyerId: string) => Promise<void>;
  acceptConnectionRequest: (requestId: string) => Promise<void>;
  declineConnectionRequest: (requestId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const ConnectionsContext = createContext<ConnectionsContextValue | null>(null);

const currentUserId = CURRENT_LAWYER_ID;

export const ConnectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([]);
  const [rawLawyers, setRawLawyers] = useState<Lawyer[]>([]);
  const allLawyersRef = useRef<Lawyer[]>([]);
  const rawLawyersRef = useRef<Lawyer[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const specialtyFilterRef = useRef<string>('all');

  const refreshRequests = useCallback(async (lawyersSource?: Lawyer[]) => {
    const [incoming, sent, connected] = await Promise.all([
      connectionsApi.fetchIncomingRequests(currentUserId),
      connectionsApi.fetchSentRequests(currentUserId),
      connectionsApi.fetchConnections(currentUserId),
    ]);

    const incomingWithLawyer = incoming
      .map((request) => {
  const source = lawyersSource ?? allLawyersRef.current;
        const lawyer = source.find((item) => item.id === request.fromId);
        return lawyer
          ? ({
              ...request,
              from: lawyer,
            } as IncomingRequest)
          : null;
      })
      .filter(Boolean) as IncomingRequest[];

    setIncomingRequests(incomingWithLawyer);
    setSentRequests(sent);
    setConnectedIds(connected);
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const roster = await connectionsApi.fetchLawyers({ specialty: 'all' });
      setAllLawyers(roster);
      allLawyersRef.current = roster;

      const filter = specialtyFilterRef.current;
      const filtered = filter === 'all'
        ? roster
        : roster.filter((lawyer) => lawyer.specialty === filter);
      setRawLawyers(filtered);

      await refreshRequests(roster);
    } finally {
      setIsLoading(false);
    }
  }, [refreshRequests]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    rawLawyersRef.current = rawLawyers;
  }, [rawLawyers]);

  useEffect(() => {
    specialtyFilterRef.current = specialtyFilter;
    if (allLawyersRef.current.length === 0) {
      return;
    }
    if (specialtyFilter === 'all') {
      setRawLawyers(allLawyersRef.current);
    } else {
      const filtered = allLawyersRef.current.filter((lawyer) => lawyer.specialty === specialtyFilter);
      setRawLawyers(filtered);
    }
  }, [specialtyFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshRequests().catch(() => {
        /* silent polling errors */
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [refreshRequests]);

  const specialties = useMemo(() => {
    const unique = new Set<string>(allLawyers.map((lawyer) => lawyer.specialty));
    return ['all', ...Array.from(unique)];
  }, [allLawyers]);

  const connectedSet = useMemo(() => new Set(connectedIds), [connectedIds]);

  const pendingSentMap = useMemo(() => {
    const map = new Map<string, ConnectionRequest>();
    sentRequests.forEach((request) => {
      map.set(request.toId, request);
    });
    return map;
  }, [sentRequests]);

  const incomingMap = useMemo(() => {
    const map = new Map<string, ConnectionRequest>();
    incomingRequests.forEach((request) => {
      map.set(request.fromId, request);
    });
    return map;
  }, [incomingRequests]);

  const lawyers = useMemo<LawyerWithConnectionState[]>(() => {
    return rawLawyers.map((lawyer) => {
      if (lawyer.id === currentUserId) {
        return {
          ...lawyer,
          isCurrentUser: true,
          connectionStatus: 'self',
        } as LawyerWithConnectionState;
      }

      if (connectedSet.has(lawyer.id)) {
        return {
          ...lawyer,
          isCurrentUser: false,
          connectionStatus: 'connected',
        } as LawyerWithConnectionState;
      }

      if (pendingSentMap.has(lawyer.id)) {
        return {
          ...lawyer,
          isCurrentUser: false,
          connectionStatus: 'pending',
          requestId: pendingSentMap.get(lawyer.id)?.id,
        } as LawyerWithConnectionState;
      }

      if (incomingMap.has(lawyer.id)) {
        return {
          ...lawyer,
          isCurrentUser: false,
          connectionStatus: 'incoming',
          requestId: incomingMap.get(lawyer.id)?.id,
        } as LawyerWithConnectionState;
      }

      return {
        ...lawyer,
        isCurrentUser: false,
        connectionStatus: 'available',
      } as LawyerWithConnectionState;
    });
  }, [rawLawyers, connectedSet, pendingSentMap, incomingMap]);

  const filteredLawyers = useMemo(() => {
    if (!searchQuery.trim()) {
      return lawyers.filter((lawyer) => !lawyer.isCurrentUser);
    }
    const normalized = searchQuery.trim().toLowerCase();
    return lawyers.filter((lawyer) => {
      if (lawyer.isCurrentUser) {
        return false;
      }
      const haystack = `${lawyer.name} ${lawyer.role} ${lawyer.specialty}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [lawyers, searchQuery]);

  const sendConnectionRequest = useCallback(
    async (lawyerId: string) => {
      try {
        await connectionsApi.sendRequest({ fromId: currentUserId, toId: lawyerId });
        toast.success('Connection request sent');
        await refreshRequests();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to send connection request';
        toast.error(message);
      }
    },
    [refreshRequests]
  );

  const acceptConnectionRequest = useCallback(
    async (requestId: string) => {
      try {
        await connectionsApi.acceptRequest(requestId);
        toast.success('Connection request accepted');
        await refresh();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to accept request';
        toast.error(message);
      }
    },
    [refresh]
  );

  const declineConnectionRequest = useCallback(
    async (requestId: string) => {
      try {
        await connectionsApi.declineRequest(requestId);
        toast.success('Connection request declined');
        await refreshRequests();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to decline request';
        toast.error(message);
      }
    },
    [refreshRequests]
  );

  const value = useMemo<ConnectionsContextValue>(
    () => ({
      currentUserId,
      lawyers,
      filteredLawyers,
      incomingRequests,
      sentRequests,
      specialties,
      specialtyFilter,
      setSpecialtyFilter,
      searchQuery,
      setSearchQuery,
      isLoading,
      sendConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      refresh,
    }),
    [
      lawyers,
      filteredLawyers,
      incomingRequests,
      sentRequests,
      specialties,
      specialtyFilter,
      searchQuery,
      isLoading,
      sendConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      refresh,
    ]
  );

  return <ConnectionsContext.Provider value={value}>{children}</ConnectionsContext.Provider>;
};

export const useConnections = () => {
  const context = useContext(ConnectionsContext);
  if (!context) {
    throw new Error('useConnections must be used within a ConnectionsProvider');
  }
  return context;
};
