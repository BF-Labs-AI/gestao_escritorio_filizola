import DashboardLayout from "@/components/layout/dashboard-layout"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertTriangle, ArrowRight, Download, Info } from "lucide-react"

export default function ProcessoAuditPage({ params }: { params: { id: string } }) {
    const processo = {
        id: params.id || "PRC-8921",
        cliente: "MARIA DO CARMO SILVA",
        tipo: "BPC IDOSO",
        fase: "AGUARDANDO AUDITORIA",
        tags: ["CID: M54.5", "DII: 10/05/2023", "CADÚNICO ATIVO"],
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-5rem)] w-full bg-[#0A0A0A] overflow-hidden">
                {/* Global Action Bar */}
                <div className="flex items-center justify-between px-12 py-4 bg-[#171717] border-b border-[#333333] shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-white italic truncate max-w-md">{processo.cliente}</h1>
                                <span className="bg-[#0A0A0A] px-2 py-0.5 rounded text-[10px] font-black text-[#A3A3A3] border border-[#333333] uppercase tracking-tighter">{processo.id}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-black text-[#FACC15] bg-[#FACC15]/10 px-2 py-0.5 rounded border border-[#FACC15]/20 uppercase tracking-widest">{processo.tipo}</span>
                                <Separator orientation="vertical" className="h-3 bg-[#333333]" />
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">{processo.fase}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-[#333333] rounded text-[10px] font-black uppercase text-[#A3A3A3] tracking-widest hover:text-white transition-colors">
                            <Download className="h-3.5 w-3.5" />
                            Baixar Dossiê
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-900/10 border border-red-900/40 rounded text-[10px] font-black uppercase text-red-500 tracking-widest hover:bg-red-900/20 transition-all">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Registrar Exigência
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#FACC15] rounded text-[10px] font-black uppercase text-black tracking-[0.15em] hover:bg-[#EAB308] transition-all shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                            Aprovar Auditoria
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* Main Split Interface */}
                <div className="flex flex-1 min-h-0">

                    {/* Left Panel: Structured Data & AI Insights */}
                    <div className="w-[450px] border-r border-[#333333] bg-[#0F0F0F] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333]">
                        <div className="p-10 space-y-10">

                            <section>
                                <div className="flex items-center gap-2 mb-6 text-[#FACC15]">
                                    <span className="material-symbols-outlined text-lg">analytics</span>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Metadados IA (Vision)</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-[#171717] border border-[#333333] p-4 rounded-lg">
                                        <span className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest block mb-2">Diagnóstico Sugerido</span>
                                        <p className="text-white font-bold text-sm tracking-tight">CID 10: M54.5 (Lumbago com ciática)</p>
                                    </div>
                                    <div className="bg-[#171717] border border-[#333333] p-4 rounded-lg">
                                        <span className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-widest block mb-2">Confidence Score</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 flex-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 w-[94%]" />
                                            </div>
                                            <span className="text-xs font-black text-green-500">94%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator className="bg-[#333333]" />

                            <section>
                                <div className="flex items-center gap-2 mb-6 text-white">
                                    <span className="material-symbols-outlined text-lg">fact_check</span>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Checklist de Conformidade</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: "RG/CNH Legível", ok: true },
                                        { label: "Comprovante de Endereço (90D)", ok: true },
                                        { label: "CadÚnico Atualizado", ok: true },
                                        { label: "Idade Crítica (65+)", ok: false, warning: true },
                                    ].map((step, i) => (
                                        <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${step.ok ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500 underline decoration-red-500/30'}`}>
                                            <span className="text-[11px] font-bold uppercase tracking-tighter">{step.label}</span>
                                            {step.ok ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Separator className="bg-[#333333]" />

                            <section>
                                <div className="flex items-center gap-2 mb-6 text-[#A3A3A3]">
                                    <span className="material-symbols-outlined text-lg">sticky_note_2</span>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Observações do Auditor</h3>
                                </div>
                                <textarea
                                    className="w-full h-40 bg-[#171717] border border-[#333333] rounded-lg p-4 text-white text-sm focus:border-[#FACC15] outline-none transition-all placeholder:text-[#333333] font-medium"
                                    placeholder="INSIRA NOTAS TÉCNICAS AQUI..."
                                />
                            </section>

                        </div>
                    </div>

                    {/* Right Panel: High-Resolution Viewer */}
                    <div className="flex-1 bg-[#0A0A0A] relative flex flex-col">
                        <div className="absolute inset-0 overflow-auto bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none" />

                        <div className="h-10 bg-[#1F1F1F] border-b border-[#333333] flex items-center px-6 justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black text-[#A3A3A3] uppercase tracking-[0.25em]">Preview: LAUDO_MEDICO_MARIA.PDF</span>
                                <div className="flex gap-1">
                                    <button className="h-5 w-5 rounded bg-[#171717] flex items-center justify-center border border-[#333333] hover:border-[#FACC15] transition-colors">
                                        <span className="material-symbols-outlined text-[12px] text-white">zoom_in</span>
                                    </button>
                                    <button className="h-5 w-5 rounded bg-[#171717] flex items-center justify-center border border-[#333333] hover:border-[#FACC15] transition-colors">
                                        <span className="material-symbols-outlined text-[12px] text-white">zoom_out</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Viewer Content (Simulated) */}
                        <div className="flex-1 p-12 flex justify-center bg-[#050505]">
                            <div className="w-full max-w-4xl bg-white rounded shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] flex flex-col p-16 select-none relative overflow-hidden ring-1 ring-white/10">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="h-20 w-20 border-2 border-[#eee] rounded-full flex items-center justify-center text-[10px] font-black text-[#ccc] rotate-12">SELO DIGITAL</div>
                                </div>

                                <div className="h-10 w-2/5 bg-slate-100 rounded mb-12" />
                                <div className="space-y-6">
                                    <div className="h-4 w-full bg-slate-50 rounded" />
                                    <div className="h-4 w-full bg-slate-50 rounded" />
                                    <div className="h-4 w-3/4 bg-slate-50 rounded" />
                                    <div className="h-4 w-full bg-slate-50 rounded mt-12" />
                                    <div className="h-4 w-5/6 bg-slate-50 rounded" />
                                    <div className="h-4 w-4/6 bg-slate-50 rounded" />

                                    <div className="pt-20 space-y-4">
                                        <Separator className="bg-slate-100" />
                                        <div className="h-12 w-full flex items-center justify-center">
                                            <div className="h-8 w-64 bg-slate-50 border-b-2 border-slate-200" />
                                        </div>
                                        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest">Assinatura Certificada via D&F Vision</p>
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
