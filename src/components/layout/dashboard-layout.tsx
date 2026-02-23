import { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { LayoutDashboard, KanbanSquare, FileText, Settings, Search, Bell } from "lucide-react"

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="border-r border-slate-200 bg-slate-50">
      <SidebarHeader className="h-16 flex items-center px-6 font-bold text-xl text-slate-800 tracking-tight">
        D&F Board
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <a href="/dashboard">
                  <LayoutDashboard className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold text-slate-700">Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Kanban Board">
                <a href="/board">
                  <KanbanSquare className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold text-slate-700">Fluxo (Kanban)</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Consultas">
                <a href="/novo-processo">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span className="font-semibold text-slate-700">Novo Cliente</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white text-slate-900">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header Compacto (Estilo Trading Desk) */}
          <header className="h-16 shrink-0 flex items-center justify-between border-b border-slate-200 px-6 bg-white">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
              <div className="relative hidden md:flex items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Buscar CPF, Nome, Processo..."
                  className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white" />
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-white cursor-pointer hover:bg-slate-800 transition-colors">
                GS
              </div>
            </div>
          </header>
          
          {/* Main Workspace (Scrollável) */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
