'use client'

import { useMemo, useState } from 'react'
import { Bell, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Flame, Home, Moon, MoreHorizontal, Settings, Sparkles, Sunrise, Target, TrendingUp } from 'lucide-react'

const prayers = [
  { name: 'Fajr', arabic: 'الفجر', time: '5:18 AM', tone: 'gold' },
  { name: 'Dhuhr', arabic: 'الظهر', time: '12:41 PM', tone: 'emerald' },
  { name: 'Asr', arabic: 'العصر', time: '4:08 PM', tone: 'emerald' },
  { name: 'Maghrib', arabic: 'المغرب', time: '7:31 PM', tone: 'emerald' },
  { name: 'Isha', arabic: 'العشاء', time: '8:54 PM', tone: 'slate' },
]

const tahajjudDays = [true, true, false, true, true, false, true, false, false, true, true, true, false, true, true, false, false, true, true, false, true, false, true, true, true, false, false, true, true, false]

export default function Page() {
  const [active, setActive] = useState<'dashboard' | 'history' | 'insights' | 'settings'>('dashboard')
  const [completed, setCompleted] = useState([true, true, true, true, false])
  const [monthOffset, setMonthOffset] = useState(0)
  const [showPrayerMenu, setShowPrayerMenu] = useState<number | null>(null)
  const completion = Math.round((completed.filter(Boolean).length / prayers.length) * 100)
  const month = useMemo(() => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(2026, 4 + monthOffset, 1)), [monthOffset])

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="islamic-grid pointer-events-none fixed inset-0 opacity-40" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/8 bg-sidebar/60 px-5 py-7 backdrop-blur-xl lg:flex">
          <div className="mb-12 flex items-center gap-3 px-2"><div className="brand-mark"><Moon size={18} /></div><span className="font-mono text-sm font-semibold tracking-[0.18em] text-emerald-100">SIRAJ</span></div>
          <nav className="flex flex-col gap-2" aria-label="Main navigation">
            {[['dashboard', Home, 'Overview'], ['history', CalendarDays, 'History'], ['insights', TrendingUp, 'Insights'], ['settings', Settings, 'Settings']].map(([key, Icon, label]) => <button key={key as string} onClick={() => setActive(key as typeof active)} className={`nav-item ${active === key ? 'nav-item-active' : ''}`}><Icon size={17} /><span>{label as string}</span></button>)}
          </nav>
          <div className="mt-auto rounded-2xl border border-emerald-300/10 bg-emerald-400/5 p-4"><Sparkles className="mb-8 text-gold" size={18} /><p className="font-serif text-lg leading-snug text-emerald-50">Small, consistent deeds are beloved.</p><p className="mt-3 text-xs leading-5 text-muted-foreground">Build your rhythm one prayer at a time.</p></div>
        </aside>

        <section className="relative flex-1 px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
          <header className="mb-8 flex items-center justify-between"><div><p className="eyebrow">Wednesday · 20 May 2026</p><h1 className="mt-2 font-serif text-3xl tracking-tight text-emerald-50 sm:text-4xl">Peace be upon you, Yusuf.</h1></div><div className="flex items-center gap-3"><button className="icon-button hidden sm:grid" aria-label="Notifications"><Bell size={17} /></button><div className="avatar">Y</div></div></header>
          <div className="mb-7 flex gap-2 overflow-x-auto border-b border-white/8 pb-3 lg:hidden">{[['dashboard', 'Overview'], ['history', 'History'], ['insights', 'Insights'], ['settings', 'Settings']].map(([key, label]) => <button key={key} onClick={() => setActive(key as typeof active)} className={`mobile-tab ${active === key ? 'mobile-tab-active' : ''}`}>{label}</button>)}</div>

          {active === 'dashboard' && <>
            <div className="mb-7 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
              <section className="hero-card glass-panel"><div className="relative z-10"><p className="eyebrow text-gold/90">Today&apos;s progress</p><div className="mt-5 flex items-end gap-4"><span className="font-mono text-7xl font-medium tracking-[-0.08em] text-emerald-50">{completion}</span><span className="mb-2 text-sm text-muted-foreground">% complete</span></div><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">You&apos;re moving with intention. Keep the evening gentle and make space for Isha.</p><div className="mt-7 h-1.5 max-w-md overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${completion}%` }} /></div></div><div className="progress-orb"><span>{completed.filter(Boolean).length}</span><small>/ 5</small></div></section>
              <section className="glass-panel flex flex-col justify-between"><div className="flex items-start justify-between"><div><p className="eyebrow">Your rhythm</p><div className="mt-3 flex items-center gap-3"><Flame size={25} className="text-gold" /><span className="font-mono text-4xl text-emerald-50">12</span><span className="text-sm text-muted-foreground">day streak</span></div></div><button className="icon-button" aria-label="More streak options"><MoreHorizontal size={17} /></button></div><div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/8 pt-4 text-center"><div><p className="stat-number">86%</p><p className="stat-label">this month</p></div><div><p className="stat-number">4.2</p><p className="stat-label">avg. prayers</p></div><div><p className="stat-number">18</p><p className="stat-label">Tahajjud</p></div></div></section>
            </div>

            <div className="mb-7 flex items-center justify-between"><div><p className="eyebrow">Daily salah</p><h2 className="section-title">Keep your connection close</h2></div><button className="quiet-button"><CircleHelp size={15} /> Guide</button></div>
            <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{prayers.map((prayer, index) => <div key={prayer.name} className={`prayer-card ${completed[index] ? 'prayer-card-done' : ''}`}><div className="flex items-start justify-between"><div className={`prayer-icon ${prayer.tone}`}><Sunrise size={17} /></div><div className="relative"><button className="card-more" onClick={() => setShowPrayerMenu(showPrayerMenu === index ? null : index)} aria-label={`${prayer.name} options`}><MoreHorizontal size={16} /></button>{showPrayerMenu === index && <div className="menu"><button onClick={() => setShowPrayerMenu(null)}>Add note</button><button onClick={() => setShowPrayerMenu(null)}>Change status</button></div>}</div></div><div className="mt-6"><h3 className="font-serif text-xl text-emerald-50">{prayer.name}</h3><p className="arabic-text">{prayer.arabic}</p><p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 size={13} /> {prayer.time}</p></div><button onClick={() => setCompleted((items) => items.map((item, i) => i === index ? !item : item))} className={`status-button ${completed[index] ? 'status-button-done' : ''}`}><span className="status-dot">{completed[index] && <Check size={12} />}</span>{completed[index] ? 'Offered on time' : 'Mark as offered'}</button></div>)}</div>

            <div className="grid gap-5 xl:grid-cols-[1fr_1fr]"><section className="glass-panel"><div className="mb-6 flex items-start justify-between"><div><p className="eyebrow">Night worship</p><h2 className="section-title">Tahajjud rhythm</h2></div><div className="flex items-center gap-1"><button onClick={() => setMonthOffset(monthOffset - 1)} className="icon-button" aria-label="Previous month"><ChevronLeft size={16} /></button><button onClick={() => setMonthOffset(monthOffset + 1)} className="icon-button" aria-label="Next month"><ChevronRight size={16} /></button></div></div><div className="mb-5 flex items-center justify-between"><p className="font-mono text-sm text-emerald-100">{month}</p><span className="rounded-full bg-gold/10 px-2.5 py-1 text-[11px] text-gold">18 nights</span></div><div className="calendar-grid">{['M','T','W','T','F','S','S'].map((day, i) => <span key={`${day}-${i}`} className="calendar-weekday">{day}</span>)}{tahajjudDays.map((done, index) => <button key={index} className={`calendar-day ${done ? 'calendar-day-done' : ''}`} aria-label={`May ${index + 1}${done ? ', Tahajjud completed' : ''}`}><span>{index + 1}</span>{done && <Check size={11} />}</button>)}</div></section>
              <section className="glass-panel"><div className="mb-6 flex items-start justify-between"><div><p className="eyebrow">Consistency engine</p><h2 className="section-title">Predictive guard</h2></div><Target className="text-emerald-300" size={19} /></div><div className="risk-panel"><div><p className="text-xs text-muted-foreground">Tomorrow&apos;s Fajr risk</p><p className="mt-2 font-mono text-3xl text-emerald-50">24<span className="text-lg text-muted-foreground">%</span></p></div><div className="risk-ring"><span>low</span></div></div><p className="mt-5 text-sm leading-6 text-muted-foreground">Your 12-day rhythm is working. Prepare your sleep window before 11:00 PM to protect the habit.</p><button className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-300 transition hover:text-emerald-200">View your insight <ChevronRight size={14} /></button></section></div>
          </>}
          {active !== 'dashboard' && <section className="glass-panel min-h-[420px]"><p className="eyebrow">{active}</p><h2 className="mt-3 font-serif text-4xl capitalize text-emerald-50">{active === 'history' ? 'Your sacred record' : active === 'insights' ? 'Patterns with purpose' : 'Make it yours'}</h2><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">This space is ready for your personal rhythm. Your data will stay private in Supabase and remain available across every session.</p><div className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-sm text-muted-foreground">{active === 'settings' ? 'Notifications, prayer calculation method, and account preferences will live here.' : 'More detailed records will appear here as you log your prayers.'}</div></section>}
          <footer className="mt-8 flex items-center justify-between text-[11px] text-muted-foreground"><span>Last synced just now</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Private by design</span></footer>
        </section>
      </div>
    </main>
  )
}
