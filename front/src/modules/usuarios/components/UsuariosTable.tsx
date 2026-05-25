import { 
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import type { Usuario } from "@/api/usuariosApi";

interface UsuariosTableProps {
    data: Usuario[]
    onDelete: (id: number) => void
}

const columnHelper = createColumnHelper<Usuario>()

export function UsuariosTable({ data, onDelete }: UsuariosTableProps) {
    const columns = [
        columnHelper.accessor('id', {
          header: 'ID',
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('nombre', {
          header: 'Nombre',
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('email', {
          header: 'Email',
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('rol', {
          header: 'Rol',
          cell: (info) => (
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
              {info.getValue()}
            </span>
          ),
        }),
        columnHelper.accessor('deleted_at', {
          header: 'Estado',
          cell: (info) =>
            info.getValue() === null ? (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                Activo
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                Inactivo
              </span>
            ),
        }),
        columnHelper.display({
          id: 'acciones',
          header: 'Acciones',
          cell: (info) =>
            info.row.original.deleted_at === null ? (
              <button
              onClick={() => onDelete(info.row.original.id)}
              className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
              >
                Eliminar
              </button>
            ) : (
              <span className="text-xs text-zinc-400">Eliminado</span>
            ),
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <table className="w-full text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                key={header.id}
                                className="px-4 py-3 text-left font-medium text-zinc-600"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td
                            colSpan={columns.length}
                            className="px-4 py-8 text-center text-zinc-400"
                            >
                                No hay usuarios cargados
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr
                            key={row.id}
                            className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3 text-zinc-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}