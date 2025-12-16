import { motion } from 'framer-motion';
import { BarChart3, Brain, Zap, BookOpen, MessageSquare, FileText } from 'lucide-react';

export default function ServicesPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: BarChart3,
      title: "Diagnostic Complet",
      description: "Évaluation détaillée de votre maturité digitale à travers 72 critères expertisés couvrant 6 dimensions clés.",
    },
    {
      icon: Brain,
      title: "Analyse Intelligente",
      description: "Utilisation de l'IA pour analyser vos réponses et générer des insights pertinents et actionnables.",
    },
    {
      icon: Zap,
      title: "Recommandations Ciblées",
      description: "Suggestions personnalisées basées sur votre profil de maturité et vos objectifs stratégiques.",
    },
    {
      icon: BookOpen,
      title: "Ressources Éducatives",
      description: "Accès à des guides et bonnes pratiques pour accompagner votre transformation digitale.",
    },
    {
      icon: MessageSquare,
      title: "Support Conversationnel",
      description: "Interaction naturelle avec notre assistant IA pour explorer vos défis digitaux.",
    },
    {
      icon: FileText,
      title: "Rapports Détaillés",
      description: "Générez des rapports complets incluant scores, analyses et recommandations en PDF.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#343A40] mb-6"
          >
            Nos <span className="bg-gradient-to-r from-[#008C9E] to-[#006b7a] bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl text-[#5A5A5A] mb-8"
          >
            Une suite complète d'outils pour piloter votre transformation digitale
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-[#008C9E]/30 transition-all group"
                >
                  <div className="mb-4 inline-block p-3 bg-[#008C9E]/10 rounded-lg group-hover:bg-[#008C9E]/20 transition-all">
                    <Icon className="w-8 h-8 text-[#008C9E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#343A40] mb-3">{service.title}</h3>
                  <p className="text-[#5A5A5A] leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-[#343A40] mb-12 text-center"
          >
            Pourquoi Choisir DigiAssistant?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Expertise Reconnue",
                description: "Basé sur le framework de maturité digitale des meilleures pratiques internationales.",
              },
              {
                title: "Rapidité",
                description: "Obtenez vos résultats en moins de 30 minutes avec notre diagnostic interactif.",
              },
              {
                title: "Accessibilité",
                description: "Plateforme conviviale accessible à tous, sans besoin de connaissances techniques.",
              },
              {
                title: "Continuité",
                description: "Suivez votre progression dans le temps et mesurez l'impact de vos initiatives.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#008C9E]/10 text-[#008C9E]">
                    <span className="text-xl font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#343A40]">{feature.title}</h3>
                  <p className="text-[#5A5A5A] mt-1">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#008C9E] to-[#006b7a]"
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Commencez Dès Maintenant</h2>
          <p className="text-lg mb-8 opacity-90">
            Découvrez où vous en êtes dans votre parcours digital et obtenez un plan d'action personnalisé.
          </p>
          <motion.a
            href="/chat"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-white text-[#008C9E] rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Accédez au Diagnostic
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

