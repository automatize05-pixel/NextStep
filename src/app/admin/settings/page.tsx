import { createClient } from "@/lib/supabase/server"
import SettingsClient from "./settings-client"

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('system_settings')
    .select('*')
    .eq('id', 1)
    .single()

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">Configurações</h2>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Parâmetros Estratégicos do Sistema NextStep</p>
        </div>
      </div>

      <SettingsClient initialSettings={settings} />
    </div>
  )
}
