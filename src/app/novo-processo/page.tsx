import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { UploadCloud, File, AlertCircle } from "lucide-react"

export default function NovoProcessoPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Novo Atendimento</h1>
                    <p className="text-slate-500 mt-1">
                        Inicie um novo dossiê. Os documentos enviados aqui cairão na auditoria da IA (Visão).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Coluna Esquerda: Dados Essenciais */}
                    <div className="md:col-span-1 space-y-6">
                        <Card className="shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Dados Iniciais</CardTitle>
                                <CardDescription>Informação básica do requerente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF do Cliente</Label>
                                    <Input id="cpf" placeholder="000.000.000-00" className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome Completo</Label>
                                    <Input id="nome" placeholder="Maria da Silva" className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="beneficio">Benefício Alvo</Label>
                                    <Select>
                                        <SelectTrigger id="beneficio" className="bg-slate-50">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bpc_deficiente">BPC LOAS - Deficiente</SelectItem>
                                            <SelectItem value="bpc_idoso">BPC LOAS - Idoso (65+)</SelectItem>
                                            <SelectItem value="auxilio_doenca">Auxílio-Doença</SelectItem>
                                            <SelectItem value="aposentadoria_invalidez">Aposentadoria por Invalidez</SelectItem>
                                            <SelectItem value="salario_maternidade">Salário-Maternidade</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-amber-200 bg-amber-50/50">
                            <CardContent className="p-4 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                                <div className="text-sm text-amber-800">
                                    <p className="font-semibold mb-1">Atenção ao Upload</p>
                                    Não se preocupe em renomear os arquivos. O Módulo de IA classificará CNHs, Laudos e Comprovantes automaticamente.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna Direita: Drag and Drop Zone */}
                    <div className="md:col-span-2">
                        <Card className="shadow-sm border-slate-200 h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-lg">Dossiê de Arquivos</CardTitle>
                                <CardDescription>Arraste fotos do WhatsApp, JPEGs ou PDFs crus.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                {/* Simulated Dropzone */}
                                <div className="border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center p-12 text-center flex-1 hover:bg-slate-100/50 hover:border-blue-400 cursor-pointer transition-colors group">
                                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                        <UploadCloud className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-700">Clique ou arraste arquivos aqui</h3>
                                    <p className="text-sm text-slate-500 mt-2 max-w-xs">
                                        Suporta PDF, JPG, PNG e HEIC. O sistema cuidará da conversão.
                                    </p>
                                </div>

                                {/* Mocked Upload List */}
                                <div className="mt-6 space-y-3">
                                    <h4 className="text-sm font-semibold text-slate-700">Arquivos na fila (2)</h4>

                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-white">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded text-slate-500">
                                                <File className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">IMG_9921_whatsapp.jpg</p>
                                                <p className="text-xs text-slate-500">2.4 MB</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Remover</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-white">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded text-slate-500">
                                                <File className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">laudo_medico_assinado.pdf</p>
                                                <p className="text-xs text-slate-500">1.1 MB</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Remover</Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-slate-100 bg-slate-50/50 pt-4 flex justify-end">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                    Iniciar Processamento IA
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
