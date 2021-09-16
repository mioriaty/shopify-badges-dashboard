import { EditorPage } from 'containers/EditorPage/EditorPage';
import { NotFoundPage } from 'containers/NotFoundPage';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    component: EditorPage,
  },
];

const Routes = () => {
  // const { statusInitialization } = useSelector(initializationSelector);

  const _renderRoute = () => {
    // if (statusInitialization !== 'success') return <InitializationPage />;

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
