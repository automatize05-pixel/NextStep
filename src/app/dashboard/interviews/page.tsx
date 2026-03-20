"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Play, RotateCcw, User, Bot, Loader2 } from "lucide-react"

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function InterviewSimulatorPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [topic, setTopic] = useState("")
  const [history, setHistory] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('title').eq('id', user.id).single()
        if (data?.title) setTopic(data.title)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  const startInterview = async () => {
    if (!topic.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', topic })
      })
      const data = await res.json()
      if (data.question) {
        setHistory([{ role: 'ai', content: data.question }])
        setStarted(true)
      }
    } catch (error) {
      console.error(error)
      // Fallback message
      setHistory([{ role: 'ai', content: "Olá! Vamos simular sua entrevista. Fale um pouco sobre você e por que escolheu esta área." }])
      setStarted(true)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!userInput.trim() || loading) return
    
    const newHistory: Message[] = [...history, { role: 'user', content: userInput }]
    setHistory(newHistory)
    setUserInput("")
    setLoading(true)

    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'answer', topic, history: newHistory })
      })
      const data = await res.json()
      if (data.reply) {
        setHistory([...newHistory, { role: 'ai', content: data.reply }])
      } else {
        setHistory([...newHistory, { role: 'ai', content: "Ótima resposta! O que você considera como seu maior desafio até o momento?" }])
      }
    } catch (error) {
      console.error(error)
      setHistory([...newHistory, { role: 'ai', content: "Excelente. Como você lida com situações de pressão ou prazos apertados?" }])
    } finally {
      setLoading(false)
    }
  }

  const restart = () => {
    setStarted(false)
    setHistory([])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulador de Entrevista</h1>
          <p className="text-muted-foreground">Pratique suas respostas com nosso recrutador de IA.</p>
        </div>
        {started && (
          <Button variant="outline" size="sm" onClick={restart}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reiniciar
          </Button>
        )}
      </div>

      {!started ? (
        <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-primary/5 border-dashed border-2">
          <div className="mb-6 rounded-full bg-primary/10 p-4">
            <MessageSquare className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mb-2 text-2xl">Pronto para começar?</CardTitle>
          <CardDescription className="max-w-md mb-8">
            Nossa IA irá assumir o papel de um recrutador experiente. 
            Defina o cargo ou tecnologia que deseja praticar abaixo.
          </CardDescription>
          
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold">Cargo ou Tópico da Entrevista</label>
              <Input 
                placeholder="Ex: Desenvolvedor Frontend Jr, Vendedor, Gestor de RH..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-white"
              />
            </div>
            <Button className="w-full h-12 text-lg font-bold" onClick={startInterview} disabled={loading || !topic}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {loading ? "Preparando..." : "Iniciar Simulação"}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="flex-1 flex flex-col overflow-hidden shadow-xl border-t-4 border-t-primary">
          <CardHeader className="border-b bg-muted/30 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Sessão: {topic}</span>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary shadow-sm' : 'bg-white border shadow-sm'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-primary" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white border shadow-sm">
                    <Bot className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="py-2.5 px-4 rounded-2xl bg-white border text-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </CardContent>

          <CardFooter className="p-4 border-t bg-white">
            <form 
              className="flex w-full gap-2" 
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            >
              <Input 
                placeholder="Descreva sua resposta com detalhes..." 
                className="flex-1 h-12 focus-visible:ring-primary shadow-inner bg-white text-gray-900"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" size="icon" className="h-12 w-12 shrink-0 shadow-md" disabled={loading || !userInput.trim()}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
