"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

type FaseKanban =
    | "NOVO_PROCESSO"
    | "DOCUMENTACAO"
    | "APROVACAO_GESTOR"
    | "PRONTO_PETICAO"
    | "PENDENCIA"
    | "PROCESSO_FINALIZADO"

interface ProcessoCard {
    id: string
    cliente: string
    tipo: string
    fase: FaseKanban
    diasNaFase: number
    urgencia?: boolean
    detalhes?: string
}

const KANBAN_COLUMNS: { id: FaseKanban; title: string; highlight?: boolean; success?: boolean }[] = [
    { id: "NOVO_PROCESSO", title: "Novo Processo" },
    { id: "DOCUMENTACAO", title: "Documentação" },
    { id: "APROVACAO_GESTOR", title: "Aprovação Gestor" },
    { id: "PRONTO_PETICAO", title: "Pronto para Petição", highlight: true },
    { id: "PENDENCIA", title: "Pendência" },
    { id: "PROCESSO_FINALIZADO", title: "Processo Finalizado", success: true },
]

const INITIAL_MOCK_CARDS: ProcessoCard[] = [
    { id: "PROC-2024-001", cliente: "Maria Silva", tipo: "Aposentadoria", fase: "NOVO_PROCESSO", diasNaFase: 1 },
    { id: "PROC-2024-890", cliente: "Carlos Oliveira", tipo: "LOAS", fase: "NOVO_PROCESSO", diasNaFase: 2 },
    { id: "PROC-2024-112", cliente: "Ana Costa", tipo: "Pensão", fase: "DOCUMENTACAO", diasNaFase: 3, detalhes: "Aguardando: Certidão de Nascimento, Carteira de Trabalho" },
    { id: "PROC-2024-221", cliente: "João Pedroso", tipo: "Auxílio Doença", fase: "DOCUMENTACAO", diasNaFase: 5 },
    { id: "PROC-2024-567", cliente: "Lucia Lima", tipo: "Aposentadoria", fase: "APROVACAO_GESTOR", diasNaFase: 1 },
    { id: "PROC-2024-901", cliente: "Roberto Santos", tipo: "Especial", fase: "APROVACAO_GESTOR", diasNaFase: 2, urgencia: true },
    { id: "PROC-2024-334", cliente: "Fernanda Rocha", tipo: "BPC/LOAS", fase: "PRONTO_PETICAO", diasNaFase: 1 },
    { id: "PROC-2024-445", cliente: "Paulo Mendes", tipo: "Revisional", fase: "PENDENCIA", diasNaFase: 7, detalhes: "Aguardando resposta INSS" },
    { id: "PROC-2023-998", cliente: "Patricia Gomes", tipo: "Revisional", fase: "PROCESSO_FINALIZADO", diasNaFase: 0 },
    { id: "PROC-2023-776", cliente: "Ricardo Alves", tipo: "Aposentadoria", fase: "PROCESSO_FINALIZADO", diasNaFase: 0 },
]

export default function KanbanBoardPage() {
    const [isMounted, setIsMounted] = useState(false)
    const [cards, setCards] = useState<ProcessoCard[]>(INITIAL_MOCK_CARDS)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        setCards((prev) =>
            prev.map((c) =>
                c.id === draggableId ? { ...c, fase: destination.droppableId as FaseKanban } : c
            )
        )
    }

    if (!isMounted) return null

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full w-full px-12 py-10 overflow-hidden bg-[#0A0A0A]">
                <div className="mb-8 shrink-0 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Kanban</h1>
                        <p className="text-[#A3A3A3] mt-1 font-medium tracking-wide flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Sessão Ativa • <span className="text-white font-bold">{cards.length} Processos</span> em andamento
                        </p>
                    </div>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex-1 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
                        <div className="flex gap-4 h-full min-w-max">
                            {KANBAN_COLUMNS.map((coluna) => {
                                const cardsDaColuna = cards.filter((c) => c.fase === coluna.id)

                                return (
                                    <div
                                        key={coluna.id}
                                        className={`flex flex-col w-80 shrink-0 rounded-xl border shadow-2xl ${
                                            coluna.success
                                                ? 'border-green-500/30 bg-[#171717]'
                                                : coluna.highlight
                                                    ? 'border-[#FACC15]/20 ring-1 ring-[#FACC15]/5 bg-[#171717]'
                                                    : 'border-[#333333] bg-[#171717]'
                                        }`}
                                    >
                                        <div className="p-4 border-b border-[#333333] flex items-center justify-between bg-[#1F1F1F]/50 rounded-t-xl">
                                            <h3 className={`font-black text-[11px] uppercase tracking-[0.2em] ${
                                                coluna.success ? 'text-green-400' : coluna.highlight ? 'text-[#FACC15]' : 'text-white'
                                            }`}>
                                                {coluna.title}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                                coluna.success
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : coluna.highlight
                                                        ? 'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20'
                                                        : 'bg-[#0A0A0A] text-[#FACC15] border-[#333333]'
                                            }`}>
                                                {cardsDaColuna.length}
                                            </span>
                                        </div>

                                        <Droppable droppableId={coluna.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={`flex-1 p-4 overflow-y-auto flex flex-col gap-4 transition-all ${snapshot.isDraggingOver ? 'bg-[#FACC15]/5' : ''}`}
                                                >
                                                    {cardsDaColuna.map((card, index) => (
                                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-[#1F1F1F] p-5 rounded-lg border ${card.urgencia ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-[#333333]'
                                                                        } hover:border-[#FACC15]/40 transition-all group ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-[#FACC15] z-50 scale-105' : ''
                                                                        }`}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                    }}
                                                                >
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <span className="text-[10px] font-black text-[#A3A3A3] tracking-widest group-hover:text-[#FACC15] transition-colors">
                                                                            {card.id}
                                                                        </span>
                                                                        {card.urgencia && (
                                                                            <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                                                                        )}
                                                                    </div>
                                                                    <h4 className="font-bold text-white text-base mb-1 tracking-tight">{card.cliente}</h4>
                                                                    <p className="text-xs text-[#A3A3A3] mb-4 font-medium uppercase tracking-tighter">{card.tipo}</p>

                                                                    {card.detalhes && (
                                                                        <div className="mb-4 p-2 bg-[#0A0A0A] rounded border border-[#333333] text-[10px] text-[#A3A3A3] leading-relaxed">
                                                                            <span className="font-bold text-[#FACC15] mr-1">INFO:</span> {card.detalhes}
                                                                        </div>
                                                                    )}

                                                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#333333]/50">
                                                                        <div className="flex items-center gap-1">
                                                                            <span className="material-symbols-outlined text-[14px] text-[#A3A3A3]">schedule</span>
                                                                            <span className="text-[10px] font-bold text-[#A3A3A3]">
                                                                                {card.diasNaFase}D
                                                                            </span>
                                                                        </div>
                                                                        <button className="h-6 w-6 rounded flex items-center justify-center bg-[#262626] hover:bg-[#FACC15] hover:text-black mt-1 transition-colors">
                                                                            <span className="material-symbols-outlined text-[16px]">more_vert</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </DashboardLayout>
    )
}
