"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useDropzone } from "react-dropzone"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, File as FileIcon, X, CheckCircle2 } from "lucide-react"

const formSchema = z.object({
    cpf: z.string().min(11, "CPF deve ter no mínimo 11 dígitos").max(14, "Formato inválido"),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    beneficio: z.string().min(1, "Selecione o benefício alvo"),
})

export default function NovoProcessoPage() {
    const [files, setFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { cpf: "", nome: "", beneficio: "" },
    })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [], 'application/pdf': [] }
    })

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
        form.reset()
        setFiles([])
        setTimeout(() => setIsSuccess(false), 3000)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-10 px-12 py-10 w-full max-w-5xl mx-auto bg-[#0A0A0A]">
                <div className="flex items-center justify-between border-b border-[#333333] pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Entrada de Dossiê</h1>
                        <p className="text-[#A3A3A3] mt-1 font-medium">Capture documentos e inicie a auditoria automática da IA.</p>
                    </div>
                    {isSuccess && (
                        <div className="flex items-center gap-2 bg-[#FACC15]/10 text-[#FACC15] px-4 py-2 rounded-lg border border-[#FACC15]/20 animate-in fade-in slide-in-from-right-4">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="text-sm font-bold uppercase tracking-tight">Dossiê Enviado para IA</span>
                        </div>
                    )}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-[#171717] border border-[#333333] p-6 rounded-xl space-y-6 shadow-2xl">
                                <h3 className="text-xs font-black text-[#FACC15] uppercase tracking-[0.2em] mb-4">Dados do Requerente</h3>

                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-[#A3A3A3] tracking-widest">Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="NOME DO CLIENTE" className="bg-[#1F1F1F] border-[#333333] text-white focus:border-[#FACC15] transition-all h-12 uppercase font-bold text-sm" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-[#A3A3A3] tracking-widest">CPF</FormLabel>
                                            <FormControl>
                                                <Input placeholder="000.000.000-00" className="bg-[#1F1F1F] border-[#333333] text-white focus:border-[#FACC15] transition-all h-12 font-mono" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="beneficio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-[#A3A3A3] tracking-widest">Benefício Alvo</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-[#1F1F1F] border-[#333333] text-white h-12 focus:ring-0 focus:border-[#FACC15]">
                                                        <SelectValue placeholder="SELECIONE O BENEFÍCIO" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-[#171717] border-[#333333] text-white">
                                                    <SelectItem value="bpc_deficiente">BPC LOAS - DEFICIENTE</SelectItem>
                                                    <SelectItem value="bpc_idoso">BPC LOAS - IDOSO (65+)</SelectItem>
                                                    <SelectItem value="auxilio_doenca">AUXÍLIO-DOENÇA</SelectItem>
                                                    <SelectItem value="aposentadoria_invalidez">APOSENTADORIA POR INVALIDEZ</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500 text-[10px] font-bold" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="bg-[#FACC15]/5 border border-[#FACC15]/20 p-5 rounded-xl shadow-inner">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-[#FACC15] text-2xl">info</span>
                                    <p className="text-[11px] text-[#A3A3A3] font-medium leading-relaxed uppercase tracking-tight">
                                        <span className="text-white font-black block mb-1">Nota Técnica:</span>
                                        O OCR Vision processará automaticamente RG, CNH, Laudos e Comprovantes. Não há necessidade de categorização manual.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 flex flex-col gap-6">
                            <div className="bg-[#171717] border border-[#333333] rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-[#333333] flex items-center justify-between bg-[#1F1F1F]/30">
                                    <h3 className="text-[10px] font-black uppercase text-[#A3A3A3] tracking-widest">Zona de Captura</h3>
                                    <span className="text-[10px] font-bold text-[#FACC15]">{files.length} ARQUIVOS CARREGADOS</span>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div
                                        {...getRootProps()}
                                        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-center flex-1 cursor-pointer transition-all ${isDragActive ? 'border-[#FACC15] bg-[#FACC15]/5' : 'border-[#333333] bg-[#0A0A0A] hover:border-[#FACC15]/40 hover:bg-[#171717]'
                                            }`}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="bg-[#1F1F1F] h-20 w-20 rounded-full flex items-center justify-center mb-6 border border-[#333333] group-hover:scale-105 transition-transform">
                                            <UploadCloud className="h-8 w-8 text-[#FACC15]" />
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                                            {isDragActive ? 'SOLTE AGORA' : 'Arraste o Dossiê Aqui'}
                                        </h3>
                                        <p className="text-xs text-[#A3A3A3] mt-2 font-bold tracking-widest uppercase">
                                            PDF • JPG • PNG • HEIC
                                        </p>
                                    </div>

                                    {files.length > 0 && (
                                        <div className="mt-8 space-y-3">
                                            <div className="max-h-56 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-[#333333]">
                                                {files.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F1F1F] border border-[#333333] rounded-lg group hover:border-[#FACC15]/30 transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-10 w-10 bg-[#0A0A0A] rounded flex items-center justify-center text-[#A3A3A3] group-hover:text-[#FACC15] transition-colors border border-[#333333]">
                                                                <FileIcon className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black text-white uppercase tracking-tight truncate max-w-[200px]">{file.name}</p>
                                                                <p className="text-[10px] font-bold text-[#A3A3A3] uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => removeFile(index)} className="p-2 text-[#A3A3A3] hover:text-red-500 transition-colors">
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 bg-[#1F1F1F]/30 border-t border-[#333333] flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || files.length === 0}
                                        className="bg-[#FACC15] hover:bg-[#EAB308] disabled:opacity-50 disabled:grayscale transition-all text-black px-10 py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                                    >
                                        {isSubmitting ? 'PROCESSANDO...' : 'INICIAR AUDITORIA IA'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </DashboardLayout>
    )
}
