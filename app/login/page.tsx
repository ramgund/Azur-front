"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticateUser } from "@/services/api";
import { Logo } from "@/components/ui/logo";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await authenticateUser(data);

      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        router.push("/profile");
      } else {
        setErrorMessage("Email ou senha inválidos");
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex justify-center">
            <Logo className="h-10 w-10 text-blue-600" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-600">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                disabled={isLoading}
                className="border-gray-300 focus:ring-blue-600"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-600">
                SENHA
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                disabled={isLoading}
                className="border-gray-300 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                lembre-me
              </label>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                {isLoading ? "Entrando..." : "ENTRAR"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 rounded-md"
                asChild
              >
                <Link href="/signup">CADASTRE-SE</Link>
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/reset-password"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                esqueceu a senha?
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Logo with Gradient */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <Logo className="h-16 w-16 text-white" />
        <h1 className="mt-4 text-4xl font-bold">AZUR</h1>
      </div>
    </div>
  );
}
