export type Routes = {
  [key: string]: any;
};

const routes: Routes = {
  landing_page: '/',
  auth: '/auth',
  dashboard: {
    home: '/dashboard',
    challenges: '/dashboard/challenges',
    challenge: '/dashboard/challenges/:id',
    ranking: '/dashboard/ranking',
  },
  create_challenge: '/create-challenge',
};

export default routes;
