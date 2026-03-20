"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InterviewSimulatorPage() {
  const [topic, setTopic] = useState("")
  const [inSession, setInSession] = useState(false)
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const startInterview = async () => {
    if (!topic) return
    setInSession(true)
    setLoading(true)
    
    // Call AI route
    const res = await fetch('/api/ai/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start', topic })
    })
    
    if (res.ok) {
      const data = await res.json()
      setMessages([{ role: 'ai', content: data.question }])
    } else {
      setMessages([{ role: 'ai', content: "Olá! Vamos simular sua entrevista. Fale um pouco sobre você e por que escolheu esta área." }])
    }
    setLoading(false)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input } as const]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'answer', topic, history: newMessages })
      })
      
      if (res.ok) {
        const data = await res.json()
        setMessages([...newMessages, { role: 'ai', content: data.reply }])
      } else {
        setMessages([...newMessages, { role: 'ai', content: "Ótima resposta! O que você considera como seu maior desafio até o momento?" }])
      }
    } catch {
      setMessages([...newMessages, { role: 'ai', content: "Excelente. Como você lida com situações de pressão ou prazos apertados?" }])
    }

    setLoading(false)
  }

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Simulador de Entrevista</h1>
        <p className="text-muted-foreground">Treine suas respostas com a nossa Inteligência Artificial.</p>
      </div>

      {!inSession ? (
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Nova Simulação</CardTitle>
            <CardDescription>Escolha o tema ou vaga desejada para iniciar o treinamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cargo ou Tema da Entrevista</label>
              <Input 
                placeholder="Ex: Desenvolvedor Front-end, Assistente Administrativo..." 
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startInterview} disabled={!topic || loading}>
              {loading ? "Preparando..." : "Iniciar Entrevista"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="flex-1 flex flex-col max-h-[600px] max-w-3xl">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Entrevista em andamento</CardTitle>
                <CardDescription>Tema: {topic}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setInSession(false)}>Encerrar / Voltar</Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'ai' ? 'bg-secondary/10 border text-foreground' : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary/10 border text-foreground rounded-lg p-3">
                  <span className="text-sm flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-75">.</span>
                    <span className="animate-bounce delay-150">.</span>
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
              <Input 
                placeholder="Sua resposta..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={!input.trim() || loading}>Enviar</Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
