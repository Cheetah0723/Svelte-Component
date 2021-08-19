interface ITableHeader {
  label: string;
  key: string;
  type?: string;
  format?: string;
  search?: boolean;
}

export interface TableProps {
  rows: any[];
  headers: ITableHeader[];
  size?: number;
  page?: number;
  primarycolor?: string;
}

export const createTable = ({
  rows,
  headers,
  size,
  page,
  primarycolor,
}: TableProps) => {
  const script = document.createElement("script");
  script.src =
    "http://localhost:6006/streamingtable/dist/streamingtablebootstrap.js";

  document.body.appendChild(script);

  let html = `<streamingtablebootstrap-webcomponent rows='${JSON.stringify(
    rows
  )}' headers='${JSON.stringify(headers)}'`;
  if (size) {
    html += ` size='${size.toString()}'`;
  }
  if (page) {
    html += ` page='${page.toString()}'`;
  }
  if (primarycolor) {
    html += ` primarycolor='${primarycolor.toString()}'`;
  }
  html += "></streamingtablebootstrap-webcomponent>";

  return html;
};
