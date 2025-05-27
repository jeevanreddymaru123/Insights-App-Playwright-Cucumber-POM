import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Background Steps
Given('I search and select {string} workspace', async function(this: CustomWorld, workspaceName: string) {
  await this.homePage.searchAndSelectWorkspace(workspaceName);
});

Given('I move to {string} tab', async function(this: CustomWorld, tabName: string) {
  await this.workspacePage.selectTab(tabName);
});

When('I create a user with invalid credentials', async function(this: CustomWorld) {
  // Click the create user button
  await this.workspacePage.createTestUser("(91) 38921023")
});

When('I create a test user', async function(this: CustomWorld) {
  await this.workspacePage.createTestUser();
});

// Edit User Scenario
When('I select the Edit action for the test user', async function(this: CustomWorld) {
  await this.workspacePage.selectTestUserEditAction();
});

When('Edit a random field and save', async function(this: CustomWorld) {
  await this.workspacePage.editUser();
});

// Delete User Scenario
When('I select the Delete action for the updated test user', async function(this: CustomWorld) {
  await this.workspacePage.selectUpdatedUserDeleteAction();
});

When('I confirm to delete the user', async function(this: CustomWorld) {
  await this.workspacePage.confirmDeleteUser();
});