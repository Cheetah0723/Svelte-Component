export interface LoginRegisterProps {
  type: "login" | "register";
  language?: string;
  registeruri?: string;
  loginuri?: string;
  login?: (d) => void;
  register?: (d) => void;
}

export const createLoginRegister = ({
  type,
  login,
  register,
  language,
  loginuri,
  registeruri,
}: LoginRegisterProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/loginregister/dist/loginregister.js";

  document.body.appendChild(script);

  const c = document.createElement("loginregister-component");

  if (type) {
    c.setAttribute("type", type.toString());
  }

  if (registeruri) {
    c.setAttribute("registeruri", registeruri);
  }

  if (loginuri) {
    c.setAttribute("loginuri", loginuri);
  }

  if (language) {
    c.setAttribute("language", language);
  }
  c.addEventListener("login", (c: any) => login(c.detail));
  c.addEventListener("register", (c: any) => register(c.detail));

  return c;
};
