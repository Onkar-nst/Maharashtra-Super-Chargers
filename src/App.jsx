import { useEffect, useRef, useState } from 'react'
import { record, squad } from './data'

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const [ref, inView] = useInView()
  return <Tag ref={ref} className={`rv ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

function Count({ to, decimals = 0, start }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf; const t0 = performance.now()
    const tick = now => {
      const p = Math.min((now - t0) / 1200, 1)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to])
  return v.toFixed(decimals)
}

function Logo() {
  const [ok, setOk] = useState(true)
  return ok
    ? <img src="/logo.png" alt="Maharashtra Super Chargers crest" onError={() => setOk(false)} />
    : <span className="fb">MSC</span>
}

const Player = () => (
  <svg viewBox="0 0 100 110" fill="none">
    <circle cx="50" cy="24" r="17" fill="#ffffff22" />
    <path d="M14 110c0-36 16-60 36-60s36 24 36 60" fill="#ffffff22" />
  </svg>
)

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(scrollY > 10)
    addEventListener('scroll', f); return () => removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <div className="top"><div className="wrap">
        <span>ISCL · Season 2026</span>
        <a href="https://isclcricket.in/teams" target="_blank" rel="noopener">isclcricket.in ↗</a>
      </div></div>
      <header className={scrolled ? 'scrolled' : ''}><div className="wrap">
        <a href="#top" className="brand">
          <span className="crestmini"><Logo /></span>
          <span>SUPER CHARGERS<small>MAHARASHTRA</small></span>
        </a>
        <nav className="menu">
          <a href="#squad">Squad</a><a href="#season">Season</a><a href="#about">About</a>
        </nav>
        <a href="#fans" className="pill">Join the Pride</a>
      </div></header>
    </>
  )
}

function Strip() {
  const [ref, inView] = useInView()
  const cells = [
    ['Matches', record.played], ['Won', record.won, 'w'], ['Lost', record.lost, 'l'],
    ['Points', record.points, 'p'], ['NRR', record.nrr, '', 3],
  ]
  return (
    <div className="strip" ref={ref}><div className="wrap"><div className="grid">
      {cells.map(([k, v, c, d]) => (
        <div key={k} className={`cell ${c || ''}`}>
          <b>{d ? '+' : ''}<Count to={v} decimals={d || 0} start={inView} /></b>
          <span>{k}</span>
        </div>
      ))}
    </div></div></div>
  )
}

function Squad() {
  const roles = ['All', ...new Set(squad.map(p => p.role))]
  const [f, setF] = useState('All')
  const list = squad.filter(p => f === 'All' || p.role === f)
  return (
    <section id="squad"><div className="wrap">
      <Reveal className="sh">
        <div><span className="label">Squad 2026</span><h2>Meet the Pride</h2></div>
      </Reveal>
      <div className="filters">
        {roles.map(r => <button key={r} className={f === r ? 'on' : ''} onClick={() => setF(r)}>{r}</button>)}
      </div>
      <div className="squad">
        {list.map((p, i) => (
          <Reveal key={p.no} className="card" delay={i * 60}>
            <span className="jn">{p.no}</span>
            <Player />
            <div className="info"><h3>{p.name}</h3><span>{p.role}</span></div>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

function Season() {
  const [ref, inView] = useInView()
  const pct = Math.round(record.won / record.played * 100)
  return (
    <section id="season" className="dark"><div className="wrap" ref={ref}>
      <div className="sh"><div><span className="label">Season</span><h2>How we're doing</h2></div>
        <a href="https://isclcricket.in/teams" target="_blank" rel="noopener">Full standings →</a></div>
      <div className="two">
        <div className="panel">
          <h4>Results</h4>
          <div className="formrow">
            {Array.from({ length: record.played }, (_, i) => <i key={i} className={i < record.won ? 'W' : 'L'}>{i < record.won ? 'W' : 'L'}</i>)}
            <i className="N">–</i><i className="N">–</i>
          </div>
          <p className="sub">Totals from ISCL. Match-by-match order not shown.</p>
          <div className="meter">
            <p><span>Win rate</span><span>{pct}%</span></p>
            <div><i style={{ width: inView ? pct + '%' : 0 }} /></div>
          </div>
        </div>
        <div className="panel">
          <h4>Net run rate</h4>
          <div className="big">+<Count to={record.nrr} decimals={3} start={inView} /></div>
          <p className="sub">{record.points} points from {record.played} matches. When we win, we win by a distance.</p>
        </div>
      </div>
    </div></section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <div className="hero" id="top"><div className="wrap">
        <div>
          <span className="label load">Official team site</span>
          <h1 className="load" style={{ animationDelay: '.1s' }}>Maharashtra<br /><span>Super Chargers</span></h1>
          <p className="load" style={{ animationDelay: '.2s' }}>Softball cricket's pride of Maharashtra, playing in the ISCL.
            <span className="mr">आपला संघ, आपला अभिमान</span></p>
          <div className="actions load" style={{ animationDelay: '.3s' }}>
            <a href="#squad" className="btn">View squad</a>
            <a href="#season" className="btn ghost">Season stats</a>
          </div>
        </div>
        <div className="hero-art load" style={{ animationDelay: '.15s' }}>
          <span className="ring r2" /><span className="ring" />
          <div className="crest"><Logo /></div>
        </div>
      </div></div>
      <Strip />
      <Squad />
      <Season />
      <section id="about"><div className="wrap about">
        <Reveal>
          <span className="label">About</span>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>Built in the gullies of Maharashtra</h2>
          <p>We're a softball cricket side carrying Maharashtra's colours into the ISCL. Our lion crest stands for one thing: we don't give up a game easily.</p>
        </Reveal>
        <Reveal className="quote" delay={100}>
          <div className="mr">“गणपती बाप्पा मोरया!”</div>
          <small>Heard from our dugout before every match.</small>
        </Reveal>
      </div></section>
      <div className="cta" id="fans"><div className="wrap">
        <div><h3>Back the Super Chargers</h3><p>Fixtures, results and standings on the official ISCL site.</p></div>
        <a href="https://isclcricket.in/teams" target="_blank" rel="noopener" className="btn">Follow on ISCL →</a>
      </div></div>
      <footer><div className="wrap">
        <span>© 2026 Maharashtra Super Chargers</span>
        <span className="mr">जय महाराष्ट्र</span>
      </div></footer>
    </>
  )
}
