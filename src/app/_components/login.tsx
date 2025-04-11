'use client';

import React from 'react';
import type { UrlConfig, Messages, LoginData } from '@ln-foot/types';

interface LoginFormProps {
  url: UrlConfig;
  messages: Messages;
  login: LoginData;
  errorMessage?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ url, messages, login, errorMessage }) => (
  <form className="form-container" action={url.loginAction} method="post">
    {errorMessage && <div className="form-error">{errorMessage}</div>}

    <div className="form-control">
      <label htmlFor="username" className="label">
        <span className="form-label">{messages.usernameOrEmail}</span>
      </label>
      <input
        id="username"
        name="username"
        type="email"
        className="form-input"
        autoFocus
        required
        placeholder={messages.usernameOrEmail}
        defaultValue={login.username ?? ''}
      />
    </div>

    <div className="form-control">
      <label htmlFor="password" className="label">
        <span className="form-label">{messages.password}</span>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="form-input"
        required
        placeholder={messages.password}
      />
      <div className="text-right mt-2">
        <a href={url.loginResetCredentialsUrl} className="form-link">
          {messages.doForgotPassword}
        </a>
      </div>
    </div>

    <button type="submit" className="form-submit">
      {messages.doLogIn}
    </button>
  </form>
);

export default LoginForm;
