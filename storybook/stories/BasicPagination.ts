export interface PaginationProps {
  pages: number;
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: () => void;
}

export const createPagination = ({
  pages,
  size,
  page,
  primarycolor,
  pagechange,
}: PaginationProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/pagination/dist/paginationbootstrap.js";

  document.body.appendChild(script);

  const c = document.createElement("paginationbootstrap-component");

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
