import { useState } from 'react'
import { MSC, teams, results } from './matches'

const team = k => (k === 'MSC' ? MSC : teams[k])
const fmt = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

function Side({ k, score, right }) {
  const t = team(k)
  return (
    <div className={`fx-side ${right ? 'r' : ''} ${k === 'MSC' ? 'us' : ''}`}>
      <img src={t.logo} alt="" />
      <div><b>{t.name}</b><span>{score}</span></div>
    </div>
  )
}

// biggest win = largest margin among wins
export const featured = results.filter(r => r.won).sort((a, b) => parseInt(b.summary.match(/\d+/)) - parseInt(a.summary.match(/\d+/)))[0]

export function ScoreCard({ r, label = 'Featured match' }) {
  const t1 = team(r.home), t2 = team(r.away)
  return (
    <div className={`sc ${r.won ? 'won' : 'lost'}`}>
      <div className="sc-top"><span className="sc-live"><i />{label}</span><span>{r.stage}</span></div>
      <div className="sc-mid">
        {[[t1, r.homeScore, r.home], [t2, r.awayScore, r.away]].map(([t, sc, k]) => (
          <div key={k} className={`sc-team ${k === 'MSC' ? 'us' : ''}`}>
            <img src={t.logo} alt="" />
            <b>{t.name}</b>
            <span>{sc}</span>
          </div>
        ))}
        <span className="sc-vs">VS</span>
      </div>
      <div className="sc-res">{r.summary}</div>
      <div className="sc-foot">{fmt(r.date)} · {r.time}{r.venue ? ` · ${r.venue}` : ''}</div>
    </div>
  )
}

export function Form() {
  return (
    <div className="form5">
      <span>Form</span>
      {results.map(r => <i key={r.stage} className={r.won ? 'W' : 'L'} title={r.summary}>{r.won ? 'W' : 'L'}</i>)}
    </div>
  )
}

export default function Fixtures() {
  const [tab, setTab] = useState('results')
  const won = results.filter(r => r.won).length
  return (
    <main className="fx">
      <section className="fx-hero2">
        <div className="fx-stripes" aria-hidden />
        <div className="wrap fx-h2">
          <div>
            <a href="#/" className="fx-back">← Home</a>
            <span className="kick">Match centre</span>
            <h1>Fixtures<br /><span>&amp; Results</span></h1>
            <p>Every match the Super Chargers have played in the ISCL.</p>
            <div className="fx-pills">
              <div><b>{results.length}</b>Played</div>
              <div className="w"><b>{won}</b>Won</div>
              <div className="l"><b>{results.length - won}</b>Lost</div>
            </div>
            <Form />
          </div>
          <ScoreCard r={featured} label="Biggest win" />
        </div>
      </section>

      <section className="fx-body"><div className="wrap">
        <div className="fx-tabs">
          <button className={tab === 'upcoming' ? 'on' : ''} onClick={() => setTab('upcoming')}>Season 2 · Upcoming</button>
          <button className={tab === 'results' ? 'on' : ''} onClick={() => setTab('results')}>Season 1 · Results</button>
        </div>

        {tab === 'upcoming' ? (
          <div className="fx-empty">
            <img src="/logo.png" alt="" />
            <h3>Season 2 schedule coming soon</h3>
            <p>ISCL Season 2 has 32 teams and 127 matches. Our fixtures will appear here once the league releases them.</p>
            <a className="btn" href="https://isclcricket.in" target="_blank" rel="noopener">Check isclcricket.in →</a>
          </div>
        ) : (
          <div className="fx-list">
            {[...results].reverse().map(r => (
              <article key={r.stage} className={`fx-card ${r.won ? 'won' : 'lost'}`}>
                <div className="fx-meta">
                  <span className="fx-stage">{r.stage}</span>
                  <span>{fmt(r.date)} · {r.time}{r.venue ? ` · ${r.venue}` : ''}</span>
                </div>
                <div className="fx-teams">
                  <Side k={r.home} score={r.homeScore} />
                  <span className="fx-vs">VS</span>
                  <Side k={r.away} score={r.awayScore} right />
                </div>
                <div className="fx-res"><i>{r.won ? 'W' : 'L'}</i>{r.summary}</div>
              </article>
            ))}
          </div>
        )}
      </div></section>
    </main>
  )
}
