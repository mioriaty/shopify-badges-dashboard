import { InitializationPage } from 'containers/InitializationPage';
import { NotFoundPage } from 'containers/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { initializationSelector } from 'store/selectors';
import { Page } from './types';

export const pages: Page[] = [];

const Routes = () => {
  const { statusInitialization } = useSelector(initializationSelector);

  const _renderRoute = () => {
    if (statusInitialization !== 'success') return <InitializationPage />;

    return (
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
        <Route component={NotFoundPage} />
      </Switch>
    );
  };

  return <MemoryRouter>{_renderRoute()}</MemoryRouter>;
};

export default Routes;
