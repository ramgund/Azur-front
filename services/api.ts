import { Company, UserProfile } from "@/types/user"
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006",
});

export async function getUserProfile(token: string): Promise<UserProfile> {
  try {
    const response = await api.get<UserProfile>("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o perfil do usuário:", error);
    throw new Error("Failed to fetch profile");
  }
}


interface LoginData {
  email: string;
  password: string;
}

export async function authenticateUser(data: { email: string; password: string }) {
  const response = await api.post("/user/login", data);
  return response.data;
}



export async function updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update profile')
  return res.json()
}

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${API_URL}/companies`)
  if (!res.ok) throw new Error('Failed to fetch companies')
  return res.json()
}

export async function generateDocument(type: string): Promise<{ url: string }> {
  const res = await fetch(`${API_URL}/documents/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type }),
  })
  if (!res.ok) throw new Error('Failed to generate document')
  return res.json()
}

export async function resetPassword(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error('Failed to reset password')
}

