export interface User {
  id: string
  name: string
  email: string
  cpf: string
  role: 'VENDEDOR' | 'SOCIO' | 'COMPRADOR'
  avatar?: string
}

export interface Company {
  cnpj: string
  name: string
}

export interface UserProfile {
  user: User
  company: Company
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

