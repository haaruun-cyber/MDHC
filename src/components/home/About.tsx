import { motion } from 'motion/react';
import { Target, Eye, Users, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Hadafka (Mission)",
      desc: "Inaan xoojino doorka dhalinyarada ee horumarinta bulshada iyo u adeegidda dadka u baahan caawimaad.",
      icon: Target,
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Aragtida (Vision)",
      desc: "In dhalinyarada Calas noqdaan kuwo isku xiran, aqoon leh, oo hormuud u ah isbeddelka togan ee deegaanka.",
      icon: Eye,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Waxqabadka",
      desc: "Waxaan qabanaa kulamo dhalinyaro, gurmad dhiig ku deeqis ah, iyo taageero la siiyo qoysaska danyarta ah.",
      icon: Heart,
      color: "bg-pink-50 text-pink-600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-slate-900 sm:text-5xl tracking-tight"
          >
            Kumuu Yahay <span className="text-red-600">Midowga</span> Calas?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto font-medium"
          >
            Waxaan nahay urur dhalinyaro oo ka dhisan deegaanka Calas, kaasoo u taagan u adeegidda bulshada iyo horumarinta dhalinyarada.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-red-50 hover:border-red-200 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-red-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">Dhiig Ku Deeqis (Blood Donation)</h3>
            <p className="text-red-100 text-lg mb-6">
              Ururka Midowga Dhalinyarada Calas wuxuu si dhaw ula shaqeeyaa isbitaalada si loo badbaadiyo nolosha dadka u baahan dhiig. Waxaan ururinaa diiwaanka muwaadiniinta diyaar u ah inay dhiig bixiyaan xaaladaha degdega ah.
            </p>
            <button className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
              Nagu Soo Biir
            </button>
          </div>
          <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-red-500 rounded-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&q=80&w=800" 
              alt="Blood donation support"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
