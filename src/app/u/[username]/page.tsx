import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Mail, Phone, ExternalLink, Calendar, Award, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/shared/logo"

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const supabase = await createClient()

  // Fetch user profile by username
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!profile) return notFound()

  // Fetch experiences, education, and skills
  const [experiences, education, skills] = await Promise.all([
    supabase.from('experiences').select('*').eq('user_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('education').select('*').eq('user_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('skills').select('*').eq('user_id', profile.id)
  ])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-20">
      {/* Public Header */}
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo className="scale-75 origin-left" />
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-widest rounded-full px-6">
              Criar meu Perfil
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        {/* Profile Hero */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/20 shrink-0">
            {profile.full_name?.charAt(0) || "U"}
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{profile.full_name}</h1>
              <p className="text-xl font-bold text-primary">{profile.title || "Profissional NextStep"}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-bold">
              {profile.location && (
                <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-xl border border-border/50">
                  <MapPin className="h-4 w-4 text-primary" /> {profile.location}
                </div>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors bg-muted/50 px-3 py-1.5 rounded-xl border border-border/50">
                  <Globe className="h-4 w-4" /> Portfólio
                </a>
              )}
            </div>
            
            <p className="text-muted-foreground leading-relaxed font-bold max-w-2xl italic">
              "{profile.bio || "Explorando novas oportunidades e evoluindo a cada passo."}"
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Experiência Profissional</h2>
           </div>

           <div className="grid gap-6">
             {experiences.data?.map((exp: any) => (
               <Card key={exp.id} className="bg-card border-border shadow-md rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
                 <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                       <div>
                          <h3 className="text-lg font-black">{exp.position}</h3>
                          <p className="text-primary font-bold">{exp.company}</p>
                       </div>
                       <div className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
                         {exp.start_date} — {exp.end_date || "Presente"}
                       </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-black opacity-80">{exp.description}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
        </section>

        {/* Education Section */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Educação e Formação</h2>
           </div>

           <div className="grid gap-4">
             {education.data?.map((edu: any) => (
               <div key={edu.id} className="p-5 rounded-2xl bg-muted/30 border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h3 className="font-black">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground font-bold">{edu.institution} • {edu.course}</p>
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Concluído em {edu.end_date}
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Habilidades</h2>
           </div>
           
           <div className="flex flex-wrap gap-2">
             {skills.data?.map((skill: any) => (
               <span key={skill.id} className="px-4 py-2 bg-card border border-border rounded-xl text-xs font-black shadow-sm hover:shadow-md transition-shadow">
                 {skill.name}
               </span>
             ))}
           </div>
        </section>

        {/* Call to Action */}
        <div className="pt-20 text-center pb-20">
           <div className="p-12 rounded-[3rem] bg-primary text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Logo className="mx-auto mb-6 grayscale brightness-[10] opacity-30" iconOnly />
              <h3 className="text-3xl font-black tracking-tighter mb-4">Gostou deste perfil?</h3>
              <p className="text-white/80 font-bold mb-8 max-w-md mx-auto">A NextStep ajuda milhares de profissionais a evoluírem todos os dias. Crie o seu currículo de elite hoje.</p>
              <Link href="/register">
                 <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                    Começar Agora Grátis
                 </Button>
              </Link>
           </div>
        </div>
      </main>
    </div>
  )
}
