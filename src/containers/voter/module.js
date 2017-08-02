import * as angular from 'angular';

import VoterContainerController from './container';
import template from './container.html';

const ngModule = angular
  .module('app.modules.voter', ['jkAngularRatingStars'])
  .controller('VoterContainerController', VoterContainerController);

const ngVoterModuleRouteConfig = {
  controller: 'VoterContainerController',
  controllerAs: '$ctrl',
  template,
};

export default ngModule.name;
export { ngModule, ngVoterModuleRouteConfig };
