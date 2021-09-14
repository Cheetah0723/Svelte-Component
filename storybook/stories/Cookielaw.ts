export interface CookielawProps {
  id: string;

  acceptCookieLaw?: (el) => void;
}

export const createCookielaw = ({
  id,

  acceptCookieLaw,
}: CookielawProps) => {
  if (!document.getElementById("cookielawcomponentscript")) {
    const script = document.createElement("script");
    script.id = "cookielawcomponentscript";
    script.src = "http://localhost:6006/cookielaw/dist/cookielaw.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("cookielaw-component");
    c.id = id;

    c.addEventListener("acceptCookieLaw", (e: any) =>
      acceptCookieLaw(e.detail)
    );
  }

  // if (phone) {
  //   c.setAttribute("phone", JSON.stringify(phone));
  // } else {
  //   if (c.hasAttribute("phone")) c.removeAttribute("phone");
  // }

  return c;
};
