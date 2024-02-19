import envConfig from "../env_config/envConfig.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  // to initialize the env propes for appwrite url
  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUrl)
      .setProject(envConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // make the structure of the functionality to reuse for every service
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // check if account created then make the user to login else return the userAcoount
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // create login function
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // get current user to show the dashboard
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        "Appwrite Service :: Auth :: getCurrentUser :: error ",
        error
      );
    }
    //  default value if any problem happens to get the user details
    return null;
  }

  // logout
  async logout() {
    try {
      // to delete all the session for the curent user
      // TODO: refer more the docs for single seeion
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: Auth :: logout :: error ", error);
    }
  }
}

// create the object
const authService = new AuthService();

// export object to get all the functions outise of the class
export default authService;
