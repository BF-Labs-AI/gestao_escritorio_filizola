import DashboardLayout from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"

// Tipos baseados no PRD
type FaseKanban =
    | "NOVO_PROCESSO"
    | "DOCUMENTACAO"
    | "DOCUMENTACAO_APROVADA"
    | "PRONTO_PETICAO"
    | "EM_ANDAMENTO"
    | "EXIGENCIA"
    | "FINALIZADO"

interface ProcessoCard {
    id: string
    cliente: string
    tipo: string
    fase: FaseKanban
    diasNaFase: number
    urgencia?: boolean
}

// Colunas oficiais do PRD
const KANBAN_COLUMNS: { id: FaseKanban; title: string; color: string }[] = [
    { id: "NOVO_PROCESSO", title: "Novo Processo", color: "bg-slate-100 border-slate-200" },
    { id: "DOCUMENTACAO", title: "Documentação", color: "bg-amber-50 border-amber-200" },
    { id: "DOCUMENTACAO_APROVADA", title: "Doc. Aprovada", color: "bg-blue-50 border-blue-200" },
    { id: "PRONTO_PETICAO", title: "Pronto p/ Petição", color: "bg-emerald-50 border-emerald-200" },
    { id: "EM_ANDAMENTO", title: "Em Andamento", color: "bg-slate-50 border-slate-200" },
    { id: "EXIGENCIA", title: "Exigência / Pendência", color: "bg-red-50 border-red-200" },
    { id: "FINALIZADO", title: "Finalizado", color: "bg-slate-100 border-slate-200 opacity-70" },
]

// Dados Mockados para o Board
const MOCK_CARDS: ProcessoCard[] = [
    { id: "PRC-8921", cliente: "Maria Silva", tipo: "BPC Idoso", fase: "PRONTO_PETICAO", diasNaFase: 1 },
    { id: "PRC-8920", cliente: "João Batista", tipo: "Auxílio-Doença", fase: "EXIGENCIA", diasNaFase: 4, urgencia: true },
    { id: "PRC-8919", cliente: "Ana Lúcia", tipo: "BPC Deficiente", fase: "DOCUMENTACAO", diasNaFase: 2 },
    { id: "PRC-8918", cliente: "Carlos Souza", tipo: "BPC Deficiente", fase: "NOVO_PROCESSO", diasNaFase: 0 },
    { id: "PRC-8917", cliente: "Tereza Campos", tipo: "Maternidade", fase: "DOCUMENTACAO_APROVADA", diasNaFase: 1 },
    { id: "PRC-8916", cliente: "Rui Barbosa", tipo: "Invalidez", fase: "EM_ANDAMENTO", diasNaFase: 15 },
]

export default function KanbanBoardPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col h-full w-full">
                <div className="mb-6 shrink-0">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quadro de Processos</h1>
                    <p className="text-slate-500 mt-1">Gestão de esteira e fluxo de trabalho automotizado.</p>
                </div>

                {/* Board Horizontal Scroll */}
                <div className="flex-1 overflow-x-auto pb-4">
                    <div className="flex gap-4 h-full min-w-max">
                        {KANBAN_COLUMNS.map((coluna) => {
                            const cardsDaColuna = MOCK_CARDS.filter((c) => c.fase === coluna.id)

                            return (
                                <div key={coluna.id} className={`flex flex-col w-80 shrink-0 rounded-lg border ${coluna.color}`}>
                                    {/* Header da Coluna */}
                                    <div className="p-3 border-b border-inherit flex items-center justify-between bg-white/50 rounded-t-lg">
                                        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">{coluna.title}</h3>
                                        <Badge variant="secondary" className="bg-white shadow-sm font-mono text-xs text-slate-600">
                                            {cardsDaColuna.length}
                                        </Badge>
                                    </div>

                                    {/* Área de Cards */}
                                    <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
                                        {cardsDaColuna.map((card) => (
                                            <div
                                                key={card.id}
                                                className={`bg-white p-3 rounded-md shadow-sm border ${card.urgencia ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-mono text-slate-400 group-hover:text-blue-500 transition-colors">{card.id}</span>
                                                    {card.urgencia && (
                                                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                                    )}
                                                </div>
                                                <h4 className="font-medium text-slate-900 text-sm mb-1">{card.cliente}</h4>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-sm">
                                                        {card.tipo}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                        {card.diasNaFase} {card.diasNaFase === 1 ? 'dia' : 'dias'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {cardsDaColuna.length === 0 && (
                                            <div className="h-24 border-2 border-dashed border-slate-300/50 rounded-md flex items-center justify-center text-slate-400 text-xs font-medium">
                                                Solte cards aqui
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
