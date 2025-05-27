import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BASE_URL } from "../testData/UserData";
import { faker } from "@faker-js/faker";

export class WorkspacePage extends BasePage {
  //Defining class selectors
  readonly page: Page;
  readonly usersTab: Locator;
  readonly createUserButton: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly languageDropdown: Locator;
  readonly languageOptions: Locator;
  readonly saveButton: Locator;
  readonly roleDropdown: Locator;
  readonly successSnackbar: Locator;
  readonly userActionButton: Locator;
  readonly editActionItem: Locator;
  readonly deleteActionItem: Locator;
  readonly userDeleteConfirmBtn : Locator;

  //Init selectors using constructor
  constructor(page: Page) {
    super(page);
    this.page = page;

    // Tab locators
    this.usersTab = page.getByRole("tab", { name: "Users", exact: true });

    // User creation locators
    this.createUserButton = page.getByTestId("create-user-button");
    this.fullNameInput = page.locator('input[name="Name"]');
    this.emailInput = page.locator('input[name="Email"]');
    this.phoneInput = page.locator('input[name="Phone"]');
    this.languageDropdown = page.locator('.MuiSelect-select').first();
    this.roleDropdown = page.locator('.MuiSelect-select').nth(1); 
    this.languageOptions = page.locator('[role="option"]');
    this.saveButton = page.getByTestId("save-drawer-btn");
    this.successSnackbar = page.locator('.MuiSnackbarContent-root');
    this.userActionButton= page.getByTestId('actions-menu-button');
    this.editActionItem= page.getByTestId('action-item-Edit');
    this.deleteActionItem= page.getByTestId('action-item-Delete');
    this.userDeleteConfirmBtn= page.getByTestId('confirm-dialog-button');
  }

  async selectLanguage(language: string) {
    await this.languageDropdown.click();
    await this.page
      .getByRole("option", {
        name: language,
        exact: true,
      })
      .click();
  }

  async selectRole(roleName: string) {
    await this.roleDropdown.click();
    await this.page
      .getByRole("option", {
        name: roleName,
        exact: true,
      })
      .click();
  }

  async createNewUser(userData: {
    fullName: string;
    email: string;
    phone: string;
    language: string;
    role: string;
  }) {
    await this.createUserButton.click();

    await this.fullNameInput.fill(userData.fullName);
    await this.emailInput.fill(userData.email);
    await this.phoneInput.fill(userData.phone);

    await this.selectLanguage(userData.language);

    await this.selectRole(userData.role);

    await this.saveButton.click();
  }

  async createTestUser(phone?: string) {
    await this.createNewUser({
      fullName: "Temp User " + faker.person.firstName(),
      email: faker.internet.email(),
      phone: phone ? phone : "1234567899",
      language: "English (English)",
      role: "Customize Admin",
    });
  }

  async selectTab(name: string) {
    await this.page.getByRole("tab", { name, exact: true }).click();
    await expect(
      this.page.getByRole("tab", { name, exact: true })
    ).toHaveAttribute("aria-selected", "true");
  }

  async assertUserCreated(){
    await expect(this.successSnackbar).toBeVisible();
    await expect(this.successSnackbar)
    .toContainText('User created successfully');
  }

  async selectUserActionButton(){
    await this.userActionButton.first().click();
  }

  async selectEditUser(){
    await this.editActionItem.click();
  }

  async selectDeleteUser(){
    await this.deleteActionItem.click();
  }

  async selectTestUserEditAction(){
    await this.page.getByTestId('search-input').fill('Temp User');
    await this.selectUserActionButton();
    await this.selectEditUser();
  }

    async selectUpdatedUserDeleteAction(){
    await this.page.getByTestId('search-input').fill('Updated User');
    await this.selectUserActionButton();
    await this.selectDeleteUser();
  }

  async editUser(){
    const newName = `Updated User ${faker.person.firstName()}`;
    await this.fullNameInput.fill(newName);
    await this.saveButton.click();
  }

  async confirmDeleteUser(){
    await this.userDeleteConfirmBtn.click();
  }
}

export default WorkspacePage;
