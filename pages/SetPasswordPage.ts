import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SET_NEWPASSWORD,BASE_URL,GMAILUSER_CREDENTIALS } from "../testData/UserData";

export class SetPasswordPage extends BasePage {

  readonly clickWindowsBtn: Locator
  readonly clickGmailBtn: Locator
  readonly emailPlaceHolder: any
  readonly clickNextBtn: Locator
  readonly passwordPlaceHolder: any

    constructor(page: Page) {
        super(page)
        this.url = BASE_URL + "/signin";
        this.clickWindowsBtn= page.locator("//a[@aria-label='Microfost']")
        this.clickGmailBtn =page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv'])[3]");
        this.emailPlaceHolder = page.locator("#identifierId");
        this.clickNextBtn = page.locator("//span[normalize-space()='Next']");
        this.passwordPlaceHolder = page.locator("input[name='Passwd']");
    }    
    async switchToNewTab() {
        const page2Promise = await this.page.waitForEvent("popup");
        const page2 = await page2Promise;
        await page2.getByLabel("Password *", { exact: true }).click();
        await page2
          .getByLabel("Password *", { exact: true })
          .fill(SET_NEWPASSWORD.newPassword);
        await page2.getByLabel("Confirm Password *").fill(SET_NEWPASSWORD.newPassword);
        await page2.getByRole("button", { name: "Submit" }).click();   
        expect(this.url).toEqual(BASE_URL+"/signin")
      }

      async loginWithWindowsAccount() {
        await this.clickWindowsBtn.click()
      }

      async loginWithGmailAccount(userCredentials: { username: string; password: string }) {
        await this.clickGmailBtn.click()
        await this.emailPlaceHolder.fill(GMAILUSER_CREDENTIALS.username);
        await this.clickNextBtn.click()
        await this.passwordPlaceHolder.fill(GMAILUSER_CREDENTIALS.password);
        await this.waitForPageLoad()
        await this.clickNextBtn.click()
        await this.waitForPageLoad()
        expect(this.url).toEqual(BASE_URL+"/signin")
      }
}