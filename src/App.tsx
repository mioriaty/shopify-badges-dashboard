import { AppProvider } from 'containers/AppProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store/configureStore';
import { Routes } from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
