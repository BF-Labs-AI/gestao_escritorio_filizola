import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Users, AlertCircle, FileCheck2 } from "lucide-react"

// Dados Mockados para o MVP
const kpis = [
    { title: "Processos Ativos", value: "1.248", icon: Users, color: "text-blue-600" },
    { title: "Prontos para Petição", value: "43", icon: FileCheck2, color: "text-emerald-600" },
    { title: "Exigências (Riscos)", value: "12", icon: AlertCircle, color: "text-red-500" },
    { title: "Concluídos (Mês)", value: "89", icon: TrendingUp, color: "text-slate-700" },
]

const recentProcesses = [
    { id: "PRC-8921", client: "Maria do Carmo Silva", type: "BPC Idoso", status: "Pronto para Petição", date: "Hoje, 10:42", urgency: "high" },
    { id: "PRC-8920", client: "João Pedro Batista", type: "Auxílio-Doença", status: "Exigência INSS", date: "Ontem, 16:30", urgency: "critical" },
    { id: "PRC-8919", client: "Ana Lúcia Ferreira", type: "BPC Deficiente", status: "Documentação", date: "Ontem, 14:15", urgency: "normal" },
    { id: "PRC-8918", client: "Carlos Eduardo Souza", type: "Invalidez", status: "Em Andamento", date: "12 Fev, 09:00", urgency: "normal" },
]

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
                    <p className="text-slate-500 mt-1">Bem-vindo ao D&F Board. Aqui está o resumo operacional de hoje.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {kpis.map((kpi, i) => (
                        <Card key={i} className="shadow-sm border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">{kpi.title}</CardTitle>
                                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Data Grid: Processos Recentes */}
                <Card className="col-span-4 shadow-sm border-slate-200 mt-2">
                    <CardHeader>
                        <CardTitle>Fila de Atenção Recente</CardTitle>
                        <CardDescription>
                            Processos que sofreram atualização nas últimas 24 horas pelo INSS ou por nossa equipe.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                    <TableHead className="w-[100px] font-semibold text-slate-700">ID</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Tipo (Benefício)</TableHead>
                                    <TableHead className="font-semibold text-slate-700">Fase Atual</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-700">Atualizado em</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentProcesses.map((process) => (
                                    <TableRow key={process.id} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                                        <TableCell className="font-mono text-xs text-slate-500">{process.id}</TableCell>
                                        <TableCell className="font-medium text-slate-900">{process.client}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                process.type.includes('BPC') ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                    process.type.includes('Doença') ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                                                        'bg-slate-100 text-slate-700 border-slate-200'
                                            }>
                                                {process.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                process.status.includes('Exigência') ? 'bg-red-100 hover:bg-red-200 text-red-700 border-transparent' :
                                                    process.status.includes('Pronto') ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-transparent' :
                                                        'bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent shadow-none'
                                            } variant="secondary">
                                                {process.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-slate-500 text-sm">{process.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
