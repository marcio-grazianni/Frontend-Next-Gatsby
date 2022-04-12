import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { reducer as root } from './reducer';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('applicationState');
    if (serializedState === null) {
      console.log('loadState is null');
      return undefined;
    }
    /* console.log(
      'Check current state: load state called from store file',
      JSON.parse(serializedState)
    ); */
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    //console.log('save state function called', serializedState);
    localStorage.setItem('applicationState', serializedState);
  } catch (err) {
    //ignore write errors.
  }
};

export const rootReducer = combineReducers({
  root,
});

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
//console.log('print store after created', store);

store.subscribe(() => {
  saveState(store.getState());
  console.log('state saved, print current state', loadState());
});

export default store;
