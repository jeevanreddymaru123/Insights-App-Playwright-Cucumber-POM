export const USER_CREDENTIALS = {
  username: "alexey.cherpovodskiy@abcfitness.com",
  password: "Hello123!",
      
}

export const GMAILUSER_CREDENTIALS = {
  username: "m.jeevan12@gmail.com",
  password: "premalatha@125677",
      
}

export const SET_NEWPASSWORD = {
  username: "Insights_Playwright_Automation_Service_Account@fitnessbi.com",
  newPassword: "Hello12345!",
      
}

export const MAILBOX = {
  mailUrl: "https://outlook.office.com/",
  username: "Insights_Playwright_Automation_Service_Account@fitnessbi.com",
  password: "Nun_582045"

}
 
export const BASE_URL = {
  testEnv: "https://test.fitnessbi.com",
  stgEnv: "",
  prodEnv: "",
}[process.env.ENV || "testEnv"];

