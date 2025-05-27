import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BASE_URL } from "../testData/UserData";

export class LoginPage extends BasePage {
  //Defining class selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBTN: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordBtn: Locator;

  //Init selectors using constructor
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#email");
    this.passwordInput = page.locator("#password-label");
    this.loginBTN = page.locator("#mui-1");
    this.errorMessage = page.locator(
      "//div[contains(text(),'Wrong e-mail or password!')]"
    );
    this.forgotPasswordBtn = page.locator(
      "//a[normalize-space()='Forgot password']"
    );
    this.url = BASE_URL + "/signin";
  }

  //Defining login page methods
  //rename to fill login form and check if we've got password -> login to app if not -> restore password

  async loginToApp(userCredentials: { username: string; password: string }) {
    await this.usernameInput.fill(userCredentials.username);
    await this.passwordInput.fill(userCredentials.password);
    await this.loginBTN.click();
  }

  async fillInLoginForm(userCredentials: {
    username: string;
    password?: string;
  }) {
    await this.usernameInput.fill(userCredentials.username);
    if (userCredentials.password) {
      await this.passwordInput.fill(userCredentials.password);
      await this.loginBTN.click();
    } else {
      await this.forgotPasswordBtn.click();
    }
  }

  async assertMessage(message: string) {
    const errorMessage = this.page.locator(
      `//div[contains(text(),'${message}')]`
    );
    await expect(errorMessage).toContainText(message);
  }
  async assertLoginPageURL() {
    expect(this.url).toContain("/signin");
  }
}

export default LoginPage;
