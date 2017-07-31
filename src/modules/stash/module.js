import * as angular from 'angular';

import StashContainerController from './container';
import template from './container.html';

const ngModule = angular
  .module('app.modules.stash', ['jkAngularRatingStars'])
  .controller('StashContainerController', StashContainerController);

const ngStashModuleRouteConfig = {
  controller: 'StashContainerController',
  controllerAs: '$ctrl',
  template,
};

export default ngModule.name;
export { ngModule, ngStashModuleRouteConfig };
