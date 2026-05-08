import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs tracking-tight">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-red-500">●</span> Calas, Region 01
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">●</span> +252 61 000 0000
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500">●</span> info@calasyouth.so
          </div>
        </div>
        <div className="flex gap-4 text-slate-400 uppercase font-black tracking-[0.2em] mt-4 md:mt-0">
          <a href="#" className="hover:text-red-600 transition-colors">Facebook</a>
          <a href="#" className="hover:text-red-600 transition-colors">Twitter</a>
          <a href="#" className="hover:text-red-600 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
