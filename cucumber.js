// cucumber.js
module.exports = {
  default: {
    parallel: 2,
    paths: [
      'features/**/*.feature'
    ],
    require: [
      'steps/**/*.ts',
      'support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json', // Changed path to reports folder
      'progress'
    ],
    worldParameters: {
      screenshotsDir: 'screenshots/'
    }
  }
};