function loadSpecs(context) {
  return context.keys().map(context);
}

loadSpecs(require.context('../src', true, /\.spec\.js/));
