'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/services/api"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")
    
    try {
      setIsLoading(true)
      await resetPassword(email)
      setMessage("Link de redefinição enviado para seu email")
    } catch (error) {
      setMessage("Erro ao enviar link de redefinição")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">REDEFINIÇÃO DE SENHA</h1>
        <p className="text-gray-600 mt-2">
          INFORME SEU EMAIL NO CAMPO ABAIXO PARA RECEBER
          O LINK DE REDEFINIÇÃO
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="INFORME SEU EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "ENVIANDO..." : "CONFIRMAR"}
        </Button>
        {message && (
          <p className={`text-center ${
            message.includes("Erro") ? "text-red-500" : "text-green-500"
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

