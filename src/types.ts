export interface UrlConfig {
    loginAction: string;
    loginResetCredentialsUrl: string;
    registrationUrl: string;
  }
  
  export interface IdentityProvider {
    alias: string;
    displayName: string;
  }
  
  export interface LoginData {
    username?: string;
  }
  
  export interface Messages {
    loginTitle: string;
    loginAccountTitle: string;
    usernameOrEmail: string;
    password: string;
    doForgotPassword: string;
    doLogIn: string;
    noAccount: string;
    doRegister: string;
  }
  