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
  pagechange?: () => void;
  tableaction?: () => void;
  actions: {
    name: string;
    type: string;
    iconOrText: string;
  }[];
}

export const createTable = ({
  rows,
  headers,
  size,
  page,
  primarycolor,
  actions,
  tableaction,
  pagechange,
}: TableProps) => {
  const script = document.createElement("script");
  script.src =
    "http://localhost:6006/streamingtable/dist/streamingtablebootstrap.js";

  document.body.appendChild(script);
  const c = document.createElement("streamingtablebootstrap-webcomponent");
  c.setAttribute("rows", JSON.stringify(rows));
  c.setAttribute("headers", JSON.stringify(headers));
  if (size) {
    c.setAttribute("size", size.toString());
  }
  if (page) {
    c.setAttribute("page", page.toString());
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  }
  if (actions) {
    c.setAttribute("actions", JSON.stringify(actions));
  }
  c.addEventListener("pagechange", pagechange);
  c.addEventListener("tableaction", tableaction);

  return c;
};
