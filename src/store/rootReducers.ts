import { reducersHeader } from 'containers/Header';
import { reduceHomePage } from 'containers/HomePage/reducers';

const reducers = {
  ...reducersHeader,
  homePage: reduceHomePage,
};

export default reducers;
