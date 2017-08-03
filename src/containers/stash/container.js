import { createStructuredSelector } from 'reselect';

import {
  fetchFavoriteImages,
  fetchScoredImages,
  setVisibilityFilter,
} from './actions';

import {
  VISIBILITY_FILTER_ALL,
  VISIBILITY_FILTER_FAVORITES,
  VISIBILITY_FILTER_SCORED,
} from './constants';

import {
  makeSelectStashProps,
} from './selectors';

export default class StashContainerController {
  static $inject = ['$ngRedux', '$scope'];

  constructor($ngRedux, $scope) {
    this.$ngRedux = $ngRedux;
    const unsubscribe = this.$ngRedux.connect(
      createStructuredSelector({
        props: makeSelectStashProps(),
      }),
      {
        fetchFavoriteImages,
        fetchScoredImages,
        setVisibilityFilter,
      },
    )(this);
    $scope.$on('$destroy', unsubscribe);

    this.onInit();
  }

  onInit() {
    this.setConstants();
    this.$ngRedux.dispatch(fetchFavoriteImages());
    this.$ngRedux.dispatch(fetchScoredImages());
  }

  setConstants() {
    this.VISIBILITY_FILTER_ALL = VISIBILITY_FILTER_ALL;
    this.VISIBILITY_FILTER_FAVORITES = VISIBILITY_FILTER_FAVORITES;
    this.VISIBILITY_FILTER_SCORED = VISIBILITY_FILTER_SCORED;
  }
}
