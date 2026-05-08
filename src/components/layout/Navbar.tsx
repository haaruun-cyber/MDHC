import { Link, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { logout } from '../../lib/firebase';
import { Heart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = user?.email === 'haaruunhassan4737@gmail.com';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/' + id);
      return;
    }
    const element = document.getElementById(id.replace('/#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-red-500 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-xl font-extrabold tracking-tight text-red-600 uppercase">
                Midowga Dhalinyarada Calas
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 font-semibold text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className="text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            {isAdmin ? (
              <Link
                to="/admin"
                className="bg-slate-100 px-4 py-2 rounded-lg text-slate-800 hover:bg-red-50 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-slate-100 px-4 py-2 rounded-lg text-slate-800 hover:bg-red-50 transition-colors"
              >
                Admin
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  {link.name}
                </button>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                Admin Panel
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
