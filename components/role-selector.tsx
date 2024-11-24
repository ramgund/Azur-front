import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"
import Link from "next/link"

interface RoleSelectorProps {
  currentRole: User['role']
}

export function RoleSelector({ currentRole }: RoleSelectorProps) {
  return (
    <div className="flex gap-2">
      <Link href="/vendedor">
        <Button variant={currentRole === 'VENDEDOR' ? 'default' : 'outline'}>
          VENDEDOR
        </Button>
      </Link>
      <Link href="/socio">
        <Button variant={currentRole === 'SOCIO' ? 'default' : 'outline'}>
          SÓCIO
        </Button>
      </Link>
      <Link href="/comprador">
        <Button variant={currentRole === 'COMPRADOR' ? 'default' : 'outline'}>
          COMPRADOR
        </Button>
      </Link>
    </div>
  )
}

