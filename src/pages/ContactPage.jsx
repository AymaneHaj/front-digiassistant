import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Here you can add logic to send the contact form
    console.log('Contact form data:', data);
    // For now, we'll just show an alert
    alert('Merci pour votre message! Nous vous répondrons bientôt.');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#343A40] mb-4">
          Contactez-nous
        </h1>
        <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
          Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou demande.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-[#343A40] mb-6">
              Informations de contact
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#008C9E] to-[#006b7a] rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#343A40] mb-1">Email</h3>
                  <a 
                    href="mailto:contact@digiassistant.com" 
                    className="text-[#008C9E] hover:text-[#006b7a] transition-colors"
                  >
                    contact@digiassistant.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#008C9E] to-[#006b7a] rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#343A40] mb-1">Téléphone</h3>
                  <a 
                    href="tel:+212600000000" 
                    className="text-[#008C9E] hover:text-[#006b7a] transition-colors"
                  >
                    +212 600 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#008C9E] to-[#006b7a] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#343A40] mb-1">Adresse</h3>
                  <p className="text-[#5A5A5A]">
                    Casablanca, Maroc
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#008C9E] to-[#006b7a] rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Horaires d'ouverture</h3>
            <div className="space-y-2 text-white/90">
              <p><span className="font-semibold">Lundi - Vendredi:</span> 9h00 - 18h00</p>
              <p><span className="font-semibold">Samedi:</span> 9h00 - 13h00</p>
              <p><span className="font-semibold">Dimanche:</span> Fermé</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-[#343A40] mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#008C9E]" />
            Envoyez-nous un message
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#343A40] mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Le nom est requis' })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                } focus:outline-none focus:ring-2`}
                placeholder="Votre nom"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#343A40] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email invalide',
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                } focus:outline-none focus:ring-2`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-[#343A40] mb-2">
                Sujet <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                {...register('subject', { required: 'Le sujet est requis' })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                  errors.subject
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                } focus:outline-none focus:ring-2`}
                placeholder="Sujet de votre message"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#343A40] mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="5"
                {...register('message', { required: 'Le message est requis' })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all resize-none ${
                  errors.message
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-[#008C9E] focus:ring-[#008C9E]/20'
                } focus:outline-none focus:ring-2`}
                placeholder="Votre message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#008C9E] to-[#006b7a] hover:from-[#006b7a] hover:to-[#008C9E] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span>Envoyer le message</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

