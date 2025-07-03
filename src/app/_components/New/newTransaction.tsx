"use client";

import * as React from "react";
import { supabase } from "@/lib/supabaseClient"; // ajuste o caminho para o seu cliente supabase
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";

export function NewTransactionDialog() {
  const [formData, setFormData] = React.useState({
    nome: "",
    pagamento: "",
    tipo: "",
    qtd: "",
    preco: "",
    data: new Date(), // começa com data atual
    transicionador: "",
  });
  const [loading, setLoading] = React.useState(false);

  // Atualiza campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia para o Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validação simples
    if (
      !formData.nome ||
      !formData.pagamento ||
      !formData.tipo ||
      !formData.qtd ||
      !formData.preco ||
      !formData.transicionador ||
      !formData.data
    ) {
      alert("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("tb_acad_transactions").insert([
        {
          nome: formData.nome,
          pagamento: formData.pagamento, // 🟢 corrigido aqui
          tipo: formData.tipo,
          qtd: parseInt(formData.qtd),
          preco: parseFloat(formData.preco),
          data: formData.data.toISOString(),
          transicionador: formData.transicionador,
          user_ref: null, // 👉 pode trocar para o ID do usuário logado
        },
      ]);

      if (error) {
        console.error("Erro ao cadastrar:", error.message);
        alert("Erro ao cadastrar: " + error.message);
      } else {
        alert("Transação cadastrada com sucesso ✅");

        // limpa o formulário
        setFormData({
          nome: "",
          pagamento: "",
          tipo: "",
          qtd: "",
          preco: "",
          data: new Date(),
          transicionador: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nova Transação</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-background_secondary">
        <DialogHeader>
          <DialogTitle>Crie uma Transação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              placeholder="Nome do que foi vendido"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <Select
              value={formData.pagamento}
              onValueChange={(value) =>
                setFormData({ ...formData, pagamento: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Forma de Pagamento" />
              </SelectTrigger>
              <SelectContent className="bg-background_secondary">
                <SelectGroup>
                  <SelectLabel>Forma de Pagamento</SelectLabel>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="debito">Débito</SelectItem>
                  <SelectItem value="credito">Crédito</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={formData.tipo}
              onValueChange={(value) =>
                setFormData({ ...formData, tipo: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo da Transação" />
              </SelectTrigger>
              <SelectContent className="bg-background_secondary">
                <SelectGroup>
                  <SelectLabel>Tipo da Transação</SelectLabel>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="qtd">Quantidade</Label>
              <Input
                id="qtd"
                name="qtd"
                type="number"
                placeholder="Qtd vendida"
                value={formData.qtd}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                placeholder="Preço unitário"
                value={formData.preco}
                onChange={handleChange}
              />
            </div>
          </div>

          <DatePicker
            label="Data da Transação"
            date={formData.data}
            setDate={(newDate) => setFormData({ ...formData, data: newDate })}
          />

          <div className="grid gap-1.5">
            <Label htmlFor="transicionador">Nome do Profissional</Label>
            <Input
              id="transicionador"
              name="transicionador"
              placeholder="Profissional"
              value={formData.transicionador}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
