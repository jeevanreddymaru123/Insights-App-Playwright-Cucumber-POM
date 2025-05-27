import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  url!: string;

  constructor(page: Page) {
    this.page = page;
  }

  // Common method to navigate to a URL
  async visit() {
    await this.page.goto(this.url);
  }

  // Common method to Wait for page Load
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    return this;
  }

  // Common method to fill out a form field
  async waitAndFill(locator: string, value: string) {
    await this.page.waitForSelector(locator);
    await this.page.fill(locator, value);
  }

  // Common method to click an element
  async waitAndClick(locator: string) {
    await this.page.waitForSelector(locator);
    await this.page.click(locator);
    return this;
  }

  async assertPageUrl() {
    await expect(this.page).toHaveURL(this.url);
  }

  // Common method to retrieve text from an element
  async getElementText(element: Locator): Promise<string> {
    return element.innerText();
  }

  // Common method to wait for an element to be visible
  async waitForElementVisible(element: Locator | string) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "visible" });
    } else {
      await element.waitFor({ state: "visible" });
    }
  }

  // Common method to wait for an element to be hidden
  async waitForElementHidden(element: Locator) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "hidden" });
    } else {
      await element.waitFor({ state: "hidden" });
    }
  }

  // Common method to take a screenshot
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: fileName });
  }
}
