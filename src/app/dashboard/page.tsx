import DashboardLayout from "@/components/layout/dashboard-layout"
import { TrendingUp, Clock, AlertTriangle, FileCheck2, Search, Filter, Download } from "lucide-react"

// Dados Mockados para o D&F Executive Dashboard
const indicators = [
    { title: "Processos Protocolados Hoje", value: "12", icon: FileCheck2, color: "text-[#FACC15]" },
    { title: "Tempo Médio até Protocolo", value: "4.5 dias", icon: Clock, color: "text-[#FACC15]" },
    { title: "Prazos Vencendo D-0", value: "3", icon: AlertTriangle, color: "text-[#EF4444]" },
]

const exigencias = [
    { client: "Maria Silva", cpf: "123.456.432-90", process: "54321/2023", benefit: "Aposentadoria", urgency: "critical" },
    { client: "João Souza", cpf: "987.654.121-00", process: "12345/2023", benefit: "Auxílio Doença", urgency: "high" },
    { client: "Ana Pereira", cpf: "456.789.882-15", process: "98765/2023", benefit: "Pensão", urgency: "medium" },
    { client: "Carlos Lima", cpf: "321.654.667-22", process: "67890/2023", benefit: "LOAS", urgency: "critical" },
]

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 px-12 py-10 w-full max-w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Visão Geral</h2>
                        <p className="text-[#A3A3A3] mt-1">Acompanhe os principais indicadores do escritório hoje.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:border-[#FACC15]/50 transition-colors">
                            <Filter className="h-4 w-4" />
                            Filtros
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:border-[#FACC15]/50 transition-colors">
                            <Download className="h-4 w-4" />
                            Exportar
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#FACC15] hover:bg-[#EAB308] transition-colors px-6 py-2.5 text-black font-bold text-sm shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                            <TrendingUp className="h-4 w-4" />
                            Relatório Geral
                        </button>
                    </div>
                </div>

                {/* KPI Section */}
                <div className="grid gap-6 md:grid-cols-3">
                    {indicators.map((kpi, i) => (
                        <div key={i} className="bg-[#171717] border border-[#333333] p-8 rounded-xl relative overflow-hidden group hover:border-[#FACC15]/30 transition-all">
                            <div className="flex flex-col gap-2">
                                <span className="text-[#A3A3A3] text-sm font-medium tracking-wide border-b border-[#333333] pb-2 w-fit">{kpi.title}</span>
                                <div className="text-4xl font-black text-white mt-1 group-hover:text-[#FACC15] transition-colors">{kpi.value}</div>
                            </div>
                            <kpi.icon className={`absolute top-8 right-8 h-8 w-8 ${kpi.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                        </div>
                    ))}
                </div>

                {/* Critical Traffic Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#FACC15]">warning</span>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Tráfego Crítico - Exigências INSS</h3>
                        </div>
                        <span className="text-xs text-[#A3A3A3] bg-[#1F1F1F] px-3 py-1 rounded-full border border-[#333333]">Scraping automático realizado há 15min</span>
                    </div>

                    <div className="bg-[#1F1F1F] border border-[#333333] rounded-xl overflow-hidden shadow-2xl">
                        <table className="min-w-full divide-y divide-[#333333]">
                            <thead>
                                <tr className="bg-[#262626]/30">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">CPF</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Processo</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Benefício</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333333] bg-[#1F1F1F]">
                                {exigencias.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-[#262626] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-white group-hover:text-[#FACC15] transition-colors">{item.client}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A3A3A3] font-mono">{item.cpf}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A3A3A3]">{item.process}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20">
                                                {item.benefit}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-[#A3A3A3] hover:text-[#FACC15] transition-all">
                                                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-[#262626]/30 px-6 py-3 border-t border-[#333333]">
                            <p className="text-xs text-[#A3A3A3]">Mostrando 4 de 12 exigências</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
