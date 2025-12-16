import { motion } from 'framer-motion';
import { CheckCircle, Users, Lightbulb, Target } from 'lucide-react';

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
            À Propos de <span className="bg-gradient-to-r from-[#008C9E] to-[#006b7a] bg-clip-text text-transparent">DigiAssistant</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl text-[#5A5A5A] mb-8"
          >
            Votre partenaire stratégique pour la transformation digitale
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-[#343A40] mb-6">Notre Mission</h2>
              <p className="text-[#5A5A5A] text-lg leading-relaxed mb-4">
                DigiAssistant aide les PME et entreprises à comprendre leur maturité digitale et à développer une stratégie de transformation adaptée à leurs besoins spécifiques.
              </p>
              <p className="text-[#5A5A5A] text-lg leading-relaxed">
                Nous croyons que la transformation digitale n'est pas un luxe, mais une nécessité pour rester compétitif dans le marché moderne.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#008C9E]/10 to-[#006b7a]/10 rounded-2xl p-8"
            >
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-[#008C9E] flex-shrink-0 mt-1" />
                  <p className="text-[#343A40] font-semibold">Diagnostic complet</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-[#008C9E] flex-shrink-0 mt-1" />
                  <p className="text-[#343A40] font-semibold">Recommandations personnalisées</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-[#008C9E] flex-shrink-0 mt-1" />
                  <p className="text-[#343A40] font-semibold">Support stratégique</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-[#343A40] mb-12 text-center"
          >
            Nos Valeurs
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <Lightbulb className="w-12 h-12 text-[#008C9E] mb-4" />
              <h3 className="text-xl font-bold text-[#343A40] mb-3">Innovation</h3>
              <p className="text-[#5A5A5A]">
                Nous utilisons les dernières technologies et méthodologies pour fournir des solutions modernes et efficaces.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <Users className="w-12 h-12 text-[#008C9E] mb-4" />
              <h3 className="text-xl font-bold text-[#343A40] mb-3">Collaboration</h3>
              <p className="text-[#5A5A5A]">
                Nous travaillons en partenariat étroit avec nos clients pour comprendre leurs défis uniques.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <Target className="w-12 h-12 text-[#008C9E] mb-4" />
              <h3 className="text-xl font-bold text-[#343A40] mb-3">Excellence</h3>
              <p className="text-[#5A5A5A]">
                Nous nous engageons à fournir les meilleures recommandations et accompagnement stratégique.
              </p>
            </motion.div>
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
          <h2 className="text-3xl font-bold mb-6">Prêt à Commencer?</h2>
          <p className="text-lg mb-8 opacity-90">
            Évaluez votre maturité digitale dès maintenant et recevez des recommandations personnalisées.
          </p>
          <motion.a
            href="/chat"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-white text-[#008C9E] rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Démarrer le Diagnostic
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}

