import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError, logout } from '../lib/firebase';
import { Registration } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Trash2, Edit2, LogOut, Download, 
  Filter, MoreHorizontal, User, Mail, MapPin, 
  Droplet, Phone, UserCircle, Save, X 
} from 'lucide-react';

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Registration>>({});

  useEffect(() => {
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'registrations');
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Ma hubaal baad tahay inaad tirtirto diiwaangelintan?')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `registrations/${id}`);
      }
    }
  };

  const startEdit = (reg: Registration) => {
    setEditingId(reg.id || null);
    setEditForm(reg);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const regDoc = doc(db, 'registrations', editingId);
      const { id, createdAt, ...updateData } = editForm as any;
      await updateDoc(regDoc, updateData);
      setEditingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `registrations/${editingId}`);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-2 border-red-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-100">
              M
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-none">Dashboard</h1>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-1">Maamulka Diiwaanka</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => logout()}
              className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Bax
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Wadarta xubnaha', value: registrations.length, color: 'text-slate-800' },
            { label: 'Deeq-bixiyaal dhiig', value: registrations.filter(r => r.qaraan > 0).length, color: 'text-red-600' },
            { label: 'Mashruucyo', value: 45, color: 'text-slate-800' },
            { label: 'Xaaladaha cusub', value: 12, color: 'text-red-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
              <p className="text-[10px] items-center flex gap-2 font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {stat.label}
              </p>
              <p className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="RAADI MAGAC, EMAIL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-red-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-600">
              <Filter className="w-4 h-4" />
              Sifee
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl hover:bg-red-700 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-200">
              <Download className="w-4 h-4" />
              SOO DEJI
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Xubinka</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Xiriirka</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Nooca</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Deeqaha</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      {editingId === reg.id ? (
                        <input 
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800"
                          value={editForm.fullName}
                          onChange={e => setEditForm({...editForm, fullName: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            {reg.imageUrl ? (
                              <img src={reg.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 tracking-tight text-base uppercase">{reg.fullName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{reg.gender} • {reg.maritalStatus}</p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600">{reg.email}</p>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{reg.phone}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100">
                        <Droplet className="w-3 h-3" />
                        {reg.bloodType}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-slate-800 text-lg font-black tracking-tighter">
                        {reg.qaraan}
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Times</span>
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === reg.id ? (
                          <>
                            <button 
                              onClick={handleUpdate}
                              className="p-3 text-white bg-green-500 border border-green-600 rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="p-3 text-slate-400 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEdit(reg)}
                              className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(reg.id!)}
                              className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {loading && (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              Waa la rarayaa xogta...
            </div>
          )}
          
          {!loading && filteredRegistrations.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Ma jiraan dad diiwaangishan oo la helay.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
