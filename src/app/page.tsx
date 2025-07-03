'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Home: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function updateLastAccess(userId: string) {
    try {
      const { error } = await supabase
        .from("tb_acad_aluno")
        .update({ last_access_at: new Date() })
        .eq("user_id", userId);

      if (error) {
        console.error("Erro ao atualizar último acesso:", error);
      }
    } catch (err) {
      console.error("Erro inesperado ao atualizar último acesso:", err);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa o erro antes de tentar autenticar

    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError("Credenciais inválidas. Tente novamente.");
        return;
      }

      if (session?.user?.id) {
        await updateLastAccess(session.user.id); // Atualiza o último acesso
        router.push("/dashboard"); // Redireciona após login bem-sucedido
      }
    } catch (err) {
      console.error("Erro inesperado durante o login:", err);
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background_primary">
      {/* Seção Mobile */}
      <div
        className="h-96 w-full md:w-[30%] md:min-w-[320px] 
        md:max-w-[400px] flex items-center justify-center flex-col bg-background_quinary md:block rounded-md"
      >
        
        <h1 className="text-2xl font-bold text-center mt-8">Entre na sua Conta</h1>

        <form className="w-[100%] flex items-center justify-center" onSubmit={handleLogin}>
          <div className="p-5 w-full input-wrapper flex flex-col">
            <div className="gap-2 flex flex-col justify-center">
              <label className="text-sm font-semibold">E-mail</label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
                required
              />
            </div>

            <div className="gap-2 flex flex-col justify-center">
              <label className="text-sm mt-3 font-semibold">Senha</label>

              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full input-class bg-background_nonary h-9 rounded-sm outline-none border-none px-2"
                required
              />
            </div>
            <span className="text-end mt-2 text-xs text-purple-700 cursor-pointer hover:underline hover:text-sm duration-300 font-semibold">
              <Link href="/recuperar-senha">
                Esqueci minha senha?
              </Link>
            </span>
          </div>
        </form>

        {error && (
          <div className="text-center text-red-500 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="button-wrapper w-[100%] gap-5 flex items-center p-5">
          <Link href="/dashboard" className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded-md tracking-wide font-semibold"
            >
              Entrar
            </button>
          </Link>

          <Link href="/register" className="w-full gap-5 flex items-center justify-center">
            <button className="w-full bg-gray-300 font-semibold tracking-wide text-gray-900 p-2 rounded-md">
              Cadastre-se
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;