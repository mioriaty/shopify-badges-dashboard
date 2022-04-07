import { watchCreateAutomatic } from './watchCreateAutomatic';
import { watchDeleteAutomatic } from './watchDeleteAutomatic';
import { watchGetAutomatics, watchGetAutomaticsCancel } from './watchGetAutomatics';
import { watchSortAutomatic } from './watchSortAutomatic';
import { watchUpdateAutomatic } from './watchUpdateAutomatic';

export const sagaAutomatics = [
  watchGetAutomatics,
  watchGetAutomaticsCancel,
  watchCreateAutomatic,
  watchUpdateAutomatic,
  watchDeleteAutomatic,
  watchSortAutomatic,
];
