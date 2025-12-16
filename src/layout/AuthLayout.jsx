import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * AuthLayout
 * Professional authentication layout with Header and Footer
 * Uses shared Header component for consistency across the app
 */
export default function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-blue-50">
            {/* Header - Shared across entire app */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100/50">
                        {/* Forms will render here */}
                        <Outlet />
                    </div>
                </motion.div>
            </main>

            {/* Footer - Shared across entire app */}
            <Footer />
        </div>
    );
}
