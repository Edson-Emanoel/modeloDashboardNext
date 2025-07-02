import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Summary() {
  return (
    <div className="w-full flex gap-10">
      <Card className="flex-1 h-42 bg-background_octonary border-none">
        <CardHeader>
          <CardTitle>64</CardTitle>
          <CardDescription>Total de Pedidos no Mês</CardDescription>
          <CardDescription>8%(28 dias)</CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="flex-1 h-42 bg-background_octonary border-none">
        <CardHeader>
          <CardTitle>64</CardTitle>
          <CardDescription>Total de Pedidos no Mês</CardDescription>
          <CardDescription>8%(28 dias)</CardDescription>
        </CardHeader>
      </Card>

      <Card className="flex-1 h-42 bg-background_octonary border-none">
        <CardHeader>
          <CardTitle>64</CardTitle>
          <CardDescription>Total de Pedidos no Mês</CardDescription>
          <CardDescription>8%(28 dias)</CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="flex-1 h-42 bg-background_octonary border-none">
        <CardHeader>
          <CardTitle>64</CardTitle>
          <CardDescription>Total de Pedidos no Mês</CardDescription>
          <CardDescription>8%(28 dias)</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}