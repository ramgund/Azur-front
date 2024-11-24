"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContainer } from "@/components/ui/auth-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "test@example.com" && password === "password") {
        router.push("/profile");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContainer>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">EMAIL</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="azur@gmail.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">SENHA</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "ENTRANDO..." : "ENTRAR"}
        </Button>
      </form>
      <div className="text-center mt-4">
        <Link
          href="/signup"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          CADASTRE-SE
        </Link>
      </div>
      <div className="text-center mt-2">
        <Link
          href="/reset-password"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Esqueceu a senha?
        </Link>
      </div>
    </AuthContainer>
  );
}
