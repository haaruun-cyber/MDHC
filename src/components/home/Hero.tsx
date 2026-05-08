import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, HeartHandshake, Users, Calendar } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:max-w-7xl lg:mx-auto lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full self-start">
                Ururka dhalinyarada & Caawinta
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900 tracking-tight">
                Ku Soo Dhawoow <br/>
                <span className="text-red-600">Midowga</span> Dhalinyarada Calas
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Waxaan u adeegnaa bulshada annagoo taageerayna dhalinyarada iyo dadka u baahan caawimaad. Ka mid noqo isbedelka maanta.
              </p>
              
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <div className="text-red-600 font-bold text-2xl">1,250+</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Dhiig-bixiyeen</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <div className="text-red-600 font-bold text-2xl">45</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Mashruuc</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                  <div className="text-red-600 font-bold text-2xl">5k+</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Bulshada</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 uppercase tracking-wider transition-all"
                >
                  Isdiiwaan Halkan
                </button>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 uppercase tracking-wider transition-all"
                >
                  Warar Dheeraad Ah
                </button>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <motion.img
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full rounded-3xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000"
                alt="Youth helping community"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
