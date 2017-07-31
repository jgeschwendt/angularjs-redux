import * as angular from 'angular';

export default function bootstrap(ngModule) {
  try {
    angular.element(() => angular.bootstrap(document, [ngModule], { strictDi: true }));
  } catch (x) {
    console.error(x); // eslint-disable-line no-console
  }
}
