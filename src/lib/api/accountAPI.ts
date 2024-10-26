export const fetchEmailRecoveryToken = async (email: string) => {
  const response = await fetch("/api/account/user/password/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const ok = response.ok;
  const { resetLink } = await response.json();
  return { ok, resetLink };
};

export const registerNewUser = async (email: string, password: string) => {
  const res = await fetch("/api/account/verification/register-verify", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const ok = res.ok;
  const { verificationLink } = await res.json();
  return { ok, verificationLink };
};

export const verifyUser = async (email: string, verificationCode: string) => {
  const res = await fetch("/api/account/verification/verify", {
    method: "POST",
    body: JSON.stringify({ email, code: verificationCode }),
    headers: { "Content-Type": "application/json" },
  });
  return {ok:res.ok};
};

export const resendVerificationCode = async (email: string, password: string) => {
  const res = await fetch("/api/account/verification/register-verify", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ok = res.ok;
  const { verificationLink } = await res.json();
  return { ok, verificationLink };
};

export const verificationController = async (email: string) => {
  const response = await fetch('/api/account/verification/verify-controll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), // send email to API
  });
  const status = response.status;
  return { status };
};
