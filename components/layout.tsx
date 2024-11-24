import { Logo } from "./ui/logo"
import { UserNav } from "./user-nav"
import { RoleSelector } from "./role-selector"
import type { User } from "@/types/user"

interface LayoutProps {
  user: User
  children: React.ReactNode
}

export function Layout({ user, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <UserNav user={user} />
        </div>
      </header>
      {/* <main className="container mx-auto p-6">
        <div className="mb-6">
          <RoleSelector currentRole={user.email} />
        </div>
        {children}
      </main> */}
    </div>
  )
}

