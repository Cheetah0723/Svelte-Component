export interface LoginRegisterProps {
  id: string;

  type?: "login" | "register" | "activate" | "recover" | "forgetpassword";
  recoverycode?: string;
  logouri?: string;
  language?: string;
  registeruri?: string;
  disableregister?: boolean;
  loginuri?: string;
  oauth2providers: any[];
  login?: (d) => void;
  register?: (d) => void;
  recoverOrActivate?: (d) => void;
}

export const createLoginRegister = ({
  id,
  type,
  logouri,
  login,
  register,
  recoverOrActivate,
  language,
  loginuri,
  registeruri,
  recoverycode,
  disableregister,
  oauth2providers,
}: LoginRegisterProps) => {
  if (!document.getElementById("loginregistercomponentscript")) {
    const script = document.createElement("script");
    script.id = "loginregistercomponentscript";
    script.src = "http://localhost:6006/loginregister/dist/loginregister.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("loginregister-component");
    c.id = id;
    c.addEventListener("login", (c: any) => login(c.detail));
    c.addEventListener("register", (c: any) => register(c.detail));
    c.addEventListener("recoverOrActivate", (c: any) =>
      recoverOrActivate(c.detail)
    );
  }

  if (logouri) {
    c.setAttribute("logouri", logouri);
  } else {
    if (c.hasAttribute("logouri")) c.removeAttribute("logouri");
  }
  if (disableregister) {
    c.setAttribute("disableregister", "yes");
  } else {
    if (c.hasAttribute("disableregister")) c.removeAttribute("disableregister");
  }
  if (recoverycode) {
    c.setAttribute("recoverycode", recoverycode);
  } else {
    if (c.hasAttribute("recoverycode")) c.removeAttribute("recoverycode");
  }
  if (type) {
    c.setAttribute("type", type);
  } else {
    if (c.hasAttribute("type")) c.removeAttribute("type");
  }
  if (oauth2providers) {
    c.setAttribute("oauth2providers", JSON.stringify(oauth2providers));
  } else {
    if (c.hasAttribute("oauth2providers")) c.removeAttribute("oauth2providers");
  }
  if (registeruri) {
    c.setAttribute("registeruri", registeruri);
  } else {
    if (c.hasAttribute("registeruri")) c.removeAttribute("registeruri");
  }

  if (loginuri) {
    c.setAttribute("loginuri", loginuri);
  } else {
    if (c.hasAttribute("loginuri")) c.removeAttribute("loginuri");
  }

  if (language) {
    c.setAttribute("language", language);
  } else {
    if (c.hasAttribute("language")) c.removeAttribute("language");
  }

  return c;
};
