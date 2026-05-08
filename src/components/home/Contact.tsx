import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-red-600 p-12 lg:p-16 text-white relative">
              <div className="relative z-10">
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Nagala <br/> Soo Xiriir</h2>
                <p className="mt-6 text-lg text-red-100 font-medium">
                  Wixii talo, tusaale, ama su'aalo ah oo ku saabsan waxqabadkeena, fadlan nagala soo xiriir foomka ama cinwaanada hoos ku xusan.
                </p>

                <div className="mt-12 space-y-8 font-bold uppercase tracking-wider text-xs">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-red-300">Phone</p>
                      <p className="text-xl">+252 61 XXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-red-300">Email</p>
                      <p className="text-xl">info@calasyouth.so</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 lg:p-16">
              <form className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Magaca oo Buuxa
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                    placeholder="Magacaaga"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium"
                    placeholder="tusaale@mail.com"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Farriintaada
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-all font-medium resize-none"
                    placeholder="Halkan ku qor farriintaada..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white font-bold py-5 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all uppercase tracking-wider text-sm mt-4"
                >
                  Diri Farriinta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
