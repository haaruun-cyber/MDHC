import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../lib/firebase';
import { motion } from 'motion/react';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await loginWithGoogle();
      if (user.email === 'haaruunhassan4737@gmail.com') {
        navigate('/admin');
      } else {
        setError('Ma lihid xuquuqda aad ku geli karto qaybtan.');
      }
    } catch (err) {
      setError('Cillad ayaa dhacday intii lagu guda jiray gelitaanka.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-12 px-10 shadow-2xl rounded-3xl border border-slate-100 border-t-4 border-t-red-600"
        >
          <div className="text-center mb-10">
            <div className="mx-auto h-20 w-20 bg-red-600 rounded-full flex items-center justify-center mb-6 text-white font-bold text-3xl shadow-lg shadow-red-100">
              M
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Admin Login</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium tracking-tight">Qaybtan waxaa loogu talagalay maamulka ururka oo kaliya.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-100 p-4 mb-8 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                <p className="text-xs text-red-700 font-bold uppercase tracking-wider">{error}</p>
              </div>
            </motion.div>
          )}

          <button
            disabled={loading}
            onClick={handleLogin}
            className="w-full flex justify-center items-center gap-4 py-5 px-4 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Ku gal Google Account
              </>
            )}
          </button>

          <p className="mt-10 text-center text-[10px] text-slate-400 uppercase font-black tracking-[0.3em]">
            Midowga Dhalinyarada
          </p>
        </motion.div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Ma u baahan tahay caawinaad? <a href="/#contact" className="text-red-600 font-semibold hover:underline">Nagala soo xiriir</a>
        </p>
      </div>
    </div>
  );
}
