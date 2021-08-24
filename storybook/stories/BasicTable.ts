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
  enableselect?: boolean;
  pagechange?: (d) => void;
  tableaction?: (d) => void;
  cellclick?: (d) => void;
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
  enableselect,
  cellclick,
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
  if (enableselect) {
    c.setAttribute("enableselect", "yes");
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  }
  if (actions) {
    c.setAttribute("actions", JSON.stringify(actions));
  }
  if (pagechange) {
    c.addEventListener("pagechange", (i: any) => pagechange(i.detail));
  }
  if (tableaction) {
    c.addEventListener("tableaction", (i: any) => tableaction(i.detail));
  }
  if (cellclick) {
    c.addEventListener("cellclick", (i: any) => cellclick(i.detail));
  }
  return c;
};
