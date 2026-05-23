import { 
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import type { Categoria } from "@/api/categoriasApi";

interface CategoriasTableProps {
    data: Categoria[]
    categorias: Categoria[]
    isAdmin: boolean
    onEdit: (categoria: Categoria) => void
    onDelete: (id: number) => void
}

const columnHelper = createColumnHelper<Categoria>()

export function CategoriasTable({
    data,
    categorias,
    isAdmin,
    onEdit,
    onDelete,
}: CategoriasTableProps) {
    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('nombre', {
            header: 'Nombre',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('descripcion', {
            header: 'Descripción',
            cell: (info) => info.getValue() ?? '-',
        }),
        columnHelper.accessor('parent_id', {
            header: 'Categoría Padre',
            cell: (info) => {
                const parentId = info.getValue()
                if (!parentId) return '-'
                const parent = categorias.find((c) => c.id === parentId)
                return parent ? parent.nombre : parentId
            },
        }),
        columnHelper.display({
            id: 'acciones',
            header: 'Acciones',
            cell: (info) =>
                isAdmin ? (
                    <div className="flex gap-2">
                        <button
                        onClick={() => onEdit(info.row.original)}
                        className="rounded-lg bg-zinc-100 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-200"
                        >
                            Editar
                        </button>
                        <button
                        onClick={() => onDelete(info.row.original.id)}
                        className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
                        >
                            Eliminar
                        </button>
                    </div>
                ) : null,
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
                                No hay categorías cargadas
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