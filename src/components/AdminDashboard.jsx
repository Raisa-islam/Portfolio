import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../hooks/useFirestore';
import { FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import AdminForm from './AdminForm';

const CONTENT_TYPES = [
  { label: 'Research Paper', collection: 'research', icon: '🔬' },
  { label: 'Paper Review', collection: 'writing', icon: '📝', defaults: { category: 'review' } },
  { label: 'Research Notes', collection: 'writing', icon: '📝', defaults: { category: 'notes' } },
  { label: 'Tutorial', collection: 'writing', icon: '📚', defaults: { category: 'tutorial' } },
  { label: 'Course Notes', collection: 'writing', icon: '📚', defaults: { category: 'course' } },
  { label: 'Further Work', collection: 'writing', icon: '📝', defaults: { category: 'further' } },
  { label: 'Project', collection: 'projects', icon: '🛠️' },
];

export default function AdminDashboard({ onClose }) {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(null);

  const { data: research, refetch: refetchResearch } = useCollection('research', { orderByField: 'createdAt' });
  const { data: writing, refetch: refetchWriting } = useCollection('writing', { orderByField: 'createdAt' });
  const { data: projects, refetch: refetchProjects } = useCollection('projects', { orderByField: 'createdAt' });

  const allContent = [
    ...research.map(r => ({ ...r, _collection: 'research', _icon: '🔬' })),
    ...writing.map(w => ({ ...w, _collection: 'writing', _icon: '📝' })),
    ...projects.map(p => ({ ...p, _collection: 'projects', _icon: '🛠️' })),
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login(email, password);
    } catch (err) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleSave = async (collectionName, data, id) => {
    if (id) {
      await updateDocument(collectionName, id, data);
    } else {
      await addDocument(collectionName, data);
    }
    refetchResearch();
    refetchWriting();
    refetchProjects();
    setEditing(null);
    setCreating(null);
  };

  const handleDelete = async (collectionName, id) => {
    if (confirm('Delete this item?')) {
      await deleteDocument(collectionName, id);
      refetchResearch();
      refetchWriting();
      refetchProjects();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/55 z-[2000] flex items-center justify-center backdrop-blur-lg p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface rounded-[20px] w-full max-w-[800px] max-h-[88vh] overflow-y-auto border border-border shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between py-6 px-8 border-b border-border-light sticky top-0 bg-surface z-[1] rounded-t-[20px]">
          <h2 className="font-display font-bold text-xl m-0">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-bg-alt border-none text-text-2 text-xl cursor-pointer flex items-center justify-center hover:bg-border hover:text-text-1 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-8">
          {!user ? (
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
              <p className="text-text-2 text-center mb-6">Sign in to manage your content</p>
              {loginError && <p className="text-warm text-sm text-center mb-4">{loginError}</p>}
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="form-field w-full mb-3 py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)]"
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="form-field w-full mb-4 py-3.5 px-[18px] rounded-xl border border-border bg-bg text-text-1 font-body text-[0.92rem] outline-none focus:border-accent-1 focus:shadow-[0_0_0_3px_var(--accent-glow)]"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white border-none font-body text-[0.92rem] font-bold cursor-pointer"
                style={{ background: 'var(--gradient)' }}
              >
                Sign In
              </button>
            </form>
          ) : editing || creating ? (
            <AdminForm
              item={editing}
              contentType={creating}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setCreating(null); }}
            />
          ) : (
            <>
              <p className="text-text-2 text-[0.95rem] mb-7">
                Welcome back, Raisa. Manage all your content from here — no code needed.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-9">
                {[
                  { n: allContent.length, l: 'Total Posts' },
                  { n: allContent.filter(c => c.status === 'published').length, l: 'Published' },
                  { n: allContent.filter(c => c.status !== 'published').length, l: 'Drafts' },
                  { n: '—', l: 'Views' },
                ].map(({ n, l }, i) => (
                  <div key={i} className="a-stat bg-bg rounded-card p-5 text-center border border-border-light relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[3px] opacity-50" style={{ background: 'var(--gradient)' }} />
                    <div className="font-display font-extrabold text-[2rem] gradient-text leading-tight tabular-nums">{n}</div>
                    <div className="text-[0.72rem] text-text-3 font-semibold mt-1 uppercase tracking-[0.06em]">{l}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-[18px]">
                <h3 className="text-[0.95rem] font-bold m-0">Recent Content</h3>
              </div>

              <div className="mb-7">
                {allContent.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center gap-3.5 py-4 border-b border-border-light first:border-t">
                    <div className="w-10 h-10 rounded-[10px] shrink-0 flex items-center justify-center text-lg bg-accent-glow">
                      {item._icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text-1 truncate">{item.title}</div>
                      <div className="text-xs text-text-3 mt-0.5">{item._collection} &middot; {item.status || 'draft'}</div>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditing(item)}
                        className="btn-sm p-1.5 px-3.5 rounded-lg border border-border bg-transparent text-text-2 font-body text-xs font-semibold cursor-pointer hover:border-accent-1 hover:text-accent-1 transition-colors"
                      >
                        <FiEdit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._collection, item.id)}
                        className="btn-sm p-1.5 px-3.5 rounded-lg border border-border bg-transparent text-text-2 font-body text-xs font-semibold cursor-pointer hover:border-warm hover:text-warm transition-colors"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                {allContent.length === 0 && (
                  <p className="text-text-3 text-sm text-center py-8">No content yet. Create your first post below.</p>
                )}
              </div>

              <p className="text-[0.82rem] text-text-3 font-semibold mb-3">Create new content</p>
              <div className="flex flex-wrap gap-2.5">
                {CONTENT_TYPES.map(ct => (
                  <button
                    key={ct.label}
                    onClick={() => setCreating(ct)}
                    className="py-3 px-5 rounded-xl border-2 border-dashed border-border bg-transparent text-text-2 font-body text-[0.85rem] font-semibold cursor-pointer hover:border-accent-1 hover:text-accent-1 hover:border-solid hover:bg-accent-glow transition-all flex items-center gap-2"
                  >
                    <FiPlus size={14} /> {ct.label}
                  </button>
                ))}
              </div>

              <button
                onClick={logout}
                className="mt-8 text-text-3 text-sm font-semibold bg-transparent border-none cursor-pointer hover:text-warm transition-colors"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
