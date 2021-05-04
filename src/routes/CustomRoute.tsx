import React from 'react';
import { Route, RouteComponentProps, useLocation } from 'wouter';
// import { useLocation } from 'wouter';
import routes, { Routes } from '.';
import NotFoundPage from '../pages/404/NotFoundPage';

interface Props {
  component: React.ComponentType<RouteComponentProps>;
  path: string;
}

function CustomRoute({ component, path }: Props) {
  const [location] = useLocation();

  const getAllRoutes = (
    routes: Routes,
    index: number,
    customRoutes: string[]
  ): string[] => {
    const routeValues = Object.values(routes);
    const routeKeys = Object.keys(routes);
    const currentRoute = routes[routeKeys[index]];

    if (routeValues.length === index) {
      // @ts-ignore
      return customRoutes.flat();
    }

    if (typeof routeValues[index] === 'string') {
      customRoutes.push(routeValues[index]);
    }

    if (typeof routeValues[index] === 'object') {
      // @ts-ignore
      customRoutes.push(getAllRoutes(currentRoute, 0, []).flat());
    }

    return getAllRoutes(routes, index + 1, customRoutes);
  };

  const customRoutes = getAllRoutes(routes, 0, []);

  return customRoutes.includes(location) ? (
    <Route path={path} component={component} />
  ) : (
    <NotFoundPage />
  );
}

export default CustomRoute;
