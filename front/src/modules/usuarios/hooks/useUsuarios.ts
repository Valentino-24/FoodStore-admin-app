import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    type UsuarioUpdate,
} from "@/api/usuariosApi";

const QUERY_KEY = ['usuarios']

export function useUsuarios(skip = 0, limit = 20) {
  return useQuery({
    queryKey: [...QUERY_KEY, { skip, limit }],
    queryFn: () => getUsuarios(skip, limit),
  })
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UsuarioUpdate }) =>
      updateUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}