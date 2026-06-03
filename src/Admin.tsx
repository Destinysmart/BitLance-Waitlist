import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Helmet } from 'react-helmet-async';
import { Download } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: any;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rootClass = document.documentElement.className;
    if (isAuthenticated) {
      fetchEntries();
    }
    return () => {
      document.documentElement.className = rootClass; // reset class
    };
  }, [isAuthenticated]);

  const fetchEntries = () => {
    setLoading(true);
    const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
    
    // We use onSnapshot to get real-time updates and properly handle errors
    const unsub = onSnapshot(q, (snapshot) => {
      const docs: WaitlistEntry[] = [];
      snapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          ...doc.data()
        } as WaitlistEntry);
      });
      setEntries(docs);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError("You don't have permission to view the waitlist, or an error occurred.");
      setLoading(false);
      try {
        handleFirestoreError(err, OperationType.GET, 'waitlist');
      } catch (e) {
        // logged
      }
    });

    return unsub;
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'BitLance') {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid username or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setEntries([]);
  };

  const exportCSV = () => {
    if (entries.length === 0) return;
    
    const headers = ['Email', 'Joined At'];
    const rows = entries.map(entry => [
      entry.email, 
      entry.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleString() : 'Just now'
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `waitlist_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-orange-500/30 selection:text-orange-100">
      <Helmet>
        <title>Waitlist Admin - Bitlance</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-amber-500">Waitlist Admin</h1>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">admin</span>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Admin Access Required</h2>
            <form onSubmit={login} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter password"
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-lg font-medium transition-colors mt-6"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400">Loading waitlist entries...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-6 text-center">
            {error}
          </div>
        ) : (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex flex-wrap gap-4 justify-between items-center">
              <h2 className="text-lg font-medium">Total Entries: <span className="text-orange-400 font-bold">{entries.length}</span></h2>
              {entries.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>
            
            {entries.length === 0 ? (
              <div className="p-12 text-center text-zinc-500">
                No entries yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/80 border-b border-zinc-800">
                      <th className="p-4 text-xs tracking-wider text-zinc-400 uppercase font-semibold">Email</th>
                      <th className="p-4 text-xs tracking-wider text-zinc-400 uppercase font-semibold text-right">Joined At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="p-4 text-sm">{entry.email}</td>
                        <td className="p-4 text-sm text-right text-zinc-500">
                          {entry.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
