import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Trophy, BarChart3, Flame } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const Layout = () => {
  const location = useLocation();
  const { progress } = useProgress();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-effect-strong sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-xl glow"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                Spanish Mission
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-r from-primary-600/30 to-secondary-600/30 text-white border border-primary-500/30'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Stats Display */}
            <div className="flex items-center space-x-4">
              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="glass-effect px-3 py-2 rounded-xl flex items-center space-x-2"
              >
                <Flame className="w-5 h-5 text-orange-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Streak</span>
                  <span className="text-sm font-bold text-orange-400">{progress.streak} days</span>
                </div>
              </motion.div>

              {/* XP */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="glass-effect px-3 py-2 rounded-xl flex items-center space-x-2"
              >
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1.5 rounded-lg">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">XP</span>
                  <span className="text-sm font-bold text-primary-300">{progress.totalXP}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/10">
          <nav className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      active
                        ? 'text-primary-400'
                        : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>Spanish from Scratch: The 10-Week Mission</p>
            <p className="mt-1">Task-Based Language Learning • Comprehensible Input • Active Recall</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
