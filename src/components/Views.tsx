import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Droplets, 
  Zap, 
  Moon, 
  Wind, 
  Flame, 
  Activity, 
  Plus, 
  ArrowRight,
  ArrowLeft,
  Camera, 
  MessageCircle, 
  Search,
  Star,
  CheckCircle2,
  ShoppingBag,
  RefreshCw,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Package,
  Leaf,
  Brain,
  BookOpen,
  Sparkles,
  Info,
  X,
  Send,
  Gift,
  User,
  Wand2,
  Target,
  Sun,
  Monitor,
  Dumbbell,
  Cloud,
  Utensils,
  Coffee,
  Heart,
  History,
  Calendar,
  Truck,
  Pause,
  Play,
  Trash2,
  Edit3,
  AlertCircle,
  Smile,
  Thermometer,
  TrendingUp,
  TrendingDown,
  Save,
  Eye,
  ShoppingCart,
  FlaskConical,
  Bell,
  Lock,
  Shield,
  Bookmark,
  MapPin
} from "lucide-react";
import { 
  Card, 
  SkinIndicator, 
  SurrealPlantBody, 
  GlowingDroplet, 
  DistillationProcess,
  LiquidContainer,
  StepByStepTutorial,
  ChatMessage,
  RefillIndicator,
  ProductScanner,
  SkinScanCompare,
  IllustratedFace,
  IllustratedProduct,
  AICoachEntity,
  AICoachEntitySmall,
  VialCard,
  SkinCoachFloating,
  Confetti,
  ReflectionModal,
  RosemaryGroomingIllustration,
  View,
  SectionLabel,
  Button
} from "./UI";

// --- Botanical Data ---

export const BOTANICALS = [
  { 
    id: "thyme",
    name: "Lebanese Thyme", 
    benefit: "Antibacterial & Balancing", 
    concern: "Acne",
    origin: "Mount Lebanon Terraces",
    process: "Steam Distillation",
    color: "bg-myrea-green",
    description: "A powerful natural antiseptic from the high peaks of Lebanon.",
    detailedBenefits: "Rich in thymol, it reduces acne-causing bacteria while balancing sebum production.",
    commonUses: "Traditionally used as a facial steam or infused in olive oil for irritations.",
    howItWorks: "Neutralizes bacteria and soothes inflammation at the source.",
    targets: ["Acne", "Oiliness", "Congestion"],
    transformation: [
      { title: "Collection", desc: "Sun-dried for 48 hours.", icon: Sun },
      { title: "Extraction", desc: "Low-pressure steam distillation.", icon: RefreshCw }
    ],
    labRole: "Active"
  },
  { 
    id: "laurel",
    name: "Laurel Berry", 
    benefit: "Soothing & Cleansing", 
    concern: "Sensitivity",
    origin: "Northern Coastal Valleys",
    process: "Cold Pressing",
    color: "bg-myrea-blue",
    description: "The ancient secret of the Levant for soothing properties.",
    detailedBenefits: "Contains high levels of fatty acids and antioxidants that soothe inflammation.",
    commonUses: "The core ingredient of Aleppo soap, used for centuries.",
    howItWorks: "Provides deep antimicrobial protection while strengthening the lipid barrier.",
    targets: ["Sensitivity", "Redness", "Eczema"],
    transformation: [
      { title: "Boiling", desc: "Traditional slow-boil extraction.", icon: Flame },
      { title: "Separation", desc: "Oil skimmed from the surface.", icon: Droplets }
    ],
    labRole: "Extract"
  },
  { 
    id: "rose",
    name: "Damask Rose", 
    benefit: "Hydrating & Toning", 
    concern: "Dryness",
    origin: "Bekaa Valley Gardens",
    process: "Hydro-Distillation",
    color: "bg-myrea-pink",
    description: "A delicate humectant that captures morning dew.",
    detailedBenefits: "Natural humectant that draws moisture into the skin.",
    commonUses: "Refreshing facial toner and key ingredient in traditional desserts.",
    howItWorks: "Natural sugars lock in moisture without alcohol.",
    targets: ["Dryness", "Dullness", "Large Pores"],
    transformation: [
      { title: "Sorting", desc: "Petals separated manually.", icon: Leaf },
      { title: "Distillation", desc: "Copper alembic hydro-distillation.", icon: RefreshCw }
    ],
    labRole: "Active"
  },
  { 
    id: "olive",
    name: "Ancient Olive", 
    benefit: "Nourishing & Protective", 
    concern: "Aging",
    origin: "Southern Olive Groves",
    process: "Cold Pressing",
    color: "bg-myrea-yellow",
    description: "The 'Liquid Gold' of Southern Lebanon.",
    detailedBenefits: "Intense hydration and protection against pollutants.",
    commonUses: "Full-body moisturizer and base for traditional remedies.",
    howItWorks: "Mimics the skin's natural sebum, providing biocompatible nourishment.",
    targets: ["Aging", "Dehydration", "Pollution"],
    transformation: [
      { title: "Crushing", desc: "Stone-milled within 24 hours.", icon: Activity },
      { title: "Pressing", desc: "First cold press extraction.", icon: Zap }
    ],
    labRole: "Extract"
  }
];

// --- Formulation Lab Data ---

const LAB_PRODUCT_TYPES = [
  { id: "moisturizer", label: "Moisturizer", desc: "A protective embrace to seal in vitality", recommendedBases: ["water", "cream"] },
  { id: "serum", label: "Botanist Serum", desc: "High-concentration precision for cellular repair", recommendedBases: ["water", "gel"] },
  { id: "mask", label: "Rescuing Mask", desc: "An intensive routine for profound skin restoration", recommendedBases: ["gel", "cream"] },
  { id: "oil", label: "Elixir Oil", desc: "A final layer of pure Mediterranean lipid nourishment", recommendedBases: ["oil"] }
];

const LAB_USAGE_TIMES = [
  { id: "day", label: "Golden Hour", desc: "Formulated for daytime protection and luminosity" },
  { id: "night", label: "Midnight Matrix", desc: "Engineered for nocturnal cellular synthesis" }
];

const LAB_BASES = [
  { id: "water", label: "Aqua/Hydrosol", desc: "Pure floral distillates for weightless hydration", color: "bg-blue-400", tint: "bg-blue-50/40", type: "Water" },
  { id: "oil", label: "Botanical Oil", desc: "Cold-pressed Mediterranean lipids for deep nourishment", color: "bg-amber-400", tint: "bg-amber-50/40", type: "Oil" },
  { id: "gel", label: "Aloe/Gel", desc: "Cooling botanical mucilage to quiet internal heat", color: "bg-emerald-400", tint: "bg-emerald-50/40", type: "Gel" },
  { id: "cream", label: "Whipped Cream", desc: "An airy emulsion for ultimate barrier comfort", color: "bg-slate-200", tint: "bg-slate-50/40", type: "Cream" }
];

const LAB_ACTIVES = [
  { id: "hyaluronic", name: "Hyaluronic Acid", benefit: "Volumizing & Plumping", concern: "Dryness", strength: 0.5 },
  { id: "niacinamide", name: "Niacinamide", benefit: "Texture & Tone Refiner", concern: "Acne", strength: 0.4 },
  { id: "vitamin-c", name: "Vitamin C", benefit: "Luminous Brilliance", concern: "Dullness", strength: 0.6 },
  { id: "panthenol", name: "Panthenol", benefit: "Deep Structural Repair", concern: "Sensitivity", strength: 0.3 }
];

// --- Analytics Helpers ---

// --- Skin Evolution Visual System ---

const LiquidEcosystem = ({ history }: { history: any[] }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(5); // Default to Saturday as per prompt
  const [activeMetrics, setActiveMetrics] = useState<string[]>(["hydration", "redness", "irritation", "stress", "sleep", "water"]);
  
  const metricsConfig = [
    { id: "hydration", label: "Hydration", color: "#4FC3F7", icon: Droplets, max: 100 },
    { id: "water", label: "Water Intake", color: "#81C784", icon: Activity, max: 8 },
    { id: "redness", label: "Redness", color: "#FF8A65", icon: Flame, max: 30 }, // Normalized relative to 30% threshold
    { id: "irritation", label: "Irritation", color: "#F06292", icon: Zap, max: 30 },
    { id: "stress", label: "Stress", color: "#FFB74D", icon: Brain, max: 10 },
    { id: "sleep", label: "Sleep", color: "#BA68C8", icon: Moon, max: 12 },
  ];

  const chartData = useMemo(() => {
    return history.map(day => {
      const normalizedDay: any = { ...day };
      metricsConfig.forEach(m => {
        normalizedDay[`${m.id}_normalized`] = (day[m.id] / m.max) * 100;
      });
      return normalizedDay;
    });
  }, [history]);

  const getSkinScore = (day: any) => {
    // A balanced skin health formula
    // (Hydration + Sleep*10 + Water*10) / 3 - (Redness + Irritation + Stress)
    const positive = (day.hydration + (day.sleep * 10) + (day.water * 10)) / 3;
    const negative = (day.redness + day.irritation + (day.stress * 10)) / 3;
    const score = positive - negative;
    return score > 60 ? "green" : score > 40 ? "amber" : "red";
  };

  const trendInsight = useMemo(() => {
    const first = history[0].hydration;
    const last = history[history.length - 1].hydration;
    const diff = ((last - first) / first) * 100;
    
    // Find max stress
    const maxStressDay = [...history].sort((a, b) => b.stress - a.stress)[0];
    
    if (Math.abs(diff) > 10) {
      return `Hydration ${diff > 0 ? 'improved' : 'decreased'} ${Math.abs(Math.round(diff))}% this week`;
    }
    return `Stress peaked on ${maxStressDay.day}`;
  }, [history]);

  const toggleMetric = (id: string) => {
    setActiveMetrics(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const insights = useMemo(() => {
    if (selectedDay !== null) {
      const day = history[selectedDay];
      const dailyInsights = [];

      // Logic for Daily Insights
      if (day.stress > 6) {
        dailyInsights.push({
          type: "Correlation",
          text: `Higher stress today correlates with your increased irritation.`,
          highlight: "stress",
          color: "#FB8C00",
          icon: Brain
        });
      } else {
        dailyInsights.push({
          type: "Trend",
          text: `Your skin feels unusually calm and balanced today.`,
          highlight: "calm",
          color: "#BA68C8",
          icon: Sparkles
        });
      }

      if (day.hydration > 70) {
        dailyInsights.push({
          type: "Behavior",
          text: `Great job! Your hydration levels are peaking at 72%.`,
          highlight: "hydration",
          color: "#4FC3F7",
          icon: Droplets
        });
      }

      return dailyInsights;
    }

    // Logic for Weekly Overview Insights
    return [
      {
        type: "Trend",
        text: "Your overall hydration improved by 15% this week.",
        highlight: "hydration",
        color: "#4FC3F7",
        icon: TrendingUp
      },
      {
        type: "Correlation",
        text: "Consistent sleep is helping your skin stay more balanced.",
        highlight: "sleep",
        color: "#BA68C8",
        icon: Moon
      },
      {
        type: "Behavior",
        text: "Higher stress mid-week increased irritation slightly.",
        highlight: "stress",
        color: "#FB8C00",
        icon: Brain
      }
    ];
  }, [selectedDay, history]);

  const todayIndex = 5; // Saturday

  const getMetricValue = (dayIndex: number, metricId: string) => {
    const val = history[dayIndex][metricId];
    const unit = metricId === "water" ? "L" : metricId === "sleep" ? "h" : "%";
    return `${val}${unit}`;
  };

  return (
    <section className="px-6 py-4 space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <SectionLabel icon={TrendingUp}>
              {selectedDay !== null ? `${history[selectedDay].day} Breakdown` : "Skin Evolution"}
            </SectionLabel>
            <div className="px-2 py-0.5 bg-myrea-blue/10 rounded-full">
              <span className="text-[8px] font-black uppercase tracking-widest text-myrea-blue">{trendInsight}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your Flow</h1>
        </div>
        {selectedDay !== null && (
          <button 
            onClick={() => setSelectedDay(null)}
            className="text-[10px] font-bold text-myrea-blue uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            Reset <X size={12} />
          </button>
        )}
      </div>

      <div className="relative">
        <div className="relative h-80 w-full bg-white rounded-[40px] p-2 border border-slate-100 overflow-hidden soft-shadow">
          {/* Selected Day Callout */}
          <AnimatePresence>
            {selectedDay !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute top-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-[32px] border border-slate-100 shadow-2xl z-20 flex flex-wrap gap-x-6 gap-y-3 justify-center pointer-events-none"
              >
                {metricsConfig.filter(m => activeMetrics.includes(m.id)).map(m => (
                  <div key={m.id} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.label}</span>
                    <span className="text-xs font-black text-slate-800">
                      {history[selectedDay][m.id]}
                      {m.id === 'water' ? 'L' : m.id === 'sleep' ? 'h' : '%'}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: selectedDay !== null ? 80 : 25, right: 15, left: 15, bottom: 5 }}>
              <defs>
                {metricsConfig.map(m => (
                  <linearGradient key={m.id} id={`gradient-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={m.color} stopOpacity={m.id === 'hydration' ? 0.2 : 0.05}/>
                    <stop offset="95%" stopColor={m.color} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <Tooltip cursor={false} content={() => null} />
              {activeMetrics.map(mId => {
                const metric = metricsConfig.find(m => m.id === mId);
                return (
                  <Area
                    key={mId}
                    type="monotone"
                    dataKey={`${mId}_normalized`}
                    name={metric?.label}
                    stroke={metric?.color}
                    strokeWidth={mId === 'hydration' ? 3 : 2}
                    fillOpacity={1}
                    fill={`url(#gradient-${mId})`}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                )
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* X-Axis: Aligned Day Markers */}
        <div className="flex justify-between px-6 mt-8">
          {history.map((day, i) => {
            const isToday = i === todayIndex;
            const isSelected = selectedDay === i;
            const scoreColor = getSkinScore(day);
            
            return (
              <button 
                key={i}
                onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                className={`flex flex-col items-center gap-3 transition-all outline-none ${isSelected || isToday ? 'scale-110' : ''}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all">
                  <span className="text-[10px] font-bold tracking-wider">{day.day[0]}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${scoreColor === 'green' ? 'bg-myrea-green' : scoreColor === 'amber' ? 'bg-myrea-yellow' : 'bg-myrea-orange'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Simplified Filter Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {metricsConfig.map(m => {
          const isActive = activeMetrics.includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => toggleMetric(m.id)}
              className={`flex items-center gap-2 px-3 py-3 rounded-2xl transition-all border ${
                isActive ? "text-white shadow-lg" : "bg-slate-50 border-slate-50 text-slate-400"
              }`}
              style={{ 
                backgroundColor: isActive ? m.color : undefined,
                borderColor: isActive ? m.color : undefined
              }}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-white" : ""}`} style={{ backgroundColor: isActive ? undefined : m.color }} />
              <span className="text-[8px] font-black uppercase tracking-widest truncate">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <label>Flow Analysis</label>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence mode="wait">
            {insights.map((insight, i) => (
              <motion.div 
                key={`${selectedDay}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-white rounded-[28px] border border-slate-100 soft-shadow flex items-start gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${insight.color}15` }}>
                  <insight.icon size={18} style={{ color: insight.color }} />
                </div>
                <div className="space-y-1 py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">{insight.type}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">
                    {insight.text.split(insight.highlight).map((part, index, arr) => (
                      <React.Fragment key={index}>
                        {part}
                        {index !== arr.length - 1 && (
                          <span className="font-bold text-slate-900 border-b-2" style={{ borderColor: `${insight.color}40` }}>
                            {insight.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ActionIcon = ({ size }: { size: number }) => <Droplets size={size} />;

// --- Lifestyle Flow Components ---

const LifestyleCard = ({ 
  icon: Icon, 
  label, 
  value, 
  onClick, 
  active = false, 
  color = "bg-myrea-blue" 
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  onClick: () => void, 
  active?: boolean, 
  color?: string,
  key?: string | number
}) => (
  <Card 
    onClick={onClick}
    className={`p-4 flex flex-col items-center justify-center gap-2 transition-all aspect-square relative overflow-hidden group active:scale-95 ${active ? `${color}/10` : "bg-white"}`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? `${color} text-white` : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}>
      <Icon size={18} />
    </div>
    <div className="text-center">
      <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-[10px] font-bold truncate max-w-[80px]">{value}</p>
    </div>
  </Card>
);

const LifestyleFlow = ({ lifestyle, setLifestyle }: { lifestyle: any, setLifestyle: any }) => {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const generateInsight = () => {
    let insights = [];
    if (lifestyle.stress === "high" && lifestyle.sleep === "bad") {
      insights.push("Your skin may feel more sensitive today due to high stress + low sleep. Focus on calming chamomile.");
    }
    if (lifestyle.sun === "high") {
      insights.push("Increased sun exposure detected — consider soothing aloe or rose water mist.");
    }
    if (lifestyle.hormonal === "active") {
      insights.push("Hormonal phase detected — expect potential breakouts, focus on balancing thyme.");
    }
    if (lifestyle.water < 4) {
      insights.push("Hydration levels are low. Your skin might look dull; try a hydrating olive oil balm.");
    }
    if (lifestyle.environment === "polluted" || lifestyle.environment === "dry") {
      insights.push("Environmental stressors detected. Strengthen your barrier with protective laurel berry.");
    }
    return insights[0] || "Your lifestyle is in flow. Keep up the consistency for that natural glow!";
  };

  const updateField = (field: string, value: any) => {
    setLifestyle((prev: any) => ({ ...prev, [field]: value }));
    setActiveInsight(generateInsight());
  };

  const categories = [
    { id: "water", icon: Droplets, label: "Water", value: `${lifestyle.water}/8`, active: lifestyle.water >= 8, color: "bg-myrea-blue", onClick: () => updateField("water", lifestyle.water >= 8 ? 0 : lifestyle.water + 1) },
    { id: "sleep", icon: Moon, label: "Sleep", value: lifestyle.sleep === "good" ? "Good" : "Bad", active: lifestyle.sleep === "good", color: "bg-myrea-purple", onClick: () => updateField("sleep", lifestyle.sleep === "good" ? "bad" : "good") },
    { id: "stress", icon: Brain, label: "Stress", value: lifestyle.stress === "low" ? "Low" : "High", active: lifestyle.stress === "high", color: "bg-myrea-orange", onClick: () => updateField("stress", lifestyle.stress === "low" ? "high" : "low") },
    { id: "hormonal", icon: Sparkles, label: "Cycle", value: lifestyle.hormonal === "normal" ? "Normal" : "Active", active: lifestyle.hormonal === "active", color: "bg-myrea-pink", onClick: () => updateField("hormonal", lifestyle.hormonal === "normal" ? "active" : "normal") },
    { id: "sun", icon: Sun, label: "Sun", value: lifestyle.sun === "low" ? "Low" : "High", active: lifestyle.sun === "high", color: "bg-myrea-yellow", onClick: () => updateField("sun", lifestyle.sun === "low" ? "high" : "low") },
    { id: "screen", icon: Monitor, label: "Screen", value: `${lifestyle.screen}h`, active: lifestyle.screen > 6, color: "bg-slate-900", onClick: () => updateField("screen", lifestyle.screen >= 12 ? 0 : lifestyle.screen + 2) },
    { id: "activity", icon: Dumbbell, label: "Activity", value: lifestyle.activity === "none" ? "None" : "Active", active: lifestyle.activity === "active", color: "bg-myrea-green", onClick: () => updateField("activity", lifestyle.activity === "none" ? "active" : "none") },
    { id: "environment", icon: Cloud, label: "Env", value: lifestyle.environment === "dry" ? "Dry" : "Fresh", active: lifestyle.environment === "dry", color: "bg-myrea-blue", onClick: () => updateField("environment", lifestyle.environment === "dry" ? "fresh" : "dry") },
    { id: "mood", icon: Smile, label: "Mood", value: lifestyle.mood === "happy" ? "Happy" : "Tired", active: lifestyle.mood === "happy", color: "bg-myrea-yellow", onClick: () => updateField("mood", lifestyle.mood === "happy" ? "tired" : "happy") },
    { id: "diet", icon: Utensils, label: "Diet", value: lifestyle.diet.length > 0 ? "Logged" : "Empty", active: lifestyle.diet.length > 0, color: "bg-myrea-orange", onClick: () => updateField("diet", lifestyle.diet.length > 0 ? [] : ["balanced"]) },
    { id: "consistency", icon: CheckCircle2, label: "Routine", value: lifestyle.consistency === "completed" ? "Done" : "Missed", active: lifestyle.consistency === "completed", color: "bg-myrea-green", onClick: () => updateField("consistency", lifestyle.consistency === "completed" ? "missed" : "completed") },
    { id: "breakouts", icon: AlertCircle, label: "Skin", value: lifestyle.breakouts.length > 0 ? "Active" : "Clear", active: lifestyle.breakouts.length > 0, color: "bg-myrea-pink", onClick: () => updateField("breakouts", lifestyle.breakouts.length > 0 ? [] : ["redness"]) }
  ];

  const visibleCategories = isExpanded ? categories : categories.slice(0, 6);

  return (
    <section className="px-6 space-y-6">
      <div className="flex justify-between items-center">
        <SectionLabel icon={Activity}>Lifestyle Flow</SectionLabel>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold text-myrea-blue uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      </div>

      {/* Smart Insight Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={generateInsight()}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="p-4 bg-slate-50 rounded-2xl relative overflow-hidden"
        >
          <div className="flex gap-3 items-start relative z-10">
            <div className="w-6 h-6 rounded-lg bg-myrea-yellow flex items-center justify-center shrink-0">
              <Wand2 size={12} className="text-slate-900" />
            </div>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              {generateInsight()}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Grid of Cards */}
      <div className="grid grid-cols-3 gap-3">
        {visibleCategories.map((cat) => (
          <LifestyleCard 
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            value={cat.value}
            active={cat.active}
            color={cat.color}
            onClick={cat.onClick}
          />
        ))}
      </div>
    </section>
  );
};

// --- Home View ---

// --- Skin Scan Components ---

const SkinScanModal = ({ 
  onClose, 
  onComplete 
}: { 
  onClose: () => void, 
  onComplete: (results: any) => void 
}) => {
  const [step, setStep] = useState<"scanning" | "results">("scanning");
  const [scanProgress, setScanProgress] = useState(0);

  React.useEffect(() => {
    if (step === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("results"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const results = {
    hydration: 85,
    redness: 8,
    irritation: 4,
    breakouts: 2,
    improvements: ["Hydration up 15%", "Redness decreased"],
    newConcerns: ["Slight dryness around eyes"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-slate-900 flex flex-col"
    >
      <header className="px-6 py-10 flex justify-between items-center relative z-20">
        <button onClick={onClose} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
          <X size={20} />
        </button>
        <div className="flex items-center gap-2">
          <img 
            src="https://raw.githubusercontent.com/chelseakattoura-boop/I-love-you/main/Myrea%20Logo%20FInal.png" 
            alt="Myrēa Logo" 
            className="h-5 w-auto invert opacity-80"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-white font-bold uppercase tracking-[0.15em] text-[10px]">Intelligence Scan</h2>
        </div>
        <div className="w-10" />
      </header>

      <div className="flex-1 relative flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "scanning" ? (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative w-full max-w-xs aspect-[3/4] flex flex-col items-center justify-center"
            >
              {/* Framing Guide */}
              <div className="absolute inset-0 rounded-[60px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full mt-8" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full" />
              </div>

              {/* Abstract Face Representation */}
              <div className="relative z-10 opacity-40">
                <IllustratedFace status="normal" className="scale-125" />
              </div>

              {/* Scanning Line */}
              <motion.div 
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-4 right-4 h-1 bg-myrea-blue shadow-[0_0_20px_#4FC3F7] z-20 rounded-full"
              />

              {/* Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      y: [Math.random() * 400, Math.random() * 400]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="absolute w-1 h-1 bg-myrea-blue rounded-full"
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>

              <div className="absolute bottom-[-60px] w-full text-center">
                <p className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Analyzing Skin Soul...</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="h-full bg-myrea-blue"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm bg-white rounded-[40px] p-8 soft-shadow"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-myrea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-myrea-green" size={32} />
                </div>
                <SectionLabel icon={Sparkles} className="justify-center">Intelligence Complete</SectionLabel>
                <h1 className="text-3xl font-bold tracking-tight lowercase">Results</h1>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-3xl">
                    <p className="text-[8px] font-bold uppercase text-slate-400 mb-1">Hydration</p>
                    <p className="text-xl font-bold text-myrea-blue">{results.hydration}%</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl">
                    <p className="text-[8px] font-bold uppercase text-slate-400 mb-1">Clarity</p>
                    <p className="text-xl font-bold text-myrea-green">92%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Highlights</h4>
                  {results.improvements.map((imp, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 bg-myrea-green rounded-full flex items-center justify-center text-white">
                        <Plus size={12} />
                      </div>
                      {imp}
                    </div>
                  ))}
                  {results.newConcerns.map((con, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 bg-myrea-orange rounded-full flex items-center justify-center text-white">
                        <AlertCircle size={12} />
                      </div>
                      {con}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onComplete(results)}
                className="w-full mt-8 py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.15em] text-xs soft-shadow active:scale-95 transition-all"
              >
                Update My Routine
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkinScanSection = ({ onOpen, lastUpdated }: { onOpen: () => void, lastUpdated: string }) => (
  <section className="px-6">
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group cursor-pointer"
    >
      <Card className="p-6 bg-white soft-shadow hover:scale-[1.01] transition-all relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-myrea-blue rounded-2xl flex items-center justify-center group-hover:bg-myrea-blue group-hover:text-white transition-colors">
              <Camera size={28} className="group-hover:animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Scan Your Skin</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">Track today's changes</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <ArrowRight size={20} className="text-myrea-blue group-hover:translate-x-1 transition-transform" />
            <span className="text-[8px] font-bold text-slate-300 uppercase mt-2">{lastUpdated}</span>
          </div>
        </div>
        
        {/* Animated Background Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-myrea-blue/10 pointer-events-none"
        />
      </Card>
    </motion.div>
  </section>
);

export const HomeView = ({ 
  lifestyle, 
  setLifestyle,
  skinStatus, 
  setSkinStatus,
  setCurrentView,
  history,
  rewardProgress,
  savedFormulas,
  skinGoals,
  setSkinGoals
}: { 
  lifestyle: any, 
  setLifestyle: any,
  skinStatus: any, 
  setSkinStatus: any,
  setCurrentView: (v: View) => void,
  history: any[],
  rewardProgress: number,
  savedFormulas: any[],
  skinGoals: string[],
  setSkinGoals: (goals: string[]) => void
}) => {
  const [showCoach, setShowCoach] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);

  const handleScanComplete = (results: any) => {
    setSkinStatus({
      hydration: results.hydration,
      redness: results.redness,
      irritation: results.irritation,
      breakouts: results.breakouts,
      lastUpdated: "Updated Today"
    });
    setShowScan(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 pt-10 bg-white">
      <AnimatePresence>
        {showCoach && <AICoachView onClose={() => setShowCoach(false)} />}
        {showScan && (
          <SkinScanModal 
            onClose={() => setShowScan(false)} 
            onComplete={handleScanComplete} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-6 flex justify-between items-start">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-8"
          >
            <img 
              src="https://raw.githubusercontent.com/chelseakattoura-boop/I-love-you/main/Myrea%20Logo%20FInal.png" 
              alt="MYRĒA Logo" 
              className="h-full w-auto"
              style={{ filter: "brightness(0) saturate(100%) invert(71%) sepia(45%) saturate(718%) hue-rotate(177deg) brightness(101%) contrast(92%)" }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="space-y-0.5 mt-2">
            <h1 className="text-lg font-bold tracking-[0.08em] opacity-80 uppercase">Good morning Chelsea</h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-300">Marhaba / Reflections</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <button 
            onClick={() => setCurrentView("profile")}
            className="w-14 h-14 rounded-[28px] overflow-hidden soft-shadow active:scale-95 transition-transform border border-white"
          >
            <img 
              src="https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Profile%20Icon.png" 
              alt="Chelsea" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </header>

      {/* Today's Reflection (Skin Status) */}
      <section className="px-6 space-y-6">
        <div className="flex justify-between items-center">
          <SectionLabel icon={Sparkles}>Reflection</SectionLabel>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-sm">
             <Flame size={14} className="text-myrea-orange fill-myrea-orange/20" />
             <span className="text-xs font-bold text-slate-800 tracking-tight">5</span>
          </div>
        </div>
        
        <Card className="space-y-10 bg-white/70 backdrop-blur-xl border-white/50 shadow-2xl shadow-myrea-blue/5">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            <SkinIndicator label="Hydration" value={skinStatus.hydration} color="text-myrea-blue" icon={Droplets} />
            <SkinIndicator label="Redness" value={skinStatus.redness} color="text-myrea-orange" icon={Flame} />
            <SkinIndicator label="Irritation" value={skinStatus.irritation} color="text-myrea-pink" icon={Zap} />
            <SkinIndicator label="Breakouts" value={skinStatus.breakouts} color="text-myrea-purple" icon={Activity} />
          </div>

          <div className="space-y-4">
            <label className="text-slate-400">Daily Wisdom Note</label>
            <textarea 
              value={lifestyle.dailyNote || ""}
              onChange={(e) => setLifestyle({ ...lifestyle, dailyNote: e.target.value })}
              placeholder="How does your skin feel today? Any reflections?"
              className="w-full bg-slate-50 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:ring-4 ring-myrea-blue/10 min-h-[100px] resize-none placeholder:text-slate-300 transition-all border border-slate-100"
            />
          </div>

          <button 
            onClick={() => setShowScan(true)}
            className="w-full py-4.5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
          >
            Start New Scan
          </button>
        </Card>
      </section>

      {/* Skin Profile / Goals */}
      <section className="px-6 space-y-4">
        <SectionLabel icon={Target}>Current Skin Focus</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {["Hydration", "Brightening", "Acne Control", "Soothing"].map(goal => {
            const isSelected = skinGoals.includes(goal);
            return (
              <button
                key={goal}
                onClick={() => {
                  setSkinGoals(isSelected 
                    ? skinGoals.filter(g => g !== goal) 
                    : [...skinGoals, goal]
                  );
                }}
                className={`px-4 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] transition-all border ${
                  isSelected 
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                    : "bg-white text-slate-400 border-slate-100"
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </section>

      {/* Skin Evolution Dashboard */}
      <div className="space-y-10">
        <LiquidEcosystem history={history} />
        
        <LifestyleFlow lifestyle={lifestyle} setLifestyle={setLifestyle} />

        {/* Consult AI Coach button */}
        <div className="px-6">
          <button 
            onClick={() => setShowCoach(true)}
            className="w-full flex items-center justify-between px-6 py-5 bg-slate-900 text-white rounded-[32px] transition-all shadow-2xl shadow-slate-900/20 active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                <div className="scale-[0.6] text-white">
                  <AICoachEntitySmall />
                </div>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Myrēa Intel</span>
                <span className="text-sm font-bold">Consult AI Coach</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>

      {/* Vault of Elixirs (Saved Formulas) */}
      {savedFormulas && savedFormulas.length > 0 && (
        <section className="px-6 space-y-6">
          <SectionLabel icon={History}>Vault of Elixirs</SectionLabel>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {savedFormulas.map((formula) => (
              <div key={formula.id}>
                <VialCard formula={formula} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Botanical Discoveries */}
      <section className="px-6 space-y-6">
        <div className="flex justify-between items-end">
          <SectionLabel icon={Leaf}>Botanical Wisdom</SectionLabel>
          <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">View All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {BOTANICALS.map((plant) => (
            <div key={plant.id}>
              <Card 
                onClick={() => setSelectedPlant(plant)}
                className="min-w-[220px] bg-white soft-shadow border border-slate-50 cursor-pointer group"
              >
                <div className={`w-14 h-14 ${plant.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl font-bold opacity-40">{plant.name.charAt(0)}</span>
                </div>
                <h4 className="text-sm font-bold tracking-tight text-slate-900">{plant.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{plant.benefit}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Call to Action */}
      <section className="px-6 pb-16">
        <Card 
          onClick={() => setCurrentView("lab")}
          className="bg-white border border-slate-100 p-0 overflow-hidden group cursor-pointer soft-shadow hover:shadow-2xl transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-10 space-y-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white overflow-hidden p-2">
                       <img 
                         src="https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Lab.png" 
                         alt="Lab" 
                         className="w-full h-full object-contain brightness-0 invert" 
                         referrerPolicy="no-referrer"
                       />
                   </div>
                   <h3 className="text-xl font-bold tracking-[0.05em] uppercase text-slate-900">Formulation Lab</h3>
                </div>
                <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-[280px] uppercase tracking-widest">
                  Create personalized skincare based on your condition and real-time skin insights.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-myrea-blue/20" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-myrea-orange/20" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-myrea-green/20" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Synergistic Matrix</span>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl group-hover:bg-myrea-blue transition-colors">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Open Lab</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-slate-50 relative overflow-hidden flex items-center justify-center p-12">
               <div className="absolute inset-0 bg-white/50" />
               <motion.div 
                 animate={{ 
                   y: [0, -10, 0],
                   rotate: [0, 5, 0]
                 }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <div className="w-12 h-12 relative flex items-center justify-center opacity-20">
                   <img 
                     src="https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Lab.png" 
                     alt="Lab" 
                     className="w-full h-full object-contain grayscale" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
               </motion.div>
            </div>
          </div>
        </Card>
      </section>

      <AnimatePresence>
        {selectedPlant && (
          <PlantDetailView 
            plant={selectedPlant} 
            onClose={() => setSelectedPlant(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Routine View ---

const RoutineCalendar = ({ completionHistory }: { completionHistory: string[] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`prev-${i}`} className="h-14 w-full" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isCompleted = completionHistory.includes(dateStr);
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    const isSpecialTracked = d === 15; // Example special tracking day

    days.push(
      <div key={d} className="h-14 w-full flex flex-col items-center justify-center relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold transition-all
          ${isToday ? "bg-slate-900 text-white shadow-lg" : 
            isCompleted ? "border-2 border-myrea-green text-myrea-green" : 
            isSpecialTracked ? "border-2 border-myrea-blue text-myrea-blue" :
            "text-slate-400"}
        `}>
          {d}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white border-none soft-shadow p-8 rounded-[40px]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{monthName} Log</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <ChevronLeft size={20} className="text-slate-400" />
          </button>
          <button onClick={nextMonth} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-6">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-[10px] font-bold text-slate-300 text-center uppercase tracking-widest">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-4 gap-x-2">
        {days}
      </div>
    </Card>
  );
};

export const RoutineView = ({ 
  skinStatus, 
  lifestyle, 
  setLifestyle,
  routineSteps: steps,
  streak,
  setStreak,
  rewardProgress,
  setRewardProgress,
  completionHistory,
  setCompletionHistory,
  dailyGoal,
  setDailyGoal
}: { 
  skinStatus: any, 
  lifestyle: any, 
  setLifestyle: any,
  routineSteps: any[],
  streak: number,
  setStreak: React.Dispatch<React.SetStateAction<number>>,
  rewardProgress: number,
  setRewardProgress: React.Dispatch<React.SetStateAction<number>>,
  completionHistory: string[],
  setCompletionHistory: React.Dispatch<React.SetStateAction<string[]>>,
  dailyGoal: string,
  setDailyGoal: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [activeTab, setActiveTab] = useState<"today" | "history" | "settings">("today");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [routineTime, setRoutineTime] = useState<"day" | "night">("day");
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [isRoutineComplete, setIsRoutineComplete] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const toggleComplete = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCompleteRoutine = () => {
    if (completedSteps.length === steps.length) {
      setIsRoutineComplete(true);
      setStreak(prev => prev + 1);
      
      const todayStr = new Date().toISOString().split('T')[0];
      if (!completionHistory.includes(todayStr)) {
        setCompletionHistory(prev => [...prev, todayStr]);
      }

      setRewardProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          setShowRewardModal(true);
          return 0;
        }
        return next;
      });
      
      setTimeout(() => {
        setIsRoutineComplete(false);
        setShowReflection(true);
      }, 3000);
    }
  };

  const handleReflectionSelect = (feeling: string) => {
    setShowReflection(false);
    setCompletedSteps([]);
  };

  return (
    <div className="relative flex-1 overflow-y-auto no-scrollbar flex flex-col gap-0 px-0 pt-0 pb-32">
      {isRoutineComplete && <Confetti />}
      <AnimatePresence>
        {showReflection && <ReflectionModal onSelect={handleReflectionSelect} />}
      </AnimatePresence>
      
      {/* Branding Header */}
      <header className="px-6 pt-12 pb-10 space-y-2 text-center">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-myrea-blue">The Ritual</label>
        <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 leading-none">Skincare Tracker</h1>
      </header>

      {/* Profile Summary Card */}
      <section className="px-6 pb-8">
        <Card className="p-8 bg-white soft-shadow border-none rounded-[40px] flex flex-col gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Combination • Dehydration + Sensitivity</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
               <User size={24} />
            </div>
          </div>
          
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
              <span>Barrier Level</span>
              <span className="text-myrea-green italic">Healthy Strength</span>
            </div>
            <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "82%" }}
                 className="h-full bg-myrea-green/40"
               />
            </div>
          </div>
        </Card>
      </section>

      {/* Segmented Navigation Tabs */}
      <div className="px-6 mb-10">
        <div className="flex bg-white p-1.5 rounded-full soft-shadow border border-slate-50">
          {[
            { id: "today", label: "FOR TODAY" },
            { id: "history", label: "CALENDAR" },
            { id: "settings", label: "SETTINGS" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-full relative ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-lg z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'today' ? (
          <motion.div
            key="today-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-10"
          >
            {/* View Switching & Progress */}
            <section className="px-6 flex justify-between items-center bg-white/50 py-4">
               <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
                  <button 
                    onClick={() => setRoutineTime("day")}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      routineTime === "day" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                    }`}
                  >
                    Day
                  </button>
                  <button 
                    onClick={() => setRoutineTime("night")}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      routineTime === "night" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                    }`}
                  >
                    Night
                  </button>
               </div>
               
               <div className="flex flex-col items-end gap-1.5 pr-2">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    {completedSteps.length}/{steps.length} COMPLETE
                  </span>
                  <div className="w-24 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div 
                       animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                       className="h-full bg-myrea-blue"
                     />
                  </div>
               </div>
            </section>

            {/* Guided Checklist */}
            <section className="px-6 space-y-6">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                // cleanser = blue, toner = lavender, serum = pink, sunscreen/shield = warm yellow.
                const categoryColor = step.id === 'cleanser' ? 'text-myrea-blue' :
                                   step.id === 'toner' ? 'text-myrea-purple' :
                                   step.id === 'serum' ? 'text-myrea-pink' :
                                   step.id === 'spf' ? 'text-myrea-yellow' : 'text-myrea-green';

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      onClick={() => toggleComplete(step.id)}
                      className={`p-6 flex items-center gap-6 bg-white soft-shadow border-none rounded-[32px] group cursor-pointer transition-all active:scale-[0.98] ${
                        isCompleted ? "opacity-60" : ""
                      }`}
                    >
                      {/* Circular Step Indicator */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isCompleted ? "bg-myrea-green border-myrea-green text-white" : "border-slate-50 bg-white"
                      }`}>
                         {isCompleted ? <CheckCircle2 size={24} /> : <span className="text-xl font-bold text-slate-100">{index + 1}</span>}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 block ${categoryColor}`}>
                          {step.title}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-0.5">{step.product}</h3>
                        <p className="text-[11px] font-medium text-slate-400 truncate">{step.instructions?.split(',')[0] || "Gentle application"}</p>
                      </div>

                      <ChevronRight size={20} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
                    </Card>
                  </motion.div>
                );
              })}

              {/* Add to Ritual FAB */}
              <div className="flex justify-center pt-8">
                 <button className="w-16 h-16 rounded-full bg-myrea-blue text-white shadow-xl glow-blue flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                    <Plus size={32} />
                 </button>
              </div>
            </section>

            {/* Daily Goal Section */}
            <section className="px-6 pt-12">
               <Card className="p-8 bg-white soft-shadow border-none rounded-[40px] space-y-8">
                  <div className="space-y-1">
                    <SectionLabel icon={Target}>The Daily Intent</SectionLabel>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Focus Objective</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Achieve deep hydration", 
                      "Minimize redness", 
                      "Balance oil levels", 
                      "Soothe sensitivity",
                      "Brighten complexion"
                    ].map((goal) => {
                      const isSelected = dailyGoal === goal;
                      return (
                        <button
                          key={goal}
                          onClick={() => setDailyGoal(goal)}
                          className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border ${
                            isSelected 
                              ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-[1.02]" 
                              : "bg-slate-50 border-slate-50 text-slate-600 hover:border-slate-200"
                          }`}
                        >
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? "text-white" : "text-slate-700"}`}>
                            {goal}
                          </span>
                          {isSelected && <Target size={14} className="text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-myrea-yellow/10 flex items-center justify-center shrink-0">
                      <Wand2 size={18} className="text-myrea-yellow" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                      Setting a specific intent helps harmonize your skin's biological rhythm with your botanical routine.
                    </p>
                  </div>
               </Card>
            </section>

            <section className="px-6 py-10 pb-20">
               <LifestyleFlow lifestyle={lifestyle} setLifestyle={setLifestyle} />
            </section>
          </motion.div>
        ) : activeTab === 'history' ? (
          <motion.div
            key="history-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-6 pb-20"
          >
            <RoutineCalendar completionHistory={completionHistory} />
          </motion.div>
        ) : (
          <motion.div
            key="settings-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-6 pb-20"
          >
            <Card className="p-8 bg-white soft-shadow border-none rounded-[40px] space-y-8">
              <div className="space-y-1 flex justify-between items-start">
                <div>
                  <SectionLabel icon={Monitor}>Preferences</SectionLabel>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">Notifications</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                 {[
                   { label: "Morning Ritual Reminder", time: "08:15 AM", active: true },
                   { label: "Nightly Ritual Reminder", time: "10:30 PM", active: true },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900">{s.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.time}</p>
                      </div>
                      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${s.active ? "bg-slate-900" : "bg-slate-200"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${s.active ? "translate-x-4" : ""}`} />
                      </div>
                   </div>
                 ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-10 w-full max-sm relative overflow-hidden soft-shadow"
            >
              <Confetti />
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-myrea-yellow rounded-full flex items-center justify-center shadow-lg animate-float">
                  <Gift className="text-slate-900" size={32} />
                </div>
                
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Milestone!</h2>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    Your consistency is beautiful. You've earned a <span className="text-myrea-orange font-bold uppercase tracking-widest">Custom Elixir</span>
                  </p>
                </div>

                <div className="w-full bg-slate-50 rounded-[32px] p-8 flex flex-col items-center gap-4">
                  <div className="scale-125 my-4">
                    <IllustratedProduct color="bg-myrea-orange" shape="bottle" />
                  </div>
                  <SectionLabel className="justify-center">Formulation #204</SectionLabel>
                </div>

                <button 
                  onClick={() => setShowRewardModal(false)}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-colors"
                >
                  Claim Reward
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Lebanon Map Component ---

const LebanonMap = ({ region }: { region: string }) => {
  // Simplified SVG map of Lebanon
  const regions: Record<string, { x: number, y: number }> = {
    "Mount Lebanon Terraces": { x: 50, y: 45 },
    "Northern Coastal Valleys": { x: 55, y: 25 },
    "Bekaa Valley Gardens": { x: 70, y: 50 },
    "Southern Olive Groves": { x: 40, y: 75 }
  };

  const pos = regions[region] || { x: 50, y: 50 };

  return (
    <div className="relative w-full aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden">
      <svg viewBox="0 0 100 130" className="w-full h-full fill-white stroke-slate-900/20 stroke-[0.5]">
        {/* Simplified Lebanon Outline */}
        <path d="M45,10 L60,15 L75,30 L80,50 L75,80 L65,110 L50,120 L35,115 L25,90 L20,60 L25,30 L35,15 Z" />
        {/* Mediterranean Sea */}
        <text x="10" y="70" className="text-[4px] font-bold fill-myrea-blue/30 uppercase tracking-[0.15em] -rotate-90">Mediterranean Sea</text>
        
        {/* Region Pin */}
        <motion.g
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 1.5 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15,
            delay: 0.5 
          }}
          className="cursor-pointer"
        >
          <circle cx={pos.x} cy={pos.y} r="3" className="fill-myrea-orange" />
          <motion.circle 
            cx={pos.x} 
            cy={pos.y} 
            r="6" 
            className="fill-myrea-orange/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl soft-shadow">
        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-center">{region}</p>
      </div>
    </div>
  );
};

// --- Plant Detail View (Progressive Disclosure) ---

const PlantDetailView = ({ plant, onClose }: { plant: any, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center bg-white border-b border-slate-50 shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${plant.color}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Botanical Library</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <X size={20} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-8 py-10 flex flex-col space-y-10"
            >
              <div className="space-y-4 pt-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold tracking-tight leading-[1.2]"
                >
                  {plant.name}
                </motion.h2>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${plant.color}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {plant.benefit}
                  </span>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <SectionLabel icon={Leaf}>Botanical Wisdom</SectionLabel>
                <p className="text-base font-medium leading-relaxed text-slate-600 italic border-l-4 border-slate-100 pl-6 py-1">
                  {plant.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-10 pt-6"
              >
                <div className="space-y-2">
                  <SectionLabel>Origin</SectionLabel>
                  <p className="text-sm font-bold uppercase tracking-tight text-slate-900">{plant.origin}</p>
                </div>
                <div className="space-y-2">
                  <SectionLabel>Process</SectionLabel>
                  <p className="text-sm font-bold uppercase tracking-tight text-slate-900">{plant.process}</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-12"
            >
              <div className="space-y-8">
                <label className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Skin Intelligence</label>
                <div className="space-y-10">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight">Active Properties</h3>
                    <p className="text-base font-medium text-slate-600 leading-[1.6]">{plant.detailedBenefits}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                      <SectionLabel className="mb-4">How it Works</SectionLabel>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed italic">"{plant.howItWorks}"</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Targets</label>
                    <div className="flex flex-wrap gap-3">
                      {plant.targets.map((t: string) => (
                        <span key={t} className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.1em]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-12"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Transformation Journey</label>
                  <h3 className="text-2xl font-bold tracking-tight">From Peak to Product</h3>
                </div>

                <div className="space-y-10 relative">
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-100" />
                  {plant.transformation.map((t: any, i: number) => (
                    <div key={i} className="relative pl-16">
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-3xl bg-white border border-slate-50 flex items-center justify-center text-[11px] font-bold z-10 soft-shadow">
                        0{i+1}
                      </div>
                      <div className="space-y-1.5 pt-2">
                        <h4 className="text-sm font-bold uppercase tracking-tight">{t.title}</h4>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <label className="text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-4 block">Lebanese Heritage</label>
                  <p className="text-base text-slate-600 leading-[1.6] italic">
                    "{plant.commonUses}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <footer className="px-8 py-8 bg-white border-t border-slate-50 flex justify-between items-center z-20">
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-slate-900" : "w-1.5 bg-slate-100"}`} />
          ))}
        </div>
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center active:scale-90 transition-transform text-slate-400"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <button 
            onClick={step === totalSteps ? onClose : nextStep}
            className="px-8 h-12 bg-slate-900 text-white rounded-full font-bold uppercase tracking-tight text-[11px] flex items-center gap-3 active:scale-95 transition-all shadow-sm"
          >
            {step === totalSteps ? "Discovery Complete" : "Continue"}
            {step < totalSteps && <ChevronRight size={14} />}
          </button>
        </div>
      </footer>
    </motion.div>
  );
};

// --- Lab View (Core Feature) ---

const LAB_PHASES = [
  { id: "type", label: "Product Type" },
  { id: "usage", label: "Usage" },
  { id: "base", label: "Base Matrix" },
  { id: "ingredients", label: "Personalized Core" },
  { id: "review", label: "Protocol Review" }
];

// --- Lab Sub-Views ---

const DIYInstructionsView = ({ 
  formulaName, 
  ingredients, 
  base 
}: { 
  formulaName: string, 
  ingredients: string[], 
  base: string | null 
}) => {
  const getIngredientInfo = (id: string) => {
    const active = LAB_ACTIVES.find(a => a.id === id);
    const botanical = BOTANICALS.find(b => b.id === id);
    return active || botanical;
  };

  const steps = [
    { title: "Prepare Vessel", action: "Sanitize a small 50ml glass container and a mixing rod." },
    { title: "Measure Base", action: `Add 30ml of your ${base?.toUpperCase() || 'ALOE'} base into the container.` },
    { title: "Layer Actives", action: "Slowly drip your clinical boosters into the base." },
    { title: "Infuse Botanicals", action: "Incorporate the plant extracts using a sweeping motion." },
    { title: "Homogenize", action: "Stir gently for 60 seconds until the color is uniform." },
    { title: "Rest Protocol", action: "Let the formula sit for 5 minutes before your first application." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 py-10 space-y-12 pb-10"
    >
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <SectionLabel className="bg-myrea-blue/10 text-myrea-blue px-3 py-1 rounded-full text-[10px]">DIY Execution</SectionLabel>
        </div>
        <h1 className="text-2xl font-bold text-[#1A1F3C] uppercase tracking-tight">{formulaName}</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          Follow these steps to physically manifest your formula in your home laboratory.
        </p>
      </header>

      {/* Video Tutorial Placeholder */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1F3C]">Video Tutorial</h3>
        <div className="aspect-video bg-slate-900 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-2xl">
          <img 
            src="https://picsum.photos/seed/lab/800/450" 
            alt="Tutorial Preview" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
             </div>
          </div>
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest">Technique Guide</span>
            <span className="text-[10px] font-bold">02:45</span>
          </div>
        </div>
      </section>

      {/* Overview Block */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-5 rounded-[24px] border border-slate-50 soft-shadow flex flex-col items-center gap-2 text-center">
           <Clock size={16} className="text-myrea-blue/40" />
           <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1F3C]">15 Mins</span>
        </div>
        <div className="bg-white p-5 rounded-[24px] border border-slate-50 soft-shadow flex flex-col items-center gap-2 text-center">
           <Activity size={16} className="text-myrea-blue/40" />
           <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1F3C]">Beginner</span>
        </div>
        <div className="bg-white p-5 rounded-[24px] border border-slate-50 soft-shadow flex flex-col items-center gap-2 text-center">
           <Droplets size={16} className="text-myrea-blue/40" />
           <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1F3C]">50ml Yield</span>
        </div>
      </div>

      {/* Ingredients */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1F3C]">Required Components</h3>
        <div className="space-y-2">
           <div className="p-4 bg-white rounded-2xl border border-slate-50 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900">{base?.toUpperCase() || 'ALOE'} BASE</span>
              <span className="text-[10px] font-bold text-myrea-blue uppercase tracking-widest">30ml</span>
           </div>
           {ingredients.map(id => {
             const info = getIngredientInfo(id);
             return (
               <div key={id} className="p-4 bg-white rounded-2xl border border-slate-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 uppercase">{(info as any)?.name || (info as any)?.label}</span>
                  <span className="text-[10px] font-bold text-myrea-blue uppercase tracking-widest">3 Drops</span>
               </div>
             );
           })}
        </div>
        
        {/* Purchase Links */}
        <div className="pt-4">
          <button className="w-full py-4 bg-myrea-blue text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 soft-shadow">
            <ShoppingBag size={14} />
            Purchase Missing Elements
          </button>
          <p className="text-[9px] font-medium text-slate-400 mt-3 text-center uppercase tracking-widest">All elements are ethically sourced in Lebanon</p>
        </div>
      </section>

      {/* Step by Step */}
      <section className="space-y-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1F3C]">Step-by-Step Instructions</h3>
        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
           {steps.map((s, i) => (
             <div key={i} className="flex gap-6 relative">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 z-10">
                   <span className="text-xs font-black text-[#1A1F3C]">{i + 1}</span>
                </div>
                <div className="pt-2">
                   <h4 className="text-sm font-black uppercase tracking-tight text-[#1A1F3C] mb-1">{s.title}</h4>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed">{s.action}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Safety */}
      <div className="p-6 bg-slate-900 rounded-[32px] text-white space-y-3">
         <div className="flex items-center gap-3">
            <Info size={16} className="text-myrea-blue" />
            <span className="text-[10px] font-black uppercase tracking-widest">Safety Protocol</span>
         </div>
         <p className="text-xs font-medium text-white/60 leading-relaxed">
           Always patch test before initial use. Store in a cool, dark place. Formula remains stable for 14 days when refrigerated.
         </p>
      </div>
    </motion.div>
  );
};

const BrandCollabView = ({ 
  formulaName, 
  score,
  isSubmitted,
  onConfirm 
}: { 
  formulaName: string, 
  score: number,
  isSubmitted: boolean,
  onConfirm: () => void 
}) => {
  const brands = [
    { name: "Lichen & Fern", desc: "Small-batch botanical laboratory in Beirut.", match: 98, type: "Highly Compatible" },
    { name: "Myrēa Select", desc: "Our professional in-house formulation wing.", match: 94, type: "Good Match" },
    { name: "Saffron & Silk", desc: "Specializing in luxury herbal distillates.", match: 89, type: "Good Match" }
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-6 py-20 flex flex-col items-center justify-center text-center h-full"
      >
        <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-500 mb-8 shadow-inner border border-emerald-100">
           <CheckCircle2 size={40} />
        </div>
        <div className="space-y-4">
           <h2 className="text-3xl font-black text-[#1A1F3C] uppercase tracking-tight">Mission Logged</h2>
           <p className="text-sm font-medium text-slate-500 max-w-[240px] mx-auto leading-relaxed">
             Your formula has been securely transmitted to the partner brand. A laboratory specialist will review the stability profile within 24 hours.
           </p>
        </div>
        
        <div className="mt-16 w-full space-y-6">
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#1A1F3C]/40 border-b border-slate-100 pb-4">
              <span>Status</span>
              <span className="text-emerald-500">Formulation Review</span>
           </div>
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#1A1F3C]/40 border-b border-slate-100 pb-4">
              <span>Expected Dispatch</span>
              <span className="text-[#1A1F3C]">3–5 Business Days</span>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 py-10 space-y-12 pb-10"
    >
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <SectionLabel className="bg-myrea-orange/10 text-myrea-orange px-3 py-1 rounded-full text-[10px]">Professional Scaling</SectionLabel>
        </div>
        <h1 className="text-3xl font-black text-[#1A1F3C] uppercase tracking-tight">Bring Your Formula to Life</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          Partner brands can professionally create your formula. Each lab ensures stability, safety, and high-performance production.
        </p>
      </header>

      {/* Brand List */}
      <div className="space-y-4">
         {brands.map((b, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-white p-6 rounded-[32px] border border-slate-50 soft-shadow flex flex-col gap-6 group hover:border-myrea-blue/20 transition-all"
           >
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <h4 className="text-lg font-black text-[#1A1F3C] uppercase tracking-tight">{b.name}</h4>
                    <p className="text-xs font-medium text-slate-400">{b.desc}</p>
                 </div>
                 <div className="bg-slate-50 px-3 py-2 rounded-2xl text-center min-w-[60px]">
                    <span className="text-sm font-black text-[#1A1F3C] block leading-none">{b.match}%</span>
                    <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest mt-1 block">Match</span>
                 </div>
              </div>
              
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-myrea-blue uppercase tracking-widest">{b.type}</span>
                 <button 
                   onClick={onConfirm}
                   className="px-6 py-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 group-hover:bg-myrea-blue"
                 >
                   Select Brand
                 </button>
              </div>
           </motion.div>
         ))}
      </div>

      <section className="p-8 bg-white/40 border border-white/50 rounded-[40px] text-center space-y-4">
         <h4 className="text-sm font-black uppercase tracking-tight text-[#1A1F3C]">Standard Protocol</h4>
         <div className="grid grid-cols-1 gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            <p>1. Laboratory Review</p>
            <p>2. Stability Validation</p>
            <p>3. Small-Batch Production</p>
            <p>4. Global Shipment</p>
         </div>
      </section>
    </motion.div>
  );
};

export const LabView = ({ 
  skinStatus, 
  lifestyle,
  skinGoals, 
  onSaveFormula, 
  unlockedPlants 
}: { 
  skinStatus: any, 
  lifestyle: any,
  skinGoals: string[], 
  onSaveFormula: (f: any) => void,
  unlockedPlants: string[]
}) => {
  const [step, setStep] = useState(0);
  const [productMode, setProductMode] = useState<"analysis" | "diy" | "collab">("analysis");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [productType, setProductType] = useState<string | null>(null);
  const [dayNight, setDayNight] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [selectedActives, setSelectedActives] = useState<string[]>([]);
  const [selectedBotanicals, setSelectedBotanicals] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAnalysisMsg, setActiveAnalysisMsg] = useState("");
  const [isPouring, setIsPouring] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (step === 3) {
      setIsPouring(true);
      setTimeout(() => {
        setIsPouring(false);
        setStep(4);
        setTimeout(() => {
          setStep(5);
          setIsReportLoading(true);
          setTimeout(() => setIsReportLoading(false), 1500);
        }, 4000);
      }, 1500);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const getFormulaName = () => {
    if (selectedBotanicals.includes('rosemary')) return 'Atlantic Guardian';
    if (selectedBotanicals.includes('zaatar')) return 'Levantine Aura';
    if (dayNight === 'night') return 'Midnight Matrix';
    return 'Morning Aura';
  };

  const toggleActive = (id: string) => {
    setSelectedActives(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleBotanical = (id: string) => {
    setSelectedBotanicals(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const getEvaluation = () => {
    const score = 89;
    const feedback = "A highly effective synergistic formulation balanced for your current skin metrics.";
    return { 
      score, 
      feedback,
      hydration: 92,
      repair: 88,
      calming: 85
    };
  };

  const isStepDisabled = () => {
    if (step === 0) return !productType;
    if (step === 1) return !dayNight;
    if (step === 2) return !base;
    if (step === 3) return (selectedActives.length + selectedBotanicals.length) === 0;
    return false;
  };

  const eval_data = getEvaluation();

  return (
    <div className="flex flex-col h-full bg-[#FAFAF8] text-[#1A1F3C] relative overflow-hidden font-sans">
      {/* Top Bar - Fixed */}
      <header className="h-[64px] shrink-0 px-6 border-b border-slate-100 flex items-center justify-between bg-white z-50">
        <div className="flex items-center gap-3">
          {productMode !== 'analysis' ? (
            <button 
              onClick={() => {
                setProductMode('analysis');
                setIsSubmitted(false);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-100 bg-white text-slate-400 hover:text-myrea-blue transition-colors active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
          ) : (
            <SectionLabel className="font-black text-[#1A1F3C]">
              Formulation Lab
            </SectionLabel>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold tracking-tight text-[#1A1F3C]/40 uppercase">
            {productMode === 'diy' ? "Laboratory / DIY Guide" : 
             productMode === 'collab' ? "Laboratory / Collaboration" :
             step === 5 ? "Phase 6 / 5 — Complete" : `Phase ${Math.min(step + 1, 5)} / 5`}
          </span>
          {productMode === 'analysis' && (
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => {
                const isCompleted = i < step || step === 5;
                const isCurrent = i === step && step < 5;
                return (
                  <div 
                    key={i} 
                    className={`rounded-full transition-all duration-700 ${
                      isCurrent 
                        ? "w-2.5 h-2.5 bg-[#1A1F3C]" 
                        : isCompleted 
                          ? "w-1.5 h-1.5 bg-[#1A1F3C]" 
                          : "w-1.5 h-1.5 border border-[#1A1F3C]/20"
                    }`} 
                  />
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#FAFAF8]">
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 py-10 flex flex-col h-full"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Define Your Product</h1>
                <p className="text-slate-500 text-sm font-medium mb-6 tracking-tight">Choose the architect of your routine.</p>
                
                {/* AI Tip Card */}
                <div className="p-6 bg-myrea-blue/5 rounded-[32px] border border-myrea-blue/10 flex flex-col gap-2 shadow-sm mb-6">
                  <span className="text-[10px] font-bold text-myrea-blue uppercase tracking-widest">Protocol Recommendation</span>
                  <p className="text-[13px] text-slate-600 leading-relaxed tracking-tight">
                    Based on your hydration levels, a <span className="font-bold text-myrea-blue">Botanist Serum</span> would optimize your cellular repair cycle.
                  </p>
                </div>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {LAB_PRODUCT_TYPES.map(t => {
                  const isSelected = productType === t.id;
                  const isRecommended = (t.id === 'serum' || t.id === 'moisturizer');
                  return (
                    <motion.button
                      key={t.id}
                      onClick={() => setProductType(t.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-8 py-7 rounded-[32px] border transition-all duration-500 relative overflow-hidden group ${
                        isSelected 
                          ? "bg-white border-myrea-blue shadow-2xl ring-1 ring-myrea-blue/10" 
                          : "bg-white border-slate-100 text-[#1A1F3C] hover:border-slate-200"
                      }`}
                    >
                      <div className="flex justify-between items-center relative z-10 w-full">
                        <div className="text-left">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className={`text-lg font-bold tracking-tight uppercase ${isSelected ? "text-myrea-blue" : "text-[#1A1F3C]"}`}>
                              {t.label}
                            </h4>
                            {isRecommended && (
                              <span className="px-2.5 py-0.5 bg-myrea-blue/10 text-myrea-blue text-[8px] font-bold uppercase tracking-widest rounded-full">Rec</span>
                            )}
                          </div>
                          <p className={`text-[11px] font-medium leading-relaxed max-w-[200px] ${isSelected ? "text-slate-400" : "text-slate-300"}`}>
                            {t.desc}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end">
                           {isSelected && <span className="text-[9px] font-black text-myrea-blue uppercase tracking-widest mb-1">Selected</span>}
                           <div className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center relative z-10 ${isSelected ? "bg-myrea-blue border-myrea-blue shadow-lg" : "border-slate-100"}`} />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 py-10 flex flex-col h-full min-h-[500px] relative"
            >
              {/* Dynamic Background Glow */}
              <AnimatePresence>
                {dayNight === 'day' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,249,196,0.2)_0%,transparent_70%)] pointer-events-none"
                  />
                )}
                {dayNight === 'night' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,125,255,0.1)_0%,transparent_70%)] pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              <div className="mb-10 relative z-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Define Usage</h1>
                <p className="text-slate-500 text-sm font-medium tracking-tight">Synchronize with your dual biological rhythm.</p>
              </div>

              <div className="gap-5 flex-1 flex flex-col justify-center relative z-10">
                {LAB_USAGE_TIMES.map(t => {
                  const isSelected = dayNight === t.id;
                  const isDay = t.id === 'day';
                  return (
                    <motion.button
                      key={t.id}
                      onClick={() => setDayNight(t.id)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex-1 min-h-[160px] p-10 rounded-[40px] flex flex-col items-center justify-center border transition-all duration-700 relative group text-center ${
                        isSelected 
                          ? isDay 
                            ? "bg-white border-myrea-yellow shadow-2xl ring-1 ring-myrea-yellow/10" 
                            : "bg-white border-myrea-blue shadow-2xl ring-1 ring-myrea-blue/10"
                          : "bg-white border-slate-50 text-[#1A1F3C]"
                      }`}
                    >
                      <div className="relative w-full">
                        <div className="mb-3">
                          <h4 className={`text-2xl font-bold tracking-tight uppercase transition-colors ${isSelected ? isDay ? "text-myrea-yellow" : "text-myrea-blue" : "text-slate-300"}`}>
                            {t.label}
                          </h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{t.desc}</p>
                        {isSelected && <div className={`w-2 h-2 rounded-full mx-auto ${isDay ? "bg-myrea-yellow" : "bg-myrea-blue"}`} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 py-10 flex flex-col h-full"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Select Base</h1>
                <p className="text-slate-500 text-sm font-medium tracking-tight mb-8">The stable canvas for your botanical alchemy.</p>
                
                {/* AI Tip Card */}
                <div className="p-6 bg-myrea-green/5 rounded-[32px] border border-myrea-green/10 flex flex-col gap-2 shadow-sm mb-10">
                  <span className="text-[10px] font-bold text-myrea-green uppercase tracking-widest">Synergy Insight</span>
                  <p className="text-[13px] text-slate-600 leading-relaxed tracking-tight">
                    With your irritation score of <span className="font-bold text-myrea-green">42</span>, an <span className="font-bold text-myrea-green">Aloe/Gel</span> base will provide immediate anti-inflammatory relief.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 flex-1 content-center pb-24">
                {LAB_BASES.map(b => {
                  const isSelected = base === b.id;
                  const isRecommended = b.id === 'aloe';
                  return (
                    <motion.button
                      key={b.id}
                      onClick={() => setBase(b.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`relative aspect-square rounded-[40px] flex flex-col items-center justify-center p-6 border transition-all duration-500 overflow-hidden ${
                        isSelected 
                          ? `bg-white border-myrea-blue shadow-2xl ring-1 ring-myrea-blue/10` 
                          : `${b.tint} border-transparent text-[#1A1F3C]`
                      }`}
                    >
                      {/* Subtle Texture Overlay */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                      {isRecommended && !isSelected && (
                        <div className="absolute top-6 right-6 flex flex-col items-end">
                           <span className="text-[7px] font-black text-myrea-blue uppercase tracking-widest">Recommended</span>
                        </div>
                      )}

                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500 relative z-10 ${
                        isSelected ? "bg-myrea-blue shadow-lg scale-110" : "bg-white/60 shadow-sm backdrop-blur-sm"
                      }`}>
                         <div className={`w-6 h-6 rounded-full ${b.color} shadow-sm ${isSelected ? "ring-4 ring-white/30" : ""}`} />
                      </div>

                      <div className="text-center relative z-10">
                        <h4 className={`text-[12px] font-black uppercase tracking-[0.2em] mb-1.5 ${isSelected ? "text-myrea-blue" : "text-slate-900"}`}>{b.label}</h4>
                        <p className={`text-[9px] font-medium leading-relaxed px-1 ${isSelected ? "text-slate-400" : "text-slate-500 opacity-60"}`}>
                          {b.desc}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 py-10 flex flex-col h-full min-h-[500px]"
            >
              {/* Floating Summary Chip */}
              <AnimatePresence>
                {(selectedActives.length > 0 || selectedBotanicals.length > 0) && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="sticky top-0 z-50 mb-8 flex justify-center"
                  >
                    <div className="px-6 py-3.5 bg-white/60 backdrop-blur-2xl border border-slate-100 rounded-full flex items-center gap-4 shadow-xl shadow-slate-900/5">
                      <div className="flex -space-x-2">
                        {[...selectedActives, ...selectedBotanicals].slice(0, 4).map((id, idx) => (
                           <div key={id} className={`w-5 h-5 rounded-full border-2 border-white ${idx % 2 === 0 ? "bg-myrea-blue" : "bg-myrea-green"} shadow-sm`} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                        {selectedActives.length + selectedBotanicals.length} Combined Elements
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Refine Core</h1>
                <p className="text-slate-500 text-sm font-medium tracking-tight">Layering nature with clinical precision for high-affinity results.</p>
              </div>

              {/* Active Boosters */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clinical Protocol</span>
                    <h3 className="text-lg font-bold text-[#1A1F3C]">Active Boosters</h3>
                  </div>
                  <span className="text-[9px] font-black text-myrea-blue bg-myrea-blue/10 px-3 py-1 rounded-full uppercase tracking-widest leading-none">{selectedActives.length} Added</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {LAB_ACTIVES.map(a => {
                    const isSelected = selectedActives.includes(a.id);
                    return (
                      <motion.button
                        key={a.id}
                        onClick={() => toggleActive(a.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-7 py-6 rounded-[32px] flex items-center justify-between border transition-all duration-500 relative group ${
                          isSelected 
                            ? "bg-white border-myrea-blue shadow-xl ring-1 ring-myrea-blue/10" 
                            : "bg-white border-slate-50 shadow-sm hover:border-slate-100"
                        }`}
                      >
                        <div className="text-left">
                          <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${isSelected ? "text-myrea-blue" : "text-slate-900"}`}>{a.name}</h4>
                          <p className={`text-[10px] font-medium tracking-tight ${isSelected ? "text-slate-400" : "text-slate-300"}`}>{a.benefit}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? "bg-myrea-blue text-white shadow-lg" : "bg-slate-50 text-slate-300"}`}>
                           <span className="text-lg font-bold leading-none">{isSelected ? "–" : "+"}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* Indigenous Botanicals */}
              <section className="mb-32 pb-10 border-t border-slate-50 pt-10">
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Indigenous Extraction</span>
                    <h3 className="text-lg font-bold text-[#1A1F3C]">Botanical Alchemy</h3>
                  </div>
                  <span className="text-[9px] font-black text-myrea-green bg-myrea-green/10 px-3 py-1 rounded-full uppercase tracking-widest leading-none">{selectedBotanicals.length} Added</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {BOTANICALS.map(b => {
                    const isSelected = selectedBotanicals.includes(b.id);
                    return (
                      <motion.button
                        key={b.id}
                        onClick={() => toggleBotanical(b.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-7 py-6 rounded-[32px] flex items-center justify-between border transition-all duration-500 relative group overflow-hidden ${
                          isSelected 
                            ? "border-myrea-green bg-white shadow-xl ring-1 ring-myrea-green/10" 
                            : "bg-white border-slate-50 shadow-sm hover:border-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-3 h-3 rounded-full ${b.color} shadow-sm`} />
                          <div className="text-left">
                            <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${isSelected ? "text-myrea-green" : "text-slate-900"}`}>{b.name}</h4>
                            <p className={`text-[10px] font-medium tracking-tight ${isSelected ? "text-slate-400" : "text-slate-300"}`}>{b.benefit}</p>
                          </div>
                        </div>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? "bg-myrea-green text-white shadow-lg" : "bg-slate-50 text-slate-300"}`}>
                           <span className="text-lg font-bold leading-none">{isSelected ? "–" : "+"}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[500px] text-center px-10"
            >
              <div className="relative mb-16">
                {/* Outer Energetic Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-10 border border-[#1A1F3C]/5 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-16 border border-dashed border-[#1A1F3C]/5 rounded-full"
                />
                
                {/* Central Vessel Container */}
                <div className="relative w-48 h-48 bg-white rounded-[56px] shadow-2xl border border-[#1A1F3C]/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8)_0%,transparent_100%)] z-10" />
                  <LiquidContainer 
                    ingredients={[...selectedActives, ...selectedBotanicals]} 
                    isMixing={true} 
                  />
                  {/* Subtle Glow Overlay */}
                  <motion.div 
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-[#1A1F3C]/5 blur-xl pointer-events-none"
                  />
                </div>

                {/* Floating Micro-nodes */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0], 
                      opacity: [0, 0.4, 0],
                      y: [0, -100 - (i * 10)],
                      x: [0, Math.sin(i) * 60]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                    className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-[#1A1F3C]"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1F3C]/30 block italic">Synthesizing DNA</span>
                <h2 className="text-2xl font-black text-[#1A1F3C] uppercase tracking-tight">Molecular Routine</h2>
                <p className="text-[11px] font-medium text-[#1A1F3C]/40 max-w-[220px] mx-auto uppercase tracking-widest leading-relaxed">
                  Aligning nature with your unique biological signature.
                </p>
                <div className="pt-4 flex justify-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#1A1F3C]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full bg-[#FAFAF8]"
            >
              <AnimatePresence mode="wait">
                {productMode === 'analysis' ? (
                  <motion.div
                    key="analysis-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-6 py-10 space-y-10"
                  >
                    {isReportLoading ? (
                      <div className="space-y-6 animate-pulse">
                        <div className="h-40 bg-[#1A1F3C]/5 rounded-[32px]" />
                        <div className="h-6 w-32 bg-[#1A1F3C]/5 rounded-full" />
                        <div className="h-24 bg-[#1A1F3C]/5 rounded-[32px]" />
                        <div className="h-6 w-32 bg-[#1A1F3C]/5 rounded-full" />
                        <div className="space-y-3">
                          <div className="h-16 bg-[#1A1F3C]/5 rounded-2xl" />
                          <div className="h-16 bg-[#1A1F3C]/5 rounded-2xl" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <header className="space-y-2 text-center">
                          <h1 className="text-2xl font-semibold tracking-tight">Your Formula Identity</h1>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Personalized Synergy Results</p>
                        </header>

                        {/* Expressive Insight Card */}
                        <motion.div 
                          initial={{ scale: 0.98, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-white rounded-[40px] p-8 border border-slate-50 soft-shadow relative overflow-hidden"
                        >
                          <div className="relative z-10 flex flex-col items-center text-center gap-6">
                             <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-myrea-blue">
                                <Droplets size={32} strokeWidth={1.5} />
                             </div>
                             <div className="space-y-3">
                                <h2 className="text-xl font-bold tracking-tight text-[#1A1F3C]">{getFormulaName()} Blend</h2>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed italic max-w-xs mx-auto">
                                  "A calming, high-affinity formulation balanced to soothe your current skin condition."
                                </p>
                             </div>
                          </div>
                        </motion.div>

                        {/* Human Metrics */}
                        <section className="grid grid-cols-1 gap-4">
                           <div className="p-6 bg-white rounded-3xl border border-slate-50 flex justify-between items-center">
                              <div>
                                 <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Skin Compatibility</h4>
                                 <p className="text-sm font-bold text-slate-900 leading-none">Optimal Harmony</p>
                              </div>
                              <span className="text-2xl font-bold text-myrea-blue">{eval_data.score}%</span>
                           </div>

                           <div className="p-6 bg-white rounded-3xl border border-slate-50 space-y-4">
                              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Hydration Balance</h4>
                              <div className="flex items-center gap-4">
                                 <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${eval_data.hydration}%` }}
                                      className="h-full bg-myrea-blue"
                                    />
                                 </div>
                                 <span className="text-xs font-bold text-slate-300">{eval_data.hydration}%</span>
                              </div>
                           </div>
                        </section>

                        {/* Next Actions */}
                        <section className="space-y-4 pb-10">
                           <motion.button
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={() => setProductMode('diy')}
                             className="w-full bg-white p-6 rounded-[32px] border border-[#1A1F3C]/5 flex items-center group transition-all hover:border-myrea-blue/20 hover:shadow-xl hover:shadow-myrea-blue/5"
                           >
                             <div className="w-12 h-12 rounded-2xl bg-myrea-blue/5 flex items-center justify-center text-myrea-blue group-hover:bg-myrea-blue group-hover:text-white transition-all mr-6">
                                <FlaskConical size={20} />
                             </div>
                             <div className="text-left flex-1">
                               <h4 className="text-sm font-bold uppercase text-[#1A1F3C] leading-none mb-1">Create at Home</h4>
                               <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none">Step-by-step DIY Guide</p>
                             </div>
                             <ChevronRight size={16} className="text-slate-200 group-hover:text-myrea-blue transition-colors" />
                           </motion.button>

                           <motion.button
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={() => setProductMode('collab')}
                             className="w-full bg-white p-6 rounded-[32px] border border-[#1A1F3C]/5 flex items-center group transition-all hover:border-myrea-orange/20 hover:shadow-xl hover:shadow-myrea-orange/5"
                           >
                             <div className="w-12 h-12 rounded-2xl bg-myrea-orange/5 flex items-center justify-center text-myrea-orange group-hover:bg-myrea-orange group-hover:text-white transition-all mr-6">
                                <Package size={20} />
                             </div>
                             <div className="text-left flex-1">
                               <h4 className="text-sm font-bold uppercase text-[#1A1F3C] leading-none mb-1">Brand Collaboration</h4>
                               <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none">Professional Production</p>
                             </div>
                             <ChevronRight size={16} className="text-slate-200 group-hover:text-myrea-orange transition-colors" />
                           </motion.button>
                        </section>
                      </>
                    )}
                  </motion.div>
                ) : productMode === 'diy' ? (
                  <DIYInstructionsView 
                    formulaName={getFormulaName()} 
                    ingredients={[...selectedActives, ...selectedBotanicals]} 
                    base={base} 
                  />
                ) : (
                  <BrandCollabView 
                    formulaName={getFormulaName()} 
                    score={eval_data.score} 
                    isSubmitted={isSubmitted}
                    onConfirm={() => setIsSubmitted(true)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Bar - Fixed */}
      {productMode === 'analysis' && (
      <footer className="h-[74px] shrink-0 px-8 border-t border-slate-100 flex items-center justify-between bg-white z-50">
        {step === 5 ? (
          <button 
            onClick={() => {
              if (confirm("Start a new formula? Your current batch will be lost.")) {
                setStep(0);
                setProductMode('analysis');
                setIsSubmitted(false);
                setProductType(null);
                setDayNight(null);
                setBase(null);
                setSelectedActives([]);
                setSelectedBotanicals([]);
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-100 bg-white text-slate-400 shadow-sm hover:text-myrea-blue transition-colors active:scale-90"
          >
            <RefreshCw size={16} />
          </button>
        ) : (
          <button 
            onClick={() => step > 0 && setStep(prev => prev - 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
              step === 0 
                ? "opacity-0 pointer-events-none" 
                : "border-slate-100 bg-white text-slate-400 hover:text-myrea-blue active:scale-90"
            }`}
          >
            <ArrowLeft size={16} />
          </button>
        )}

        {step < 4 && (
          <motion.button 
            disabled={isStepDisabled()}
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 h-12 rounded-full font-bold uppercase tracking-tight text-[11px] flex items-center gap-2 transition-all ${
              isStepDisabled()
                ? "bg-slate-50 text-slate-300 cursor-not-allowed" 
                : "bg-myrea-blue text-white shadow-sm"
            }`}
          >
            Continue <ChevronRight size={14} strokeWidth={2.5} />
          </motion.button>
        )}

        {step === 4 && (
          <motion.button 
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 h-12 rounded-full bg-myrea-blue text-white font-bold uppercase tracking-tight text-[11px] flex items-center gap-2 shadow-sm"
          >
            Finalize <CheckCircle2 size={14} />
          </motion.button>
        )}

        {step === 5 && (
          <motion.button 
            onClick={() => {
              const evaluation = getEvaluation();
              onSaveFormula({
                id: Math.random().toString(36).substr(2, 9),
                name: `${getFormulaName()} Blend`,
                type: productType,
                base: base,
                actives: selectedActives,
                botanicals: selectedBotanicals,
                score: evaluation.score,
                composition: evaluation
              });
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 h-12 rounded-full bg-myrea-blue text-white font-bold uppercase tracking-tight text-[11px] flex items-center gap-2 shadow-sm"
          >
            Store Protocol <CheckCircle2 size={14} />
          </motion.button>
        )}
      </footer>
      )}

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-[100px] left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#1A1F3C] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3"
          >
            Protocol saved to your ritual ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
};

// --- Shop View ---

const SHOP_CATEGORIES = [
  { id: "cleansers", label: "Cleansers", icon: Droplets },
  { id: "toners", label: "Toners", icon: Sparkles },
  { id: "serums", label: "Serums", icon: Zap },
  { id: "moisturizers", label: "Moisturizers", icon: Wind },
  { id: "masks", label: "Masks", icon: Moon },
  { id: "oils", label: "Oils", icon: Flame },
  { id: "sets", label: "Sets", icon: Gift },
  { id: "eye-care", label: "Eye Care", icon: Eye }
];

const SHOP_BRANDS = [
  {
    id: "khan-el-saboun",
    name: "Khan El Saboun",
    origin: "Tripoli, Lebanon",
    logo: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Khan%20El%20Saboun.png",
    story: "With a heritage dating back to 1480, Khan El Saboun is the world's oldest soap-making family. They combine ancient artisanal techniques with organic Lebanese botanicals.",
    philosophy: "Organic, artisanal, and deeply rooted in Levantine history.",
    color: "bg-myrea-green",
    focus: ["Artisanal Soap", "Organic Oils", "Heritage"]
  },
  {
    id: "beesline",
    name: "Beesline",
    origin: "Beirut, Lebanon",
    logo: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Beesline.png",
    story: "A leading natural cosmetic lab based on the principles of Apitherapy (bee therapy). Beesline uses honey, royal jelly, and propolis to create effective natural solutions.",
    philosophy: "Nature-based science using the healing power of bees.",
    color: "bg-myrea-yellow",
    focus: ["Apitherapy", "Natural Science", "Protection"]
  },
  {
    id: "helwe",
    name: "Helwé",
    origin: "Beirut, Lebanon",
    logo: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Helwe.png",
    story: "Founded by Josiane Azar, Helwé focuses on high-performance natural skincare that respects the skin's physiology and the environment.",
    philosophy: "Minimalist, effective, and physiologically respectful skincare.",
    color: "bg-myrea-pink",
    focus: ["High Performance", "Minimalism", "Physiology"]
  },
  {
    id: "potion-kitchen",
    name: "Potion Kitchen",
    origin: "Beirut, Lebanon",
    logo: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/transparent-potion-kitchen-logo.png",
    story: "A clean beauty brand that creates plant-based 'potions' using Mediterranean ingredients to promote self-care and holistic wellness.",
    philosophy: "Clean, plant-based, and Mediterranean-inspired wellness.",
    color: "bg-myrea-blue",
    focus: ["Clean Beauty", "Plant-Based", "Wellness"]
  },
  {
    id: "senteurs-d-orient",
    name: "Senteurs d’Orient",
    origin: "Beirut, Lebanon",
    logo: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Senteurs%20D'orients.png",
    story: "A tribute to the sensory heritage of the Orient, creating exquisite handcrafted soaps and bath products infused with traditional scents.",
    philosophy: "Sensory, artisanal, and culturally rich bath rituals.",
    color: "bg-myrea-orange",
    focus: ["Sensory Rituals", "Handcrafted", "Fragrance"]
  }
];

const SHOP_PRODUCTS = [
  {
    id: "wheat-bran-cleanser",
    brandId: "khan-el-saboun",
    name: "Wheat Bran Cleanser",
    category: "cleansers",
    price: 17,
    color: "bg-slate-100",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Cleanser-Wheat-Bran.png",
    ingredients: ["Water", "Olive Oil", "Coconut Oil", "Wheat Oil", "Palm Oil", "Sweet Almond Oil", "Sesame Oil", "Vegetable Glycerin", "Coconut Extract", "Honey", "Wheat Bran", "Sodium Hydroxide", "Phenoxyethanol"],
    benefits: "Perfect for oily and mixed skin. Penetrates the pores and deeply cleanses the skin. Reduces oils from the face which adjusts the oil secretion with regular use. Decreases blackheads and white heads leaving the skin smooth, supple and clear.",
    usage: "Wash your face with warm water then gently massage it for 1 minute and wash it again. Use it once daily for oily skin and 3 times per week for mixed skin.",
    relatedPlants: ["wheat", "olive"],
    matchReason: "Ideal for balancing oily and mixed skin types.",
    isRecommended: true
  },
  {
    id: "frankincense-cream",
    brandId: "khan-el-saboun",
    name: "Frankincense Cream",
    category: "moisturizers",
    price: 29,
    color: "bg-orange-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Frankincence-and-Prinrose-Cream.png",
    ingredients: ["Sesame Oil", "Frankincense Oil", "Sweet Almond Oil", "Fatty Alcohol", "Zinc Oxide", "Honey", "Vegetable Glycerin", "Olive Oil", "Avocado Oil", "Flax Seed Oil", "Phenoxyethanol", "Rose Essential Oil"],
    benefits: "When picking your moisturizer, you need to think of a lightweight formula that doesn’t weigh down your skin. This product combines 2 cultures since it contains the frankincense from Oman and the rose from Lebanon. Reduces rosacea and helps the skin retrieve its glow while rejuvenating it. Its whipped lightweight formula nourishes and moisturizes the skin while combating aging signs.",
    usage: "Apply a small amount on clean skin, and massage gently till the skin absorbs it.",
    relatedPlants: ["rose"],
    matchReason: "Rejuvenating formula for optimal skin glow.",
    isRecommended: true
  },
  {
    id: "hydrating-toner",
    brandId: "khan-el-saboun",
    name: "Hydrating Toner & Freshner",
    category: "toners",
    price: 14,
    color: "bg-blue-50",
    image: "https://raw.githubusercontent.com//chelseakattoura-boop/Chelsea/main/Hydrating-Toner-and-Freshner.png",
    ingredients: ["Rose Water", "Olive Oil", "Sweet Almond Oil"],
    benefits: "Provides the skin with the required refreshment and moisture to maintain a healthy and clean facial appearance. Adjusts the PH of the skin and tightens the pores after using a cleanser, scrub or mask. Enriched in vitamins which help rejuvenate skin cells.",
    usage: "Spray directly on the face or using a cotton pad. Shake well before use. Use freely and apply it after using a cleanser, scrub or mask.",
    relatedPlants: ["rose"],
    matchReason: "Essential step for PH balance and pore tightening.",
    isRecommended: true
  },
  {
    id: "pure-shea-butter",
    brandId: "khan-el-saboun",
    name: "Pure Shea Butter",
    category: "moisturizers",
    price: 40,
    color: "bg-yellow-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Pure-Shea-Butter-Face-and-Body-Scrub.png",
    ingredients: ["Pure Shea Butter"],
    benefits: "Shea Butter is one of the essential beauty components that were used over the centuries to preserve the health and beauty of the skin. It’s the perfect product to cure dry body areas such as feet, knees and elbows. Leaves the skin moisturized and protected throughout the day. Increases the flexibility of the skin which prevents the apparition of stretch marks.",
    usage: "Apply to designated areas and massage gently allowing the skin to absorb the Shea butter.",
    relatedPlants: ["shea"],
    matchReason: "Deeply moisturizing for dry body areas.",
    isRecommended: false
  },
  {
    id: "moringa-clay-mask",
    brandId: "potion-kitchen",
    name: "Face Food Clay Mask - Moringa",
    category: "masks",
    price: 14,
    color: "bg-green-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Moringa_Face_Food_Clay_Mask-1_1200x%20Background%20Removed.png",
    ingredients: ["Kaolin Clay", "Moringa Oleifera Powder", "Tannins", "Flavonoids"],
    benefits: "Purifies and cleanses the skin with nutrient-dense Moringa and Kaolin Clay. Soaks up excess oils and sebum, making skin less prone to acne while fighting aging and providing a radiant glow.",
    usage: "Mix 5g of powder mask with 10mL of water to create a paste. Apply to the face for 5 to 15 minutes. Remove with a wet washcloth before it dries completely.",
    relatedPlants: ["moringa"],
    matchReason: "Detoxifying botanical mask for deep environmental cleansing.",
    isRecommended: true
  },
  {
    id: "hair-heroes-oil",
    brandId: "potion-kitchen",
    name: "Hair Heroes Hair Oil",
    category: "oils",
    price: 18,
    color: "bg-amber-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Hair-Heroes-single-bottle---Manipulation_f406621f-1423-48ac-97a3-824af800880d_800x%20Background%20Removed.png",
    ingredients: ["Almond Oil", "Castor Oil", "Organic Coconut Oil", "Lavender Oil", "Rosemary Oil", "Olive Oil", "Avocado Oil", "Grapeseed Oil", "Vitamin E", "Argan Oil"],
    benefits: "A signature best-selling formula with 10 unique oils. Penetrates the hair shaft to treat damage, stimulate growth, and soothe the scalp while providing extreme shine and protection.",
    usage: "Apply to the hair before showering from roots to tips. Leave on for two hours or overnight, then wash gently.",
    relatedPlants: ["rosemary", "lavender", "coconut"],
    matchReason: "Holistic hair and scalp treatment with Lebanese Rosemary.",
    isRecommended: false
  },
  {
    id: "relax-moodbox",
    brandId: "potion-kitchen",
    name: "Relax Moodbox",
    category: "sets",
    price: 34,
    color: "bg-purple-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Relax_9dd0b9b5-1eae-47c5-a064-54799078416e_1200x%20Background%20Removed.png",
    ingredients: ["Lavender Essential Oil", "Moringa Powder", "Kaolin Clay", "Rose Hydrosol", "Aloe Vera"],
    benefits: "A beautifully curated ritual set designed to calm the nerves and rejuvenate the skin. Includes Lavender Essential Oil for relaxation, Moringa Face Food Mask for purification, and Rose Aloe Hydrating Mist for mood-enhancing hydration.",
    usage: "Follow the sequence: Apply the Moringa mask for 5-15 mins, mist with Rose Aloe for hydration, and use Lavender oil on pulse points to promote restful sleep.",
    relatedPlants: ["lavender", "moringa", "rose"],
    matchReason: "The ultimate therapeutic ritual set for complete stress relief.",
    isRecommended: true
  },
  {
    id: "geranium-cleanser",
    brandId: "potion-kitchen",
    name: "Geranium Face Foam Cleanser",
    category: "cleansers",
    price: 18,
    color: "bg-pink-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Websiteproductssize_2_1200x%20Background%20Removed.png",
    ingredients: ["Coco-Glucoside", "Geranium Hydrosol", "Glycerin", "Aloe Vera Extract"],
    benefits: "A floral facial wash that boosts skin radiance. Gently removes dirt and excess oils without stripping natural moisture. Geranium water balances secretions, leaving skin smooth, moisturized, and glowing.",
    usage: "Wet the face, apply using fingertips, massage gently, and rinse. Avoid contact with eyes.",
    relatedPlants: ["geranium"],
    matchReason: "Floral cleansing ritual for balanced and radiant skin.",
    isRecommended: true
  },
  {
    id: "rosemary-scalp-serum",
    brandId: "potion-kitchen",
    name: "Rosemary Scalp Serum",
    category: "serums",
    price: 25,
    color: "bg-slate-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Websiteproductssize_8_1200x%20Background%20Removed.png",
    ingredients: ["Prunus Amygdalus Oil", "Argania Spinosa Oil", "Ricinus Communis Oil", "Rosmarinus Officinalis Oil", "Mentha Piperita Oil"],
    benefits: "A nourishing and stimulating formula that promotes hair growth from the roots. Harnesses rosemary and other botanical wonders to achieve thicker, fuller, and healthier hair with a natural shine.",
    usage: "Apply directly to dry scalp using the dropper. Massage for a few minutes. Leave for 2 hours or overnight, then wash gently.",
    relatedPlants: ["rosemary"],
    matchReason: "Targeted scalp treatment for revitalized follicular health.",
    isRecommended: true
  },
  {
    id: "prodige-demaquillant",
    brandId: "helwe",
    name: "Prodige Démaquillant Hydratant",
    category: "cleansers",
    price: 46,
    color: "bg-slate-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/IMG_0753-Prodige-Demaquillant-Hydratant_1%20Background%20Removed.png",
    ingredients: ["Jojoba Oil", "Macadamia Oil", "Olive Oil", "Apricot Oil", "Calendula", "Safflower Oil"],
    benefits: "A 99.6% natural make-up removing oil that completely dissolves waterproof make-up while reducing pollution-induced stains. Suitable for all skin types, it regulates sebum in oily skin and deeply nourishes dry epidermis.",
    usage: "Apply to face, neck and bust. Massage well. Soak a cotton pad in water and wipe up to four times to remove makeup. Keep on skin as long as possible before wiping for maximum hydration.",
    relatedPlants: ["olive", "apricot", "calendula"],
    matchReason: "First step double cleansing for a soft, nourished epidermis.",
    isRecommended: true
  },
  {
    id: "lotion-exfoliante",
    brandId: "helwe",
    name: "Lotion Exfoliante Peau Nette",
    category: "toners",
    price: 32,
    color: "bg-blue-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/IMG_0763_Lotion_Exfoliante_Peau_Nette_1%20Background%20Removed.png",
    ingredients: ["Salicylic Acid 2%", "Lemon Balm", "Provitamin B5", "Aloe Vera", "Cucumber", "Myrtle", "Lavender"],
    benefits: "A 2% salicylic acid lotion that eliminates dead cells, fights blackheads, and shrinks pores. Brightens the complexion and improves penetration of subsequent skincare products.",
    usage: "In the evening after cleansing, pat lightly onto blemished areas using a cotton pad. Let dry for 5-10 minutes before the next step. Always apply sunscreen the following morning.",
    relatedPlants: ["lavender", "aloe"],
    matchReason: "Essential exfoliation to fight blemishes and refine pores.",
    isRecommended: true
  },
  {
    id: "serum-perfection",
    brandId: "helwe",
    name: "Sérum Perfection",
    category: "serums",
    price: 49,
    color: "bg-purple-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/IMG_0776_Serum_Perfection_2%20Background%20Removed.png",
    ingredients: ["Bakuchiol", "Niacinamide", "Retinol", "Spike Lavender Oil", "Aloe Vera", "Squalane"],
    benefits: "Advanced cell regeneration combining Bakuchiol (natural retinol alternative) and Niacinamide. Reduces imperfections, tightens skin texture, and soothes redness for a radiant, firmer complexion.",
    usage: "Apply 2-3 pumps by tapping gently on dry face, neck, and upper chest after exfoliation. Use sunscreen in the morning. Shake well before use.",
    relatedPlants: ["lavender", "aloe"],
    matchReason: "High-performance cellular regeneration for visible perfection.",
    isRecommended: true
  },
  {
    id: "creme-jeunesse",
    brandId: "helwe",
    name: "Crème Jeunesse",
    category: "moisturizers",
    price: 45,
    color: "bg-pink-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/IMG_0864_creme_jeunesse_1%20Background%20Removed.png",
    ingredients: ["Bakuchiol", "Vitamin E", "Vegetal Squalane", "Bisabolol", "Apricot Oil"],
    benefits: "The 'Forever Young' cream. Formulated with Bakuchiol to target wrinkles and fine lines without the side effects of traditional retinol. Stimulates collagen production and protects from free radical damage.",
    usage: "Morning: Apply 5-10 minutes after your serum. Evening: Apply small amount to face and neck, then wait 15 minutes before applying your night serum. Suitable for all skin types.",
    relatedPlants: ["apricot"],
    matchReason: "Gentle yet powerful anti-aging protection for all skin types.",
    isRecommended: true
  },
  {
    id: "regard-majestueux",
    brandId: "helwe",
    name: "Regard Majestueux",
    category: "eye-care",
    price: 34,
    color: "bg-amber-50",
    image: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/IMG_0883-2_regard_majestueux_1_cfd0c88d-25c7-4828-bd00-c6d89355ce94%20Background%20Removed.png",
    ingredients: ["Royal Jelly", "Hyaluronic Acid", "Aloe Vera", "Macadamia Oil", "Helichrysum Hydrolate", "Cornflower Water"],
    benefits: "Targets eye wrinkles, crow's feet, and dark circles. Royal Jelly and Hyaluronic Acid plump and firm the skin, while Helichrysum invigorates the area to reduce puffiness and bags.",
    usage: "Apply after your eye serum by gently tapping under the eyes and moving up toward the eyebrows. Rinse thoroughly if accidental contact with eyes occurs.",
    relatedPlants: ["aloe", "macadamia"],
    matchReason: "Majestic treatment for vibrant, firm, and hydrated eyes.",
    isRecommended: true
  }
];

const USER_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    productId: "wheat-bran-cleanser",
    level: 35, // 35% remaining
    nextDelivery: "12 days",
    status: "preparing",
    frequency: "Monthly"
  },
  {
    id: "sub-2",
    productId: "serum-perfection",
    level: 80, // 80% remaining
    nextDelivery: "24 days",
    status: "active",
    frequency: "Every 2 Months"
  }
];

const PAST_ORDERS = [
  {
    id: "ord-101",
    date: "Mar 15, 2026",
    items: ["wheat-bran-cleanser", "creme-jeunesse"],
    total: 62,
    status: "delivered"
  },
  {
    id: "ord-98",
    date: "Feb 10, 2026",
    items: ["hydrating-toner"],
    total: 14,
    status: "delivered"
  }
];

export const ShopView = ({ 
  skinStatus,
  addStepToRoutine,
  setCurrentView,
  savedFormulas
}: { 
  skinStatus: any,
  addStepToRoutine: (product: any) => void,
  setCurrentView: (v: View) => void,
  savedFormulas: any[]
}) => {
  const [activeTab, setActiveTab] = useState<"home" | "product" | "brand" | "subscriptions" | "history" | "saved">("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = cart.map(id => SHOP_PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const cartTotal = cartItems.reduce((acc, p) => acc + (p?.price || 0), 0);

  const handleScan = (product: any) => {
    setScanResult(product);
    setShowScanner(false);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setActiveTab("product");
  };

  const handleBrandClick = (brand: any) => {
    setSelectedBrand(brand);
    setActiveTab("brand");
  };

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderHome = () => (
    <div className="space-y-10 pb-10">
      {/* Search & Top Bar */}
      <section className="px-6 space-y-8">
        <div className="flex justify-between items-end">
          <SectionLabel icon={Package}>Marketplace</SectionLabel>
          <div className="flex gap-4 items-center">
             <button 
               onClick={() => setIsCartOpen(true)}
               className="relative p-3 rounded-2xl bg-white soft-shadow text-slate-900 active:scale-95 transition-all"
             >
               <ShoppingCart size={18} />
               {cart.length > 0 && (
                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-myrea-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                   {cart.length}
                 </span>
               )}
             </button>
             <button 
               onClick={() => setShowScanner(!showScanner)}
               className={`p-3 rounded-2xl soft-shadow transition-all active:scale-90 ${showScanner ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
             >
               <Camera size={18} />
             </button>
          </div>
        </div>

        {/* Commerce Quick Access Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: "saved", label: "Saved Items", icon: Heart },
            { id: "history", label: "Orders", icon: History },
            { id: "subscriptions", label: "Subscriptions", icon: RefreshCw },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 bg-white rounded-full flex items-center gap-2 border border-slate-100 soft-shadow active:scale-95 transition-all whitespace-nowrap"
            >
              <tab.icon size={12} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1F3C]">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-6 h-full flex items-center text-slate-300" size={18} />
          <input 
            type="text"
            placeholder="Search botanical remedies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 bg-white rounded-[32px] pl-16 pr-6 text-sm font-bold soft-shadow focus:outline-none focus:ring-4 ring-slate-900/5 transition-all placeholder:text-slate-300"
          />
        </div>

        <AnimatePresence>
          {showScanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <ProductScanner onScan={handleScan} />
            </motion.div>
          )}
        </AnimatePresence>

        {scanResult && (
           <Card className="p-6 bg-slate-900 text-white relative group">
             <button 
               onClick={() => setScanResult(null)}
               className="absolute top-4 right-4 text-white/20 hover:text-white"
             >
               <X size={14} />
             </button>
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Activity size={24} className="text-myrea-orange" />
                </div>
                <div>
                  <h4 className="text-base font-bold italic">{scanResult.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Match Precision: <span className="text-myrea-green">{scanResult.score}%</span>
                  </p>
                </div>
             </div>
             <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <label className="text-white/30 lowercase italic">Compatibility Analysis</label>
                <p className="text-xs font-medium text-white/70 leading-relaxed italic">
                  "This product contains Laurel Berry which is excellent for your current redness, however, it also has Vitamin E which might be too heavy for your current sebum levels."
                </p>
                <div className="flex gap-2">
                   {scanResult.ingredients.map((ing: string) => (
                     <span key={ing} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-bold uppercase tracking-widest text-white/40">{ing}</span>
                   ))}
                </div>
             </div>
           </Card>
        )}
      </section>

      {/* Categories Dropdown System */}
      <section className="px-6 space-y-6">
        <SectionLabel icon={Wand2}>Categories</SectionLabel>
        <div className="space-y-3">
          {SHOP_CATEGORIES.map(cat => {
            const isExpanded = expandedCategory === cat.id;
            const categoryProducts = SHOP_PRODUCTS.filter(p => p.category === cat.id);
            
            return (
              <div key={cat.id} className="overflow-hidden">
                <button 
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full p-6 bg-white rounded-[28px] flex items-center justify-between transition-all active:scale-[0.99] soft-shadow ${isExpanded ? "rounded-b-none" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-[20px] flex items-center justify-center">
                      <cat.icon size={20} className="text-slate-900" />
                    </div>
                  <span className="text-sm font-semibold uppercase tracking-wider">{cat.label}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white/50 rounded-b-2xl overflow-hidden"
                    >
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categoryProducts.length > 0 ? (
                          categoryProducts.map(p => (
                            <div 
                              key={p.id}
                              onClick={() => handleProductClick(p)}
                              className="bg-white rounded-3xl p-5 border border-slate-100 soft-shadow group cursor-pointer active:scale-[0.98] transition-all hover:border-slate-200 hover:-translate-y-1 relative"
                              style={{ 
                                perspective: "1000px",
                                boxSizing: "border-box",
                                width: "100%",
                                height: "fit-content"
                              }}
                            >
                              <div className="aspect-square w-full rounded-2xl bg-slate-50/50 flex items-center justify-center shrink-0 overflow-hidden mb-4 border border-slate-50 transition-all group-hover:shadow-inner group-hover:bg-white">
                                {p.image && (
                                  <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${p.brandId === 'potion-kitchen' ? 'scale-125 p-0' : 'p-3'}`} 
                                    referrerPolicy="no-referrer" 
                                    style={{ transformStyle: "preserve-3d" }}
                                  />
                                )}
                              </div>
                              <div className="space-y-1 h-24 flex flex-col justify-between">
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                    {SHOP_BRANDS.find(b => b.id === p.brandId)?.name}
                                  </p>
                                  <h4 className="text-xs font-bold leading-tight line-clamp-2">{p.name}</h4>
                                </div>
                                <div className="flex justify-between items-end">
                                  <span className="text-sm font-bold tracking-tight">${p.price}</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToCart(p.id);
                                    }}
                                    className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center soft-shadow active:scale-90 transition-transform"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-[10px] text-center py-4 text-slate-400 font-bold uppercase tracking-widest">No products in this category yet</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-6">
          <label>Recommended for You</label>
          <span className="text-[8px] font-bold text-myrea-orange uppercase tracking-[0.2em] flex items-center gap-1">
            <Sparkles size={10} /> Personalized Selection
          </span>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar pb-6 pt-2">
          {SHOP_PRODUCTS.filter(p => p.isRecommended).map(product => (
            <div key={product.id} className="min-w-[280px]">
              <Card 
                className="w-[280px] h-[480px] p-0 overflow-hidden group border border-slate-100 bg-white soft-shadow hover:border-slate-200 transition-all hover:-translate-y-2 flex flex-col"
              >
                <div className="h-64 rounded-b-3xl bg-slate-50/50 relative flex items-center justify-center overflow-hidden transition-all group-hover:bg-white group-hover:shadow-inner">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.15] drop-shadow-xl ${product.brandId === 'potion-kitchen' ? 'scale-125 p-2' : 'p-6'}`} 
                      referrerPolicy="no-referrer" 
                      style={{ transformStyle: "preserve-3d" }}
                    />
                  )}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-base font-bold tracking-tight">${product.price}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 leading-none">
                      {SHOP_BRANDS.find(b => b.id === product.brandId)?.name}
                    </p>
                    <h4 className="text-lg font-bold tracking-tight leading-tight mb-3 line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 italic">"{product.benefits}"</p>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleProductClick(product)}
                        className="w-full py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all text-center hover:bg-white hover:border-slate-200"
                      >
                        Detail
                      </button>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-slate-800"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Your Cart</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {cart.length} items collected
                  </p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 no-scrollbar space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item, idx) => (
                    <div key={`${item?.id}-${idx}`} className="flex items-center gap-6 group">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-slate-100 transition-all group-hover:bg-white group-hover:shadow-md">
                        <img src={item?.image} alt={item?.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold leading-tight">{item?.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {SHOP_BRANDS.find(b => b.id === item?.brandId)?.name}
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm font-bold tracking-tight">${item?.price}</span>
                          <button 
                            onClick={() => {
                              const newCart = [...cart];
                              newCart.splice(idx, 1);
                              setCart(newCart);
                            }}
                            className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center">
                      <ShoppingCart size={32} className="text-slate-200" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your bag is empty</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest italic">Start your botanical journey</p>
                    </div>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-8 bg-slate-50/50 space-y-6 border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Subtotal</span>
                      <span className="text-sm font-bold tracking-tight text-slate-900">${cartTotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Delivery</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-myrea-green">Free</span>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-[0.1em]">Total Estimation</span>
                      <span className="text-xl font-bold tracking-tight">${cartTotal}</span>
                    </div>
                  </div>
                  <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-xl shadow-slate-900/10 hover:bg-slate-800">
                    Secure Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Brands Section */}
      <section className="px-6 space-y-6">
        <div className="flex justify-between items-center">
          <label>Shop by Brand</label>
          <button className="text-[8px] font-bold uppercase tracking-widest text-slate-400">View All</button>
        </div>
        <div className="space-y-3">
          {SHOP_BRANDS.map(brand => (
            <button 
              key={brand.id}
              onClick={() => handleBrandClick(brand)}
              className="w-full p-5 bg-white rounded-3xl flex items-center justify-between group border border-slate-100 soft-shadow active:scale-[0.98] transition-all hover:border-slate-200"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center p-1 overflow-hidden transition-all group-hover:bg-white inset-shadow">
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-slate-900 font-bold text-xl uppercase tracking-tighter">
                      {brand.name[0]}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold tracking-tight uppercase leading-none mb-1.5">{brand.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium tracking-tight line-clamp-1 italic">"{brand.philosophy}"</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-slate-900 group-hover:bg-white transition-all">
                <ChevronRight size={18} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Subscription Quick View */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <label>Active Subscriptions</label>
          <button 
            onClick={() => setActiveTab("subscriptions")}
            className="text-[8px] font-bold uppercase tracking-widest text-myrea-orange"
          >
            Manage All
          </button>
        </div>
        <Card 
          onClick={() => setActiveTab("subscriptions")}
          className="bg-slate-900 text-white relative overflow-hidden cursor-pointer group border-none soft-shadow p-8"
        >
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <RefreshCw size={100} className="animate-spin-slow" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-myrea-green rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Next Delivery: 12 Days</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {USER_SUBSCRIPTIONS.map(sub => {
                  const product = SHOP_PRODUCTS.find(p => p.id === sub.productId);
                  return (
                    <div key={sub.id} className={`w-10 h-10 rounded-full ${product?.color} flex items-center justify-center overflow-hidden bg-white`}>
                      <div className="scale-[0.3]">
                        <IllustratedProduct color={product?.color || "bg-slate-200"} fill={sub.level} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">2 Items Included</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Previous Purchases */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <label>Previous Purchases</label>
          <button 
            onClick={() => setActiveTab("history")}
            className="text-[8px] font-bold uppercase tracking-widest text-slate-400"
          >
            View History
          </button>
        </div>
        <div className="space-y-3">
          {PAST_ORDERS.slice(0, 1).map(order => (
            <div key={order.id}>
              <Card className="p-5 bg-white soft-shadow">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{order.date}</p>
                  <span className="text-[8px] font-bold uppercase px-2 py-1 bg-myrea-green/10 text-myrea-green rounded-full">Delivered</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  {order.items.map(itemId => {
                    const product = SHOP_PRODUCTS.find(p => p.id === itemId);
                    return (
                      <div key={itemId} className={`w-10 h-10 rounded-xl ${product?.color} flex items-center justify-center overflow-hidden`}>
                        <div className="scale-[0.3]">
                          <IllustratedProduct color={product?.color || "bg-slate-200"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all">
                    Reorder
                  </button>
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="flex-1 py-3 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Quick Access */}
      <section className="px-6">
        <button className="w-full py-5 bg-myrea-yellow/10 rounded-3xl flex items-center justify-center gap-3 font-bold uppercase tracking-[0.15em] text-[10px] soft-shadow active:scale-95 transition-all">
          <Gift size={18} className="text-myrea-yellow" /> Check Your Rewards
        </button>
      </section>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    const brand = SHOP_BRANDS.find(b => b.id === selectedProduct.brandId);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-white flex flex-col"
      >
        <header className="px-6 py-10 flex justify-between items-center bg-white relative z-10 transition-all">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab("home")}
              className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <img 
              src="https://raw.githubusercontent.com/chelseakattoura-boop/I-love-you/main/Myrea%20Logo%20FInal.png" 
              alt="Myrēa Logo" 
              className="h-5 w-auto opacity-30 grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              {brand?.logo && (
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center overflow-hidden soft-shadow">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="w-full h-full object-contain p-0.5"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">{brand?.name}</p>
            </div>
            <h2 className="text-xl font-bold tracking-tight line-clamp-1">{selectedProduct.name}</h2>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-12 pb-48 overflow-y-auto no-scrollbar">
          {/* Hero Image */}
          <div className="w-full aspect-square bg-slate-50/30 rounded-[48px] flex items-center justify-center relative overflow-hidden border border-slate-100 shadow-inner group" style={{ perspective: "1000px" }}>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none" />
            {selectedProduct.image && (
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className={`object-contain drop-shadow-2xl transition-transform duration-1000 hover:scale-110 ${selectedProduct.brandId === 'potion-kitchen' ? 'w-[105%] h-[105%] translate-y-4' : 'w-[85%] h-[85%]'}`} 
                referrerPolicy="no-referrer" 
                style={{ transformStyle: "preserve-3d" }}
              />
            )}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2">
              <span className="text-3xl font-bold tracking-tighter text-slate-900">${selectedProduct.price}</span>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Price Tax Incl.</p>
            </div>
          </div>

          {/* Why it works for you */}
          <section className="space-y-4">
            <label>Why This Works for You</label>
            <div className="bg-myrea-orange/5 p-6 rounded-[32px] flex gap-5 items-center">
              <div className="w-12 h-12 bg-myrea-orange rounded-2xl flex items-center justify-center shrink-0 text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{selectedProduct.matchReason}"</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="space-y-4">
            <label>Key Benefits</label>
                  <p className="text-lg text-slate-700 leading-relaxed">
              {selectedProduct.benefits}
            </p>
          </section>

          {/* Ingredients */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <label>Ingredients</label>
              <button className="text-[8px] font-bold uppercase tracking-[0.15em] text-myrea-blue">View Full List</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedProduct.ingredients.map((ing: string) => (
                <div 
                  key={ing}
                  className="px-5 py-2.5 bg-slate-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >
                  {ing}
                </div>
              ))}
            </div>
          </section>

          {/* Usage */}
          <section className="space-y-4">
            <label>How to Use</label>
            <Card className="p-8 bg-slate-50/50 border-none soft-shadow">
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 soft-shadow">
                  <RefreshCw size={20} className="text-myrea-blue" />
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedProduct.usage}</p>
              </div>
            </Card>
          </section>
        </div>

        {/* Fixed Add to UI - Replaced with relative flex child to stack above BottomNav */}
        <div className="relative w-full p-8 pt-4 bg-white/80 backdrop-blur-3xl border-t border-slate-100 flex gap-4 z-40">
           <button 
             onClick={() => {
               addToCart(selectedProduct.id);
               setIsCartOpen(true);
             }}
             className="flex-[2] h-20 bg-slate-900 text-white rounded-[32px] font-bold uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-xl shadow-slate-900/20 hover:bg-slate-800 flex items-center justify-center gap-3"
           >
             <ShoppingCart size={18} /> Add to bag
           </button>
           <button 
             onClick={() => addStepToRoutine(selectedProduct)}
             className="flex-1 h-20 bg-slate-50 border border-slate-100 text-slate-900 rounded-[32px] font-bold uppercase tracking-[0.1em] text-[8px] active:scale-95 transition-all whitespace-nowrap px-4"
           >
             Prescribe to Routine
           </button>
        </div>
      </motion.div>
    );
  };

  const renderBrandDetail = () => {
    if (!selectedBrand) return null;
    const brandProducts = SHOP_PRODUCTS.filter(p => p.brandId === selectedBrand.id);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-white"
      >
        <header className="px-8 py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100">
          <button 
            onClick={() => setActiveTab("home")}
            className="absolute top-10 left-8 w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform z-10 soft-shadow border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="relative z-10 text-slate-900 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-3xl p-3 flex items-center justify-center shrink-0 shadow-2xl border border-slate-100">
                {selectedBrand.logo ? (
                  <img 
                    src={selectedBrand.logo} 
                    alt={selectedBrand.name} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                     {selectedBrand.name[0]}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h2 className="text-5xl font-bold tracking-tighter text-slate-900 uppercase">{selectedBrand.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-myrea-orange rounded-full animate-pulse" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{selectedBrand.origin}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/40 rounded-full blur-3xl" />
        </header>

        <div className="p-8 space-y-16 pb-10">
          {/* Brand Story */}
          <section className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">The Heritage</label>
            <p className="text-xl text-slate-700 leading-relaxed font-medium italic">"{selectedBrand.story}"</p>
            <div className="flex flex-wrap gap-2 pt-4">
              {selectedBrand.focus.map((f: string) => (
                <span key={f} className="px-4 py-2 bg-white border border-slate-100 text-slate-400 rounded-xl text-[8px] font-bold uppercase tracking-widest soft-shadow">
                  {f}
                </span>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Philosophy</label>
            <div className="p-8 bg-slate-50/50 rounded-[40px] border border-slate-100 shadow-inner">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic text-center">"{selectedBrand.philosophy}"</p>
            </div>
          </section>

          {/* Brand Products Grid */}
          <section className="space-y-8">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Full Catalog</label>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{brandProducts.length} Results</span>
            </div>
            <div className="grid grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
              {brandProducts.map(product => (
                <div key={product.id}>
                  <Card 
                    onClick={() => handleProductClick(product)}
                    className="p-5 flex flex-col gap-6 cursor-pointer group border border-slate-100 bg-white soft-shadow hover:border-slate-300 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-square w-full rounded-2xl bg-slate-50/50 flex items-center justify-center shrink-0 overflow-hidden border border-slate-50 transition-all group-hover:bg-white group-hover:shadow-inner">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={`object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 ${product.brandId === 'potion-kitchen' ? 'w-full h-full scale-125 p-0' : 'w-[85%] h-[85%] p-2'}`} 
                          referrerPolicy="no-referrer"
                          style={{ transformStyle: "preserve-3d" }}
                        />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold tracking-tight leading-tight line-clamp-2">{product.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">${product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                            setIsCartOpen(true);
                          }}
                          className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[8px] font-bold uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={10} /> Add to bag
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    );
  };

  const renderSubscriptions = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-10 pb-10"
    >
      <header className="flex items-center gap-4 pt-6">
        <button 
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>Subscriptions</h2>
      </header>

      {/* Subscription Cards */}
      <section className="space-y-8" style={{ perspective: "1000px" }}>
        {USER_SUBSCRIPTIONS.map((sub, i) => {
          const product = SHOP_PRODUCTS.find(p => p.id === sub.productId);
          return (
            <div key={sub.id}>
              <Card className="p-8 bg-white border border-slate-100 soft-shadow space-y-8 rounded-[40px]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50/50 flex items-center justify-center relative overflow-hidden border border-slate-50 shadow-inner">
                      {product?.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-3 drop-shadow-lg" 
                          referrerPolicy="no-referrer" 
                          style={{ transformStyle: "preserve-3d" }}
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold tracking-tight leading-none">{product?.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{sub.frequency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Next Ship Date</p>
                    <p className="text-base font-bold text-myrea-orange tracking-tighter">{sub.nextDelivery}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg hover:bg-slate-800">
                    Edit Subscription
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 py-5 bg-slate-50 border border-slate-100 text-slate-900 rounded-[24px] text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all hover:bg-white">
                      Skip Delivery
                    </button>
                    <button className="flex-1 py-5 bg-slate-50 border border-slate-100 text-slate-900 rounded-[24px] text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all hover:bg-white">
                      Pause Subscription
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </section>

      <button className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-[32px] font-bold uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all hover:border-slate-300 hover:text-slate-600">
        Add New Subscription
      </button>
    </motion.div>
  );

  const renderSavedItems = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-10 pb-20"
    >
      <header className="flex items-center gap-4 pt-6">
        <button 
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight">Saved Items</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Products & Formulations</p>
        </div>
      </header>

      {/* Saved Products */}
      <section className="space-y-6">
        <SectionLabel icon={ShoppingBag}>Products</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {SHOP_PRODUCTS.slice(0, 2).map((p) => (
            <div 
              key={p.id} 
              onClick={() => handleProductClick(p)}
              className="bg-white p-5 rounded-[32px] border border-slate-100 soft-shadow group"
            >
              <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-105">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-[11px] font-bold line-clamp-1 truncate">{p.name}</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Saved Formulations (Formulation Lab DIYs) */}
      <section className="space-y-6">
        <SectionLabel icon={History}>Your Formulations</SectionLabel>
        {savedFormulas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {savedFormulas.map((formula) => (
              <div key={formula.id} className="relative group">
                <VialCard formula={formula} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
               <Plus size={24} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No custom formulas yet</p>
          </div>
        )}
      </section>
    </motion.div>
  );

  const renderHistory = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-8 pb-10"
    >
      <header className="flex items-center gap-4 pt-6">
        <button 
          onClick={() => setActiveTab("home")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform soft-shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>Previous Purchases</h2>
      </header>

      <div className="space-y-6">
        {PAST_ORDERS.map(order => (
          <div key={order.id}>
            <Card className="p-8 bg-white border border-slate-100 soft-shadow rounded-[40px]">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 leading-none">Order Ref #{order.id}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</p>
                </div>
                <div className="px-4 py-1.5 bg-myrea-green/5 text-myrea-green border border-myrea-green/10 rounded-full text-[8px] font-bold uppercase tracking-[0.2em]">
                  {order.status}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-10">
                {order.items.map(itemId => {
                  const product = SHOP_PRODUCTS.find(p => p.id === itemId);
                  return (
                    <div key={itemId} className="w-16 h-16 rounded-2xl bg-slate-50/50 flex items-center justify-center overflow-hidden border border-slate-50 shadow-inner">
                      {product?.image && (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3 drop-shadow-md" referrerPolicy="no-referrer" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-3 pt-8 border-t border-slate-50">
                <button className="flex-1 py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg hover:bg-slate-800">
                  Quick Reorder
                </button>
                <button className="flex-1 py-5 bg-slate-50 border border-slate-100 text-slate-900 rounded-[24px] text-[10px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-all hover:bg-white">
                  Invoice
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {activeTab === "home" && <motion.div key="home" exit={{ opacity: 0 }}>{renderHome()}</motion.div>}
        {activeTab === "product" && <motion.div key="product" exit={{ opacity: 0 }}>{renderProductDetail()}</motion.div>}
        {activeTab === "brand" && <motion.div key="brand" exit={{ opacity: 0 }}>{renderBrandDetail()}</motion.div>}
        {activeTab === "subscriptions" && <motion.div key="subs" exit={{ opacity: 0 }}>{renderSubscriptions()}</motion.div>}
        {activeTab === "history" && <motion.div key="history" exit={{ opacity: 0 }}>{renderHistory()}</motion.div>}
        {activeTab === "saved" && <motion.div key="saved" exit={{ opacity: 0 }}>{renderSavedItems()}</motion.div>}
      </AnimatePresence>
    </div>
  );
};

// --- AI Coach View ---

export const AICoachView = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Myrēa Skin Coach. How is your skin feeling today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages([...newMessages, { 
        text: "I see. Based on your stress levels and the dry weather in Beirut today, I recommend adding an extra layer of Rosewater Mist tonight.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-[390px] h-[844px] flex flex-col overflow-hidden shadow-2xl"
      style={{ fontSize: '14px' }}
    >
      {/* Header Bar: 56px tall - Now using flex flow */}
      <header className="shrink-0 h-[56px] px-4 flex justify-between items-center bg-white border-b border-slate-100 z-20">
        <button onClick={onClose} className="p-1">
          <ChevronLeft size={24} className="text-slate-900" />
        </button>
        
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] bg-[#F3F4F6] rounded-full flex items-center justify-center overflow-hidden">
              <div className="scale-[0.3] shrink-0">
                <AICoachEntity />
              </div>
            </div>
            <h2 className="text-[16px] font-bold text-slate-900">Skin Coach</h2>
          </div>
          <div className="flex items-center gap-1 -mt-0.5">
            <div className="w-1.5 h-1.5 bg-myrea-green rounded-full animate-pulse" />
            <p className="text-[12px] text-slate-400 lowercase">Online</p>
          </div>
        </div>

        <button className="p-1">
          <Info size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Messages Area (Scrollable) */}
      <div 
        className="flex-1 overflow-y-auto px-[12px] py-[8px] flex flex-col gap-2 no-scrollbar"
      >
        <div className="text-[11px] text-slate-400 text-center my-4 uppercase tracking-widest">Today</div>
        
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <ChatMessage text={msg.text} isBot={msg.isBot} />
            
            {msg.isBot && i === messages.length - 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 overflow-x-auto no-scrollbar py-2"
              >
                <button className="h-[32px] px-4 bg-slate-50 border border-slate-100 rounded-full text-[13px] font-medium text-slate-600 whitespace-nowrap active:bg-slate-100">
                  Helpful
                </button>
                <button className="h-[32px] px-4 bg-slate-50 border border-slate-100 rounded-full text-[13px] font-medium text-slate-600 whitespace-nowrap active:bg-slate-100">
                  Not Helpful
                </button>
                <button className="h-[32px] px-4 bg-slate-50 border border-slate-100 rounded-full text-[13px] font-medium text-slate-600 whitespace-nowrap active:bg-slate-100">
                  More tips
                </button>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar: 52px tall - Now using flex flow */}
      <div className="shrink-0 h-[52px] px-4 flex items-center gap-3 bg-white border-t border-slate-100 z-20">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          className="flex-1 h-[36px] bg-slate-50 rounded-[20px] px-4 text-[14px] font-medium focus:outline-none border border-transparent focus:border-slate-200"
        />
        <button 
          onClick={handleSend}
          className="w-[36px] h-[36px] bg-[#1A1F3C] text-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-sm"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export const ProfileView = () => {
  const [activeEvolutionTab, setActiveEvolutionTab] = useState<"week" | "month" | "year">("week");

  const evolutionData = useMemo(() => {
    if (activeEvolutionTab === "week") {
      return [
        { name: "Mon", hydration: 62, clarity: 58, barrier: 70 },
        { name: "Tue", hydration: 65, clarity: 64, barrier: 72 },
        { name: "Wed", hydration: 78, clarity: 70, barrier: 74 },
        { name: "Thu", hydration: 74, clarity: 75, barrier: 76 },
        { name: "Fri", hydration: 82, clarity: 80, barrier: 78 },
        { name: "Sat", hydration: 88, clarity: 85, barrier: 82 },
        { name: "Sun", hydration: 85, clarity: 88, barrier: 84 },
      ];
    }
    // Simple mock for month/year
    return Array.from({ length: 12 }, (_, i) => ({
      name: `M${i + 1}`,
      hydration: 60 + Math.random() * 30,
      clarity: 55 + Math.random() * 35,
      barrier: 65 + Math.random() * 25,
    }));
  }, [activeEvolutionTab]);

  const botanicalMatches = [
    { name: "Myrtle", role: "Barrier Support", match: "94%", color: "bg-myrea-blue", desc: "Sourced from the Kfardebian slopes." },
    { name: "Rosewater", role: "Calmness", match: "88%", color: "bg-myrea-pink", desc: "Distilled in the heart of Bekaa." },
    { name: "Thyme", role: "Clarity", match: "82%", color: "bg-myrea-green", desc: "Wild-harvested from Southern peaks." },
  ];

  return (
    <div className="relative flex-1 overflow-y-auto no-scrollbar flex flex-col gap-0 px-0 pt-0 pb-32 bg-myrea-offwhite">
      {/* Personalized Header Area */}
      <header className="px-6 pt-16 pb-12 flex flex-col items-center text-center space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-myrea-blue/40 block">My Space</label>
          <h1 className="text-5xl font-black text-slate-900 leading-none">Chelsea</h1>
        </div>

        <div className="relative">
          <div className="w-32 h-32 rounded-[48px] bg-white soft-shadow border-4 border-white overflow-hidden relative z-10">
            <img 
              src="https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Profile%20Icon.png" 
              alt="Chelsea" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-myrea-yellow/20 rounded-full blur-xl z-0"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-myrea-green/20 rounded-full blur-lg z-0"
          />
        </div>

        <p className="max-w-[240px] text-sm font-medium text-slate-500 leading-relaxed italic">
          "Your skin barrier feels stronger and more resilient than last month."
        </p>
      </header>

      {/* Skin Identity Card */}
      <section className="px-6 pb-10">
        <Card className="p-8 bg-white soft-shadow border-none rounded-[44px] space-y-10">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Identity Profile</label>
              <h3 className="text-xl font-black text-slate-900">Combination + Sensitive</h3>
            </div>
            <div className="px-3 py-1 bg-myrea-green/10 rounded-full">
              <span className="text-[9px] font-black uppercase text-myrea-green tracking-widest">Healthy</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 px-0.5">
                  <span>Barrier Strength</span>
                  <span className="text-slate-900">72%</span>
                </div>
                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "72%" }} className="h-full bg-myrea-green" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 px-0.5">
                  <span>Hydration Trend</span>
                  <span className="text-myrea-blue">Improving</span>
                </div>
                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-myrea-blue" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Sparkles size={14} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Stress impact</p>
                   <p className="text-[11px] font-bold text-slate-900">Moderate</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Activity size={14} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">7 Day Streak</p>
                   <p className="text-[11px] font-bold text-slate-900">Consistent</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Skin Evolution Section */}
      <section className="space-y-6 pb-12">
        <div className="px-6 flex justify-between items-end">
          <div className="space-y-1">
            <SectionLabel icon={TrendingUp}>Evolution</SectionLabel>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Timeline</h2>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {["week", "month", "year"].map((t) => (
              <button 
                key={t}
                onClick={() => setActiveEvolutionTab(t as any)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeEvolutionTab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6">
          <div className="h-64 w-full bg-white rounded-[44px] p-6 soft-shadow relative overflow-hidden group">
             {/* Background Particles */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
                    className="absolute w-2 h-2 bg-myrea-blue rounded-full blur-sm"
                    style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%` }}
                  />
                ))}
             </div>

             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorHydration" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FC3F7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4FC3F7" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#81C784" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#81C784" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: 'bold' }}
                    cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hydration" 
                    stroke="#4FC3F7" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorHydration)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clarity" 
                    stroke="#81C784" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorClarity)" 
                  />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Ritual Habits Section */}
      <section className="px-6 space-y-6 pb-12">
        <SectionLabel icon={Activity}>Ritual Habits</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Ritual Streak", val: "7 Days", icon: Activity, color: "text-myrea-green", bg: "bg-myrea-green/5" },
            { label: "Water Intake", val: "Consistent", icon: Droplets, color: "text-myrea-blue", bg: "bg-myrea-blue/5" },
            { label: "Sleep Impact", val: "+18% Calm", icon: Moon, color: "text-myrea-purple", bg: "bg-myrea-purple/5" },
            { label: "SPF Guard", val: "100% Core", icon: Sun, color: "text-myrea-yellow", bg: "bg-myrea-yellow/5" },
          ].map((habit, i) => (
            <div key={i}>
              <Card className="p-6 bg-white soft-shadow border-none rounded-[32px] flex flex-col gap-4 group hover:scale-[1.02] transition-transform">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${habit.bg} ${habit.color}`}>
                  <habit.icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">{habit.label}</p>
                  <p className="text-sm font-black text-slate-900">{habit.val}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Saved & Favorites Section */}
      <section className="space-y-6 pb-12">
        <div className="px-6 flex justify-between items-center">
          <SectionLabel icon={Bookmark}>Saved & Favorites</SectionLabel>
          <ChevronRight size={16} className="text-slate-300" />
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 snap-x">
          {[
            { title: "Lavender Hydrosol", tag: "TONER", img: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/illustration%201.png" },
            { title: "Thyme Elixir", tag: "SERUM", img: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/illustration%201.png" },
            { title: "Olive Balm", tag: "MOISTURE", img: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/illustration%201.png" },
          ].map((item, i) => (
            <div key={i} className="snap-center">
              <Card className="min-w-[140px] p-4 bg-white soft-shadow border-none rounded-[32px] flex flex-col gap-3">
                <div className="aspect-square rounded-2xl bg-slate-50 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[8px] font-black text-myrea-blue uppercase tracking-widest">{item.tag}</p>
                  <h4 className="text-[11px] font-black text-slate-900 leading-tight">{item.title}</h4>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Botanical Matches Section */}
      <section className="px-6 space-y-6 pb-12">
        <header className="space-y-1">
          <SectionLabel icon={Leaf}>Botanical Matches</SectionLabel>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matched to your skin soul</p>
        </header>
        <div className="space-y-4">
          {botanicalMatches.map((plant, i) => (
            <div key={i}>
              <Card className="p-6 bg-white soft-shadow border-none rounded-[32px] flex items-center justify-between group overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-24 h-24 ${plant.color}/5 blur-3xl rounded-full`} />
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${plant.color}/10 text-slate-900`}>
                    <img 
                      src="https://raw.githubusercontent.com/chelseakattoura-boop/I-love-you/main/Myrea%20Logo%20FInal.png" 
                      alt="Plant" 
                      className="w-10 opacity-20 rotate-12"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-slate-900">{plant.name}</h3>
                      <span className="text-[10px] font-black text-myrea-green">{plant.match}</span>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1">{plant.role}</p>
                    <p className="text-[10px] text-slate-400 italic">{plant.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-900 transition-colors relative z-10" />
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection Archive */}
      <section className="px-6 space-y-6 pb-12">
        <SectionLabel icon={History}>Reflection Archive</SectionLabel>
        <div className="space-y-3">
          {[
            { date: "May 4", note: "Today my skin felt calmer after sleeping early.", accent: "border-myrea-blue" },
            { date: "April 28", note: "Redness reduced after switching to gentler cleansing.", accent: "border-myrea-pink" },
          ].map((note, i) => (
            <div key={i}>
              <Card className={`p-6 bg-white soft-shadow border-none border-l-4 ${note.accent} rounded-[32px] space-y-2`}>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{note.date}</p>
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{note.note}"</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Settings Area */}
      <section className="px-6 pb-20">
        <Card className="p-8 bg-white soft-shadow border-none rounded-[44px] space-y-8">
           <div className="space-y-1">
            <SectionLabel icon={Wand2}>Systems</SectionLabel>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Management</h3>
          </div>

          <div className="space-y-2">
            {[
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "goals", label: "Skin Goals", icon: Target },
              { id: "privacy", label: "Privacy", icon: Lock },
              { id: "safety", label: "Security", icon: Shield },
              { id: "map", label: "Sourcing Map", icon: MapPin },
            ].map((s) => (
              <button 
                key={s.id}
                className="w-full p-5 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors rounded-2xl group border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors shadow-sm">
                    <s.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{s.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
              </button>
            ))}
          </div>

          <button className="w-full py-5 rounded-2xl border-2 border-slate-900 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
            App Appearance
          </button>
        </Card>
      </section>
    </div>
  );
};

export const MaskTreatmentStep = ({ 
  onClose, 
  onComplete 
}: { 
  onClose: () => void, 
  onComplete: () => void 
}) => {
  const [isTapping, setIsTapping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setShowConfetti(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center"
    >
      {showConfetti && <Confetti />}
      
      {/* Top Section */}
      <header className="w-full px-8 pt-16 flex flex-col items-center text-center gap-1">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
           <label className="text-myrea-orange block mb-2">Step 4</label>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-slate-900 uppercase"
        >
          Mask / Treatment
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-slate-500 font-medium max-w-[240px] mt-4 leading-relaxed"
        >
          Apply your mask and let your skin absorb the nutrients.
        </motion.p>
      </header>

      {/* Center Illustration */}
      <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
         {/* Glow Background */}
         <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: isCompleted ? 0.8 : 0.4
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-64 h-64 rounded-full blur-[80px] z-0 transition-colors duration-1000 ${isCompleted ? 'bg-myrea-orange/40' : 'bg-myrea-green/30'}`}
         />

         <motion.div
           className="relative z-10 cursor-pointer touch-none"
           animate={{
             scale: isTapping ? 0.96 : (isCompleted ? 1.1 : [1, 1.02, 1]),
           }}
           transition={{
             scale: isTapping ? { duration: 0.1 } : (isCompleted ? { type: "spring", stiffness: 200, damping: 10 } : { duration: 4, repeat: Infinity, ease: "easeInOut" })
           }}
           onMouseDown={() => setIsTapping(true)}
           onMouseUp={() => setIsTapping(false)}
           onMouseLeave={() => setIsTapping(false)}
           onTouchStart={() => setIsTapping(true)}
           onTouchEnd={() => setIsTapping(false)}
         >
           <div className="relative group">
              <img 
                src="https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/illustration%201.png"
                alt="Mask Treatment Illustration"
                className={`w-80 h-auto drop-shadow-2xl transition-all duration-700 ${isCompleted ? 'brightness-110 drop-shadow-[0_0_30px_rgba(255,167,38,0.5)]' : ''}`}
                referrerPolicy="no-referrer"
              />
              
              {/* Interaction Overlay Ripple */}
              <AnimatePresence>
                {isTapping && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/20 rounded-full blur-3xl pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Completion Indicator */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center soft-shadow z-20 border border-white"
                  >
                    <CheckCircle2 className="text-myrea-green" size={48} />
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
         </motion.div>
      </div>

      {/* Bottom Section */}
      <footer className="w-full px-8 pb-16 flex flex-col gap-6">
        <button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={`w-full h-16 rounded-3xl font-semibold uppercase tracking-[0.1em] text-[10px] transition-all duration-500 soft-shadow
            ${isCompleted ? 'bg-myrea-green text-white scale-95' : 'bg-slate-900 text-white active:scale-95'}`}
        >
          {isCompleted ? "Completed" : "Complete Step"}
        </button>
        <button 
          onClick={onClose}
          className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em] hover:text-slate-600 transition-colors"
        >
          Skip
        </button>
      </footer>
    </motion.div>
  );
};
