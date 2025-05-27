import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class OutlookMailPage extends BasePage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly signinBtn: Locator
    readonly nextBtn: Locator
    readonly skipOtp: Locator
    readonly selectEmailLink: Locator
    readonly setNewPasswordBtn: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator("(//input[@id='i0116'])[1]")
        this.passwordInput = page.locator("(//input[@id='i0118'])[1]")
        this.signinBtn = page.locator("#idSIButton9")
        this.nextBtn = page.locator("#idSubmit_ProofUp_Redirect")
        this.skipOtp = page.locator("a[role='link']")
        this.selectEmailLink = page.locator("(//div[@class='EeHm8'])[3]")
        this.setNewPasswordBtn = page.locator("//a[normalize-space()='Set new password']")
    }

    async mailBoxAccess(mailData: {
        mailUrl: string;
        username: string;
        password: string;
      }) {
        await this.page.goto(mailData.mailUrl);
        await this.usernameInput.fill(mailData.username);
        await this.signinBtn.click();
        await this.passwordInput.fill(mailData.password);
        await this.signinBtn.click();
        await this.nextBtn.click();
        await this.skipOtp.click();
        await this.signinBtn.click();
     }   

}