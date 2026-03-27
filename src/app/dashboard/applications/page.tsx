"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clipboard, Plus, Loader2, Trash2, ExternalLink, MoreHorizontal } from "lucide-react"

const STATUSES = [
  { key: 'applied', label: 'Candidatado', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'reviewing', label: 'Em Análise', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  { key: 'interview', label: 'Entrevista', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { key: 'offer', label: 'Oferta', color: 'bg-green-50 border-green-200 text-green-700' },
  { key: 'rejected', label: 'Recusado', color: 'bg-red-50 border-red-200 text-red-500' },
]

interface Application { id: string; company: string; job_title: string; status: string; notes: string; job_url: string; application_date: string }

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ company: '', job_title: '', status: 'applied', notes: '', job_url: '' })
  const [saving, setSaving] = useState(false)

  const fetchApps = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/user/applications')
    const data = await res.json()
    setApps(data.applications || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchApps() }, [fetchApps])

  const create = async () => {
    if (!form.company || !form.job_title) return
    setSaving(true)
    await fetch('/api/user/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ company: '', job_title: '', status: 'applied', notes: '', job_url: '' })
    setShowForm(false)
    await fetchApps()
    setSaving(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/user/applications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const remove = async (id: string) => {
    if (!confirm('Remover esta candidatura?')) return
    await fetch(`/api/user/applications?id=${id}`, { method: 'DELETE' })
    setApps(prev => prev.filter(a => a.id !== id))
  }

  const byStatus = (s: string) => apps.filter(a => a.status === s)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Clipboard className="h-8 w-8 text-primary" /> CRM de Candidaturas
          </h1>
          <p className="text-slate-500 mt-1">Controle total das suas candidaturas. {apps.length} candidatura{apps.length !== 1 ? 's' : ''} registada{apps.length !== 1 ? 's' : ''}.</p>
        </div>
        <Button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nova Candidatura
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30 shadow-lg">
          <CardHeader><CardTitle>Adicionar Candidatura</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Empresa *</label><Input placeholder="Ex: Sonangol, BFA..." value={form.company} onChange={e => setForm(v => ({ ...v, company: e.target.value }))} /></div>
            <div><label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Cargo *</label><Input placeholder="Ex: Analista Financeiro..." value={form.job_title} onChange={e => setForm(v => ({ ...v, job_title: e.target.value }))} /></div>
            <div><label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Link da Vaga</label><Input placeholder="https://..." value={form.job_url} onChange={e => setForm(v => ({ ...v, job_url: e.target.value }))} /></div>
            <div><label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Notas</label><Input placeholder="Observações..." value={form.notes} onChange={e => setForm(v => ({ ...v, notes: e.target.value }))} /></div>
            <div className="md:col-span-2 flex gap-3">
              <Button onClick={create} disabled={saving || !form.company || !form.job_title}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : apps.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <Clipboard className="h-16 w-16 mx-auto text-slate-200" />
          <h2 className="text-xl font-black text-slate-400">Nenhuma candidatura ainda</h2>
          <p className="text-slate-400 text-sm">Clique em "Nova Candidatura" para começar a rastrear as suas candidaturas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STATUSES.map(col => (
            <div key={col.key} className="min-w-[220px]">
              <div className={`px-3 py-2 rounded-xl border mb-3 text-xs font-black uppercase tracking-widest ${col.color}`}>
                {col.label} ({byStatus(col.key).length})
              </div>
              <div className="space-y-3">
                {byStatus(col.key).map(app => (
                  <div key={app.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-black text-slate-900 text-sm truncate">{app.company}</p>
                        <p className="text-xs text-slate-500 truncate">{app.job_title}</p>
                        <p className="text-xs text-slate-400 mt-1">{app.application_date}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {app.job_url && <a href={app.job_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:text-primary"><ExternalLink className="h-3 w-3" /></a>}
                        <button onClick={() => remove(app.id)} className="p-1 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                    {app.notes && <p className="text-xs text-slate-500 mt-2 italic border-t pt-2 line-clamp-2">{app.notes}</p>}
                    <select
                      value={app.status}
                      onChange={e => updateStatus(app.id, e.target.value)}
                      className="mt-3 w-full text-xs border rounded-lg px-2 py-1 bg-slate-50 font-bold cursor-pointer focus:outline-primary"
                    >
                      {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
