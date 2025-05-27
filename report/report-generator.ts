import reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as path from "path";
import open from "open";

const reportsDir = path.join(__dirname, "../reports");
const reportPath = path.join(reportsDir, "cucumber-report.json");
const htmlReportPath = path.join(reportsDir, "cucumber-report.html");

const waitForReport = async (maxWaitSeconds = 60): Promise<void> => {
  const startTime = Date.now();
  const endTime = startTime + maxWaitSeconds * 1000;

  console.log(`⏳ Waiting for test completion (max ${maxWaitSeconds}s)...`);

  while (Date.now() < endTime) {
    try {
      if (fs.existsSync(reportPath)) {
        const content = fs.readFileSync(reportPath, "utf8").trim();
        if (content && content.startsWith("[")) {
          const json = JSON.parse(content);
          console.log(`✅ Test completed with ${json.length} features`);
          return;
        }
      }
    } catch {
      // Ignore errors and keep polling
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Tests did not complete within ${maxWaitSeconds} seconds`);
};

const generateHtmlReport = () => {
  console.log("📊 Generating HTML report...");
  reporter.generate({
    theme: "bootstrap",
    jsonFile: reportPath,
    output: htmlReportPath,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    storeScreenshots: true,
    screenshotsDirectory: "screenshots/",
    metadata: {
      "App Version": "1.0.0",
      "Test Environment": "STAGING",
      Browser: "Chrome",
      Platform: process.platform,
    },
    noInlineScreenshots: false,
  });
};

(async () => {
  try {
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    await waitForReport();

    generateHtmlReport();

    console.log(`✅ HTML report generated at: ${htmlReportPath}`);
    await open(htmlReportPath);
    console.log("🌐 Report opened in browser");
  } catch (err: any) {
    console.error("❌ Failed to generate or open report:", err.message);

    // Optional debug info
    console.log("\n🔍 Debug Information:");
    console.log(`- Reports directory: ${reportsDir}`);
    console.log(`- Directory exists: ${fs.existsSync(reportsDir)}`);

    if (fs.existsSync(reportsDir)) {
      console.log("- Contents:", fs.readdirSync(reportsDir).join(", "));
    }

    if (fs.existsSync(reportPath)) {
      const stats = fs.statSync(reportPath);
      console.log(`- Report file size: ${stats.size} bytes`);
      console.log(`- Modified: ${stats.mtime.toLocaleString()}`);
    }

    process.exit(1);
  }
})();
