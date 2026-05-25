import apiClient from "./axiosInstance";

export interface Usuario {
    id: number
    email: string
    nombre: string
    rol: string
    deleted_at: string | null
}

export interface UsuarioUpdate {
    nombre?: string
    email?: string
    rol?: string
}

const ADMIN = '/admin'

export async function getUsuarios(): Promise<Usuario[]> {
    const response = await apiClient.get<Usuario[]>(`${ADMIN}/usuarios`)
    return response.data
}

export async function updateUsuario(id: number, data: UsuarioUpdate): Promise<Usuario> {
    const response = await apiClient.put<Usuario>(`${ADMIN}/usuarios/${id}`, data)
    return response.data
}

export async function deleteUsuario(id: number): Promise<void> {
    await apiClient.delete(`${ADMIN}/usuarios/${id}`)
}