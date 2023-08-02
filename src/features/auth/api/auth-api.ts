import { Auth } from 'aws-amplify';

export const AuthApi = {
  login: async (username: string, password: string) => {
    try {
      const user = await Auth.signIn(username, password);
      return user;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      throw error;
    }
  },
  
  isAuthenticated: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
}