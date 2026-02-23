import DashboardLayout from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { Search, Filter, Plus, Eye, Edit, FileText, Clock } from "lucide-react"

// Dados Mockados de Processos
const processos = [
    {
        id: "PROC-2024-001",
        cliente: "Maria Silva",
        cpf: "123.456.789-00",
        tipo: "Aposentadoria por Idade",
        fase: "Novo Processo",
        dataAbertura: "2024-01-15",
        status: "em_andamento",
        diasNaFase: 1,
        urgente: false,
    },
    {
        id: "PROC-2024-890",
        cliente: "Carlos Oliveira",
        cpf: "987.654.321-00",
        tipo: "LOAS - BPC",
        fase: "Novo Processo",
        dataAbertura: "2024-01-14",
        status: "em_andamento",
        diasNaFase: 2,
        urgente: false,
    },
    {
        id: "PROC-2024-112",
        cliente: "Ana Costa",
        cpf: "456.789.123-00",
        tipo: "Pensão por Morte",
        fase: "Documentação",
        dataAbertura: "2024-01-10",
        status: "documentacao",
        diasNaFase: 3,
        urgente: false,
    },
    {
        id: "PROC-2024-221",
        cliente: "João Pedroso",
        cpf: "654.321.987-00",
        tipo: "Auxílio-Doença",
        fase: "Documentação",
        dataAbertura: "2024-01-08",
        status: "documentacao",
        diasNaFase: 5,
        urgente: false,
    },
    {
        id: "PROC-2024-567",
        cliente: "Lucia Lima",
        cpf: "111.222.333-44",
        tipo: "Aposentadoria",
        fase: "Aprovação Gestor",
        dataAbertura: "2024-01-05",
        status: "aprovacao",
        diasNaFase: 1,
        urgente: false,
    },
    {
        id: "PROC-2024-901",
        cliente: "Roberto Santos",
        cpf: "789.123.456-00",
        tipo: "Aposentadoria Especial",
        fase: "Aprovação Gestor",
        dataAbertura: "2024-01-03",
        status: "aprovacao",
        diasNaFase: 2,
        urgente: true,
    },
    {
        id: "PROC-2024-334",
        cliente: "Fernanda Rocha",
        cpf: "222.333.444-55",
        tipo: "BPC/LOAS",
        fase: "Pronto para Petição",
        dataAbertura: "2023-12-20",
        status: "pronto_peticao",
        diasNaFase: 1,
        urgente: false,
    },
    {
        id: "PROC-2024-445",
        cliente: "Paulo Mendes",
        cpf: "333.444.555-66",
        tipo: "Revisional",
        fase: "Pendência",
        dataAbertura: "2023-12-15",
        status: "pendencia",
        diasNaFase: 7,
        urgente: false,
    },
    {
        id: "PROC-2023-998",
        cliente: "Patricia Gomes",
        cpf: "321.654.987-00",
        tipo: "Revisional",
        fase: "Processo Finalizado",
        dataAbertura: "2023-08-15",
        status: "finalizado",
        diasNaFase: 0,
        urgente: false,
    },
    {
        id: "PROC-2023-776",
        cliente: "Ricardo Alves",
        cpf: "444.555.666-77",
        tipo: "Aposentadoria",
        fase: "Processo Finalizado",
        dataAbertura: "2023-07-10",
        status: "finalizado",
        diasNaFase: 0,
        urgente: false,
    },
]

const faseColors: Record<string, string> = {
    "Novo Processo": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Documentação": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Aprovação Gestor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Pronto para Petição": "bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20",
    "Pendência": "bg-red-500/10 text-red-400 border-red-500/20",
    "Processo Finalizado": "bg-green-500/10 text-green-400 border-green-500/20",
}

const statusLabels: Record<string, string> = {
    em_andamento: "Em Andamento",
    documentacao: "Documentação",
    aprovacao: "Aprovação",
    pronto_peticao: "Pronto para Petição",
    pendencia: "Pendência",
    finalizado: "Finalizado",
}

export default function ProcessosPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 px-12 py-10 w-full max-w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Processos</h2>
                        <p className="text-[#A3A3A3] mt-1">Gerencie todos os processos do escritório.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 h-4 w-4 text-[#A3A3A3]" />
                            <input
                                type="search"
                                placeholder="Buscar processo..."
                                className="h-10 w-64 rounded-lg border border-[#333333] bg-[#1F1F1F] pl-10 pr-4 text-sm outline-none focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all text-white placeholder:text-[#A3A3A3]"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:border-[#FACC15]/50 transition-colors">
                            <Filter className="h-4 w-4" />
                            Filtros
                        </button>
                        <Link
                            href="/novo-processo"
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#FACC15] hover:bg-[#EAB308] transition-colors px-6 py-2.5 text-black font-bold text-sm shadow-[0_0_15px_rgba(250,204,21,0.15)]"
                        >
                            <Plus className="h-4 w-4" />
                            Novo Processo
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                <FileText className="text-[#FACC15] h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Total de Processos</p>
                                <p className="text-2xl font-bold text-white">{processos.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <FileText className="text-yellow-400 h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Em Documentação</p>
                                <p className="text-2xl font-bold text-white">{processos.filter(p => p.status === "documentacao").length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                <Clock className="text-[#FACC15] h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Pronto para Petição</p>
                                <p className="text-2xl font-bold text-white">{processos.filter(p => p.status === "pronto_peticao").length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <FileText className="text-green-400 h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Finalizados</p>
                                <p className="text-2xl font-bold text-white">{processos.filter(p => p.status === "finalizado").length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabela de Processos */}
                <div className="bg-[#171717] border border-[#333333] rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-[#333333]">
                        <thead>
                            <tr className="bg-[#1F1F1F]/50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Processo</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Fase</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Dias</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333333]">
                            {processos.map((processo) => (
                                <tr key={processo.id} className="hover:bg-[#1F1F1F]/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white font-mono">{processo.id}</span>
                                            {processo.urgente && (
                                                <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-[#FACC15] transition-colors">{processo.cliente}</p>
                                            <p className="text-xs text-[#A3A3A3] font-mono">{processo.cpf}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        {processo.tipo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded text-xs font-bold border ${faseColors[processo.fase]}`}>
                                            {processo.fase}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded text-xs font-bold border ${faseColors[processo.fase]}`}>
                                            {statusLabels[processo.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 text-[#A3A3A3]" />
                                            <span className={`text-sm font-bold ${processo.diasNaFase > 10 ? 'text-red-400' : 'text-white'}`}>
                                                {processo.diasNaFase}d
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/processo/${processo.id}`}
                                                className="p-2 rounded bg-[#262626] hover:bg-[#FACC15] hover:text-black transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                className="p-2 rounded bg-[#262626] hover:bg-[#FACC15] hover:text-black transition-colors"
                                                title="Editar"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-[#1F1F1F]/30 px-6 py-3 border-t border-[#333333]">
                        <p className="text-xs text-[#A3A3A3]">Mostrando {processos.length} processos</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
