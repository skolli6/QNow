import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WA_LINK = 'https://wa.me/message/PZ5TG3MZWPZIL1'

export default function Home() {
  const nav = useNavigate()
  const [showQR, setShowQR] = useState(false)

  const features = [
    { icon: '💬', label: 'WhatsApp alerts',  desc: 'Get notified on WhatsApp when your turn is near',            action: () => nav('/browse') },
    { icon: '🎫', label: 'Digital tokens',   desc: 'Join the queue from your phone — no app download needed',    action: () => nav('/browse') },
    { icon: '📍', label: 'Find nearby',      desc: 'Locate services close to you with Near Me',                  action: () => nav('/browse') },
    { icon: '⏰', label: 'Extend slot',      desc: 'Need more time? Push your slot back from the tracking page', action: () => nav('/check')  },
    { icon: '🚶', label: 'Walk-in support',  desc: 'Vendors can add walk-in customers from their dashboard',     action: () => nav('/vendor') },
  ]

  return (
    <div className="screen">

      {/* ── NAV ── */}
      <nav>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div className="logo">Q<span>Now</span></div>
          <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.4)', letterSpacing: '.4px', fontWeight: 500, marginTop: 1 }}>
            by OLT Innovations
          </div>
        </div>
        <div className="nav-right">
          <button className="btn btn-ghost-white btn-sm" onClick={() => nav('/check')}>🎫 My Token</button>
          <button className="btn btn-ghost-white btn-sm" onClick={() => nav('/help')}>❓ Help</button>
          <button
            className="btn btn-ghost-white btn-sm"
            style={{ opacity: .4, fontSize: '.75rem', padding: '5px 8px' }}
            onClick={() => nav('/admin')}
            title="Admin"
          >⚙</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        <h1>Queue <em>smarter,</em><br />wait less</h1>
        <p>
          Join queues at clinics, salons, banks &amp; more — right from your phone.
          Get a <strong style={{ color: '#A7F3D0' }}>WhatsApp alert</strong> before your turn.
          No app download needed.
        </p>

        <div className="hero-cards">
          <div className="hero-card" onClick={() => nav('/browse')}>
            <div className="icon">👤</div>
            <h3>I'm a Customer</h3>
            <p>Find a service, join the virtual queue &amp; relax. We'll WhatsApp you when it's your turn.</p>
          </div>
          <div className="hero-card" onClick={() => nav('/vendor')}>
            <div className="icon">🏪</div>
            <h3>I'm a Vendor</h3>
            <p>Manage your customer queue digitally. No more crowded waiting rooms.</p>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
          marginTop: 28, position: 'relative', maxWidth: 520,
        }}>
          {features.map(f => (
            <button
              key={f.label}
              onClick={f.action}
              title={f.desc}
              style={{
                padding: '6px 14px', borderRadius: 100,
                background: 'rgba(255,255,255,.12)',
                border: '1px solid rgba(255,255,255,.2)',
                color: 'rgba(255,255,255,.9)',
                fontSize: '.78rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.22)'; e.currentTarget.style.borderColor = '#F5A623' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => nav('/help')}
          style={{
            marginTop: 20, background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,.5)', fontSize: '.82rem', fontFamily: 'inherit',
            textDecoration: 'underline', position: 'relative',
          }}
        >
          📖 How does QNow work? Read the guide →
        </button>
      </div>

      {/* ── WHATSAPP CHAT SECTION ── */}
      <div style={{
        background: '#fff', borderTop: '1px solid #DDD6CE',
        padding: '28px 24px', textAlign: 'center',
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', marginBottom: 4 }}>
          💬 Chat with us on WhatsApp
        </div>
        <div style={{ fontSize: '.85rem', color: '#666', marginBottom: 18, lineHeight: 1.6 }}>
          Questions? Need help? Start a free conversation — scan the QR code or tap the button below.
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* QR code — desktop */}
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              cursor: 'pointer',
            }}
            onClick={() => setShowQR(v => !v)}
          >
            <img
              src="/whatsapp-qr.png"
              alt="Scan to chat on WhatsApp"
              style={{
                width: showQR ? 160 : 80, height: showQR ? 160 : 80,
                borderRadius: 10, border: '2px solid #25D366',
                transition: 'all .25s', display: 'block',
              }}
            />
            <span style={{ fontSize: '.72rem', color: '#25D366', fontWeight: 700 }}>
              {showQR ? '▲ Tap to shrink' : '📷 Scan QR code'}
            </span>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 0' }}>
            <div style={{ width: 1, height: 40, background: '#DDD6CE' }} />
            <span style={{ fontSize: '.72rem', color: '#999', fontWeight: 600 }}>OR</span>
            <div style={{ width: 1, height: 40, background: '#DDD6CE' }} />
          </div>

          {/* Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#25D366', color: '#fff',
                padding: '12px 22px', borderRadius: 10,
                fontWeight: 700, fontSize: '.9rem', textDecoration: 'none',
                fontFamily: 'inherit', transition: 'opacity .18s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.641 4.8 1.762 6.819L2 30l7.379-1.737A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.614l-.422-.252-4.38 1.031 1.054-4.268-.276-.439A11.56 11.56 0 014.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.34-8.674c-.346-.174-2.048-1.01-2.366-1.126-.317-.116-.548-.174-.778.174-.23.347-.893 1.126-1.095 1.357-.202.23-.404.26-.75.087-.346-.174-1.462-.539-2.786-1.72-1.03-.918-1.725-2.051-1.927-2.398-.202-.347-.021-.534.152-.707.156-.156.346-.404.52-.606.173-.202.23-.347.346-.578.115-.23.058-.433-.029-.606-.087-.173-.778-1.878-1.066-2.572-.28-.674-.566-.582-.778-.593l-.663-.012c-.23 0-.606.086-.923.433-.317.346-1.21 1.183-1.21 2.886 0 1.703 1.24 3.348 1.413 3.578.173.23 2.44 3.726 5.912 5.224.826.357 1.47.57 1.974.73.829.264 1.584.227 2.18.138.665-.1 2.048-.837 2.337-1.645.288-.808.288-1.5.202-1.645-.087-.144-.317-.23-.663-.404z"/>
              </svg>
              Open WhatsApp Chat
            </a>
            <span style={{ fontSize: '.72rem', color: '#999' }}>
              Tap to open on your phone
            </span>
          </div>
        </div>

        <div style={{
          marginTop: 16, fontSize: '.75rem', color: '#999',
          background: '#F9F9F9', borderRadius: 8, padding: '8px 14px', display: 'inline-block',
        }}>
          ✅ User-initiated chats are <strong>free</strong> — no charges for 24–72 hours of conversation
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        background: 'var(--surface2)', padding: '20px 24px',
        display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
        borderTop: '1px solid var(--border)',
      }}>
        {[
          { val: '100%', lbl: 'Free for customers' },
          { val: '₹0',   lbl: 'No app download'   },
          { val: '💬',   lbl: 'WhatsApp alerts'    },
        ].map(s => (
          <div key={s.lbl} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--teal)', fontFamily: "'DM Mono',monospace" }}>{s.val}</div>
            <div style={{ fontSize: '.75rem', color: 'var(--text3)', marginTop: 2, fontWeight: 600, letterSpacing: '.3px' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: 'var(--teal)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: '#F5A623',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '.88rem', color: '#0A3D35', flexShrink: 0,
          }}>O</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '.88rem', lineHeight: 1.15 }}>
              QNow <span style={{ opacity: .5, fontWeight: 400 }}>by</span> OLT Innovations
            </div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '.67rem', marginTop: 1 }}>
              © {new Date().getFullYear()} · Building smarter everyday tools
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Help',           path: '/help'    },
            { label: 'Privacy Policy', path: '/privacy' },
          ].map(l => (
            <span
              key={l.label}
              onClick={() => nav(l.path)}
              style={{ color: 'rgba(255,255,255,.5)', fontSize: '.76rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {l.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
