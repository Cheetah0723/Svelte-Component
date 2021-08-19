export interface PaginationProps {
  pages: number;
  size?: number;
  page?: number;
  primarycolor?: string;
}

export const createPagination = ({
  pages,
  size,
  page,
  primarycolor,
}: PaginationProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/pagination/dist/paginationbootstrap.js";

  document.body.appendChild(script);

  let html = `<paginationbootstrap-component pages='${pages.toString()}'`;
  if (size) {
    html += ` size='${size.toString()}'`;
  }
  if (page) {
    html += ` page='${page.toString()}'`;
  }
  if (primarycolor) {
    html += ` primarycolor='${primarycolor.toString()}'`;
  }
  html += "></paginationbootstrap-component>";

  return html;
};
