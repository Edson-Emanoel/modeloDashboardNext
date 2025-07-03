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
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="h-[500px] w-full md:w-[30%] md:min-w-[320px] 
        md:max-w-[400px] flex items-center justify-center flex-col bg-background_quinary md:block rounded-md"
      >
        <div className="w-[100%] mt-5 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Seja bem vindo</h1>
        </div>

        <form className="w-[100%]" onSubmit={handleRegister}>
          <div className="input-wrapper gap-2 flex flex-col p-5">
            <label className="text-sm">Nome completo</label>

            <input
              type="text"
              name="nome"
              id="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
              required
            />

            <label className="text-sm mt-3">Email</label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
              required
            />

            <label className="text-sm mt-3">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
              required
            />

            <label className="text-sm mt-3">Confirmar a Senha</label>
            <input
              type="password"
              name="confirmar-senha"
              id="confirmarSenha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
              required
            />
          </div>
        </form>

        {error && (
          <div className="text-center text-red-500 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="button-wrapper w-[100%] gap-5 flex items-center p-5">
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md tracking-wide font-semibold"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <Link href="/" className="w-full">
            <button className="w-[100%] bg-gray-300 font-semibold tracking-wide text-gray-900 p-2 rounded-md">
              Voltar para login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;