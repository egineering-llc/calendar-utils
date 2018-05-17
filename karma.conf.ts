import * as webpack from 'webpack';

export default function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'test/calendar-utils.spec.ts'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/calendar-utils.spec.ts': ['webpack', 'sourcemap']
    },

    mime: {
      'text/x-typescript': ['ts']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [{
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          enforce: 'pre',
          options: {
            emitErrors: config.singleRun,
            failOnHint: false
          }
        }, {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            compilerOptions: {
              module: 'es2015'
            }
          }
        }, {
          test: /src\/.+\.ts$/,
          exclude: /(test|node_modules)/,
          loader: 'istanbul-instrumenter-loader',
          enforce: 'post',
          options: {
            esModules: true
          }
        }]
      },
      optimization: {
        noEmitOnErrors: config.singleRun
      }
    },

    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 100,
        lines: 100,
        branches: 96,
        functions: 100
      }
    },

    mochaReporter: {
      showDiff: true,
      output: 'autowatch'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless']
  });
};
