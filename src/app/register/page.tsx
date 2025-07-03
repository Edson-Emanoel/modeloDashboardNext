"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Cria o usuário no Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError("Erro ao registrar: " + signUpError.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Verifica se o usuário precisa confirmar o e-mail
      if (!data.user) {
        console.log("Usuário precisa confirmar o e-mail.");
        alert("Verifique seu e-mail para confirmar o cadastro.");
        setLoading(false);
        return;
      }

      // 3️⃣ Salva dados adicionais na tabela tb_acad_aluno
      const { error: profileError } = await supabase
        .from("tb_acad_aluno")
        .insert({
          user_ref: data.user.id,
          nome: name,
          email: email,
        });

      if (profileError) {
        setError("Erro ao salvar perfil: " + profileError.message);
        setLoading(false);
        return;
      }

      // 4️⃣ Redireciona para o dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Algo deu errado: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div
        className="h-screen flex items-center justify-center flex-col w-full md:w-[30%] md:min-w-[320px] 
        md:max-w-[400px] bg-background_secondary md:block text-gray-800"
      >
        <div className="w-[100%] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Seja bem vindo</h1>
        </div>

        <form className="w-[100%]" onSubmit={handleRegister}>
          <div className="input-wrapper flex flex-col p-5">
            <label className="text-sm">Nome completo</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-class bg-background_senary"
              required
            />

            <label className="text-sm mt-3">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-class bg-background_senary"
              required
            />

            <label className="text-sm mt-3">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-class bg-background_senary"
              required
            />

            <label className="text-sm mt-3">Confirmar a Senha</label>
            <input
              type="password"
              name="confirmar-senha"
              id="confirmarSenha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-class bg-background_senary"
              required
            />
          </div>

          <div className="button-wrapper w-[100%] flex flex-col items-center p-5">
            <button
              type="submit"
              className="w-[100%] mb-7 bg-primary text-white p-2 rounded-md tracking-wide font-semibold"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-center text-red-500 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="button-wrapper w-[100%] flex flex-col items-center p-5">
          <div className="box-ou">
            <span className="h-1 bg-primary flex-1"></span>
            <span>Ou</span>
            <span className="h-1 bg-primary flex-1"></span>
          </div>
          <Link href="/" className="w-full">
            <button className="w-[100%] mt-7 bg-gray-300 font-semibold tracking-wide text-gray-900 p-2 rounded-md">
              Voltar para login?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;