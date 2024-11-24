const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export async function getUserProfile(): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/profile`)
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
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

