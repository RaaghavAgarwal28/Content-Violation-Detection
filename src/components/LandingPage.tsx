import { motion } from 'framer-motion';
import { Shield, Zap, Eye, BarChart3, CheckCircle2, AlertTriangle } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'dashboard') => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [stats, setStats] = useState({
    analyzed: 0,
    accuracy: 0,
    violations: 0,
    responseTime: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      analyzed: 15847,
      accuracy: 98.7,
      violations: 2341,
      responseTime: 245
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        analyzed: Math.floor(targets.analyzed * easeOut),
        accuracy: Number((targets.accuracy * easeOut).toFixed(1)),
        violations: Math.floor(targets.violations * easeOut),
        responseTime: Math.floor(targets.responseTime * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Advanced Protection',
      description: 'AI-powered detection of hate speech, harassment, and inappropriate content',
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Instant content moderation with sub-second response times',
      color: 'text-pink-400'
    },
    {
      icon: Eye,
      title: 'Multi-Category Detection',
      description: 'Comprehensive scanning across 5+ violation categories',
      color: 'text-blue-400'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'In-depth insights with confidence scores and severity levels',
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10">
        <motion.div
          className="container mx-auto px-6 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center mb-20"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
            >
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Trusted by 10,000+ platforms</span>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-8xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="gradient-text">Content Violation</span>
              <br />
              <span className="text-white">Detection System</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Protect your platform with AI-powered content moderation. Detect violations in real-time with industry-leading accuracy.
            </motion.p>

            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-semibold overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('dashboard')}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Try Live Demo
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            variants={itemVariants}
          >
            {[
              { label: 'Content Analyzed', value: stats.analyzed.toLocaleString(), icon: Eye },
              { label: 'Accuracy Rate', value: `${stats.accuracy}%`, icon: CheckCircle2 },
              { label: 'Violations Caught', value: stats.violations.toLocaleString(), icon: AlertTriangle },
              { label: 'Avg Response', value: `${stats.responseTime}ms`, icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card glass-card-hover p-8"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 ${feature.color}`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <feature.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
