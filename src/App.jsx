import { useEffect, useRef, useState } from 'react'
import { record, squad } from './data'
import Fixtures, { ScoreCard, Form, featured } from './Fixtures'
import { results } from './matches'

const IG = 'https://www.instagram.com/maharashtra_super_charges_iscl/'
const ISCL = 'https://isclcricket.in/teams'
const C = { navy: '#0a1d4d', blue: '#1d4fb5', red: '#d7262b', gold: '#f0b429', lime: '#8fae17' }

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const [ref, inView] = useInView()
  return <Tag ref={ref} className={`rv ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

const InstaIcon = () => <svg viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg>
const WaIcon = () => <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.2 1.4z"/></svg>
const ShareIcon = () => <svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7l-6.7 3.4a3 3 0 1 0 0 3.2L15 17a3 3 0 1 0 3-1z"/></svg>
const GlobeIcon = () => <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16 16 0 0 0 0 4H4.3zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zM16.3 14a16 16 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z"/></svg>

function StickySocial() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => setShow(scrollY > 600); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  const share = () => navigator.share ? navigator.share({ title: 'Maharashtra Super Chargers', url: location.href }).catch(() => {}) : navigator.clipboard?.writeText(location.href)
  return (
    <>
      <div className="sticky-social">
        <a href={IG} target="_blank" rel="noopener" aria-label="Instagram"><InstaIcon /></a>
        <a href={`https://wa.me/?text=${encodeURIComponent('Maharashtra Super Chargers ⚡ ' + location.href)}`} target="_blank" rel="noopener" aria-label="Share on WhatsApp"><WaIcon /></a>
        <a href={ISCL} target="_blank" rel="noopener" aria-label="ISCL"><GlobeIcon /></a>
        <a href="#top" onClick={e => { e.preventDefault(); share() }} aria-label="Share"><ShareIcon /></a>
      </div>
      <a href="#top" className={`totop ${show ? 'show' : ''}`} aria-label="Back to top">↑</a>
    </>
  )
}

// jersey graphic in team colours, used until real player photos are added
const Jersey = ({ no }) => (
  <svg viewBox="0 0 200 240">
    <circle cx="100" cy="48" r="34" fill="#c99a6e" />
    <path d="M70 40 Q100 0 130 40 Q120 22 100 22 Q80 22 70 40Z" fill="#1d1d1d" />
    <path d="M40 240 V120 Q40 90 70 84 L84 80 Q100 96 116 80 L130 84 Q160 90 160 120 V240Z" fill="#1d4fb5" />
    <path d="M84 80 Q100 96 116 80 L112 78 Q100 90 88 78Z" fill="#f0b429" />
    <path d="M40 120 Q40 90 70 84 L62 130 L40 140Z M160 120 Q160 90 130 84 L138 130 L160 140Z" fill="#0a1d4d" />
    <path d="M58 150 L80 140 L74 160 Z" fill="#d7262b" /><path d="M142 150 L120 140 L126 160 Z" fill="#d7262b" />
    <text x="100" y="185" textAnchor="middle" fontFamily="Oswald" fontWeight="700" fontSize="46" fill="#fff">{no}</text>
    <text x="100" y="128" textAnchor="middle" fontFamily="Oswald" fontWeight="600" fontSize="14" fill="#f0b429" letterSpacing="2">CHARGERS</text>
  </svg>
)

const ERing = ({ className = '' }) => (
  <svg className={`eRing ${className}`} viewBox="0 0 200 200">
    <path d="M100 4 L112 14 L124 6 L134 18 L148 14 L154 28 L168 28 L170 42 L184 46 L180 60 L194 68 L186 80 L196 92 L186 102 L194 116 L182 122 L186 138 L172 140 L170 156 L156 154 L150 168 L136 162 L128 176 L116 166 L104 178 L94 166 L80 174 L74 160 L58 164 L56 150 L40 148 L42 134 L28 128 L34 116 L22 106 L32 94 L22 82 L34 74 L28 60 L42 56 L42 40 L56 40 L60 26 L74 30 L82 16 L94 24Z" />
  </svg>
)

const Ball = props => <svg viewBox="0 0 40 40" {...props}><circle cx="20" cy="20" r="18" fill="#c6e03a" stroke="#0d1220" strokeWidth="2" /><path d="M6 10 Q20 20 6 30 M34 10 Q20 20 34 30" stroke="#fff" strokeWidth="2.5" fill="none" /></svg>
const Bolt = props => <svg viewBox="0 0 24 48" className="bolt" {...props}><path d="M14 1 L2 26 H11 L7 47 L22 18 H13Z" /></svg>

// real stadium / ground photo drifting slowly behind a section, with floodlight glows and scroll parallax
function BgFx({ img, tone = 'light' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const f = () => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight) return
      el.style.setProperty('--par', ((r.top + r.height / 2 - innerHeight / 2) / innerHeight).toFixed(3))
    }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <div className={`bgfx ${tone}`} ref={ref} aria-hidden>
      <div className="bgphoto" style={{ backgroundImage: `url(${img})` }} />
      <div className="bgtint" />
      <span className="flood f1" /><span className="flood f2" /><span className="flood f3" />
    </div>
  )
}

const news = [
  { tag: 'Press', color: C.red, img: '/img/mumbai.jpg', title: 'Mumbai papers cover ISCL Season 2', text: '15 newspaper reports from Mumbai on the launch of ISCL Season 2.', href: ISCL },
  { tag: 'Press', color: C.blue, img: '/img/nagpur.jpg', title: 'Nagpur says the second season has begun', text: '32 teams, 127 matches. Seven Nagpur papers covered the Season 2 launch.', href: ISCL },
  { tag: 'League', color: '#0d1220', img: '/img/harbhajan-singh-season2.jpg', title: 'Harbhajan Singh joins Season 2', text: 'The former India spinner comes on board as ISCL brand ambassador.', href: ISCL },
]

const tiles = [
  { img: '/img/hero-stadium-lit.jpg', t: 'Under the lights' },
  { img: '/img/gully_cricket.png', t: 'Where it started' },
  { img: '/img/event-launch-group.jpg', t: 'Season 2 launch' },
  { img: '/img/cricket_stadium_night.png', t: 'Match night' },
  { img: '/img/season2-launch-bengaluru.jpg', t: 'Bengaluru launch' },
]

const posts = [
  { img: '/img/season2-press-coverage.jpg', cap: 'ISCL Season 2 is all over the papers. Maharashtra, are you ready? #ISCL' },
  { img: '/img/gully_cricket.png', cap: 'Din raat mehnat ki hai… ab stadium mein hi khelega! #GullyToGlory' },
  { img: '/img/event-launch-group.jpg', cap: 'Season 2 is officially on. Let’s go Chargers! #MSC #ISCL' },
]

const PARTNERS = ['sony-sports.jpg', 'act-fibernet.png', 'ryoto-electrix.png', 'jeffs-group.png', 'the-finest.png', 'screenox.png', 'myasia.png', 'newgen-event-studio.png', 'notch.png', 'xplurger.png', 'genz-kids.png']

const FRAMES = 80
const frameSrc = n => `/hero-frames/frame-${String(n + 1).padStart(3, '0')}.jpg`

// Stadium floodlights switch on as you scroll (same frame sequence as isclcricket.in)
function Hero({ children }) {
  const track = useRef(null), canvas = useRef(null), imgs = useRef([]), cur = useRef(0)
  const [p, setP] = useState(0)
  useEffect(() => {
    const cv = canvas.current, ctx = cv.getContext('2d')
    const draw = n => {
      let img = imgs.current[n]
      for (let d = 1; !img && d < FRAMES; d++) img = imgs.current[n - d] || imgs.current[n + d]
      if (!img) return
      cur.current = n
      const W = cv.width, H = cv.height, r = Math.max(W / img.width, H / img.height)
      const w = img.width * r, h = img.height * r
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h)
    }
    const size = () => { const d = devicePixelRatio || 1; cv.width = innerWidth * d; cv.height = innerHeight * d; draw(cur.current) }
    size()
    const mobile = innerWidth < 768
    for (let n = 0; n < FRAMES; n++) {
      if (mobile && n !== FRAMES - 1) continue
      const im = new Image(); im.src = frameSrc(n)
      im.onload = () => { imgs.current[n] = im; if (n === 0 || (mobile && n === FRAMES - 1)) draw(n) }
    }
    const onScroll = () => {
      if (mobile) return
      const el = track.current, max = el.offsetHeight - innerHeight
      const prog = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / max))
      setP(prog)
      draw(Math.round(Math.min(1, prog / 0.85) * (FRAMES - 1)))
    }
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', size)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', size) }
  }, [])
  const dust = useRef(Array.from({ length: 18 }, () => ({ l: Math.random() * 100, t: 60 + Math.random() * 60, d: 12 + Math.random() * 16, o: Math.random() * 10 })))
  return (
    <section className="hero scrub" id="top">
      <div className="track" ref={track}>
        <div className="stick">
          <canvas ref={canvas} />
          <div className="hshade" /><div className="tint" />
          {dust.current.map((d, k) => <span key={k} className="dust" style={{ left: d.l + '%', top: d.t + '%', animationDuration: d.d + 's', animationDelay: -d.o + 's' }} />)}
          <div className="wrap"><div className="left" style={{ transform: `translateY(${p * -60}px)`, opacity: 1 - Math.max(0, p - 0.75) * 3 }}>
            <div className="den">ISCL · Season 2</div>
            <h1>
              <span className="ln">{'Maharashtra'.split('').map((c, k) => <span className="w" key={k} style={{ animationDelay: k * 40 + 'ms' }}>{c}</span>)}</span>
              <span className="ln">{'Super Chargers'.split('').map((c, k) => <span className="w" key={k} style={{ animationDelay: 450 + k * 40 + 'ms' }}>{c === ' ' ? '\u00a0' : c}</span>)}</span>
            </h1>
            <p className="caption">From the gully to the floodlights. <b>Maharashtra's softball cricket side in the ISCL.</b> <span className="mr">आपला संघ, आपला अभिमान.</span></p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
              <a href="#squad" className="btn">Meet the squad</a>
              <a href={IG} target="_blank" rel="noopener" className="btn dark">Follow on Instagram</a>
            </div>
          </div></div>
        </div>
      </div>
      {children}
    </section>
  )
}

// line icons for the crest cards (stroke only, inherits colour)
const CREST = {
  crown: <svg viewBox="0 0 24 24"><path d="M3 18h18M4 16 3 7l5 4 4-6 4 6 5-4-1 9z" /></svg>,
  bats: <svg viewBox="0 0 24 24"><path d="m5 3 9 9m-2 2 7 7M19 3l-9 9m2 2-7 7M14 12l-2 2 2 2 2-2zM10 12l2 2-2 2-2-2z" /></svg>,
  bolt: <svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>,
  ball: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.5 5.5c3 3 3 10 0 13M18.5 5.5c-3 3-3 10 0 13" /></svg>,
}

// two tilted film strips of real photos sliding behind the gallery
const REEL = ['/img/hero-stadium-lit.jpg', '/img/gully_cricket.png', '/img/event-launch-group.jpg', '/img/harbhajan-singh-season2.jpg', '/img/cricket_stadium_night.png', '/img/season2-launch-bengaluru.jpg', '/hero-frames/frame-060.jpg', '/img/season2-press-coverage.jpg']
function FilmReel() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let raf = 0
    const f = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > innerHeight) return
        // 0 when the section enters from below, 1 when it leaves at the top
        el.style.setProperty('--sp', ((innerHeight - r.top) / (innerHeight + r.height)).toFixed(4))
      })
    }
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, [])
  const strip = (dir, offset) => (
    <div className={`reel ${dir}`}>
      <div className="reel-track">
        {[...REEL, ...REEL, ...REEL].map((src, k) => <div className="frame" key={k} style={{ backgroundImage: `url(${REEL[(k + offset) % REEL.length]})` }} />)}
      </div>
    </div>
  )
  return <div className="reels" ref={ref} aria-hidden>{strip('r1', 0)}{strip('r2', 3)}</div>
}

function Squad() {
  const [all, setAll] = useState(false)
  const [role, setRole] = useState('All')
  const roles = ['All', ...new Set(squad.map(p => p.role))]
  const list = role === 'All' ? squad : squad.filter(p => p.role === role)
  const shown = all || role !== 'All' ? list : list.slice(0, 9)
  const count = r => (r === 'All' ? squad.length : squad.filter(p => p.role === r).length)
  return (
    <section className="squad sq2" id="squad"><div className="wrap">
      <div className="sq-head">
        <div><span className="kick">Squad 2026</span>
          <h2 className="title">The <em>Pride</em> of Maharashtra</h2></div>
        <div className="sq-tabs">
          {roles.map(r => (
            <button key={r} className={r === role ? 'on' : ''} onClick={() => setRole(r)}>{r}<i>{count(r)}</i></button>
          ))}
        </div>
      </div>
      <div className="sq-grid">
        {shown.map((p, i) => {
          const [first, ...rest] = p.name.split(' ')
          return (
            <Reveal key={p.no} delay={(i % 5) * 60} className={`pc${p.captain ? ' capt' : ''}`}>
              <span className="pc-no">{p.no}</span>
              {p.captain && <span className="pc-c">Captain</span>}
              <div className="pc-ph">{p.photo ? <img src={p.photo} alt={p.name} loading="lazy" /> : <Jersey no={p.no} />}</div>
              <div className="pc-nm">
                <small>{first}</small><b>{rest.join(' ')}</b>
                <span>{p.role}</span>
              </div>
            </Reveal>
          )
        })}
        {!all && role === 'All' && (
          <button className="pc pc-more" onClick={() => setAll(true)}>
            <span className="sa-num">+{squad.length - 9}</span>
            <span className="sa-txt">See all<br />players</span>
            <span className="sa-arrow">→</span>
          </button>
        )}
      </div>
      {all && role === 'All' && <div style={{ textAlign: 'center', marginTop: 32 }}><button className="btn" onClick={() => { setAll(false); document.getElementById('squad').scrollIntoView() }}>Show less</button></div>}
    </div></section>
  )
}

function Footer() {
  return (
    <footer><div className="wrap">
        <div className="grid">
          <div className="fb"><img src="/logo.png" alt="" /><div><b style={{ color: '#fff', fontFamily: 'Oswald', fontSize: 18 }}>MAHARASHTRA SUPER CHARGERS</b><br />Indian Softball Cricket League</div></div>
          <div><h4>Team</h4><ul><li><a href="#squad">Squad</a></li><li><a href="#news">Updates</a></li><li><a href="#gallery">Gallery</a></li></ul></div>
          <div><h4>Follow</h4><ul><li><a href={IG} target="_blank" rel="noopener">Instagram</a></li><li><a href={ISCL} target="_blank" rel="noopener">ISCL Teams</a></li><li><a href="https://isclcricket.in" target="_blank" rel="noopener">isclcricket.in</a></li></ul></div>
        </div>
        <div className="copy"><span>© 2026 Maharashtra Super Chargers</span><span className="mr">जय महाराष्ट्र</span></div>
      </div></footer>
  )
}

function useRoute() {
  const get = () => (location.hash.startsWith('#/fixtures') ? 'fixtures' : 'home')
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const f = () => {
      const r = get(); setRoute(r)
      const id = location.hash.slice(1)
      if (r === 'fixtures' || id === '/' || !id) scrollTo(0, 0)
      else requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    }
    addEventListener('hashchange', f); return () => removeEventListener('hashchange', f)
  }, [])
  return route
}

export default function App() {
  const route = useRoute()
  const header = (
    <header><div className="wrap">
      <a href="#/" className="brand"><img src="/logo.png" alt="Maharashtra Super Chargers" /><b>SUPER CHARGERS</b></a>
      <nav className="menu"><a href="#news">Updates</a><a href="#featured">Featured</a><a href="#squad">Squad</a><a href="#/fixtures" className={route === 'fixtures' ? 'on' : ''}>Fixtures</a><a href="#about">About</a><a href="#gallery">Gallery</a></nav>
      <div className="socials"><a href={IG} target="_blank" rel="noopener" aria-label="Instagram"><InstaIcon /></a></div>
    </div></header>
  )
  if (route === 'fixtures') return (<><StickySocial />{header}<Fixtures /><Footer /></>)
  return (
    <>
      <StickySocial />
      {header}

      <Hero>
        <div className="partners">
          <span className="plabel">League partners</span>
          <div className="pmask"><div className="ptrack">
            {[...PARTNERS, ...PARTNERS].map((f, k) => <img key={k} src={`/partners/${f}`} alt="" loading="lazy" />)}
          </div></div>
        </div>
      </Hero>

      <section className="news" id="news"><BgFx img="/hero-frames/frame-050.jpg" /><div className="wrap">
        <span className="kick">Latest</span>
        <h2 className="title">Updates from the den</h2>
        <div className="cards">
          {news.map((n, i) => (
            <Reveal key={n.title} delay={i * 80} className="card">
              <div className="thumb"><img src={n.img} alt="" loading="lazy" /><span className="tag" style={{ background: n.color }}>{n.tag}</span></div>
              <div className="body">
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <a className="more" href={n.href || '#news'} {...(n.href?.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>Read more →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div></section>

      <section className="feat" id="featured"><div className="wrap">
        <div className="feat-l">
          <span className="kick">Featured</span>
          <h2 className="title">Match of the season</h2>
          <p>Our biggest win in ISCL so far: 107/8 on the board, then Hima Hawks held to 46.</p>
          <Form />
          <div className="feat-list">
            {results.map(r => (
              <a key={r.stage} href="#/fixtures" className={r.won ? 'won' : 'lost'}>
                <i>{r.won ? 'W' : 'L'}</i><span>{r.summary}</span><small>{r.stage}</small>
              </a>
            ))}
          </div>
          <a href="#/fixtures" className="btn">All fixtures &amp; results →</a>
        </div>
        <Reveal><ScoreCard r={featured} label="Biggest win" /></Reveal>
      </div></section>

      <Squad />

      <section className="aboutmsc" id="about"><BgFx img="/img/gully_cricket.png" tone="dark" /><div className="wrap">
        <Reveal className="ab-img">
          <div className="ab-frame">
            <img src="/img/event-launch-group.jpg" alt="ISCL Season 2 launch" loading="lazy" />
            <span className="ab-tag"><i />ISCL Season 2 · Launch</span>
          </div>
          <div className="ab-badge"><img src="/logo.png" alt="" /></div>
          <div className="ab-stamp os">Est.<b>2025</b></div>
        </Reveal>
        <Reveal className="ab-text" delay={100}>
          <span className="kick">About MSC</span>
          <h2 className="title">Maharashtra's team <em>in the ISCL</em></h2>
          <p className="ab-lead">Maharashtra Super Chargers is the state's side in the <b>Indian Softball Cricket League</b>, the national tennis-ball league that takes players from gully matches to stadium lights.</p>
          <div className="ab-crest">
            {[[CREST.crown, 'Crowned lion', 'Pride'], [CREST.bats, 'Crossed bats', 'The game'], [CREST.bolt, 'Lightning', 'How we play'], [CREST.ball, 'Tennis ball', 'Where it began']].map(([ic, t, d]) => (
              <div key={t}><span>{ic}</span><b>{t}</b><small>{d}</small></div>
            ))}
          </div>
          <div className="ab-facts">
            <div><b>{squad.length}</b><span>Players</span></div>
            <div><b>{squad.find(p => p.captain)?.name.split(' ')[0]}</b><span>Captain</span></div>
            <div><b>S2</b><span>ISCL season</span></div>
          </div>
        </Reveal>
      </div></section>

      <section className="gallery" id="gallery"><BgFx img="/img/hero-stadium-lit.jpg" tone="gold" /><FilmReel /><div className="wrap">
        <span className="kick">Gallery</span>
        <h2 className="title">From the ground</h2>
        <div className="tiles">
          {tiles.map((t, i) => <div key={i}><img className="zoom" src={t.img} alt="" loading="lazy" /><span className="os">{t.t}</span></div>)}
        </div>
      </div></section>

      <section className="ig" id="ig"><BgFx img="/img/cricket_stadium_night.png" tone="dark" /><div className="wrap">
        <div className="head">
          <div><span className="kick">Instagram</span><h2 className="title">@maharashtra_super_charges_iscl</h2></div>
          <a href={IG} target="_blank" rel="noopener" className="btn">Follow on Instagram</a>
        </div>
        <div className="posts">
          {posts.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <a href={IG} target="_blank" rel="noopener" className="post" style={{ display: 'block' }}>
                <div className="pi"><img src={p.img} alt="" loading="lazy" /></div>
                <p><b>maharashtra_super_charges_iscl</b> {p.cap}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div></section>

      <Footer />
    </>
  )
}
