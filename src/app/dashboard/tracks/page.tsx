import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { BookOpen, Clock, BarChart, Lock, PlayCircle, Trophy, Sparkles } from "lucide-react"

export default function TracksPage() {
  const tracks = [
    {
      id: 1,
      title: "Primeiro Passo: Mercado de Trabalho",
      description: "Guia definitivo para quem busca o primeiro emprego sem ter experiência prévia. Documentação, postura e networking.",
      level: "Iniciante",
      duration: "4h",
      progress: 0,
      category: "Carreira",
      modules: 12,
      featured: true
    },
    {
      id: 2,
      title: "Masterclass: Entrevistas de Sucesso",
      description: "Aprenda a técnica STAR para responder perguntas comportamentais e domine entrevistas técnicas com confiança.",
      level: "Todos",
      duration: "3h",
      progress: 15,
      category: "Soft Skills",
      modules: 8,
      featured: false
    },
    {
      id: 3,
      title: "Transição: Rumo à Tecnologia",
      description: "Mapeamento completo do mercado de TI: Papéis, responsabilidades e trilha de estudos técnica inicial.",
      level: "Intermediário",
      duration: "10h",
      progress: 0,
      category: "Tecnologia",
      modules: 24,
      featured: false
    },
    {
      id: 4,
      title: "LinkedIn & Personal Branding",
      description: "Como transformar seu perfil em um imã de recrutadores e construir autoridade na sua área de atuação.",
      level: "Intermediário",
      duration: "2h",
      progress: 0,
      category: "Branding",
      modules: 5,
      featured: false
    }
  ]

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1" /> Aprendizado Guiado
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Trilhas de Capacitação</h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-balance">
            Desenvolva as competências mais requisitadas pelo mercado com conteúdos diretos ao ponto e exercícios práticos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="rounded-full">Todos</Button>
          <Button variant="ghost" className="rounded-full">Carreira</Button>
          <Button variant="ghost" className="rounded-full">Tecnologia</Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
        {tracks.map(track => (
          <Card key={track.id} className={`group flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-all duration-300 border-muted-foreground/10 ${track.featured ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
            <div className="md:w-1/3 bg-muted/30 relative flex items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-transparent">
              {track.progress > 0 ? (
                <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-white shadow-inner">
                  <svg className="h-20 w-20 -rotate-90">
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-secondary/20" />
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-primary" strokeDasharray={`${track.progress * 2.13} 1000`} />
                  </svg>
                  <span className="absolute text-sm font-bold">{track.progress}%</span>
                </div>
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-10 w-10 text-primary/40" />
                </div>
              )}
              {track.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-white border-none">Destaque</Badge>
              )}
            </div>
            
            <div className="flex-1 flex flex-col p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-widest">{track.category}</Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {track.duration}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <BarChart className="h-3 w-3 mr-1" /> {track.level}
                </div>
              </div>

              <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{track.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed mb-6 line-clamp-2">{track.description}</CardDescription>
              
              <div className="mt-auto pt-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <PlayCircle className="h-4 w-4" /> {track.modules} módulos
                </div>
                <Button className={`${track.progress > 0 ? 'bg-secondary text-secondary-foreground' : 'bg-primary'} font-bold transition-all`}>
                  {track.progress === 100 ? (
                    <><Trophy className="h-4 w-4 mr-2" /> Concluído</>
                  ) : track.progress > 0 ? (
                    "Continuar"
                  ) : (
                    "Iniciar Agora"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Locked Tracks */}
        <Card className="flex flex-col md:flex-row overflow-hidden opacity-60 grayscale bg-muted/5 border-dashed">
            <div className="md:w-1/3 bg-muted/20 flex items-center justify-center p-6">
              <Lock className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-[10px] uppercase">Especialização</Badge>
              </div>
              <CardTitle className="text-xl mb-2 text-muted-foreground">Liderança e Gestão Ágil</CardTitle>
              <CardDescription className="text-sm">Complete "Masterclass: Entrevistas" para desbloquear este conteúdo exclusivo.</CardDescription>
              <div className="mt-auto pt-6 border-t">
                <Button variant="ghost" disabled className="text-xs uppercase tracking-widest font-bold">Bloqueado</Button>
              </div>
            </div>
        </Card>
      </div>
    </div>
  )
}
