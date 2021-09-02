export interface LoginRegisterProps {
  type: "login" | "register";
  language?: string;
  registeruri?: string;
  loginuri?: string;
  oauth2providers: any[];
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
  oauth2providers,
}: LoginRegisterProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/loginregister/dist/loginregister.js";

  document.body.appendChild(script);

  const c = document.createElement("loginregister-component");

  if (type) {
    c.setAttribute("type", type.toString());
  }
  if (oauth2providers) {
    c.setAttribute("oauth2providers", JSON.stringify(oauth2providers));
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
