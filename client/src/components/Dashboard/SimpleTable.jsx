import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function SimpleTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, SetFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: SetFiltering,
  });

  return (
    <div>
      <h1>Usuarios</h1>
      <input
        type="text"
        value={filtering}
        onChange={(e) => SetFiltering(e.target.SetFiltering)}
      />
      <div className="border border-white shadow-sm rounded-lg bg-black text-white">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            {table.getHeaderGroups().map((headersGroup) => (
              <tr
                key={headersGroup.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {headersGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext
                    )}
                    {
                      { asc: "⬆️", desc: "⬇️" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => table.setPageIndex(0)}>Primer Pagina</button>
        <button onClick={() => table.previousPage()}>Pagina Anterior</button>
        <button onClick={() => table.nextPage()}>Pagina Siguiente</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Ultima Pagina
        </button>
      </div>
    </div>
  );
}

export default SimpleTable;
