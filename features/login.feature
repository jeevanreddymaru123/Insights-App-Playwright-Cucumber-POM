Feature: Login functionality

  Background:
    Given I navigate to the login page

  Scenario: Successful login
    When I login with valid credentials
    Then I should see the home page

  Scenario: Login failed
    When I login with invalid credentials
    Then I should see the notification that "Wrong e-mail or password!"