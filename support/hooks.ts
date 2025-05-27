// support/hooks.ts
import { After, Before, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from "fs";
import * as path from "path";

// Only run in the main process (not in workers)
const isMainProcess = !process.env.CUCUMBER_WORKER_ID;

BeforeAll(async function () {
  // Clear screenshots directory only once
  if (isMainProcess) {
    const screenshotsDir = path.join("./screenshots");
    
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    } else {
      const files = fs.readdirSync(screenshotsDir);
      for (const file of files) {
        const filePath = path.join(screenshotsDir, file);
        fs.unlinkSync(filePath);
      }
      console.log("🧹 Cleared all screenshots (BeforeAll hook)");
    }
  }
});

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
    const timestamp = new Date().getTime();
    await this.takeScreenshot(`failed_${scenarioName}_${timestamp}`);
  }
  await this.close();
});

AfterAll(async function () {
  // Only cleanup from the main process
  if (isMainProcess) {
    console.log('Debug ********');
    await CustomWorld.cleanup();
    console.log("🧹 Cleaned up all browser instances");
  }
});