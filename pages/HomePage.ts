import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BASE_URL } from "../testData/UserData";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly homeButton: Locator;
  readonly profileIcon: Locator;
  readonly logoutButton: Locator;
  readonly searchBar: Locator;

  //check wether datatestid require some specific naming from playwright docs side
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.homeButton = page.getByTestId("side-bar-home-menu-btn");
    this.profileIcon = page.getByTestId("settings-menu-user-name");
    this.logoutButton = page.getByTestId("settings-menu-logout-menu-item");
    this.searchBar = page.getByTestId("search-input");
    this.url = BASE_URL + "/home";
  }

  getWorkSpace(name: string) {
    return this.page.getByRole("button", { name: name });
  }

  async logoutFromApp() {
    await this.profileIcon.click();
    await this.logoutButton.click();
  }

  async searchWorkspace(name: string) {
    await this.searchBar.click();
    await this.searchBar.fill(name);
  }

  async selectFormaGym() {
    await this.searchWorkspace("forma");
    await this.page.getByText("Forma Gym", { exact: true }).click();
  }

  async searchAndSelectWorkspace(workspace: string) {
    await this.page.getByTestId("search-input").fill(workspace);
    await this.waitForPageLoad();
    await this.page.getByText(workspace, { exact: true }).click();
  }
}
