/* eslint-disable */
import * as angular from 'angular';
import 'angular-mocks';
import 'angular-jk-rating-stars';

import StashContainerController from '../container';

import ngModule from '../module';
import {
  VISIBILITY_FILTER_ALL,
  VISIBILITY_FILTER_FAVORITES,
  VISIBILITY_FILTER_SCORED,
} from '../constants';

describe(`[CONTROLLERS] ${__dirname}`, () => {
  beforeEach(window.module(ngModule));

  let $controller;
  beforeEach(window.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should have a StashContainerController with the proper defaults', () => {
    let dispatchCount = 0;

    const $scope = {
      $on: () => {},
    };

    const $ngRedux = {
      connect: () => () => {},
      dispatch: () => { dispatchCount++; }
    }

    const controller = $controller('StashContainerController', { $scope, $ngRedux });

    expect(controller).to.deep.equal({
      $ngRedux,
      VISIBILITY_FILTER_ALL,
      VISIBILITY_FILTER_FAVORITES,
      VISIBILITY_FILTER_SCORED,
    });

    // when the controller's done initializing it should have dispatched twice
    expect(dispatchCount).to.equal(2);
  });
});

