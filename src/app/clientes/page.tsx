import DashboardLayout from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { Search, Filter, Plus, Phone, Mail, FileText } from "lucide-react"

// Dados Mockados de Clientes
const clientes = [
    {
        id: "1",
        nome: "Maria Silva",
        cpf: "123.456.789-00",
        telefone: "(11) 99999-1234",
        email: "maria.silva@email.com",
        status: "ativo",
        processos: 2,
        ultimoContato: "2024-01-15",
    },
    {
        id: "2",
        nome: "João Souza",
        cpf: "987.654.321-00",
        telefone: "(11) 98888-5678",
        email: "joao.souza@email.com",
        status: "ativo",
        processos: 1,
        ultimoContato: "2024-01-10",
    },
    {
        id: "3",
        nome: "Ana Pereira",
        cpf: "456.789.123-00",
        telefone: "(11) 97777-9012",
        email: "ana.pereira@email.com",
        status: "inativo",
        processos: 3,
        ultimoContato: "2023-12-20",
    },
    {
        id: "4",
        nome: "Carlos Oliveira",
        cpf: "321.654.987-00",
        telefone: "(11) 96666-3456",
        email: "carlos.oliveira@email.com",
        status: "ativo",
        processos: 1,
        ultimoContato: "2024-01-18",
    },
    {
        id: "5",
        nome: "Lucia Lima",
        cpf: "654.321.987-00",
        telefone: "(11) 95555-7890",
        email: "lucia.lima@email.com",
        status: "ativo",
        processos: 2,
        ultimoContato: "2024-01-12",
    },
    {
        id: "6",
        nome: "Roberto Santos",
        cpf: "789.123.456-00",
        telefone: "(11) 94444-1234",
        email: "roberto.santos@email.com",
        status: "pendente",
        processos: 1,
        ultimoContato: "2024-01-05",
    },
]

const statusColors: Record<string, string> = {
    ativo: "bg-green-500/10 text-green-400 border-green-500/20",
    inativo: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    pendente: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
}

export default function ClientesPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 px-12 py-10 w-full max-w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Clientes</h2>
                        <p className="text-[#A3A3A3] mt-1">Gerencie todos os clientes do escritório.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 h-4 w-4 text-[#A3A3A3]" />
                            <input
                                type="search"
                                placeholder="Buscar cliente..."
                                className="h-10 w-64 rounded-lg border border-[#333333] bg-[#1F1F1F] pl-10 pr-4 text-sm outline-none focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all text-white placeholder:text-[#A3A3A3]"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:border-[#FACC15]/50 transition-colors">
                            <Filter className="h-4 w-4" />
                            Filtros
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#FACC15] hover:bg-[#EAB308] transition-colors px-6 py-2.5 text-black font-bold text-sm shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                            <Plus className="h-4 w-4" />
                            Novo Cliente
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#FACC15]">group</span>
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Total de Clientes</p>
                                <p className="text-2xl font-bold text-white">{clientes.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-400">check_circle</span>
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Clientes Ativos</p>
                                <p className="text-2xl font-bold text-white">{clientes.filter(c => c.status === "ativo").length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-yellow-400">pending</span>
                            </div>
                            <div>
                                <p className="text-[#A3A3A3] text-sm">Pendentes</p>
                                <p className="text-2xl font-bold text-white">{clientes.filter(c => c.status === "pendente").length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clientes Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clientes.map((cliente) => (
                        <Link
                            key={cliente.id}
                            href={`/clientes/${cliente.id}`}
                            className="bg-[#171717] border border-[#333333] rounded-xl p-6 hover:border-[#FACC15]/30 transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-[#262626] flex items-center justify-center text-lg font-bold text-[#FACC15] border border-[#333333]">
                                        {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-[#FACC15] transition-colors">{cliente.nome}</h3>
                                        <p className="text-xs text-[#A3A3A3] font-mono">{cliente.cpf}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${statusColors[cliente.status]}`}>
                                    {cliente.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                                    <Phone className="h-4 w-4" />
                                    <span>{cliente.telefone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{cliente.email}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-[#333333]">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-[#A3A3A3]" />
                                    <span className="text-sm text-[#A3A3A3]">
                                        <span className="text-white font-bold">{cliente.processos}</span> processo(s)
                                    </span>
                                </div>
                                <span className="text-xs text-[#A3A3A3]">
                                    Último contato: {new Date(cliente.ultimoContato).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
