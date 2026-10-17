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

// scoreboard-style number: flicks through digits before settling
function Flick({ value, decimals = 0, start }) {
  const [v, setV] = useState((0).toFixed(decimals))
  useEffect(() => {
    if (!start) return
    let n = 0
    const id = setInterval(() => {
      n++
      if (n > 12) { setV(value.toFixed(decimals)); clearInterval(id) }
      else setV((Math.random() * Math.max(value, 9)).toFixed(decimals))
    }, 55)
    return () => clearInterval(id)
  }, [start, value, decimals])
  return v
}

function Logo() {
  const [ok, setOk] = useState(true)
  return ok
    ? <img src="/logo.png" alt="Maharashtra Super Chargers crest" onError={() => setOk(false)} />
    : <span className="fb">MSC</span>
}

function Scoreboard() {
  const [ref, inView] = useInView()
  const cells = [
    ['Played', record.played, ''], ['Won', record.won, 'w'], ['Lost', record.lost, 'l'],
    ['Points', record.points, 'p'], ['Net run rate', record.nrr, '', 3],
  ]
  return (
    <div ref={ref}>
      <div className="board">
        {cells.map(([label, val, cls, d]) => (
          <div key={label}>
            <span className={`n ${cls}`}>{d ? '+' : ''}<Flick value={val} decimals={d || 0} start={inView} /></span>
            <span className="mono">{label}</span>
          </div>
        ))}
      </div>
      <div className="form">
        <span className="mono">Win %</span>
        <div className="bar"><i style={{ width: inView ? `${(record.won / record.played) * 100}%` : 0 }} /></div>
        <span className="mono">{Math.round((record.won / record.played) * 100)}</span>
      </div>
    </div>
  )
}

const ticker = ['Maharashtra Super Chargers', 'गणपती बाप्पा मोरया', 'ISCL 2026', 'जय महाराष्ट्र', 'Played 5 · Won 3', 'आपला संघ, आपला अभिमान']

export default function App() {
  return (
    <>
      <header className="strip">
        <a href="#top" className="brand"><Logo /> Super Chargers</a>
        <nav className="mono">
          <a href="#season">Season</a><a href="#squad">Squad</a><a href="#story">Story</a><a href="#follow">Follow</a>
        </nav>
      </header>

      <div className="hero" id="top">
        <div className="hero-l">
          <span className="mr kick">आपला संघ.</span>
          <h1><span><i>Maharashtra</i></span><span><i>Super Chargers</i></span></h1>
          <p>Six names on the team sheet, one state behind them. <b>We play ISCL softball cricket</b> for Maharashtra.</p>
        </div>
        <div className="hero-r">
          <span className="stamp mono">Est. Maharashtra</span>
          <div className="crest"><Logo /></div>
          <span className="mr big-mr">म</span>
        </div>
      </div>

      <div className="ticker" aria-hidden>
        <div>{[...ticker, ...ticker].map((t, i) => <span key={i}>{t} &nbsp;/</span>)}</div>
      </div>

      <section id="season">
        <div className="wrap">
          <Reveal className="head">
            <h2><small>हंगाम</small>The season so far</h2>
            <span className="mono">Updated 17 Oct 2026</span>
          </Reveal>
          <Scoreboard />
          <Reveal as="p" className="note">Two losses, but a +2.073 net run rate tells you how the three wins went.</Reveal>
        </div>
      </section>

      <section id="squad">
        <div className="wrap">
          <Reveal className="head">
            <h2><small>संघ</small>Team sheet</h2>
            <span className="mono">{squad.length} players</span>
          </Reveal>
          <div className="sheet">
            {squad.map((p, i) => (
              <Reveal key={p.no} className="row" delay={i * 60}>
                <span className="no">{String(p.no).padStart(2, '0')}</span>
                <span className="nm">{p.name}</span>
                <span className="rl mono">{p.role}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="story">
        <div className="wrap about">
          <Reveal>
            <h2 style={{ marginBottom: 28 }}><small>आमची गोष्ट</small>Who we are</h2>
            <p>Most of us learned the game with a tennis ball in a gully, and plenty still play that way on weekends.</p>
            <p>The lion on the crest is there because we don't let a game go easily.</p>
          </Reveal>
          <Reveal className="pull">
            “गणपती बाप्पा मोरया!”
            <small>What you'll hear from our dugout before every match.</small>
          </Reveal>
        </div>
      </section>

      <section id="follow" className="cta">
        <div className="wrap">
          <Reveal as="h2">Come watch<br /><em>us play.</em></Reveal>
          <a className="btn" href="https://isclcricket.in/teams" target="_blank" rel="noopener">Fixtures on ISCL →</a>
        </div>
      </section>

      <footer className="mono">
        <span>© 2026 Maharashtra Super Chargers</span>
        <span className="mr" style={{ textTransform: 'none', fontSize: 15 }}>जय महाराष्ट्र</span>
      </footer>
    </>
  )
}
