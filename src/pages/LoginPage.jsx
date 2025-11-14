import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserInfo } from '../store/authSlice';
import { AlertCircle, LogIn, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // If the Redux state has an error, show it in the form
  useEffect(() => {
    if (error) {
      setError('root.apiError', { type: 'manual', message: error });
    }
  }, [error, setError]);

  const onSubmit = async (data) => {
    try {
      // Dispatch the login thunk
      await dispatch(login(data)).unwrap();
      
      // Fetch user info including score
      await dispatch(fetchUserInfo());

      // On success, navigate to chat page
      navigate('/chat');

    } catch (rejectedValueOrSerializedError) {
      console.error('Login failed:', rejectedValueOrSerializedError);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-block mb-4"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#008C9E] to-[#006b7a] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <LogIn className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          </div>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#343A40] mb-1">
          Connexion
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5A5A]">
          Connectez-vous à votre compte DigiAssistant
        </p>
      </div>

      <div className="space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* API Error Message */}
        {errors.root?.apiError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-red-50 p-3 sm:p-4 border border-red-200"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {errors.root.apiError.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email-address" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'Email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide',
                },
              })}
              className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] placeholder-[#5A5A5A]/50 focus:outline-none focus:ring-2 transition-all ${errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
              placeholder="exemple@email.com"
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
            >
              ⚠️ {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Mot de passe requis',
                minLength: {
                  value: 6,
                  message: 'Au minimum 6 caractères',
                },
              })}
              className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] placeholder-[#5A5A5A]/50 focus:outline-none focus:ring-2 transition-all ${errors.password
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
            >
              ⚠️ {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm sm:text-base"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Connexion...</span>
            </>
          ) : (
            <>
              <LogIn className="h-4 sm:h-5 w-4 sm:w-5" />
              <span>Se connecter</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Register Link */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-[#5A5A5A] mb-2">
          Vous n'avez pas de compte?
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-6 sm:text-base"
        >
          Créer un compte
        </Link>
      </div>
      </div>
    </motion.div>
  );
}