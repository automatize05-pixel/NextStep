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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">IA de Recrutamento Ativa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Simulador de Entrevista</h1>
          <p className="text-white text-lg font-bold max-w-2xl leading-relaxed opacity-100">
            Pratique suas respostas em tempo real com nosso recrutador de IA treinado nos padrões globais de contratação.
          </p>
        </div>
        {started && (
          <Button variant="outline" size="sm" onClick={restart} className="relative z-10 border-slate-600 text-white hover:bg-slate-800 font-black h-11 px-6 shadow-md">
            <RotateCcw className="h-4 w-4 mr-2" /> Reiniciar
          </Button>
        )}
      </div>

        <Card className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-900 border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="mb-8 rounded-full bg-primary/20 p-6 border border-primary/20 shadow-[0_0_30px_rgba(37,99,235,0.2)] relative z-10">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="mb-4 text-3xl font-black text-white relative z-10 tracking-tight">Pronto para o próximo nível?</CardTitle>
          <CardDescription className="max-w-md mb-10 text-slate-200 font-bold text-lg opacity-100 relative z-10 leading-relaxed">
            Nossa IA irá assumir o papel de um recrutador experiente. 
            Defina o cargo ou tecnologia que deseja praticar abaixo.
          </CardDescription>
          
          <div className="w-full max-w-sm space-y-6 relative z-10">
            <div className="space-y-3 text-left">
              <label className="text-xs font-black uppercase text-white tracking-[0.2em] mb-3 block">Cargo ou Tópico da Entrevista *</label>
              <Input 
                placeholder="Ex: Desenvolvedor Frontend Jr, Vendedor, Gestor de RH..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 font-black h-12 px-4 shadow-inner"
              />
            </div>
            <Button className="w-full h-14 text-sm font-black uppercase tracking-widest bg-primary hover:bg-blue-600 shadow-lg shadow-primary/30" onClick={startInterview} disabled={loading || !topic}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Play className="h-5 w-5 mr-3" />}
              {loading ? "Preparando Sessão..." : "Iniciar Simulação de Elite"}
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
