import DashboardLayout from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"

export default function ProcessoAuditPage({ params }: { params: { id: string } }) {
    // Dados simulados do Processo Mestre
    const processo = {
        id: params.id || "PRC-8921",
        cliente: "Maria do Carmo Silva",
        tipo: "BPC Idoso",
        fase: "Pronto para Petição",
        tags: ["CID: M54.5", "DII: 10/05/2023", "CadÚnico Válido"],
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)] w-full">
                {/* Top Bar Analítica */}
                <div className="flex items-center justify-between mb-4 shrink-0 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900">{processo.cliente}</h1>
                            <Badge variant="outline" className="font-mono text-slate-500 bg-slate-50">{processo.id}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{processo.tipo}</span>
                            <span className="text-slate-400">&bull;</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> {processo.fase}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <AlertCircle className="mr-2 h-4 w-4" /> Registrar Exigência
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Aprovar Petição <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Audit Split-Screen View */}
                <div className="flex gap-4 flex-1 min-h-0">

                    {/* Lado Esquerdo: Metadados Estruturados (Forms/Informação IA) */}
                    <div className="w-1/3 flex flex-col gap-4 overflow-y-auto pr-2">
                        <Card className="shadow-sm border-slate-200">
                            <CardHeader className="py-4">
                                <CardTitle className="text-base text-slate-800 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" /> Resumo do Dossiê
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="text-slate-500 block mb-1">Tags Clínicas / IA:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {processo.tags.map((t, i) => (
                                                <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">{t}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <span className="text-slate-500 block font-medium mb-2">Checklist Obrigatório (BPC Idoso)</span>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> RG legível</li>
                                            <li className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Comprovante de Endereço</li>
                                            <li className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Idade comprovada {'>'} 65</li>
                                            <li className="flex items-center gap-2 text-slate-400 line-through">Laudo Médico (Não exigido BPC Idoso)</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-slate-200 flex-1">
                            <CardHeader className="py-4">
                                <CardTitle className="text-base text-slate-800">Anotações Internas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <textarea
                                    className="w-full h-32 p-3 text-sm rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none resize-none placeholder:text-slate-400"
                                    placeholder="Deixe um comentário sobre este dossiê..."
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lado Direito: Visualizador de PDF Embutido (Mock) */}
                    <div className="w-2/3 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden flex flex-col relative shadow-inner">
                        <div className="h-10 bg-slate-900 border-b border-slate-700 flex items-center px-4 justify-between shrink-0">
                            <span className="text-slate-300 text-xs font-semibold tracking-wider uppercase">Visualizador de Documentos</span>
                            <div className="flex gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                            </div>
                        </div>
                        {/* Mocked Viewer Pane */}
                        <div className="flex-1 flex items-center justify-center p-8">
                            <div className="w-full max-w-lg h-full bg-white rounded shadow-2xl flex flex-col p-8 opacity-90 relative">
                                <div className="h-8 w-3/4 bg-slate-200 rounded mb-8"></div>
                                <div className="space-y-3 flex-1">
                                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                                    <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                                    <div className="h-4 w-full bg-slate-100 rounded mt-6"></div>
                                    <div className="h-4 w-4/6 bg-slate-100 rounded"></div>
                                    <div className="h-32 w-full border-2 border-slate-100 rounded mt-8 flex items-center justify-center text-slate-300 font-bold" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f8fafc 25%, transparent 25%, transparent 75%, #f8fafc 75%, #f8fafc), repeating-linear-gradient(45deg, #f8fafc 25%, #ffffff 25%, #ffffff 75%, #f8fafc 75%, #f8fafc)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
                                        [MOCK PDF PETIÇÃO]
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}
