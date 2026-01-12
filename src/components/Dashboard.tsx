import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowLeft, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeContent, AnalysisResult } from '../services/api';
import ResultsDisplay from './ResultsDisplay';
import FloatingParticles from './FloatingParticles';

interface DashboardProps {
  onNavigate: (page: 'landing' | 'dashboard') => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const analysis = await analyzeContent(text);
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setResult(analysis);
        setIsAnalyzing(false);
        setProgress(0);
      }, 300);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      clearInterval(progressInterval);
      setProgress(0);
    }
  };

  const exampleTexts = [
    "This is a perfectly normal and friendly message about technology.",
    "Click here now! Limited time offer! Buy now and get rich quick! Act fast!",
    "I hate dealing with slow internet connections and buggy software."
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'violation': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'safe': return CheckCircle2;
      case 'warning': return AlertCircle;
      case 'violation': return AlertTriangle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            onClick={() => onNavigate('landing')}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Content Analysis</span>
            </h1>
            <p className="text-xl text-gray-400">Enter text below to analyze for potential violations</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card p-8 mb-8"
            >
              <label className="block text-lg font-semibold mb-4 text-white">
                Input Content
              </label>

              <motion.textarea
                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Type or paste content here to analyze for violations..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isAnalyzing}
                whileFocus={{ scale: 1.01 }}
              />

              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                <span className="text-sm text-gray-400">Try example:</span>
                {exampleTexts.map((example, index) => (
                  <motion.button
                    key={index}
                    className="text-sm px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/50 transition-all"
                    onClick={() => setText(example)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Example {index + 1}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                  isAnalyzing || !text.trim()
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                }`}
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                whileHover={!isAnalyzing && text.trim() ? { scale: 1.02 } : {}}
                whileTap={!isAnalyzing && text.trim() ? { scale: 0.98 } : {}}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Analyze Content
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Processing...</span>
                      <span className="text-sm text-purple-400 font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className={`glass-card p-8 mb-8 border-2 ${getSeverityColor(result.overallSeverity)}`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Overall Assessment</h2>
                        <p className="text-gray-400">Analysis completed in {result.processingTime}ms</p>
                      </div>
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {(() => {
                          const Icon = getSeverityIcon(result.overallSeverity);
                          return <Icon className="w-16 h-16 mb-2" />;
                        })()}
                        <span className="text-3xl font-bold">{result.overallScore.toFixed(1)}%</span>
                        <span className="text-sm uppercase font-semibold">{result.overallSeverity}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <ResultsDisplay result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
