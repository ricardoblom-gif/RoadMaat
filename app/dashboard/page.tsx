import Link from 'next/link';
import { feed, groups, locations } from '@/lib/data';
import { requireUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="dashboard-shell">
      <div className="dashboard-topbar">
        <div className="brand-wrap">
          <div className="brand-mark">R</div>
          <span>RoadMaat</span>
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard">Groups</Link>
          <Link href="/dashboard">RoadMap</Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="link-button">Uitloggen</button>
          </form>
        </nav>
      </div>

      <div className="container demo-notice" role="note">
        Demo-omgeving: berichten, locaties en groepen hieronder zijn voorbeelddata, geen live chauffeursinformatie.
      </div>

      <div className="dashboard-grid container">
        <aside className="sidebar panel">
          <h3>Demo-overzicht</h3>
          <div className="profile-card">
            <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </div>
          </div>

          <div className="metrics">
            <div>
              <span>Voorbeeldberichten</span>
              <strong>{feed.length}</strong>
            </div>
            <div>
              <span>Voorbeeldgroepen</span>
              <strong>{groups.length}</strong>
            </div>
            <div>
              <span>Voorbeeldlocaties</span>
              <strong>{locations.length}</strong>
            </div>
          </div>
        </aside>

        <section className="main-content panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Voorbeeldomgeving</p>
              <h1>Dashboard demo</h1>
            </div>
            <button className="button button-primary">Nieuwe update</button>
          </div>

          <div className="stats-row">
            <article className="mini-panel">
              <span>Voorbeeldlocaties</span>
              <strong>{locations.length}</strong>
            </article>
            <article className="mini-panel">
              <span>Voorbeeldberichten</span>
              <strong>{feed.length}</strong>
            </article>
            <article className="mini-panel">
              <span>Voorbeeldgroepen</span>
              <strong>{groups.length}</strong>
            </article>
          </div>

          <div className="feed-list">
            {feed.map((item) => (
              <article className="feed-item" key={item.id}>
                <div className="feed-topline">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                  <small>{item.time}</small>
                </div>
                <p>{item.body}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={`${item.id}-${tag}`} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="right-rail">
          <div className="panel">
            <h3>Mijn locaties</h3>
            <ul className="location-list">
              {locations.map((location) => (
                <li key={location.id}>
                  <div>
                    <strong>{location.name}</strong>
                    <small>{location.category}</small>
                  </div>
                  <span className={`status ${location.status.toLowerCase()}`}>{location.status}</span>
                  <em>{location.distance}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3>Groepen</h3>
            <ul className="group-list">
              {groups.map((group) => (
                <li key={group.id}>
                  <div>
                    <strong>{group.name}</strong>
                    <small>{group.focus}</small>
                  </div>
                  <span>{group.members} leden</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
