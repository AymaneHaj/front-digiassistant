import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, MessageCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/authSlice';
import { clearChat } from '../../store/chatSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import logo from '../../assets/logo.png';

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear chat state explicitly before logout
    dispatch(clearChat());
    // Logout will clear auth state and localStorage
    dispatch(logoutAction());
    // Force page reload to ensure clean state
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if current page is auth page (login/register)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-white to-blue-50/30 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Brand */}
          
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="p-1.5 rounded-lg "
            >
              <img className="h-8 w-auto" src={logo} alt="DigiAssistant" />
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#008C9E] to-[#006b7a] bg-clip-text text-transparent">DigiAssistant</span>
              <span className="text-xs text-[#5A5A5A] font-medium">Be Strategic, Think Digital</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Main Navigation Links - Hide Home and About when authenticated */}
            {!isAuthenticated && (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/" 
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      location.pathname === '/' 
                        ? 'text-[#008C9E] bg-[#008C9E]/10' 
                        : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                    }`}
                  >
                    Accueil
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/about" 
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      location.pathname === '/about' 
                        ? 'text-[#008C9E] bg-[#008C9E]/10' 
                        : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                    }`}
                  >
                    À Propos
                  </Link>
                </motion.div>
              </>
            )}

            {/* Show Services and Contact only when NOT authenticated */}
            {!isAuthenticated && (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/services" 
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      location.pathname === '/services' 
                        ? 'text-[#008C9E] bg-[#008C9E]/10' 
                        : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                    }`}
                  >
                    Services
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/contact"
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      location.pathname === '/contact' 
                        ? 'text-[#008C9E] bg-[#008C9E]/10' 
                        : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                    }`}
                  >
                    Contact
                  </Link>
                </motion.div>
              </>
            )}

            {/* Show Chat link when authenticated */}
            {isAuthenticated && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/chat" 
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    location.pathname === '/chat' || location.pathname === '/diagnostic'
                      ? 'text-[#008C9E] bg-[#008C9E]/10' 
                      : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </Link>
              </motion.div>
            )}

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            {/* Auth Section - Only show if authenticated or on non-auth pages */}
            {isAuthenticated ? (
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </motion.button>
            ) : !isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-[#008C9E] hover:bg-[#008C9E]/5 rounded-lg transition-all duration-200"
                  >
                    Connexion
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    S'inscrire
                  </Link>
                </motion.div>
              </>
            ) : null}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-[#5A5A5A] hover:text-[#343A40] hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Menu Links - Hide Home and About when authenticated */}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/"
                      className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        location.pathname === '/' 
                          ? 'text-[#008C9E] bg-[#008C9E]/10' 
                          : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Accueil
                    </Link>

                    <Link
                      to="/about"
                      className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        location.pathname === '/about' 
                          ? 'text-[#008C9E] bg-[#008C9E]/10' 
                          : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      À Propos
                    </Link>
                  </>
                )}

                {/* Show Services and Contact only when NOT authenticated */}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/services"
                      className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        location.pathname === '/services' 
                          ? 'text-[#008C9E] bg-[#008C9E]/10' 
                          : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Services
                    </Link>

                    <Link
                      to="/contact"
                      className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                        location.pathname === '/contact' 
                          ? 'text-[#008C9E] bg-[#008C9E]/10' 
                          : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </>
                )}

                {/* Show Chat link when authenticated */}
                {isAuthenticated && (
                  <Link
                    to="/chat"
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      location.pathname === '/chat' || location.pathname === '/diagnostic'
                        ? 'text-[#008C9E] bg-[#008C9E]/10' 
                        : 'text-[#5A5A5A] hover:text-[#008C9E] hover:bg-[#008C9E]/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </Link>
                )}

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] text-white rounded-lg font-semibold transition-all shadow-sm text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  ) : !isAuthPage && !isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-sm font-semibold text-[#008C9E] hover:bg-[#008C9E]/5 rounded-lg transition-all text-center border border-[#008C9E]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Connexion
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2.5 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] text-white rounded-lg font-semibold transition-all text-center text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        S'inscrire
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
