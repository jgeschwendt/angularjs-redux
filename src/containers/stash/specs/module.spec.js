/* eslint-disable */
import * as angular from 'angular';
import ngRedux from 'ng-redux';
import ngModule from '../module';


describe(`[MODULES] ${__dirname}`, () => {
  let mockModule;
  beforeEach(() => {
    mockModule = angular.module(ngModule);
  });

  let dependencies;
  beforeEach(() => {
    dependencies = mockModule.value(ngModule).requires;
  });

  const hasModule = moduleName => (dependencies.indexOf(moduleName) >= 0);

  it('should be registered', () => (
    expect(mockModule).not.to.equal(null)
  ));

  it('should have dependencies', () => {
    expect(hasModule(ngRedux)).to.equal(true);
    expect(hasModule('jkAngularRatingStars')).to.equal(true);
  });
});


