import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import project from './project'
import locate from './locate'
import investor from './investor'
import building from './building'
import user from './user'
const rootSaga = function*() {
  yield all([
    ...auth.map(watcher => fork(watcher)),
    ...project.map(watcher => fork(watcher)),
    ...locate.map(watcher => fork(watcher)),
    ...investor.map(watcher => fork(watcher)),
    ...building.map(watcher => fork(watcher)),
    ...user.map(watcher => fork(watcher)),
  ]);
};
export default rootSaga;
