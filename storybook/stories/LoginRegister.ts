export interface LoginRegisterProps {
  pages: number;
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: () => void;
}

export const createLoginRegister = ({
  pages,
  size,
  page,
  primarycolor,
  pagechange,
}: LoginRegisterProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/loginregister/dist/loginregister.js";

  document.body.appendChild(script);

  const c = document.createElement("loginregister-component");

  c.setAttribute("pages", pages.toString());

  if (size) {
    c.setAttribute("size", size.toString());
  }
  if (page) {
    c.setAttribute("page", page.toString());
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  }

  c.addEventListener("pagechange", pagechange);

  return c;
};
