module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'browserify',
      'chai'
    ],

    files: [
      
      // tinymce
      'node_modules/tinymce/tinymce.min.js',
      'node_modules/tinymce/plugins/**/*.min.js',
      'node_modules/tinymce/themes/**/*.min.js',
      { pattern: 'node_modules/tinymce/skins/**', watched: false, included: false },

      // tests
      'test/**/*Spec.js',
    ],

    exclude: [
    ],

    preprocessors: {
      'test/**/*Spec.js': [ 'browserify' ]
    },

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [ [ 'babelify' ] ]
    }
  })
}
