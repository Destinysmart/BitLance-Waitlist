import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { collection, addDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { Zap, Globe2, ShieldCheck, CheckCircle2, RefreshCw, Search, Inbox, FileSpreadsheet, FileDown, LockKeyhole, LogOut } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { auth, db } from './firebase';

// Reusable elegant fade-in wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const LAUNCH_DATE_MS = new Date('2026-05-30T00:00:00+01:00').getTime();
const getLaunchTimeLeft = () => Math.max(0, Math.floor((LAUNCH_DATE_MS - Date.now()) / 1000));

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';

  if (pathname === '/admin/waitlist') {
    return <WaitlistAdminPage />;
  }

  return (
    <div className="relative min-h-screen font-sans overflow-hidden selection:bg-orange-100 selection:text-orange-900 flex flex-col bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f5]">
      
      {/* Hero Section Container */}
      <div className="relative w-full overflow-hidden text-white flex-shrink-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-zinc-900/80" />
        
        {/* Core Hero Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-orange-400/20 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

        <NavBar />
        
        <div className="relative z-10 flex flex-col items-center pt-20 pb-24 px-6 w-full max-w-5xl mx-auto">
          <FadeIn className="w-full flex flex-col items-center text-center">
            <Hero />
            <EmailCapture />
            <Positioning />
          </FadeIn>
        </div>
      </div>

      {/* Main Content below Hero */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-6 w-full max-w-5xl mx-auto text-zinc-900">
        <FadeIn delay={0.2} className="w-full mt-24">
          <Benefits />
        </FadeIn>
        
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-20"></div>

        <FadeIn delay={0.4} className="w-full mb-20">
          <FinalCTA />
        </FadeIn>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

type WaitlistEntry = {
  id: string;
  email: string;
  createdAtLabel: string;
  submittedAt: string | null;
};

function AdminLoginPage({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setStatus('loading');
    setErrorMessage('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onSignedIn();
    } catch (error) {
      console.error('Admin login failed:', error);
      setStatus('error');
      setErrorMessage('That email or password did not work. Please check the admin credentials and try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6 font-sans text-slate-900">
      <main className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Admin Access</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Use your Firebase admin account to view the Bitlance waitlist.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={status === 'loading'}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-70"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              disabled={status === 'loading'}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-70"
              placeholder="Enter password"
            />
          </label>

          {status === 'error' ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70"
          >
            {status === 'loading' ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Signing in
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </main>
      <Analytics />
    </div>
  );
}

function WaitlistAdminPage() {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<'checking' | 'signed-in' | 'signed-out'>('checking');
  const [hasUnlockedAdmin, setHasUnlockedAdmin] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthStatus(user ? 'signed-in' : 'signed-out');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!adminUser || !hasUnlockedAdmin) {
      setEntries([]);
      setStatus('loading');
      return;
    }

    const waitlistRef = collection(db, 'waitlist');
    const waitlistQuery = query(waitlistRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      waitlistQuery,
      (snapshot) => {
        const nextEntries = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate?.() ?? (data.submittedAt ? new Date(data.submittedAt) : null);

          return {
            id: doc.id,
            email: typeof data.email === 'string' ? data.email : '',
            createdAtLabel: createdAt
              ? new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(createdAt)
              : 'No timestamp',
            submittedAt: typeof data.submittedAt === 'string' ? data.submittedAt : null,
          };
        });

        setEntries(nextEntries);
        setStatus('ready');
        setErrorMessage('');
        setLastUpdated(
          new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date()),
        );
      },
      (error) => {
        console.error('Failed to fetch waitlist entries:', error);
        setStatus('error');
        setErrorMessage('The waitlist could not be loaded. Check your Firestore rules and indexes.');
      },
    );

    return () => unsubscribe();
  }, [adminUser, hasUnlockedAdmin]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredEntries = entries.filter((entry) => {
    if (!normalizedSearch) return true;

    return (
      entry.email.toLowerCase().includes(normalizedSearch) ||
      entry.createdAtLabel.toLowerCase().includes(normalizedSearch)
    );
  });

  const exportCsv = () => {
    if (filteredEntries.length === 0) return;

    const rows = [
      ['Email', 'Joined', 'Submitted At'],
      ...filteredEntries.map((entry) => [entry.email, entry.createdAtLabel, entry.submittedAt ?? '']),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bitlance-waitlist.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  if (authStatus === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-slate-600">
        <RefreshCw className="mr-3 h-5 w-5 animate-spin text-indigo-600" />
        Checking admin access...
      </div>
    );
  }

  if (!adminUser || !hasUnlockedAdmin) {
    return <AdminLoginPage onSignedIn={() => setHasUnlockedAdmin(true)} />;
  }

  return (
    // <div className="min-h-screen bg-zinc-50 text-zinc-950 print:bg-white">
    //   <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
    //     <header className="mb-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm print:mb-4 print:rounded-none print:border-none print:p-0 print:shadow-none">
    //       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    //         <div>
    //           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Admin / Waitlist</p>
    //           <h1 className="mt-2 text-2xl font-semibold text-zinc-950 sm:text-3xl">Waitlist emails</h1>
    //           <p className="mt-1 text-sm text-zinc-500">
    //             Search emails and export the visible results.
    //           </p>
    //         </div>

    //         <div className="text-sm text-zinc-500 print:hidden">
    //           {status === 'loading' ? 'Loading...' : `${filteredEntries.length} email${filteredEntries.length === 1 ? '' : 's'}`}
    //         </div>
    //       </div>

    //       <div className="mt-5 flex flex-col gap-3 sm:flex-row">
    //         <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors focus-within:border-zinc-400">
    //           <Search className="h-4 w-4 flex-shrink-0 text-zinc-400" />
    //           <input
    //             type="search"
    //             value={searchTerm}
    //             onChange={(e) => setSearchTerm(e.target.value)}
    //             placeholder="Search email"
    //             className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
    //           />
    //         </label>

    //         <div className="flex gap-3 print:hidden">
    //           <button
    //             type="button"
    //             onClick={exportCsv}
    //             disabled={filteredEntries.length === 0}
    //             className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
    //           >
    //             <FileSpreadsheet className="h-4 w-4" />
    //             Spreadsheet
    //           </button>
    //           <button
    //             type="button"
    //             onClick={exportPdf}
    //             disabled={filteredEntries.length === 0}
    //             className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
    //           >
    //             <FileDown className="h-4 w-4" />
    //             PDF
    //           </button>
    //         </div>
    //       </div>
    //     </header>

    //     <main className="flex-1">
    //       <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm print:rounded-none print:border-none print:shadow-none">
    //         <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
    //           <div>
    //             <h2 className="text-lg font-semibold text-zinc-950">Emails</h2>
    //             <p className="text-sm text-zinc-500">
    //               {filteredEntries.length} of {entries.length} visible
    //             </p>
    //           </div>

    //           {status === 'loading' ? (
    //             <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
    //               <RefreshCw className="h-4 w-4 animate-spin" />
    //               Loading
    //             </div>
    //           ) : null}
    //         </div>

    //         {status === 'error' ? (
    //           <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
    //             <div className="mb-4 rounded-2xl bg-red-50 p-4 text-red-500 print:hidden">
    //               <Inbox className="h-8 w-8" />
    //             </div>
    //             <h3 className="text-lg font-semibold text-zinc-950">Could not load the waitlist</h3>
    //             <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">{errorMessage}</p>
    //           </div>
    //         ) : null}

    //         {status !== 'error' && filteredEntries.length === 0 ? (
    //           <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
    //             <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-orange-500 print:hidden">
    //               <Search className="h-8 w-8" />
    //             </div>
    //             <h3 className="text-lg font-semibold text-zinc-950">
    //               {entries.length === 0 ? 'No emails yet' : 'No matches found'}
    //             </h3>
    //             <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
    //               {entries.length === 0
    //                 ? 'New waitlist submissions will appear here as soon as they land in Firestore.'
    //                 : 'Try a different search term to find the waitlist entry you need.'}
    //             </p>
    //           </div>
    //         ) : null}

    //         {status !== 'error' && filteredEntries.length > 0 ? (
    //           <div className="overflow-x-auto">
    //             <table className="min-w-full border-collapse">
    //               <thead className="bg-zinc-50">
    //                 <tr className="text-left text-xs uppercase tracking-[0.18em] text-zinc-500">
    //                   <th className="px-5 py-4 font-semibold">Email</th>
    //                   <th className="px-5 py-4 font-semibold">Joined</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {filteredEntries.map((entry, index) => (
    //                   <tr
    //                     key={entry.id}
    //                     className={index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}
    //                   >
    //                     <td className="px-5 py-4">
    //                       <p className="font-medium text-zinc-950">{entry.email}</p>
    //                     </td>
    //                     <td className="px-5 py-4 text-sm text-zinc-600">
    //                       <p className="font-medium text-zinc-900">{entry.createdAtLabel}</p>
    //                       <p className="text-xs text-zinc-500">
    //                         {entry.submittedAt ?? 'Timestamp synced from Firestore'}
    //                       </p>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         ) : null}
    //       </section>
    //     </main>
    //   </div>
    // </div>
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-indigo-100 print:bg-white">
  <div className="mx-auto flex max-w-5xl flex-col px-6 py-10">
    
    {/* Header Section */}
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
          <span className="opacity-60">Admin</span>
          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
          <span>Waitlist</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Waitlist Emails</h1>
        <p className="max-w-md text-slate-500">
          Manage your early access queue and export customer data for marketing campaigns.
        </p>
      </div>

      <div className="flex items-center gap-3 print:hidden">
        <button
          onClick={() => {
            setHasUnlockedAdmin(false);
            signOut(auth);
          }}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
        <button
          onClick={exportCsv}
          disabled={filteredEntries.length === 0}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 disabled:opacity-50"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export CSV
        </button>
        <button
          onClick={exportPdf}
          disabled={filteredEntries.length === 0}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50"
        >
          <FileDown className="h-4 w-4" />
          PDF Report
        </button>
      </div>
    </header>

    {/* Search & Stats Bar */}
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email address..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>
      <div className="flex items-center gap-3 px-2 text-sm font-medium text-slate-500">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        {status === 'loading' ? (
          <span className="animate-pulse">Syncing...</span>
        ) : (
          <span>{filteredEntries.length} Records found</span>
        )}
      </div>
    </div>

    {/* Main Content Area */}
    <main className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 print:border-none print:shadow-none">
      
      {/* Loading Overlay */}
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Inbox className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Connection Failed</h3>
          <p className="mt-2 max-w-xs text-slate-500">{errorMessage}</p>
        </div>
      )}

      {/* Empty State */}
      {status !== 'error' && filteredEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {entries.length === 0 ? 'Queue is empty' : 'No results found'}
          </h3>
          <p className="mt-1 text-slate-500">
            {entries.length === 0 
              ? 'New signups will appear here automatically.' 
              : `We couldn't find anything matching "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* Data Table */}
      {status !== 'error' && filteredEntries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">User Email</th>
                <th className="px-8 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEntries.map((entry) => (
                <tr 
                  key={entry.id} 
                  className="group transition-colors hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap px-8 py-5">
                    <span className="font-semibold text-slate-900">{entry.email}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">{entry.createdAtLabel}</span>
                      <span className="text-[11px] text-slate-400">
                        {entry.submittedAt ?? 'Live from Firestore'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
    
    <footer className="mt-8 text-center text-xs text-slate-400 print:hidden">
      Securely connected to Firebase Production Instance
    </footer>
  </div>
  <Analytics />
</div>
  );

}

function NavBar() {
  return (
    <nav className="relative z-20 w-full bg-white border-b border-zinc-100">
      <div className="px-6 py-5 max-w-[90%y] mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center"
        >
          <img src="logo.png" alt="Bitlance Logo" className="h-10 w-auto object-contain [image-rendering:high-quality]" />
        </motion.div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="max-w-3xl flex flex-col items-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.08] mb-6 drop-shadow-lg">
        Work Online. <br className="hidden md:block" />
        <span className="relative inline-block mt-2 text-[1.05em] drop-shadow-md">
          Get Paid in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">Bitcoin.</span>
        </span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-xl mx-auto mb-10">
        A freelancing platform built for the Bitcoin economy. <br className="hidden md:block" />
        No banks. No borders. Just sats.
      </p>
    </div>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [successVariant, setSuccessVariant] = useState<'joined' | 'existing'>('joined');
  const [feedback, setFeedback] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !isValidEmail(email)) return;

    const normalizedEmail = email.trim().toLowerCase();

    setStatus('loading');
    setFeedback('');

    try {
      const waitlistRef = collection(db, 'waitlist');
      const existingQuery = query(waitlistRef, where('email', '==', normalizedEmail), limit(1));
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        setSuccessVariant('existing');
        setStatus('success');
        setEmail('');
        setTouched(false);
        return;
      }

      await addDoc(waitlistRef, {
        email: normalizedEmail,
        createdAt: serverTimestamp(),
        source: 'website-waitlist',
        submittedAt: new Date().toISOString(),
      });

      setSuccessVariant('joined');
      setStatus('success');
      setEmail('');
      setTouched(false);
    } catch (error) {
      console.error('Failed to submit to Firestore:', error);
      setFeedback('We could not save your email right now. Please try again in a moment.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-16">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full relative overflow-hidden bg-zinc-900 rounded-3xl p-8 flex flex-col items-center text-center border border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] shadow-orange-500/5 backdrop-blur-sm"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.15
              }}
              className="relative w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mb-5 shadow-inner"
            >
              <CheckCircle2 className="w-8 h-8 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]" strokeWidth={2.5} />
            </motion.div>
            
            <h3 className="text-xl font-bold mb-2 text-white tracking-tight">
              {successVariant === 'existing' ? 'Already on the List' : 'Position Secured'}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed px-4">
              {successVariant === 'existing'
                ? "This email is already on the waitlist. We'll be in touch as soon as early access opens."
                : "You're officially on the waitlist. We'll be in touch as soon as early access opens."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className={`relative flex items-center w-full bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] border transition-shadow ${
              showError 
                ? 'border-red-400 focus-within:border-red-500 focus-within:shadow-[0_8px_30px_rgba(248,113,113,0.3)]' 
                : 'border-white/20 focus-within:border-orange-400/50 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.6)]'
            }`}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent pl-5 pr-4 py-3 outline-none text-zinc-900 placeholder:text-zinc-500 font-medium"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                  if (feedback) setFeedback('');
                }}
                onBlur={() => setTouched(true)}
                disabled={status === 'loading'}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-shrink-0 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 active:scale-[0.98] text-white px-8 py-3.5 text-lg rounded-full font-medium transition-all duration-300 shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 flex items-center justify-center min-w-[150px]"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Join Waitlist</span>
                )}
              </button>
            </div>
            <div className="h-6 mt-4 flex justify-center items-center">
              <AnimatePresence mode="wait">
                {showError ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm font-medium text-red-400 text-center drop-shadow-sm"
                  >
                    Please enter a valid email address
                  </motion.p>
                ) : status === 'error' && feedback ? (
                  <motion.p
                    key="submit-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm font-medium text-red-400 text-center drop-shadow-sm"
                  >
                    {feedback}
                  </motion.p>
                ) : (
                  <motion.p
                    key="normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-zinc-300 font-medium tracking-wide text-center drop-shadow-sm"
                  >
                    Early access for freelancers and Bitcoin-native companies.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Positioning() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-zinc-300">
      <span className="uppercase tracking-widest text-xs opacity-90">Built for</span>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Bitcoin builders</span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Remote freelancers</span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Global talent</span>
      </div>
    </div>
  );
}

function Benefits() {
  const items = [
    {
      icon: <Zap strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Instant Payments",
      description: "Get paid in sats via Lightning. No delays."
    },
    {
      icon: <Globe2 strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Work Without Borders",
      description: "Earn globally without needing a bank account."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure by Design",
      description: "Escrow ensures fair payment for completed work."
    }
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6 md:gap-8 w-full">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-zinc-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-orange-50/80 flex items-center justify-center mb-6 border border-orange-100/50 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-300">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">{item.title}</h3>
          <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function FinalCTA() {
  const [timeLeft, setTimeLeft] = useState(getLaunchTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getLaunchTimeLeft());
    }, 1000);

    setTimeLeft(getLaunchTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = Math.floor(timeLeft % 60);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <div className="relative overflow-hidden flex flex-col items-center text-center bg-white p-12 md:p-16 rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/30 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <h2 className="text-sm md:text-base font-semibold tracking-widest text-orange-500 mb-8 uppercase">
          Mainnet Launch In
        </h2>
        
        <div className="flex w-full justify-center gap-3 sm:gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {timeUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center mb-3 md:mb-4 border border-zinc-800 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  <motion.span
                    key={unit.value}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tabular-nums tracking-tighter"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.span>
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-widest">{unit.label}</span>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 mt-12 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400">
        <p>&copy; 2026 Bitlance. All rights reserved.</p>
        <a href="https://x.com/bitlancework" target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-0 hover:text-zinc-700 transition-colors">
          @bitlancework
        </a>
      </div>
    </footer>
  );
}
