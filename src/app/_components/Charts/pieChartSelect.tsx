"use client";

import * as React from "react";
import { supabase } from "@/lib/supabaseClient";
import { Pie, PieChart, Sector, Cell, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Gera uma cor pastel para cada item
function getRandomColor(index: number) {
  const colors = [
    "#F87171", // vermelho
    "#60A5FA", // azul
    "#34D399", // verde
    "#FBBF24", // amarelo
    "#A78BFA", // roxo
    "#F472B6", // rosa
    "#38BDF8", // ciano
    "#F97316", // laranja
    "#4ADE80", // verde claro
    "#C084FC", // lilás
  ];
  return colors[index % colors.length];
}

// Pega apenas o primeiro e segundo nome
function getShortName(fullName: string) {
  const parts = fullName.trim().split(" ");
  return parts.slice(0, 2).join(" "); // Primeiro e segundo nome
}

export function ChartPieInteractive() {
  const id = "pie-interactive";
  const [data, setData] = React.useState<
    { transicionador: string; vendas: number; color: string }[]
  >([]);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("v_acad_vendas_professor") // Nome da view
        .select("transicionador, vendas");

      if (error) {
        console.error("Erro ao buscar dados:", error.message);
      } else if (data) {
        // Adiciona cores e encurta os nomes
        const mappedData = data.map((item, index) => ({
          transicionador: getShortName(item.transicionador),
          vendas: item.vendas,
          color: getRandomColor(index),
        }));
        setData(mappedData);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      data-chart={id}
      className="w-full flex flex-col h-[20rem] bg-background_octonary"
    >
      <ChartStyle id={id} config={{}} />

      <CardHeader className="pb-0">
        <CardTitle>Resumo de Vendas</CardTitle>
        <CardDescription>
          Quantidade de vendas por transicionador
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center">
        <ChartContainer
          id={id}
          config={{}}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="vendas"
              nameKey="transicionador"
              innerRadius={60}
              strokeWidth={5}
              activeShape={(props: any) => {
                const isHovered = props.index === hoveredIndex;
                return (
                  <g>
                    <Sector
                      {...props}
                      outerRadius={isHovered ? props.outerRadius + 10 : props.outerRadius}
                      fill={props.payload.color}
                    />
                  </g>
                );
              }}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={() => (
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      fontSize="24"
                      fontWeight="bold"
                      fill="#F0F0F0"
                    >
                      {data.reduce((acc, curr) => acc + curr.vendas, 0)}
                    </tspan>

                    <tspan
                      x="50%"
                      dy="1.5em"
                      fontSize="12"
                      fill="#C0C0C0"
                    >
                      Total de Vendas
                    </tspan>
                  </text>
                )}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}