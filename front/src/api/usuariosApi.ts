import apiClient from "./axiosInstance";

export interface Usuario {
    id: number
    email: string
    full_name: string
    is_active: boolean
    roles: string[]
}

export interface UsuarioUpdate {
    full_name?: string
    is_active?: boolean
    roles?: string[]
}

const USUARIOS = '/admin/usuarios'

export async function getUsuarios(): Promise<Usuario[]> {
    const response = await apiClient.get<Usuario[]>(USUARIOS)
    return response.data
}

export async function updateUsuario(id: number, data: UsuarioUpdate): Promise<Usuario> {
    const response = await apiClient.patch<Usuario>(`${USUARIOS}/${id}`, data)
    return response.data
}

export async function desactivarUsuario(id: number): Promise<Usuario> {
    const response = await apiClient.post<Usuario>(`${USUARIOS}/${id}/desactivar`)
    return response.data
}

export async function activarUsuario(id: number): Promise<Usuario> {
    const response = await apiClient.post<Usuario>(`${USUARIOS}/${id}/activar`)
    return response.data
}