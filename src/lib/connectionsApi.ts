import { CURRENT_LAWYER_ID, mockLawyers, type Lawyer } from './mockData';

export type ConnectionRequestStatus = 'pending' | 'accepted' | 'declined';

export interface ConnectionRequest {
  id: string;
  fromId: string;
  toId: string;
  status: ConnectionRequestStatus;
  createdAt: string;
}

interface SendRequestPayload {
  fromId: string;
  toId: string;
}

const latency = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const lawyerStore: Lawyer[] = mockLawyers.map((lawyer) => ({ ...lawyer }));

const connectionMap = new Map<string, Set<string>>();

let connectionRequests: ConnectionRequest[] = [
  {
    id: 'req-1',
    fromId: '2',
    toId: CURRENT_LAWYER_ID,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

const getLawyerEntry = (id: string) => lawyerStore.find((lawyer) => lawyer.id === id);

const ensureConnectionSet = (id: string) => {
  if (!connectionMap.has(id)) {
    connectionMap.set(id, new Set<string>());
  }
  return connectionMap.get(id)!;
};

const cloneLawyer = (lawyer: Lawyer) => ({ ...lawyer });

export const connectionsApi = {
  async fetchLawyers(filters?: { specialty?: string }) {
    await latency();
    const list = lawyerStore.map(cloneLawyer);
    if (!filters?.specialty || filters.specialty === 'all') {
      return list;
    }
    return list.filter((lawyer) => lawyer.specialty === filters.specialty);
  },

  async fetchIncomingRequests(userId: string) {
    await latency(200);
    return connectionRequests
      .filter((request) => request.toId === userId && request.status === 'pending')
      .map((request) => ({ ...request }));
  },

  async fetchSentRequests(userId: string) {
    await latency(200);
    return connectionRequests
      .filter((request) => request.fromId === userId && request.status === 'pending')
      .map((request) => ({ ...request }));
  },

  async fetchConnections(userId: string) {
    await latency(150);
    const set = ensureConnectionSet(userId);
    return Array.from(set);
  },

  async sendRequest(payload: SendRequestPayload) {
    const { fromId, toId } = payload;
    await latency();

    if (fromId === toId) {
      throw new Error('You cannot connect with yourself.');
    }

    const existing = connectionRequests.find(
      (request) =>
        request.status === 'pending' &&
        ((request.fromId === fromId && request.toId === toId) ||
          (request.fromId === toId && request.toId === fromId))
    );

    if (existing) {
      return existing;
    }

    const connectionsFrom = ensureConnectionSet(fromId);
    if (connectionsFrom.has(toId)) {
      throw new Error('You are already connected.');
    }

    const newRequest: ConnectionRequest = {
      id: `req-${Date.now()}`,
      fromId,
      toId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    connectionRequests = [newRequest, ...connectionRequests];
    return { ...newRequest };
  },

  async acceptRequest(requestId: string) {
    await latency();
    const target = connectionRequests.find((request) => request.id === requestId);
    if (!target) {
      throw new Error('Connection request not found.');
    }
    if (target.status !== 'pending') {
      return { ...target };
    }

    target.status = 'accepted';

    const fromSet = ensureConnectionSet(target.fromId);
    const toSet = ensureConnectionSet(target.toId);
    if (!fromSet.has(target.toId)) {
      fromSet.add(target.toId);
      toSet.add(target.fromId);

      const fromLawyer = getLawyerEntry(target.fromId);
      const toLawyer = getLawyerEntry(target.toId);
      if (fromLawyer) {
        fromLawyer.connections += 1;
      }
      if (toLawyer) {
        toLawyer.connections += 1;
      }
    }

    return { ...target };
  },

  async declineRequest(requestId: string) {
    await latency();
    const target = connectionRequests.find((request) => request.id === requestId);
    if (!target) {
      throw new Error('Connection request not found.');
    }
    target.status = 'declined';
    return { ...target };
  },
};
