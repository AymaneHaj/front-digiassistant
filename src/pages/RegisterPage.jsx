import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerAction, fetchUserInfo } from '../store/authSlice';
import { AlertCircle, UserPlus, Mail, Lock, CheckCircle, Building2, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  // Watch the password field to validate confirm password
  const password = watch('password');

  useEffect(() => {
    if (error) {
      setError('root.apiError', { type: 'manual', message: error });
    }
  }, [error, setError]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerAction({ 
        email: data.email, 
        password: data.password,
        company_name: data.company_name,
        sector: data.sector,
        company_size: data.company_size
      })).unwrap();
      
      // Fetch user info including score
      await dispatch(fetchUserInfo());
      
      navigate('/chat');
    } catch (rejectedValueOrSerializedError) {
      console.error('Registration failed:', rejectedValueOrSerializedError);
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
            <UserPlus className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          </div>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#343A40] mb-1">
          Créer un compte
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5A5A]">
          Rejoignez DigiAssistant pour débuter votre transformation digitale
        </p>
      </div>

      <div className="space-y-6">
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

          {/* Company Name Field */}
          <div>
            <label htmlFor="company-name" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
              Entreprise <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <input
                id="company-name"
                name="company_name"
                type="text"
                {...register('company_name', {
                  required: 'Nom de l\'entreprise requis',
                })}
                className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] placeholder-[#5A5A5A]/50 focus:outline-none focus:ring-2 transition-all ${errors.company_name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
                placeholder="Acme Corporation"
              />
            </div>
            {errors.company_name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
              >
                ⚠️ {errors.company_name.message}
              </motion.p>
            )}
          </div>

          {/* Sector Field */}
          <div>
            <label htmlFor="sector" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
              Secteur <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <select
                id="sector"
                name="sector"
                {...register('sector', {
                  required: 'Secteur requis',
                })}
                className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${errors.sector
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
              >
                <option value="">Sélectionner un secteur</option>
                <option value="Technologie">Technologie</option>
                <option value="Commerce">Commerce</option>
                <option value="Services">Services</option>
                <option value="Industrie">Industrie</option>
                <option value="Santé">Santé</option>
                <option value="Éducation">Éducation</option>
                <option value="Finance">Finance</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Transport">Transport</option>
                <option value="Tourisme">Tourisme</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            {errors.sector && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
              >
                ⚠️ {errors.sector.message}
              </motion.p>
            )}
          </div>

          {/* Company Size Field */}
          <div>
            <label htmlFor="company-size" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
              Taille <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <select
                id="company-size"
                name="company_size"
                {...register('company_size', {
                  required: 'Taille requise',
                })}
                className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${errors.company_size
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
              >
                <option value="">Sélectionner la taille</option>
                <option value="Micro (1-5 employés)">Micro (1-5)</option>
                <option value="Petite (6-20 employés)">Petite (6-20)</option>
                <option value="Moyenne (21-50 employés)">Moyenne (21-50)</option>
                <option value="Grande (51-200 employés)">Grande (51-200)</option>
                <option value="Très grande (201+ employés)">Très grande (201+)</option>
              </select>
            </div>
            {errors.company_size && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
              >
                ⚠️ {errors.company_size.message}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email requis',
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
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="passwordConfirm" className="block text-xs sm:text-sm font-semibold text-[#343A40] mb-2">
              Confirmer <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#5A5A5A]" />
              </div>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                {...register('passwordConfirm', {
                  required: 'Confirmation requise',
                  validate: (value) =>
                    value === password || 'Les mots de passe ne correspondent pas',
                })}
                className={`block w-full pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base text-[#343A40] placeholder-[#5A5A5A]/50 focus:outline-none focus:ring-2 transition-all ${errors.passwordConfirm
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-300 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.passwordConfirm && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-xs sm:text-sm text-red-600 font-medium"
              >
                ⚠️ {errors.passwordConfirm.message}
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
                <span>Création...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 sm:h-5 w-4 sm:w-5" />
                <span>S'inscrire</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Terms and Privacy */}
        <div className="text-center text-xs sm:text-sm text-[#5A5A5A]">
          <p>
            En s'inscrivant, vous acceptez nos{' '}
            <Link to="/terms" className="text-[#008C9E] hover:text-[#008C9E]/80 font-medium">
              Conditions
            </Link>
            {' '}et{' '}
            <Link to="/privacy" className="text-[#008C9E] hover:text-[#008C9E]/80 font-medium">
              Confidentialité
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
