import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Button from "../common/Button";
import Modal from "../common/Modal";
import CreateForm from "../common/CreateForm";

function SimpleTable({ data, columns , title ,formFields, modalTitle , onSubmit }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, SetFiltering] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-black rounded-xl">
      <div className="p-5 flex justify-between items-center">
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="flex items-center">
          <div className="w-64 mr-4">
            <input
              aria-label="Buscar"
              className="w-full p-2 text-sm text-white border rounded-md bg-black border-violet-700"
              placeholder="Buscar"
              type="text"
              value={filtering}
              onChange={(e) => SetFiltering(e.target.value)}
            />
          </div>
          <Button
            texto={modalTitle}
            className="ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-violet-700 text-violet-500 hover:bg-violet-700 hover:text-violet-100"
            onClick={openModal}
          />
        </div>
      </div>
      <div className="m-4 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-white uppercase bg-violet-900">
            {table.getHeaderGroups().map((headersGroup) => (
              <tr key={headersGroup.id}>
                {headersGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-6"
                    scope="col"
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
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0
                    ? "bg-black border-b border-violet-700"
                    : "bg-violet-700 border-b border-black"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-white m-4"></span>
        <div className="flex justify-end">
          <Button
            texto="Primer Página"
            className="mx-3 ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-violet-700 text-violet-500"
            onClick={() => table.setPageIndex(0)}
          />
          <Button
            texto="Pagina Anterior"
            className="mx-3 ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-violet-700 text-violet-500"
            onClick={() => table.previousPage()}
          />
          <Button
            texto="Pagina Siguiente"
            className="mx-3 ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-violet-700 text-violet-500"
            onClick={() => table.nextPage()}
          />
          <Button
            texto="Ultima Pagina"
            className="mx-3 ring-offset-background border bg-background hover:bg-accent hover:text-accent-foreground border-violet-700 text-violet-500"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal title={modalTitle} onClose={closeModal}>
          <CreateForm
            onClose={closeModal}
            onSubmit={onSubmit || (() => {})}
            fields={formFields }
          />
        </Modal>
      )}
    </div>
  );
}

export default SimpleTable;
