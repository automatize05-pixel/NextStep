export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquare, ArrowUp, ArrowDown, Search, PlusCircle, Users, Clock } from "lucide-react"

export default async function CommunityPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('forum_posts')
    .select('*, profiles(full_name, title)')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-heading flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" /> Fórum NextStep
          </h1>
          <p className="text-slate-500 text-base">Conecte-se com outros profissionais de Angola. Partilhe dicas, vagas e experiências.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-md font-bold px-6 h-11 shrink-0">
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Tópico
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Feed */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 pb-4 overflow-x-auto no-scrollbar">
             <Badge className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 cursor-pointer">Todos</Badge>
             <Badge variant="outline" className="px-4 py-1.5 cursor-pointer text-slate-600 bg-white">Carreira & Dicas</Badge>
             <Badge variant="outline" className="px-4 py-1.5 cursor-pointer text-slate-600 bg-white">Vagas Encontradas</Badge>
             <Badge variant="outline" className="px-4 py-1.5 cursor-pointer text-slate-600 bg-white">Transição Tech</Badge>
          </div>

          <div className="space-y-4">
            {posts && posts.length > 0 ? posts.map((post: any) => (
              <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex gap-5">
                {/* Voting Column */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-500 transition-colors">
                    <ArrowUp className="h-5 w-5" />
                  </button>
                  <span className="font-black text-sm text-slate-700">{post.upvotes}</span>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors">
                    <ArrowDown className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest text-[#2563EB] bg-blue-50">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(post.created_at).toLocaleDateString('pt-AO')}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-2 hover:text-[#2563EB] cursor-pointer transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-bold mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-black text-[9px] text-slate-600">
                         {post.profiles?.full_name?.charAt(0) || 'U'}
                       </div>
                       <span>{post.profiles?.full_name} • {post.profiles?.title || 'Membro'}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#2563EB] cursor-pointer">
                      <MessageSquare className="h-4 w-4" /> 0 <span className="hidden sm:inline">respostas</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                 <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-slate-300" />
                 </div>
                 <h3 className="font-black text-lg mb-2">A comunidade aguarda!</h3>
                 <p className="text-slate-500 text-sm font-bold max-w-sm mx-auto mb-6">Seja o primeiro a iniciar uma discussão e a partilhar conhecimento com outros profissionais em Angola.</p>
                 <Button className="bg-[#2563EB] font-bold">Criar Tópico</Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white rounded-2xl p-6 shadow-md border border-blue-800">
            <h3 className="font-black text-lg mb-2">Comunidade de Elite</h3>
            <p className="text-blue-200 text-sm font-bold mb-4">Mantenha as discussões profissionais, construtivas e focadas na evolução de carreira.</p>
            <Link href="/community">
               <button className="text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 transition-colors w-full py-2.5 rounded-xl">Regras da Comunidade</button>
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-4">Tópicos Quentes</h3>
            <div className="space-y-4">
               {[
                 { title: 'Dicas para entrevistas em bancos angolanos', replies: 34 },
                 { title: 'Salários base para Devs Júnior em Luanda', replies: 89 },
                 { title: 'Como negociar trabalho remoto com empresas locais?', replies: 12 },
               ].map((topic, i) => (
                 <div key={i} className="group cursor-pointer">
                    <p className="font-bold text-sm text-slate-700 group-hover:text-[#2563EB] transition-colors line-clamp-2">{topic.title}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">{topic.replies} respostas</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
