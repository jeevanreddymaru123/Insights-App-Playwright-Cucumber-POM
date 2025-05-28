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
  },

   reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        channels: ["pw-tests", "ci"], // provide one or more Slack channels
        sendResults: "always", // "always" , "on-failure", "off"
      },
    ],
    ["dot"], // other reporters
  ],
};