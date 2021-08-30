export interface LoginRegisterProps {
  type: "login" | "register";
  language?: string;
  login?: (d) => void;
}

export const createLoginRegister = ({
  type,
  login,
  language,
}: LoginRegisterProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/loginregister/dist/loginregister.js";

  document.body.appendChild(script);

  const c = document.createElement("loginregister-component");

  if (type) {
    c.setAttribute("type", type.toString());
  }
  if (language) {
    c.setAttribute("language", language);
  }
  c.addEventListener("login", (c: any) => login(c.detail));

  return c;
};
