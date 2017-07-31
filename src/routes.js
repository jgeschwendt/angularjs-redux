import * as angular from 'angular';
import ngRoute from 'angular-route';

import stashModule, { ngStashModuleRouteConfig } from './modules/stash/module';
import voterModule, { ngVoterModuleRouteConfig } from './modules/voter/module';

const ngModule = angular
  .module('app.routes', [
    ngRoute,
    stashModule,
    voterModule,
  ])
  .config(['$routeProvider', ($routeProvider) => {
    $routeProvider
      .when('/stash', ngStashModuleRouteConfig)
      .when('/voter', ngVoterModuleRouteConfig);

    $routeProvider.otherwise({ redirectTo: '/voter' });
  }]);

export default ngModule.name;
export { ngModule };
