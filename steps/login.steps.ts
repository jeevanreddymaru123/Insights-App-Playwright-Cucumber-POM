import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { USER_CREDENTIALS, MAILBOX,SET_NEWPASSWORD,GMAILUSER_CREDENTIALS } from "../testData/UserData";

// Background Steps
Given('I navigate to the login page', async function(this: CustomWorld) {
  await this.loginPage.visit();
});

When('I login with valid credentials', async function(this: CustomWorld) {
  await this.loginPage.loginToApp(USER_CREDENTIALS);
});

When('I login with invalid credentials', async function() {
  await this.loginPage.loginToApp({...USER_CREDENTIALS, password: "qwerty"});
});

Given('I click on the login button', async function(this: CustomWorld) {
  await this.page.click('#mui-1');
});

Then('I should see the home page', async function(this: CustomWorld) {
  await this.loginPage.assertPageUrl();
});

Then('I should see the notification that {string}', async function(this: CustomWorld, message: string) {
  await this.loginPage.assertMessage(message);
});
