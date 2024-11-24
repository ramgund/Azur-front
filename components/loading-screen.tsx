import { Logo } from "./ui/logo"

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="text-white">
        <Logo />
      </div>
    </div>
  )
}

