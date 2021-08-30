export interface LoginRegisterProps {
  type: "login" | "register";
  login?: (d) => void;
}

export const createLoginRegister = ({ type, login }: LoginRegisterProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/loginregister/dist/loginregister.js";

  document.body.appendChild(script);

  const c = document.createElement("loginregister-component");

  if (type) {
    c.setAttribute("type", type.toString());
  }
  c.addEventListener("login", (c: any) => login(c.detail));

  return c;
};
