import { motion } from 'motion/react';
import { Droplet, Users, GraduationCap, ClipboardList, AlertCircle } from 'lucide-react';

const services = [
  {
    title: "Dhiig Ku Deeqis",
    desc: "Ka caawinta bukaanada dhiigga u baahan annagoo xiriirinayna deeq-bixiyaasha dhiigga.",
    icon: Droplet,
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    title: "Community Support",
    desc: "Taageerada qoysaska danyarta ah iyo dadka barakacayaasha ah ee ku nool deegaanka.",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "Youth Development",
    desc: "Koorsooyin aqoon kororsi iyo tababaro dhalinyarada loogu diyaarinayo suuqa shaqada.",
    icon: GraduationCap,
    color: "text-green-500",
    bg: "bg-green-50"
  },
  {
    title: "Volunteer Registration",
    desc: "Diiwaangelinta dhalinyarada doonaya inay si mutadawacnimo ah ugu adeegaan bulshadooda.",
    icon: ClipboardList,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "Emergency Assistance",
    desc: "Gurmad degdeg ah xiliyada ay dhacaan masiibooyinka dabiiciga ah ama dhibaatooyinka bulshada.",
    icon: AlertCircle,
    color: "text-orange-500",
    bg: "bg-orange-50"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-slate-900 sm:text-5xl tracking-tight"
            >
              Adeegyada aan <span className="text-red-600">Bulshada</span> u Hayno
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-slate-600 font-medium"
            >
              Midowga Dhalinyarada Calas wuxuu bixiyaa adeegyo kala duwan oo muhiim u ah bulshada deegaanka iyo guud ahaan gobolka.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white border border-slate-100 rounded-3xl hover:border-red-100 hover:shadow-2xl hover:shadow-red-500/5 transition-all"
            >
              <div className={`inline-flex p-4 rounded-2xl ${service.bg} ${service.color} mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
