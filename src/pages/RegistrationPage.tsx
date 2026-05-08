import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { RegistrationFormData } from '../types';
import { motion } from 'motion/react';
import { ClipboardCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    homeAddress: '',
    bloodType: 'O+',
    phone: '',
    gender: 'Male',
    maritalStatus: 'Single',
    educationLevel: '',
    imageUrl: '',
    qaraan: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'qaraan' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registrationsRef = collection(db, 'registrations');
      await addDoc(registrationsRef, {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'registrations');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Waad ku Mahadsantahay!</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Diiwaangelintaadu si guul leh ayay u dhacday. Waxaa laguugu soo celin doonaa bogga hore...
          </p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
              className="bg-green-600 h-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-red-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Ku laabo bogga hore
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="px-8 py-10 bg-white border-b-2 border-red-500">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Foomka Diiwaangelinta</h1>
                <p className="text-slate-500 mt-1 uppercase text-xs font-bold tracking-widest">Ku soo biir Midowga maanta</p>
              </div>
              <div className="w-12 h-1 bg-red-600 rounded-full"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Magaca oo dhamaystiran</label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="Maxamed Cali"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Blood Type */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nooca Dhiigga</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Teleefanka</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="+252..."
                />
              </div>

              {/* Donations */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Qaraan (Donations)</label>
                <input
                  required
                  type="number"
                  name="qaraan"
                  min="0"
                  value={formData.qaraan}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="0"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Jinsiga</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Male">Lab (Male)</option>
                  <option value="Female">Dhadig (Female)</option>
                  <option value="Other">Kale (Other)</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Heerka Guurka</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Single">Doob</option>
                  <option value="Married">Xaasley</option>
                  <option value="Divorced">Laga Furay</option>
                  <option value="Widowed">Laga dhintay</option>
                </select>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Heerka Waxbarasho</label>
                <input
                  required
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="Jaamacadda..."
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cinwaanka Guriga</label>
                <input
                  required
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="Calas, Somalia"
                />
              </div>

              {/* Image Upload Style */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sawirkaaga (URL)</label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pt-10">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-5 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all uppercase tracking-wider text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Diiwaangelinta ayaa socota...
                  </div>
                ) : (
                  'Diiwaangeli Hadda'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
