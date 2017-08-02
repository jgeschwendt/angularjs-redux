import { createStructuredSelector } from 'reselect';

import {
  favoriteImage,
  getNewImage,
  scoreImage,
} from './actions';

import {
  makeSelectVoterProps,
} from './selectors';

export default class VoterContainerController {
  static $inject = ['$ngRedux', '$scope'];

  constructor($ngRedux, $scope) {
    const unsubscribe = $ngRedux.connect(
      createStructuredSelector({
        props: makeSelectVoterProps(),
      }),
      {
        favoriteImage,
        getNewImage,
        scoreImage,
      },
    )(this);
    $scope.$on('$destroy', unsubscribe);

    this.onInit();
  }

  onInit() {
    this.getNewImage();
  }
}
