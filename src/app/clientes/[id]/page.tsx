import DashboardLayout from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText, Clock, Edit, Trash2 } from "lucide-react"

// Dados Mockados do Cliente
const cliente = {
    id: "1",
    nome: "Maria Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    dataNascimento: "1975-03-15",
    telefone: "(11) 99999-1234",
    telefoneSecundario: "(11) 3333-5678",
    email: "maria.silva@email.com",
    endereco: "Rua das Flores, 123 - Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    status: "ativo",
    dataCadastro: "2023-06-10",
    observacoes: "Cliente preferencial. Atendimento prioritário.",
}

// Processos do Cliente
const processos = [
    {
        id: "PROC-2023-001",
        tipo: "Aposentadoria por Idade",
        fase: "PROTOCOLO_ADMIN",
        dataAbertura: "2023-06-15",
        status: "em_andamento",
    },
    {
        id: "PROC-2023-045",
        tipo: "Auxílio-Doença",
        fase: "ANALISE",
        dataAbertura: "2023-09-20",
        status: "em_andamento",
    },
]

const faseLabels: Record<string, string> = {
    CONTATO_INICIAL: "Contato Inicial",
    DOCS_PENDENTES: "Docs Pendentes",
    ANALISE: "Em Análise",
    PROTOCOLO_ADMIN: "Protocolo Admin",
    PROTOCOLO_JUDICIAL: "Protocolo Judicial",
    AUDIENCIA: "Audiência",
    PAGAMENTO: "Pagamento (RPV)",
}

// Documentos do Cliente
const documentos = [
    { id: "1", nome: "CPF", status: "ok", dataUpload: "2023-06-10" },
    { id: "2", nome: "RG", status: "ok", dataUpload: "2023-06-10" },
    { id: "3", nome: "Comprovante de Residência", status: "ok", dataUpload: "2023-06-10" },
    { id: "4", nome: "Carteira de Trabalho", status: "pendente", dataUpload: null },
    { id: "5", nome: "Exames Médicos", status: "ok", dataUpload: "2023-08-15" },
]

export default function ClienteDetalhePage({ params }: { params: { id: string } }) {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 px-12 py-10 w-full max-w-full">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Link
                        href="/clientes"
                        className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#FACC15] transition-colors w-fit"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-medium">Voltar para Clientes</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-[#262626] flex items-center justify-center text-2xl font-bold text-[#FACC15] border-2 border-[#FACC15]/30">
                                {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">{cliente.nome}</h1>
                                <p className="text-[#A3A3A3] font-mono">{cliente.cpf}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded-lg text-sm font-medium text-[#A3A3A3] hover:text-white hover:border-[#FACC15]/50 transition-colors">
                                <Edit className="h-4 w-4" />
                                Editar
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors">
                                <Trash2 className="h-4 w-4" />
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Dados Pessoais */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informações de Contato */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#FACC15]">person</span>
                                Dados Pessoais
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Telefone</p>
                                            <p className="text-white font-medium">{cliente.telefone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Telefone Secundário</p>
                                            <p className="text-white font-medium">{cliente.telefoneSecundario}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">E-mail</p>
                                            <p className="text-white font-medium">{cliente.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Data de Nascimento</p>
                                            <p className="text-white font-medium">
                                                {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">RG</p>
                                            <p className="text-white font-medium">{cliente.rg}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                        <div>
                                            <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Cliente desde</p>
                                            <p className="text-white font-medium">
                                                {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#FACC15]">location_on</span>
                                Endereço
                            </h2>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#A3A3A3] mt-0.5" />
                                <div>
                                    <p className="text-white font-medium">{cliente.endereco}</p>
                                    <p className="text-[#A3A3A3]">
                                        {cliente.bairro} - {cliente.cidade}/{cliente.estado}
                                    </p>
                                    <p className="text-[#A3A3A3]">CEP: {cliente.cep}</p>
                                </div>
                            </div>
                        </div>

                        {/* Processos */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#FACC15]">balance</span>
                                Processos ({processos.length})
                            </h2>

                            <div className="space-y-4">
                                {processos.map((processo) => (
                                    <Link
                                        key={processo.id}
                                        href={`/processo/${processo.id}`}
                                        className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#333333] rounded-lg hover:border-[#FACC15]/30 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                                <FileText className="h-5 w-5 text-[#FACC15]" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-[#FACC15] transition-colors">
                                                    {processo.tipo}
                                                </p>
                                                <p className="text-xs text-[#A3A3A3]">{processo.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-3 py-1 rounded text-xs font-bold bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20">
                                                {faseLabels[processo.fase]}
                                            </span>
                                            <p className="text-xs text-[#A3A3A3] mt-1">
                                                Aberto em {new Date(processo.dataAbertura).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider mb-3">Status</h3>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-lg font-bold text-green-400 capitalize">{cliente.status}</span>
                            </div>
                        </div>

                        {/* Documentos */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider mb-4">Documentos</h3>

                            <div className="space-y-3">
                                {documentos.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg border border-[#333333]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`h-2 w-2 rounded-full ${doc.status === 'ok' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            <span className="text-sm text-white">{doc.nome}</span>
                                        </div>
                                        {doc.status === 'ok' ? (
                                            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-yellow-500 text-lg">pending</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#A3A3A3] uppercase tracking-wider mb-3">Observações</h3>
                            <p className="text-sm text-white leading-relaxed">{cliente.observacoes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
