import { createClient } from "@/lib/supabase/server"
import { Search, Filter, UserCog, MoreVertical, MapPin, Target, Users } from "lucide-react"

interface Profile {
  id: string;
  full_name: string | null;
  location: string | null;
  field_of_interest: string | null;
  created_at: string;
}

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: usersRaw } = await supabase
    .from('profiles')
    .select('id, full_name, location, field_of_interest, created_at')
    .order('created_at', { ascending: false })

  const users = (usersRaw as unknown as Profile[]) || []

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">Gestão de Usuários</h2>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Controle da Base de Talentos</p>
        </div>
        <div className="relative group min-w-[300px]">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Procurar por nome..." 
             className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] focus:outline-none focus:border-primary focus:shadow-xl transition-all font-bold text-sm"
           />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Usuário</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Localização</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Interesse</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Data de Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((profile) => (
                <tr key={profile.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-[1rem] flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-110 transition-transform">
                        {profile.full_name?.[0] || 'U'}
                      </div>
                      <span className="font-extrabold text-slate-900">{profile.full_name || 'Usuário NS'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                       <MapPin className="h-4 w-4 text-primary" />
                       {profile.location || 'Não informado'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                       <Target className="h-4 w-4 text-orange-500" />
                       {profile.field_of_interest || 'Geral'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase">
                      {new Date(profile.created_at).toLocaleDateString('pt-AO')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
             <div className="p-20 text-center space-y-4">
                <Users className="h-12 w-12 text-slate-200 mx-auto" />
                <p className="text-slate-400 font-bold italic">Nenhum usuário encontrado na base de dados.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
