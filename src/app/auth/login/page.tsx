// app/login/page.tsx
import IdentityProviderButtons from "@components/common/idp-buttons";
import LoginForm from "@components/login";

async function getMetadata() {
  const locale = "fr";

  const messages = {
    loginTitle: "Se connecter",
    loginAccountTitle: "Connexion à votre compte",
    usernameOrEmail: "Adresse email ou nom d’utilisateur",
    password: "Mot de passe",
    doForgotPassword: "Mot de passe oublié ?",
    doLogIn: "Se connecter",
    noAccount: "Vous n'avez pas de compte ?",
    doRegister: "S’inscrire",
  };

  const url = {
    oauth2LoginUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    loginAction: "/api/auth/login",
    loginResetCredentialsUrl: "/reset-password",
    registrationUrl: "/register",
  };

  const identityProviders = [{ alias: "google", displayName: "Google" }];

  const login = {
    username: "",
  };

  const message = {
    summary: "",
  };

  return {
    locale,
    messages,
    url,
    identityProviders,
    login,
    message,
  };
}

export default async function LoginPage() {
  const { messages, url, identityProviders, login, message } =
    await getMetadata();
  return (
    <body className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          <span className="login-highlight">{messages.loginAccountTitle}</span>.
        </h1>

        {identityProviders.length > 0 && (
          <>
            <IdentityProviderButtons
              identityProviders={identityProviders}
              loginAction={url.oauth2LoginUrl}
            />
            <div className="divider-text">or</div>
          </>
        )}

        <LoginForm
          url={url}
          messages={messages}
          login={login}
          errorMessage={message?.summary}
        />
      </div>
    </body>
  );
}
