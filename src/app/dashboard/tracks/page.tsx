import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TracksPage() {
  const tracks = [
    {
      id: 1,
      title: "Como conseguir o primeiro emprego",
      description: "Guia passo a passo para quem está começando agora no mercado de trabalho e não tem experiência.",
      level: "Iniciante",
      duration: "Aprox. 4 horas",
      progress: 0,
    },
    {
      id: 2,
      title: "Como se preparar para entrevistas",
      description: "Aprenda a falar sobre você, responder perguntas difíceis e se portar em entrevistas remotas e presenciais.",
      level: "Todos",
      duration: "Aprox. 3 horas",
      progress: 0,
    },
    {
      id: 3,
      title: "Transição de Carreira para Tecnologia",
      description: "O que você precisa saber e as habilidades essenciais para migrar para a área de TI.",
      level: "Intermediário",
      duration: "Aprox. 8 horas",
      progress: 0,
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trilhas de Capacitação</h1>
        <p className="text-muted-foreground">Evolua com conteúdos curados para alavancar sua carreira.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tracks.map(track => (
          <Card key={track.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">{track.level}</span>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </div>
              <CardTitle>{track.title}</CardTitle>
              <CardDescription>{track.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">{track.progress}%</span>
                </div>
                <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${track.progress}%` }}></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {track.progress > 0 ? "Continuar Trilha" : "Iniciar Trilha"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
