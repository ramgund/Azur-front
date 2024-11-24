'use client'

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { generateDocument } from "@/services/api"

const documentTypes = [
  { id: "purchase", label: "Gerar documento de compra e venda" },
  { id: "contract", label: "Gerar contrato" },
]

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  async function onGenerate() {
    if (!selectedType) return

    try {
      setIsLoading(true)
      const { url } = await generateDocument(selectedType)
      window.open(url, '_blank')
    } catch (error) {
      // Show error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger>
          <SelectValue placeholder="Escolha o tipo de documento" />
        </SelectTrigger>
        <SelectContent>
          {documentTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        onClick={onGenerate} 
        disabled={!selectedType || isLoading}
        className="w-full"
      >
        {isLoading ? "Gerando..." : "GERAR PDF"}
      </Button>
    </div>
  )
}

