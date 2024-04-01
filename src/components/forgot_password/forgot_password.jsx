import React from "react";
import "../forgot_password/forgot_password.css";

export default function forgot_password() {
  return (
    <div>
      <body className="bodybuttonforgot-password">
        <div class="containerforgot-password ">
          <h1 class="title-forgot-password">Forgot Password?</h1>
          <p>You can reset your password here.</p>

          <form action="#">
            <div class="input-field">
              <label for="email">Email Address</label>
              <input type="email" id="email" required />
            </div>

            <button type="submit" class="buttonforgot-passwor">
              Reset Password
            </button>
          </form>
        </div>
      </body>
    </div>
  );
}
