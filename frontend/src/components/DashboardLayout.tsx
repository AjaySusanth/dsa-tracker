import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function DashboardLayout() {
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dashboard-layout">
      {/* Background overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur-3xl pointer-events-none"></div>

      <SidebarProvider>
        <AppSidebar variant="floating" side="left" collapsible="icon" />
        <SidebarInset className="relative z-10 bg-transparent">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800/30 px-4 bg-slate-950/30 backdrop-blur-sm">
            <SidebarTrigger className="-ml-1 text-slate-400 hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-slate-700" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="text-slate-400 hover:text-white">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-slate-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col bg-transparent min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
export default DashboardLayout