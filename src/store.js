import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import voter from './modules/voter/reducer';
import stash from './modules/stash/reducer';

import {
  fetchFavoriteImagesEpic,
  fetchScoredImagesEpic,
} from './modules/stash/actions';

import {
  favoriteImageEpic,
  getNewImageEpic,
  scoreImageEpic,
} from './modules/voter/actions';

export const rootEpic = combineEpics(
  favoriteImageEpic,
  fetchFavoriteImagesEpic,
  fetchScoredImagesEpic,
  getNewImageEpic,
  scoreImageEpic,
);

export const rootReducer = combineReducers({
  voter,
  stash,
});
