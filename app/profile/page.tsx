"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout";
import { getUserProfile, updateUserProfile } from "@/services/api";
import type { UserProfile } from "@/types/user";
import * as z from "zod";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(11, "CPF inválido"),
    role: z.enum(["VENDEDOR", "SOCIO", "COMPRADOR"]),
    avatar: z.string().optional(),
  }),
  company: z.object({
    cnpj: z.string().min(14, "CNPJ inválido"),
    name: z.string().min(1, "Nome da empresa é obrigatório"),
  }),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),
    zipCode: z.string().min(8, "CEP inválido"),
  }),
});

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("authToken"); // Substitua pela lógica correta para obter o token
  
      if (!token) {
        console.error("Token de autenticação não encontrado.");
        router.push("/login"); // Redireciona para o login se o token não existir
        return;
      }
  
      try {
        const data = await getUserProfile(token);
        setProfile(data);
        reset(data); // Popula os campos com os dados existentes
      } catch (error) {
        console.error("Falha ao carregar o perfil", error);
      }
    }
    loadProfile();
  }, [reset, router]);

  async function onSubmit(data: UserProfile) {
    try {
      setIsLoading(true);
      await updateUserProfile(data);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!profile) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return <div>Por favor, faça login para acessar o perfil.</div>;
    }
    return <div>Loading...</div>;
  }

  return (
    <Layout user={profile.user}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Dados do Usuário */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("user.name")} />
            {errors.user?.name && (
              <p className="text-sm text-red-500">{errors.user.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("user.email")} />
            {errors.user?.email && (
              <p className="text-sm text-red-500">{errors.user.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" {...register("user.cpf")} />
            {errors.user?.cpf && (
              <p className="text-sm text-red-500">{errors.user.cpf.message}</p>
            )}
          </div>
        </div>

        {/* Endereço */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input id="street" {...register("address.street")} />
            {errors.address?.street && (
              <p className="text-sm text-red-500">
                {errors.address.street.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>
            <Input id="number" {...register("address.number")} />
            {errors.address?.number && (
              <p className="text-sm text-red-500">
                {errors.address.number.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Layout>
  );
}
