// support/world.ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import LoginPage from '../pages/LoginPage';
import WorkspacePage from '../pages/WorkspacePage';
import { HomePage } from '../pages/HomePage';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(10000); // 10 seconds

export class CustomWorld extends World {
  private static browserPool: Browser[] = [];
  private static browserIndex = 0;
  private static maxBrowsers = 4;
  private static initializationPromise: Promise<void> | null = null;
  
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  workspacePage!: WorkspacePage;
  homePage!: HomePage;

  private static async initializePool() {
    if (!CustomWorld.initializationPromise) {
      CustomWorld.initializationPromise = (async () => {
        for (let i = 0; i < CustomWorld.maxBrowsers; i++) {
          const browser = await chromium.launch({ 
            headless: false,
          });
          CustomWorld.browserPool.push(browser);
        }
      })();
    }
    return CustomWorld.initializationPromise;
  }

  async init() {
    // Initialize browser pool if not already done
    await CustomWorld.initializePool();

    // Get a browser from the pool (round-robin)
    this.browser = CustomWorld.browserPool[
      CustomWorld.browserIndex % CustomWorld.maxBrowsers
    ];
    CustomWorld.browserIndex++;

    // Create isolated context and page
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.workspacePage=new WorkspacePage(this.page);
    this.homePage=new HomePage(this.page);
  }

  async takeScreenshot(name: string) {
    const screenshotPath = `${this.parameters.screenshotsDir}${name}.png`;
    await this.page.screenshot({ path: screenshotPath });
    
    // Attach screenshot to Cucumber report
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
    
    return screenshotPath;
  }

  async close() {
    // Close page and context, but keep browser open for reuse
    await this.page.close();
    await this.context.close();
    // Note: We don't close the browser here
  }

  static async cleanup() {
    // Close all browsers in the pool
    await Promise.all(
      CustomWorld.browserPool.map(browser => browser.close())
    );
    CustomWorld.browserPool = [];
    CustomWorld.browserIndex = 0;
    CustomWorld.initializationPromise = null;
  }
}

setWorldConstructor(CustomWorld);