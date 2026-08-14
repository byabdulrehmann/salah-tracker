'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Moon, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    setLoading(false)
    if (error) { const text = error.message.toLowerCase(); setError(text.includes('confirm') ? 'Please confirm your email before signing in. Use the button below to send a new link.' : text.includes('rate') ? 'Too many attempts. Please wait a little and try again.' : 'Invalid email or password.'); return }
    router.replace('/'); router.refresh()
  }
  return <main className="min-h-screen bg-background px-5 py-8 text-foreground"><div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center"><div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-card/70 shadow-2xl shadow-black/20 lg:grid-cols-2"><section className="hidden min-h-[620px] flex-col justify-between border-r border-white/10 bg-emerald-950/30 p-10 lg:flex"><div className="flex items-center gap-3"><span className="brand-mark"><Moon size={18}/></span><span className="font-mono text-sm tracking-[0.18em] text-emerald-100">SIRAJ</span></div><div><p className="eyebrow text-gold">A quieter rhythm</p><h1 className="mt-5 max-w-md font-serif text-5xl leading-tight text-emerald-50">Return to what keeps you steady.</h1><p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">Your prayers, your private record, your rhythm — held with care.</p></div><p className="text-xs text-muted-foreground">Small, consistent deeds are beloved.</p></section><section className="p-7 sm:p-12"><div className="mb-12 flex items-center gap-3 lg:hidden"><span className="brand-mark"><Moon size={18}/></span><span className="font-mono text-sm tracking-[0.18em] text-emerald-100">SIRAJ</span></div><p className="eyebrow">Welcome back</p><h2 className="mt-3 font-serif text-4xl text-emerald-50">Sign in to Siraj</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Continue your daily salah and Tahajjud record.</p><form onSubmit={submit} className="mt-9 flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm text-emerald-50">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="auth-input" placeholder="you@example.com" /></label><label className="flex flex-col gap-2 text-sm text-emerald-50">Password<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="auth-input" placeholder="Your password" /></label>{error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={loading} className="primary-button mt-2">{loading ? 'Signing in…' : 'Sign in'}<ArrowRight size={16}/></button>{error.includes('confirm')&&<button type="button" disabled={resending||!email} onClick={async()=>{setResending(true);const {error:resendError}=await createClient().auth.resend({type:'signup',email:email.trim().toLowerCase(),options:{emailRedirectTo:process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL||`${window.location.origin}/auth/callback`}});setResending(false);setError(resendError?'We could not send a new link. Check the email address and try again.':'A new confirmation link has been sent. Check your inbox and spam folder.')}} className="text-left text-sm text-gold underline underline-offset-4 disabled:opacity-50">{resending?'Sending…':'Send a new confirmation link'}</button>}</form><div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-emerald-300"/> Your account data is protected per user.</div><p className="mt-10 text-center text-sm text-muted-foreground">New to Siraj? <Link href="/auth/sign-up" className="text-emerald-300 hover:text-emerald-200">Create an account</Link></p></section></div></div></main>
}
