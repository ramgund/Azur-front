"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContainer } from "@/components/ui/auth-container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password && name) {
      router.push("/dashboard");
    } else {
      setError("Por favor preencha todos os campos");
      setIsLoading(false);
    }
  }

  return (
    <AuthContainer>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">CRIAR CONTA</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">NOME</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Ana Julia Uns"
            required
            disabled={isLoading}
          />
        </div>
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
          CONFIRMAR
        </Button>
      </form>
    </AuthContainer>
  );
}
