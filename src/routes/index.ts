export type Routes = {
  [key: string]: any;
};

const routes: Routes = {
  landing_page: '/',
  auth: '/auth',
  challenges: '/challenges',
  dashboard: {
    home: '/dashboard',
    challenges: '/dashboard/challenges',
    challenge: '/dashboard/challenges/:id',
    community: '/dashboard/community',
    ranking: '/dashboard/ranking',
  },
  create_challenge: '/create-challenge',
};

export default routes;
