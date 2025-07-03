import "@/app/globals.css";
import Summary from "./Summary";
import { Charts } from "./Charts";
import { NewTransactionDialog } from "./New/newTransaction";


export default function Content() {
  return (
    <div className="w-[98%] h-[calc(100%-6rem)] p-5 rounded-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex-col">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-text">Welcome to the dashboard</p>
        </div>

        <NewTransactionDialog />
      </div>

      <Summary />

      <Charts />
    </div>
  );
}

