import sagaPlugin, { keaSaga } from 'kea-saga';
import thunkPlugin from 'kea-thunk';
import { activatePlugin, keaReducer } from 'kea';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const keaScenesReducer = keaReducer('scenes');

export function getAppStore () {
  activatePlugin(sagaPlugin);
  activatePlugin(thunkPlugin);

  const reducers = combineReducers({
    scenes: keaScenesReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
  )(createStore);

  const store = finalCreateStore(reducers);

  sagaMiddleware.run(keaSaga);

  return store;
}