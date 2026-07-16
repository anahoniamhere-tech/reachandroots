import React, { useState, useEffect, useMemo } from 'react';
import { db, auth, signInWithGoogle, signOut, onAuthStateChanged } from '../lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

const ADMIN_EMAILS = ["anahoniamhere@gmail.com", "ahmadmawass51@gmail.com", "icontent2023@gmail.com"];

export const CommunityDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  // Filters
  const [q, setQ] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  // Drawer
  const [drawerRow, setDrawerRow] = useState<any | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u: any) => {
      if (u && ADMIN_EMAILS.includes((u.email || "").toLowerCase())) {
        setUser(u);
        setAuthError('');
        loadData();
      } else if (u) {
        setAuthError("This account isn't an authorized admin.");
        setUser(null);
        signOut();
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setAuthError("Sign-in failed: " + (e.code || e.message));
    }
  };

  const handleLogout = () => signOut();

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const snap = await getDocs(query(collection(db, "community"), orderBy("createdAt", "desc")));
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setData(rows);
    } catch (e: any) {
      setError("Couldn't load data: " + (e.code || e.message) + ". Make sure you're signed in as an admin.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (ts: Timestamp | null | undefined) => {
    try {
      if (!ts || !ts.toDate) return "—";
      return ts.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return "—";
    }
  };

  const uniqSorted = (arr: any[]) => [...new Set(arr.filter(Boolean))].sort();

  const cities = useMemo(() => uniqSorted(data.map(r => r.city)), [data]);
  const roles = useMemo(() => uniqSorted(data.flatMap(r => r.roles || [])), [data]);
  const activities = useMemo(() => uniqSorted(data.flatMap(r => r.activityTypes || [])), [data]);

  const filteredData = useMemo(() => {
    const queryLower = q.toLowerCase();
    return data.filter(r => {
      if (queryLower && !((r.fullName || "").toLowerCase().includes(queryLower) || (r.email || "").toLowerCase().includes(queryLower))) return false;
      if (cityFilter && r.city !== cityFilter) return false;
      if (roleFilter && !(r.roles || []).includes(roleFilter)) return false;
      if (activityFilter && !(r.activityTypes || []).includes(activityFilter)) return false;
      return true;
    });
  }, [data, q, cityFilter, roleFilter, activityFilter]);

  const stats = useMemo(() => {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 3600 * 1000;
    const thisWeek = data.filter(r => {
      try { return r.createdAt.toDate().getTime() >= weekAgo; } catch { return false; }
    }).length;
    const hosts = data.filter(r => r.willingToHost === "Yes").length;
    
    const cityCount: Record<string, number> = {};
    data.forEach(r => { if (r.city) cityCount[r.city] = (cityCount[r.city] || 0) + 1; });
    const topCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0];

    return [
      { n: data.length, l: "Total members", accent: false },
      { n: thisWeek, l: "Joined this week", accent: true },
      { n: hosts, l: "Willing to host", accent: false },
      { n: topCity ? topCity[0].split(" /")[0] : "—", l: "Top city", accent: false }
    ];
  }, [data]);

  const exportCSV = () => {
    const cols = ["fullName", "city", "email", "whatsapp", "ageRange", "language", "roles", "experience", "oneLiner", "links", "storyMeaning", "storyToTell", "goals", "topics", "activityTypes", "formatPref", "availability", "willingToHost", "contribution", "volunteer", "whatsappConsent", "createdAt"];
    
    const cell = (r: any, c: string) => {
      let v = r[c];
      if (c === "createdAt") {
        try { v = r.createdAt.toDate().toISOString(); } catch { v = ""; }
      }
      if (Array.isArray(v)) v = v.join("; ");
      if (v == null) v = "";
      return `"${String(v).replace(/"/g, '""')}"`;
    };

    const csv = [cols.join(","), ...filteredData.map(r => cols.map(c => cell(r, c)).join(","))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `roots-reach-community-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const renderRow = (k: string, v: any, arVal?: boolean) => {
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) return null;
    const valRender = Array.isArray(v) 
      ? v.map((x, i) => <span key={i} className="dash-pill">{x}</span>) 
      : String(v);
      
    return (
      <div className="dash-drow">
        <div className="dash-k">{k}</div>
        <div className={`dash-v ${arVal ? 'dash-ar-val' : ''}`}>{valRender}</div>
      </div>
    );
  };

  if (!user) {
    return (
      <div id="gate" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(120% 80% at 100% 0%, rgba(44,110,106,0.12), transparent 60%), radial-gradient(90% 70% at 0% 10%, rgba(217,138,30,0.10), transparent 55%), #16302C'
      }}>
        <div className="gate-card" style={{ textAlign: 'center', padding: '44px 40px', maxWidth: '400px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase', color: '#D98A1E', fontWeight: 600, marginBottom: '16px' }}>Roots &amp; Reach · Fayhaa</div>
          <h1 style={{ fontFamily: '"Amiri", serif', color: '#F0ECDE', fontSize: '40px', margin: '0 0 4px' }}>Community Dashboard</h1>
          <div style={{ color: '#C9C2AE', fontSize: '14px', marginBottom: '30px' }}>Admins only. Sign in with your Roots &amp; Reach Google account.</div>
          <button 
            onClick={handleLogin}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', background: '#FBF9F2', color: '#333', border: 0, borderRadius: '5px', padding: '13px 22px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
          >
            <svg viewBox="0 0 48 48" style={{ width: '19px', height: '19px' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </button>
          <div style={{ color: '#E7B7AA', fontSize: '13px', marginTop: '18px', minHeight: '18px' }}>{authError}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <style>{`
        :root {
          --paper: #F0ECDE; --paper-2: #E7E1CE; --white: #FBF9F2;
          --ink: #16302C; --ink-soft: #3D544E;
          --sea: #2C6E6A; --sea-deep: #1F5450;
          --citrus: #D98A1E; --citrus-deep: #B96E12;
          --line: #C9C0A8; --line-soft: #DBD4BF;
          --radius: 5px;
        }
        .dash-bar { background: var(--ink); color: var(--paper); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid var(--citrus); }
        .dash-brand { font-family: "Amiri", serif; font-size: 22px; }
        .dash-brand span { color: var(--citrus); }
        .dash-who { display: flex; align-items: center; gap: 14px; font-size: 13px; color: #C9C2AE; }
        .dash-who button { background: transparent; border: 1px solid #45605A; color: var(--paper); border-radius: 40px; padding: 6px 14px; font-size: 13px; cursor: pointer; }
        .dash-who button:hover { background: #22423D; }

        .dash-container { max-width: 1180px; margin: 0 auto; padding: 24px; font-family: "IBM Plex Sans Arabic", system-ui, sans-serif; font-size: 15px; }
        
        .dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 22px; }
        .dash-stat { background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); padding: 16px 18px; }
        .dash-stat .n { font-family: "Amiri", serif; font-size: 34px; line-height: 1; color: var(--sea-deep); }
        .dash-stat .l { font-size: 12px; letter-spacing: .04em; text-transform: uppercase; color: var(--ink-soft); margin-top: 6px; }
        .dash-stat.accent .n { color: var(--citrus-deep); }

        .dash-controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 16px; }
        .dash-controls input[type=text], .dash-controls select { font-family: inherit; font-size: 14px; color: var(--ink); background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); padding: 9px 12px; outline: none; }
        .dash-controls input[type=text]:focus, .dash-controls select:focus { border-color: var(--sea); }
        .dash-controls input[type=text] { min-width: 220px; flex: 1; }
        .dash-controls .spacer { flex: 1; }
        .dash-btn { background: var(--sea); color: var(--white); border: 0; border-radius: var(--radius); padding: 9px 16px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .dash-btn:hover { background: var(--sea-deep); }
        .dash-btn.ghost { background: transparent; color: var(--sea-deep); border: 1px solid var(--sea); }
        .dash-btn.ghost:hover { background: rgba(44,110,106,0.08); }

        .dash-table-wrap { background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); overflow: auto; }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .dash-table thead th { text-align: left; background: var(--paper-2); color: var(--ink-soft); font-weight: 600; font-size: 12px; letter-spacing: .03em; text-transform: uppercase; padding: 11px 14px; border-bottom: 1px solid var(--line); }
        .dash-table tbody td { padding: 12px 14px; border-bottom: 1px solid var(--line-soft); vertical-align: top; }
        .dash-table tbody tr { cursor: pointer; }
        .dash-table tbody tr:hover { background: #F5F2E8; }
        .dash-table tbody tr:last-child td { border-bottom: 0; }
        .dash-pill { display: inline-block; background: var(--paper-2); border: 1px solid var(--line); border-radius: 30px; padding: 2px 9px; font-size: 12px; margin: 2px 3px 2px 0; }
        .dash-muted { color: var(--ink-soft); font-size: 13px; }
        .dash-empty { padding: 50px 20px; text-align: center; color: var(--ink-soft); }

        #dash-overlay { position: fixed; inset: 0; background: rgba(22,48,44,.45); z-index: 40; }
        #dash-drawer { position: fixed; top: 0; right: 0; height: 100%; width: min(460px, 92vw); background: var(--paper); z-index: 41; box-shadow: -8px 0 30px rgba(0,0,0,.2); overflow-y: auto; }
        #dash-drawer .dh { background: var(--ink); color: var(--paper); padding: 20px 22px; position: sticky; top: 0; }
        #dash-drawer .dh .name { font-family: "Amiri", serif; font-size: 24px; }
        #dash-drawer .dh .close { position: absolute; top: 16px; right: 18px; background: transparent; border: 0; color: var(--paper); font-size: 24px; cursor: pointer; }
        #dash-drawer .db { padding: 8px 22px 40px; }
        
        .dash-drow { padding: 13px 0; border-bottom: 1px solid var(--line-soft); }
        .dash-drow .dash-k { font-size: 11px; letter-spacing: .05em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 3px; }
        .dash-drow .dash-v { font-size: 14.5px; }
        .dash-drow .dash-v.dash-ar-val { direction: rtl; font-family: "IBM Plex Sans Arabic"; }
        .dash-wa { color: var(--sea-deep); text-decoration: none; font-weight: 600; }
        .dash-wa:hover { text-decoration: underline; }

        @media(max-width:640px){
          .hide-sm { display: none; }
          .dash-container { padding: 16px; }
        }
      `}</style>

      <header className="dash-bar">
        <div className="dash-brand">Roots <span>&amp;</span> Reach — Community</div>
        <div className="dash-who">
          <span>{user.email}</span>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <div className="dash-container">
        {error && <div style={{ color: '#A6402C', marginBottom: '16px' }}>{error}</div>}
        
        <div className="dash-stats">
          {stats.map((c, i) => (
            <div key={i} className={`dash-stat ${c.accent ? 'accent' : ''}`}>
              <div className="n">{c.n}</div>
              <div className="l">{c.l}</div>
            </div>
          ))}
        </div>

        <div className="dash-controls">
          <input type="text" placeholder="Search name or email…" value={q} onChange={e => setQ(e.target.value)} />
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            <option value="">All cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="">All roles</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={activityFilter} onChange={e => setActivityFilter(e.target.value)}>
            <option value="">All activities</option>
            {activities.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <div className="spacer"></div>
          <button className="dash-btn ghost" onClick={loadData}>Refresh</button>
          <button className="dash-btn" onClick={exportCSV}>Export CSV</button>
        </div>

        <div className="dash-table-wrap">
          {loading ? (
            <div className="dash-empty">Loading submissions…</div>
          ) : filteredData.length === 0 ? (
            <div className="dash-empty">No submissions match your filters yet.</div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th className="hide-sm">Roles</th>
                  <th className="hide-sm">Contact</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(r => {
                  const displayRoles = (r.roles || []).slice(0, 3);
                  const moreCount = (r.roles || []).length > 3 ? (r.roles || []).length - 3 : 0;
                  return (
                    <tr key={r.id} onClick={() => setDrawerRow(r)}>
                      <td><strong>{r.fullName}</strong></td>
                      <td>{r.city}</td>
                      <td className="hide-sm">
                        {displayRoles.length > 0 ? (
                          <>
                            {displayRoles.map((role: string, i: number) => <span key={i} className="dash-pill">{role}</span>)}
                            {moreCount > 0 && <span className="dash-muted">+{moreCount}</span>}
                          </>
                        ) : (
                          <span className="dash-muted">—</span>
                        )}
                      </td>
                      <td className="hide-sm dash-muted">{r.email}</td>
                      <td className="dash-muted">{fmtDate(r.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {drawerRow && (
        <>
          <div id="dash-overlay" onClick={() => setDrawerRow(null)}></div>
          <div id="dash-drawer">
            <div className="dh">
              <div className="name">{drawerRow.fullName || "—"}</div>
              <button className="close" onClick={() => setDrawerRow(null)}>×</button>
            </div>
            <div className="db">
              {renderRow("City", drawerRow.city)}
              {renderRow("Email", drawerRow.email)}
              {drawerRow.whatsapp && (
                <div className="dash-drow">
                  <div className="dash-k">WhatsApp</div>
                  <div className="dash-v">
                    <a className="dash-wa" href={`https://wa.me/${(drawerRow.whatsapp || "").replace(/[^\d+]/g, "").replace('+', '')}`} target="_blank" rel="noreferrer">
                      {drawerRow.whatsapp}
                    </a>
                  </div>
                </div>
              )}
              {renderRow("Age range", drawerRow.ageRange)}
              {renderRow("Language", drawerRow.language)}
              {renderRow("Roles", drawerRow.roles)}
              {renderRow("Experience", drawerRow.experience)}
              {renderRow("Creates", drawerRow.oneLiner, true)}
              {renderRow("Links", drawerRow.links)}
              {renderRow("Story means", drawerRow.storyMeaning, true)}
              {renderRow("Story to tell", drawerRow.storyToTell, true)}
              {renderRow("Goals", drawerRow.goals)}
              {renderRow("Topics wanted", drawerRow.topics)}
              {renderRow("Activities", drawerRow.activityTypes)}
              {renderRow("Format", drawerRow.formatPref)}
              {renderRow("Availability", drawerRow.availability)}
              {renderRow("Willing to host", drawerRow.willingToHost)}
              {renderRow("Can contribute", drawerRow.contribution, true)}
              {renderRow("Volunteer", drawerRow.volunteer)}
              {renderRow("WhatsApp group", drawerRow.whatsappConsent ? "Yes" : "No")}
              {renderRow("Joined", fmtDate(drawerRow.createdAt))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
