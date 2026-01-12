import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe': return 'from-green-500 to-emerald-500';
      case 'warning': return 'from-yellow-500 to-orange-500';
      case 'violation': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'safe': return 'bg-green-500/10 border-green-500/30';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'violation': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const chartData = result.categories.map(cat => ({
    name: cat.name.split(' ')[0],
    confidence: cat.confidence,
    fill: cat.severity === 'violation' ? '#ef4444' : cat.severity === 'warning' ? '#f59e0b' : '#10b981'
  }));

  return (
    <div className="space-y-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {result.categories.map((category, index) => {
          const Icon = getSeverityIcon(category.severity);

          return (
            <motion.div
              key={category.name}
              variants={cardVariants}
              className={`glass-card p-6 border-2 ${getSeverityBg(category.severity)} relative overflow-hidden group cursor-pointer`}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getSeverityColor(category.severity)} opacity-10 rounded-full blur-2xl`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getSeverityColor(category.severity)} bg-opacity-20`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <motion.div
                    className="flex flex-col items-end"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-3xl font-bold">{category.confidence.toFixed(1)}%</span>
                    <span className={`text-xs uppercase font-semibold px-2 py-1 rounded-full mt-1 ${getSeverityBg(category.severity)}`}>
                      {category.severity}
                    </span>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Confidence Level</span>
                    <span className="font-semibold">{category.confidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getSeverityColor(category.severity)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${category.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {category.detected && (
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-400">Violation Detected</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 bg-opacity-20">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Confidence Distribution</h2>
            <p className="text-gray-400">Visual breakdown of detection confidence levels</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar
              dataKey="confidence"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">Total Categories</div>
            <div className="text-2xl font-bold">{result.categories.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">Violations Found</div>
            <div className="text-2xl font-bold text-red-400">
              {result.categories.filter(c => c.detected).length}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">Processing Time</div>
            <div className="text-2xl font-bold text-green-400">{result.processingTime}ms</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsDisplay;
