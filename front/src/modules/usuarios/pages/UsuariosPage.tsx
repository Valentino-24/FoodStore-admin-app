import { useUsuarios, useActivarUsuario, useDesactivarUsuario } from "../hooks/useUsuarios";
import { UsuariosTable } from "../components/UsuariosTable";

export function UsuariosPage() {
    const { data: usuarios = [], isLoading, isError } = useUsuarios()
    const activarUsuario = useActivarUsuario()
    const desactivarUsuario = useDesactivarUsuario()

    const handleActivar = async (id: number) => {
        await activarUsuario.mutateAsync(id)
    }

    const handleDesactivar = async (id: number) => {
        if (!confirm('¿Estás seguro de que querés desactivar este usuario?')) return
        await desactivarUsuario.mutateAsync(id)
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-zinc-500">Cargando usuarios...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-red-500">Error al cargar los usuarios</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Usuarios</h1>
                <p className="text-sm text-zinc-500">
                    Gestión de usuarios del sistema
                </p>
            </div>

            <UsuariosTable 
            data={usuarios}
            onActivar={handleActivar}
            onDesactivar={handleDesactivar}
            />
        </div>
    )
}