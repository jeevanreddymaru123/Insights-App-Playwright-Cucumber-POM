Feature: User create, edit, delete functionality

    Background:
        Given I navigate to the login page
        And I login with valid credentials
        And I search and select "Forma Gym" workspace
        And I move to "Users" tab

    Scenario: Create user, edit the existing user and delete user succesfully
        When I create a test user
        And I should see the notification that "User created successfully!"
        When I select the Edit action for the test user
        Then Edit a random field and save
        Then I should see the notification that "User updated successfully!"
        When I select the Delete action for the updated test user
        Then I confirm to delete the user
        Then I should see the notification that "User deleted successfully!"

    Scenario: Create user with invalid credentials
        When I create a user with invalid credentials
        And I should see the notification that "Failed to create user!"
        
