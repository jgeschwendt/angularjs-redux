/* eslint-disable */
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs';

import {
  FETCH_FAVORITE_IMAGES_PENDING,
  FETCH_FAVORITE_IMAGES_FAILURE,
  FETCH_FAVORITE_IMAGES_SUCCESS,
} from '../constants';

import {
  fetchFavoriteImagesEpic,
} from '../epics';

const epicMiddleware = createEpicMiddleware(fetchFavoriteImagesEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe(`[EPICS] ${__dirname}`, () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    epicMiddleware.replaceEpic(fetchFavoriteImagesEpic);
  });

  it('fetches favorited images', () => {
    const payload = {};

    store.dispatch({
      type: FETCH_FAVORITE_IMAGES_PENDING,
      payload,
      nock$: Observable.of(payload)
    });

    const actions = store.getActions()

    const snapshot = [
      { type: FETCH_FAVORITE_IMAGES_PENDING, payload },
      { type: FETCH_FAVORITE_IMAGES_SUCCESS, payload },
    ]

    for (let i = 0; i < actions.length; i++) {
      expect(actions[i].payload).to.equal(snapshot[i].payload)
      expect(actions[i].type).to.equal(snapshot[i].type)
    }
  });

  it('handles errors for fetches to favorited images', () => {
    const payload = 'nock, nock...';

    store.dispatch({
      type: FETCH_FAVORITE_IMAGES_PENDING,
      payload,
      nock$: Observable.throw(payload),
    });

    const actions = store.getActions()

    const snapshot = [
      { type: FETCH_FAVORITE_IMAGES_PENDING, payload },
      { type: FETCH_FAVORITE_IMAGES_FAILURE, payload },
    ];

    for (let i = 0; i < actions.length; i++) {
      expect(actions[i].payload).to.equal(snapshot[i].payload)
      expect(actions[i].type).to.equal(snapshot[i].type)
    }
  });
});
