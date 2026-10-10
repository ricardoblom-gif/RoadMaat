import Link from 'next/link';

const features = [
  {
    icon: '👥',
    title: 'Community',
    text: 'Een sociaal netwerk voor chauffeurs met updates, verhalen, vragen en inspiratie.',
  },
  {
    icon: '🛟',
    title: 'Help & Mentor',
    text: 'Ervaren chauffeurs helpen nieuwe collega’s met praktische kennis en begeleiding.',
  },
  {
    icon: '🗺️',
    title: 'RoadMap',
    text: 'Krijg toegang tot klantlocaties, parkeerplaatsen en routegerichte voorzieningen.',
  },
  {
    icon: '💬',
    title: 'Groups & Chat',
    text: 'Gesloten groepen, bestelkanalen en vaste teamcommunicatie op één plek.',
  },
  {
    icon: '📚',
    title: 'Knowledge',
    text: 'Deel ervaringen, regels, tips en fact-based informatie binnen je team.',
  },
];

const stats = [
  { label: 'platform', value: '1' },
  { label: 'kernonderdelen', value: '5' },
  { label: 'productstatus', value: 'Demo' },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <div className="brand-wrap">
            <div className="brand-mark">R</div>
            <span>RoadMaat</span>
          </div>

          <nav className="nav" aria-label="Main navigation">
            <a href="#over">Over</a>
            <a href="#features">Features</a>
            <a href="#groepen">Groepen</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <Link href="/dashboard" className="button button-secondary">
              Dashboard
            </Link>
            <Link href="/dashboard" className="button button-primary">
              Bekijk demo
            </Link>
          </div>
        </div>
      </header>

      <section className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Sociale community voor chauffeurs</p>
            <h1>Onderweg sta je er nooit alleen voor.</h1>
            <p className="lead">
              RoadMaat verbindt chauffeurs, helpt bij praktische vragen en bundelt kennis,
              updates en locatie-informatie op één smart platform.
            </p>

            <div className="hero-actions">
              <Link href="/dashboard" className="button button-primary">
                Open dashboard
              </Link>
              <a href="#over" className="button button-secondary">
                Lees meer
              </a>
            </div>

            <ul className="mini-stats" aria-label="Belangrijkste voordelen">
              {stats.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-card" aria-label="RoadMaat overview">
            <div className="card-top">
              <span className="pill live">Live</span>
              <span className="pill neutral">AB Texel</span>
            </div>

            <div className="map-box">
              <div className="pin pin-one" />
              <div className="pin pin-two" />
              <div className="pin pin-three" />
              <div className="route" />
            </div>

            <div className="card-list">
              <div className="list-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Parkeerplek</strong>
                  <small>Truckstop Joost – Meer</small>
                </div>
              </div>
              <div className="list-item">
                <span className="icon">🧭</span>
                <div>
                  <strong>Locatiecheck</strong>
                  <small>Toilet, douchen en entree</small>
                </div>
              </div>
              <div className="list-item">
                <span className="icon">💬</span>
                <div>
                  <strong>Help &amp; Mentor</strong>
                  <small>Vragen beantwoord door ervaren chauffeurs</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="over" className="section">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Waarom RoadMaat</p>
            <h2>De kennis die nu verspreid is, eindelijk op één plek.</h2>
          </div>
          <div>
            <p>
              Chauffeurs verzamelen informatie vaak via WhatsApp, gesprekken, losse
              documenten en ongestructureerde notities. RoadMaat brengt die kennis samen in
              een veilige, centrale en sociale omgeving die direct bruikbaar is onderweg.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="section muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Vijf kernonderdelen</p>
            <h2>Alles wat een chauffeur onderweg nodig heeft</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="groepen" className="section">
        <div className="container stack-layout">
          <div className="section-heading narrow">
            <p className="eyebrow">Voor alle rollen</p>
            <h2>Gebouwd voor transportteams en white-label groei</h2>
          </div>

          <div className="role-grid">
            <div className="role-panel">
              <h3>Chauffeur</h3>
              <ul>
                <li>Profiel en netwerk</li>
                <li>Foto&apos;s en updates delen</li>
                <li>Kaartinformatie bekijken</li>
                <li>Groepen en events volgen</li>
              </ul>
            </div>
            <div className="role-panel">
              <h3>Mentor / Helper</h3>
              <ul>
                <li>Vragen beantwoorden</li>
                <li>Ervaring delen</li>
                <li>Ondersteuning bieden</li>
                <li>Teams per bedrijf beheren</li>
              </ul>
            </div>
            <div className="role-panel">
              <h3>Community Manager</h3>
              <ul>
                <li>Moderatie en goedkeuring</li>
                <li>Groepen beheren</li>
                <li>Locatie- en klantinformatie coördineren</li>
                <li>White-label configuratie per divisie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section cta-section">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">RoadMaat concept</p>
            <h2>Een platform dat voelt als een sociaal netwerk en een digitale collega tegelijk.</h2>
          </div>
          <Link href="/dashboard" className="button button-primary">
            Open de demo
          </Link>
        </div>
      </section>
    </main>
  );
}
