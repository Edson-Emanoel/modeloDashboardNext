import "@/app/globals.css";
import { Search, SunDim, Moon, Bell, Languages } from "lucide-react";

export default function Header() {
  return (
    <header className="w-[98%] h-16 gap-2 flex items-center">
      <div className="w-full p-2 gap-5 flex items-center bg-background_denary rounded-md">
        <input type="text" className="w-full bg-background_denary text-text outline-none border-none" placeholder="Search" />

        <Search className="w-4 h-4 text-text" />
      </div>

      <div className="gap-1.5 flex items-center">
        <button className="p-2 bg-background_denary rounded-md !important">
          <SunDim />
        </button>

        <button className="p-2 bg-background_denary rounded-md !important">
          <Languages  />
        </button>

        <button className="p-2 bg-background_denary rounded-md !important">
          <div className="absolute top-5 right-[180px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            <span>1</span>
          </div>
          <Bell />
        </button>
      </div>

      <div className="p-.5 min-w-60 gap-5 flex items-center justify-center bg-background_denary rounded-md !important">
        <div className="flex flex-col">
          <span className="text-sm">Seja bem-vindo, <b>Mr Muel</b></span>
          <p className="text-sm font-semibold">Admin</p>
        </div>

        <img src="https://i.pinimg.com/736x/70/08/7d/70087d7ed0cb94dde4d35edc6829ccdc.jpg" alt="Profile" className="w-7 h-7 rounded-full" />
      </div>
    </header>
  );
}