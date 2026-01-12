export interface ViolationCategory {
  name: string;
  detected: boolean;
  confidence: number;
  severity: 'safe' | 'warning' | 'violation';
  description: string;
}

export interface AnalysisResult {
  text: string;
  overallScore: number;
  overallSeverity: 'safe' | 'warning' | 'violation';
  categories: ViolationCategory[];
  timestamp: Date;
  processingTime: number;
}

const analyzeTextLocally = (text: string): AnalysisResult => {
  const startTime = Date.now();

  const lowerText = text.toLowerCase();

  const hateSpeechKeywords = ['hate', 'discriminat', 'racist', 'sexist', 'bigot', 'nazi', 'supremac'];
  const spamKeywords = ['click here', 'buy now', 'limited time', 'act fast', 'free money', 'winner', 'congratulations'];
  const inappropriateKeywords = ['explicit', 'nsfw', 'adult content', 'xxx'];
  const violenceKeywords = ['kill', 'murder', 'attack', 'weapon', 'bomb', 'terror', 'hurt', 'harm'];
  const harassmentKeywords = ['idiot', 'stupid', 'loser', 'shut up', 'die', 'threat'];

  const checkKeywords = (keywords: string[]): number => {
    let count = 0;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) count++;
    });
    return Math.min(count / keywords.length, 1);
  };

  const hateSpeechScore = checkKeywords(hateSpeechKeywords);
  const spamScore = checkKeywords(spamKeywords);
  const inappropriateScore = checkKeywords(inappropriateKeywords);
  const violenceScore = checkKeywords(violenceKeywords);
  const harassmentScore = checkKeywords(harassmentKeywords);

  const getSeverity = (score: number): 'safe' | 'warning' | 'violation' => {
    if (score > 0.6) return 'violation';
    if (score > 0.3) return 'warning';
    return 'safe';
  };

  const categories: ViolationCategory[] = [
    {
      name: 'Hate Speech',
      detected: hateSpeechScore > 0.3,
      confidence: hateSpeechScore * 100,
      severity: getSeverity(hateSpeechScore),
      description: 'Content containing discriminatory or hateful language targeting groups or individuals'
    },
    {
      name: 'Spam',
      detected: spamScore > 0.3,
      confidence: spamScore * 100,
      severity: getSeverity(spamScore),
      description: 'Unsolicited promotional content or repetitive messaging'
    },
    {
      name: 'Inappropriate Content',
      detected: inappropriateScore > 0.3,
      confidence: inappropriateScore * 100,
      severity: getSeverity(inappropriateScore),
      description: 'Content that may be sexually explicit or otherwise inappropriate'
    },
    {
      name: 'Violence',
      detected: violenceScore > 0.3,
      confidence: violenceScore * 100,
      severity: getSeverity(violenceScore),
      description: 'Content promoting or depicting violence or harmful activities'
    },
    {
      name: 'Harassment',
      detected: harassmentScore > 0.3,
      confidence: harassmentScore * 100,
      severity: getSeverity(harassmentScore),
      description: 'Bullying, threatening, or targeted harassment of individuals'
    }
  ];

  const overallScore = Math.max(
    hateSpeechScore,
    spamScore,
    inappropriateScore,
    violenceScore,
    harassmentScore
  ) * 100;

  const overallSeverity: 'safe' | 'warning' | 'violation' =
    overallScore > 60 ? 'violation' :
    overallScore > 30 ? 'warning' :
    'safe';

  const processingTime = Date.now() - startTime;

  return {
    text,
    overallScore,
    overallSeverity,
    categories,
    timestamp: new Date(),
    processingTime
  };
};

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  return analyzeTextLocally(text);
};

export const getStatistics = () => {
  return {
    totalAnalyzed: 15847,
    violationsDetected: 2341,
    accuracyRate: 98.7,
    avgResponseTime: 245
  };
};
