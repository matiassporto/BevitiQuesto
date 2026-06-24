import { useState } from 'react'

const CARDS = [
  { id:11, type:'DUELLO', text:'THUMB WAR — la classica. Best of 3.', rule:'Chi perde → beve 2 sorsi.' },
  { id:12, type:'DUELLO', text:'STARE CONTEST: fissatevi negli occhi in silenzio. Niente sorrisi, niente smorfie.', rule:'Chi sbatte le palpebre o ride per primo → beve.' },
  { id:13, type:'DUELLO', text:'Chi nomina più paesi del mondo in 30 secondi? Partite insieme.', rule:'Chi ne nomina meno → beve. Parità → bevete entrambi 1 sorso.' },
  { id:14, type:'DUELLO', text:'SASSO CARTA FORBICE — Best of 5. Niente patti, niente "ho sbagliato".', rule:'Chi perde 3 manche → beve 2 sorsi.' },
  { id:15, type:'DUELLO', text:'GARA DI APNEA: trattenete il respiro insieme al via. Chi respira per primo perde.', rule:'Chi cede per primo → beve 2 sorsi.' },
  { id:16, type:'DUELLO', text:'Chi pronuncia correttamente "Worcestershire" per primo vince. (Si dice circa: "Wuster-sheer")', rule:'Chi sbaglia o ci mette di più → beve.' },
  { id:17, type:'DUELLO', text:'Chi ricorda più personaggi Disney in 30 secondi?', rule:'Chi ne dice meno → beve. Parità → bevete entrambi.' },
  { id:18, type:'DUELLO', text:'Pensa un numero tra 1 e 10. L\'avversario ha 2 tentativi. Poi invertite i ruoli.', rule:'Chi non fa indovinare il proprio numero → beve. Chi non indovina → beve.' },
  { id:19, type:'DUELLO', text:'SFIDA DEL SILENZIO: fissatevi. Chi fa qualsiasi suono — anche un respiro rumoroso — perde.', rule:'Chi cede → beve 2 sorsi.' },
  { id:20, type:'DUELLO', text:'Contate al contrario da 20 a 0 alternandovi. Tu: 20, lui/lei: 19, tu: 18...', rule:'Chi sbaglia → beve. Arrivate a 0 senza errori? Brindisi! 1 sorso a testa.' },
  { id:42, type:'DUELLO', text:'PARI O DISPARI — 5 round. Mostrate le dita al countdown.', rule:'Chi perde 3 round → beve 2 sorsi.' },
  { id:43, type:'DUELLO', text:'RESISTENZA AL BRACCIO TESO: tenete il braccio dritto davanti a voi con il bicchiere pieno in mano. Chi lo abbassa per primo perde.', rule:'Chi cede per primo → beve 2 sorsi.' },
  { id:21, type:'TRIVIA', text:'Le mucche hanno "migliori amiche" preferite nel gregge. VERO o FALSO?', answer:'✅ VERO! Le mucche stringono legami forti e si stressano se separate dalla loro migliore amica.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:22, type:'TRIVIA', text:'Le banane sono tecnicamente delle bacche, le fragole invece no. VERO o FALSO?', answer:'✅ VERO! Botanicamente la banana è una bacca. La fragola è un "falso frutto". La botanica mente.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:23, type:'TRIVIA', text:'I polpi hanno tre cuori. VERO o FALSO?', answer:'✅ VERO! Due pompano sangue alle branchie, uno al corpo. Quando nuotano quello principale si ferma.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:24, type:'TRIVIA', text:'In Francia è illegale chiamare un maiale "Napoleone". VERO o FALSO?', answer:'✅ VERO! Una legge francese vieta quel nome per i maiali. Napoleone aveva buoni avvocati.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:25, type:'TRIVIA', text:'Capelli e unghie continuano a crescere dopo la morte. VERO o FALSO?', answer:'❌ FALSO! È un mito. La pelle si disidrata e si ritira, facendo sembrare che crescano.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:26, type:'TRIVIA', text:'Qual è la capitale dell\'Australia? ⚠️ È una trappola!', answer:'🦘 CANBERRA! Non Sydney, non Melbourne. Canberra fu costruita apposta perché le due città litigavano.', rule:'Chi dice Sydney → beve 2 sorsi. Risposta corretta → beve l\'avversario.' },
  { id:27, type:'TRIVIA', text:'La ricetta originale della carbonara include la panna. VERO o FALSO?', answer:'❌ FALSO! Carbonara vera: uova, guanciale, pecorino, pepe. La panna è un crimine culinario.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:28, type:'TRIVIA', text:'Gli elefanti sono gli unici animali che non riescono a saltare. VERO o FALSO?', answer:'❌ FALSO! Anche ippopotami, bradipi e rinoceronti non saltano. Gli elefanti non sono soli nel club.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:29, type:'TRIVIA', text:'I gamberetti mantide hanno più tipi di recettori visivi degli esseri umani. VERO o FALSO?', answer:'✅ VERO! 16 tipi vs i nostri 3. Paradossalmente però distinguono i colori peggio di noi.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:30, type:'TRIVIA', text:'In Italia il panettone artigianale ha una ricetta protetta da un disciplinare legale. VERO o FALSO?', answer:'✅ VERO! Dal 2005 esiste un disciplinare che definisce gli ingredienti minimi. Il panettone è sacro.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:44, type:'TRIVIA', text:'Il vetro è tecnicamente un liquido molto viscoso, non un solido. VERO o FALSO?', answer:'❌ FALSO! È un mito. Il vetro è un solido amorfo. Le finestre medievali più spesse in basso erano fabbricate così.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:45, type:'TRIVIA', text:'L\'Italia è il paese con più siti UNESCO al mondo. VERO o FALSO?', answer:'✅ VERO! Con 58 siti UNESCO l\'Italia è in cima alla classifica mondiale. Meritatamente.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:46, type:'TRIVIA', text:'Gli esseri umani condividono circa il 60% del DNA con le banane. VERO o FALSO?', answer:'✅ VERO! Il 60% del nostro DNA è simile a quello delle banane. Il 50% con le mosche. La vita è umile.', rule:'Sbaglia → bevi. Giusto → beve l\'avversario.' },
  { id:31, type:'REGOLA', text:'Per i prossimi 3 turni: chi dice "sì" o "no" beve automaticamente 1 sorso.', shortRule:'No "sì"/"no" → bevi', rule:'Dura 3 turni.', duration:3 },
  { id:33, type:'REGOLA', text:'REGOLA DELLA RISATA: il prossimo che ride beve 2 sorsi. Attiva finché non scatta.', shortRule:'Primo che ride → beve ×2', rule:'Dura 2 turni.', duration:2 },
  { id:34, type:'REGOLA', text:'Per i prossimi 2 turni: bevete SOLO con la mano non dominante. Mano sbagliata → sorso extra.', shortRule:'Solo mano non dominante', rule:'Dura 2 turni.', duration:2 },
  { id:35, type:'REGOLA', text:'Per i prossimi 3 turni: ogni volta che dici il nome dell\'altro/a → bevi 1 sorso.', shortRule:'Dire il nome → bevi', rule:'Dura 3 turni.', duration:3 },
  { id:37, type:'JOLLY', jollyType:'SWAP',   text:'🔄 SCAMBIO BICCHIERI: Scambiate i bicchieri per questo turno intero. Quello che doveva bere uno, lo beve l\'altro.', rule:'Effetto immediato.' },
  { id:38, type:'JOLLY', jollyType:'SHIELD', text:'🛡️ SCUDO: Conservi questa carta. La prossima volta che dovresti bere, lo scudo scatta in automatico e fa bere l\'avversario al posto tuo.', rule:'Resta attivo finché non lo usi.' },
  { id:39, type:'JOLLY', jollyType:'DOUBLE', text:'🎲 DOPPIO O NIENTE: Fate pari o dispari. Chi vince → l\'avversario beve 2 sorsi. Chi perde → beve 2 sorsi.', rule:'Alta posta in gioco.' },
  { id:40, type:'JOLLY', jollyType:'TOAST',  text:'🥂 BRINDISI OBBLIGATORIO: Bevete 1 sorso a testa in contemporanea. Siete una coppia, non solo rivali!', rule:'Entrambi bevete.' },
  { id:41, type:'JOLLY', jollyType:'ROULETTE', text:'🎯 ROULETTE DELLE DITA: al "tre" mostrate entrambi 1 o 2 dita. Se coincidono → l\'avversario beve 2. Se sono diverse → bevi tu 2.', rule:'Mano fredda, nervi saldi.' },
]

const TCFG = {
  DUELLO: { accent:'#60a5fa', bg:'#0d2137', border:'#1e4a7a', label:'⚔️ Duello!',        text:'#bfdbfe' },
  TRIVIA: { accent:'#34d399', bg:'#042f1e', border:'#065f46', label:'🧠 Trivia Nonsense', text:'#a7f3d0' },
  REGOLA: { accent:'#c084fc', bg:'#1e1040', border:'#5b21b6', label:'📜 Nuova Regola!',   text:'#ddd6fe' },
  JOLLY:  { accent:'#fbbf24', bg:'#1c1004', border:'#92400e', label:'🃏 Jolly!',           text:'#fde68a' },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]]
  }
  return a
}

function Btn({ children, bg, color, full, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: full ? '1 1 100%' : '1 1 140px',
        minWidth: '130px',
        padding: '14px 12px',
        borderRadius: '14px',
        border: 'none',
        background: bg,
        color,
        fontSize: '15px',
        lineHeight: 1.45,
        cursor: 'pointer',
        textAlign: 'center',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

export default function App() {
  const [phase,   setPhase]   = useState('setup')
  const [names,   setNames]   = useState(['',''])
  const [sips,    setSips]    = useState([0,0])
  const [cur,     setCur]     = useState(0)
  const [deck,    setDeck]    = useState([])
  const [card,    setCard]    = useState(null)
  const [showAns, setShowAns] = useState(false)
  const [rules,   setRules]   = useState([])
  const [turn,    setTurn]    = useState(1)
  const [vis,     setVis]     = useState(false)

  const oth = 1 - cur

  const start = () => {
    if (!names[0].trim() || !names[1].trim()) return
    setDeck(shuffle(CARDS))
    setSips([0,0]); setCur(0); setTurn(1); setRules([])
    setPhase('play')
  }

  const draw = () => {
    const d = deck.length > 0 ? [...deck] : shuffle(CARDS)
    setCard(d[0]); setDeck(d.slice(1))
    setShowAns(false); setVis(false)
    setPhase('card')
    setTimeout(() => setVis(true), 60)
  }

  const drink = (pi, n = 1) =>
    setSips(p => p.map((s, i) => i === pi ? s + n : s))

  const next = ({ addRule = false, clearRules = false } = {}) => {
    let nr = rules.map(r => ({ ...r, t: r.t - 1 })).filter(r => r.t > 0)
    if (clearRules) nr = []
    if (addRule && card?.duration)
      nr = [...nr, { id: Date.now(), txt: card.shortRule || card.text.slice(0,48)+'…', t: card.duration }]
    setRules(nr); setCur(1-cur); setTurn(t => t+1); setCard(null); setPhase('play')
  }

  const page = {
    minHeight: '100dvh',
    background: '#0f0f16',
    color: '#f0f0f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  }
  const wrap = {
    maxWidth: '440px',
    margin: '0 auto',
    padding: '16px 16px calc(16px + env(safe-area-inset-bottom, 0px))',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  /* ── SETUP ── */
  if (phase === 'setup') return (
    <div style={page}>
      <div style={{ ...wrap, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', paddingTop: '16px', marginBottom: '28px' }}>
          <div style={{ fontSize: '52px', lineHeight: 1, marginBottom: '12px' }}>🍻</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px', background: 'linear-gradient(135deg,#60a5fa,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Beviti Questo!
          </h1>
          <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>Il gioco alcolico assurdo per due</p>
        </div>

        {[0,1].map(i => (
          <div key={i} style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>
              {i === 0 ? 'Giocatore 1' : 'Giocatore 2'}
            </label>
            <input
              type="text"
              placeholder="Inserisci il nome…"
              value={names[i]}
              onChange={e => setNames(p => p.map((n,j) => j===i ? e.target.value : n))}
              style={{ display: 'block', width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid #2a2a3f', background: '#1a1a28', color: '#f0f0f5', fontSize: '16px', outline: 'none', boxSizing: 'border-box', WebkitAppearance: 'none' }}
            />
          </div>
        ))}

        <button
          onClick={start}
          disabled={!names[0].trim() || !names[1].trim()}
          style={{ display: 'block', width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: names[0].trim() && names[1].trim() ? 'linear-gradient(135deg,#2563eb,#7c3aed)' : '#1a1a28', color: names[0].trim() && names[1].trim() ? '#fff' : '#444', fontSize: '17px', fontWeight: 600, marginTop: '8px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Inizia il gioco →
        </button>

        <p style={{ textAlign: 'center', color: '#333', fontSize: '12px', marginTop: '20px' }}>
          35 carte · ⚔️ Duelli · 🧠 Trivia · 📜 Regole · 🃏 Jolly
        </p>
      </div>
    </div>
  )

  /* ── PLAY ── */
  if (phase === 'play') return (
    <div style={page}>
      <div style={wrap}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          {[0,1].map(i => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: '16px', background: i===cur ? '#1a1a28' : '#111118', border: `1px solid ${i===cur ? '#3a3a5a' : '#1e1e2e'}`, transition: 'all .25s' }}>
              <div style={{ fontSize: '11px', color: i===cur ? '#60a5fa' : '#444', marginBottom: '3px' }}>
                {i===cur ? '🎯 Tocca a te' : '⏳'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>{names[i]}</div>
              <div style={{ fontSize: '24px', marginTop: '4px' }}>🍺 {sips[i]}</div>
            </div>
          ))}
        </div>

        {rules.length > 0 && (
          <div style={{ background: '#12083a', border: '1px solid #5b21b6', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: 600, marginBottom: '5px' }}>📜 REGOLE ATTIVE</div>
            {rules.map(r => (
              <div key={r.id} style={{ fontSize: '12px', color: '#c4b5fd', marginBottom: '2px' }}>
                · {r.txt} <span style={{ color: '#7c3aed' }}>({r.t}T)</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '16px 0 20px' }}>
          <div style={{ fontSize: '12px', color: '#444' }}>— Turno {turn} —</div>
          <div style={{ fontSize: '16px', color: '#aaa', marginTop: '4px' }}>
            Pesca una carta, <strong style={{ color: '#f0f0f5' }}>{names[cur]}</strong>!
          </div>
        </div>

        <div
          onClick={draw}
          onPointerDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onPointerUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onPointerLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          style={{ width: '160px', height: '220px', borderRadius: '20px', background: '#1a1a28', border: '2px solid #2a2a40', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.5)', transition: 'transform .1s' }}
        >
          <div style={{ fontSize: '44px', lineHeight: 1 }}>🃏</div>
          <div style={{ color: '#60a5fa', fontSize: '14px', fontWeight: 600, marginTop: '12px' }}>Pesca!</div>
          <div style={{ color: '#333', fontSize: '11px', marginTop: '4px' }}>{deck.length} carte</div>
        </div>

        <button
          onClick={() => setPhase('setup')}
          style={{ display: 'block', margin: '24px auto 0', background: 'none', border: '1px solid #222', borderRadius: '8px', color: '#444', fontSize: '12px', padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          ↩ Nuova partita
        </button>
      </div>
    </div>
  )

  /* ── CARD ── */
  if (phase === 'card' && card) {
    const c = TCFG[card.type]
    return (
      <div style={page}>
        <div style={wrap}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {[0,1].map(i => (
              <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 12px', borderRadius: '12px', background: '#1a1a28', border: '1px solid #222' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>{names[i]}</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>🍺 {sips[i]}</span>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${c.border}`, marginBottom: '16px', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.96)', transition: 'all .35s cubic-bezier(.175,.885,.32,1.275)' }}>
            <div style={{ background: c.bg, padding: '20px 18px 16px' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', fontSize: '12px', fontWeight: 600, color: c.accent, marginBottom: '12px' }}>
                {c.label}
              </div>
              <p style={{ fontSize: '16px', lineHeight: 1.65, color: c.text, margin: '0 0 14px' }}>{card.text}</p>

              {card.type === 'TRIVIA' && !showAns && (
                <button
                  onClick={() => setShowAns(true)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,.08)', color: c.accent, fontSize: '14px', cursor: 'pointer', marginBottom: '10px', fontFamily: 'inherit' }}
                >
                  👀 Rivela risposta
                </button>
              )}
              {card.type === 'TRIVIA' && showAns && (
                <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: '10px', padding: '12px 14px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', color: c.accent, opacity: .7, marginBottom: '4px', letterSpacing: '.08em', textTransform: 'uppercase' }}>Risposta</div>
                  <div style={{ fontSize: '14px', color: c.text, lineHeight: 1.55 }}>{card.answer}</div>
                </div>
              )}
            </div>
            <div style={{ background: 'rgba(255,255,255,.03)', padding: '10px 18px', fontSize: '13px', color: '#666', borderTop: `1px solid ${c.border}` }}>
              🍺 {card.rule}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {card.type === 'DUELLO' && <>
              <Btn bg='#14532d' color='#bbf7d0' onClick={() => { drink(oth,2); next() }}>
                🏆 Ho vinto!<br/><small style={{ opacity:.8 }}>Beve {names[oth]} ×2</small>
              </Btn>
              <Btn bg='#7f1d1d' color='#fecaca' onClick={() => { drink(cur,2); next() }}>
                💀 Ho perso<br/><small style={{ opacity:.8 }}>Bevo io ×2</small>
              </Btn>
              <Btn bg='#1e293b' color='#94a3b8' full onClick={() => { drink(0,1); drink(1,1); next() }}>
                🤝 Pareggio — 1 sorso a testa
              </Btn>
            </>}

            {card.type === 'TRIVIA' && !showAns && (
              <div style={{ width: '100%', textAlign: 'center', color: '#555', fontSize: '13px', padding: '8px 0' }}>
                Rispondi, poi rivela la risposta ☝️
              </div>
            )}
            {card.type === 'TRIVIA' && showAns && <>
              <Btn bg='#14532d' color='#bbf7d0' onClick={() => { drink(oth,1); next() }}>
                ✅ Giusto!<br/><small style={{ opacity:.8 }}>Beve {names[oth]}</small>
              </Btn>
              <Btn bg='#7f1d1d' color='#fecaca' onClick={() => { drink(cur,1); next() }}>
                ❌ Sbagliato<br/><small style={{ opacity:.8 }}>Bevo io</small>
              </Btn>
            </>}

            {card.type === 'REGOLA' && (
              <Btn bg='#1e1040' color='#ddd6fe' full onClick={() => next({ addRule:true })}>
                📜 Capito! Regola aggiunta →
              </Btn>
            )}

            {card.type === 'JOLLY' && card.jollyType === 'SWAP' && (
              <Btn bg='#1c1004' color='#fde68a' full onClick={() => next()}>🔄 Scambiati! Avanti →</Btn>
            )}
            {card.type === 'JOLLY' && card.jollyType === 'GRACE' && <>
              <Btn bg='#1c1004' color='#fde68a' onClick={() => next({ clearRules:true })}>✨ Cancella regole!</Btn>
              <Btn bg='#1e293b' color='#94a3b8' onClick={() => next()}>Salta turno</Btn>
            </>}
            {card.type === 'JOLLY' && card.jollyType === 'DOUBLE' && <>
              <Btn bg='#14532d' color='#bbf7d0' onClick={() => { drink(oth,2); next() }}>
                🎲 Ho vinto!<br/><small style={{ opacity:.8 }}>Beve {names[oth]} ×2</small>
              </Btn>
              <Btn bg='#7f1d1d' color='#fecaca' onClick={() => { drink(cur,2); next() }}>
                😬 Ho perso<br/><small style={{ opacity:.8 }}>Bevo io ×2</small>
              </Btn>
            </>}
            {card.type === 'JOLLY' && card.jollyType === 'TOAST' && (
              <Btn bg='#1c1004' color='#fde68a' full onClick={() => { drink(0,1); drink(1,1); next() }}>
                🥂 Cin cin! Bevete entrambi
              </Btn>
            )}
            {card.type === 'JOLLY' && card.jollyType === 'TRUTH' && <>
              <Btn bg='#7f1d1d' color='#fecaca' onClick={() => { drink(oth,2); next() }}>
                🤥 Ha mentito!<br/><small style={{ opacity:.8 }}>Beve {names[oth]} ×2</small>
              </Btn>
              <Btn bg='#14532d' color='#bbf7d0' onClick={() => next()}>
                💚 Onesto/a!<br/><small style={{ opacity:.8 }}>Nessuno beve</small>
              </Btn>
            </>}
          </div>
        </div>
      </div>
    )
  }

  return null
}
