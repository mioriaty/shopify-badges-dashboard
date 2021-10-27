import React from 'react';
import { useSelector } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from 'containers/HomePage/HomePage';
import { InitializationPage, initializationSelector } from 'containers/InitializationPage';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    component: HomePage,
  },
];

export const Routes = () => {
  const { token } = useSelector(initializationSelector);

  const _renderRoute = () => {
    if (!token) return <InitializationPage />;

    return (
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
      </Switch>
    );
  };

  return <MemoryRouter>{_renderRoute()}</MemoryRouter>;
};
