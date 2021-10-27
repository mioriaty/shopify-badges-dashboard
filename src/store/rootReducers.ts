import { reducerBadges, reducerCUDBadge, reducerFullProducts, reducerManualProducts } from 'containers/HomePage';
import { reducerAutomatics } from 'containers/HomePage/reducers/reducerAutomatics';
import { reducerInitialization } from 'containers/InitializationPage';

export const rootReducers = {
  initialization: reducerInitialization,
  fullProducts: reducerFullProducts,
  manualProducts: reducerManualProducts,
  badges: reducerBadges,
  cudBadge: reducerCUDBadge,
  automatics: reducerAutomatics,
};
