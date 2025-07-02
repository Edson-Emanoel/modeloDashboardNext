import "@/app/globals.css";
import Summary from "./Summary";
import { Charts } from "./Charts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Content() {
  return (
    <div className="w-[98%] h-[calc(100%-6rem)] bg-background_ninary p-5 rounded-md">
      <div className="flex mb-5">
        <div className="flex-col">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-text">Welcome to the dashboard</p>
        </div>
      </div>

      <Summary />

      <Charts />
    </div>
  );
}

