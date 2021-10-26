import { HomePage } from 'containers/HomePage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
];

const Routes = () => {
  const _renderRouter = () => {
    return (
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
      </Switch>
    );
  };
  return <BrowserRouter>{_renderRouter()}</BrowserRouter>;
};

export default Routes;
