'use client'

import "@/app/globals.css";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, Search, LayoutDashboard, Box, ShoppingBag, MessageSquareText, ChartLine, Settings, Bell, CircleUserRound, LogOut } from "lucide-react"

export default function Aside() {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Erro ao sair:", error.message);
        return;
      }

      // Redireciona para página de login após logout
      router.push("/");
    } catch (err) {
      console.error("Erro inesperado ao sair:", err);
    }
  };

  return (
    <div className="max-w-72 h-screen bg-background_quinary p-3">
      <div className="mb-5 gap-3 flex flex-col items-center">
        <div className="gap-2 flex items-center">
          <div className="p-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-orange-400">
            <UtensilsCrossed />
          </div>

          <h1 className="text-lg font-bold">Mealz</h1>
        </div>

        <div className="p-2 gap-5 flex items-center bg-background_denary rounded-xl">
          <Search className="w-4 h-4 text-text" />

          <input type="text" className="bg-background_denary text-text outline-none border-none" placeholder="Search" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1>Menu Principal</h1>

        <ul className="flex flex-col gap-1.5">
          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <LayoutDashboard />
            <span>Dashboard</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <Box />
            <span>Produtos</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <ShoppingBag />
            <span>Carrinho</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <MessageSquareText />
            <span>Reviews</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <ChartLine />
            <span>Relatórios</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <Box />
            <span>Clientes</span>
          </li>


          <h3 className="mt-5">Configs.</h3>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <Settings />
            <span>Configurações</span>
          </li>

          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <Bell />
            <span>Notificações</span>
          </li>

        </ul>

        <ul className="flex flex-col gap-10">
          <li className="w-full p-2 gap-2 flex hover:bg-li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <CircleUserRound />
            <span>Suporte</span>
          </li>

          <li onClick={handleLogout} className="w-full p-2 gap-2 flex hover:bg-logout_li_active_background hover:text-li_active_text hover:text-lg transition-all duration-500 cursor-pointer rounded-md">
            <LogOut />
            <span>Sair</span>
          </li>
        </ul>
      </div>
    </div>
  );
}