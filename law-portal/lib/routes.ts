export const routes = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  profile: (id: string) => `/profile/${id}`,
  profileMe: () => '/profile/me',
  compose: () => '/compose',
  messages: (params?: string) => `/messages${params ? `?${params}` : ''}`,
  settings: () => '/settings',
  network: () => '/network',
  opportunities: () => '/opportunities',
  alerts: () => '/alerts',
};

export const routeParams = {
  consultation: (lawyerId: string) => `new=consultation&id=${lawyerId}`,
  thread: (id: string) => `thread=${id}`,
};

