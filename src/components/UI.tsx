import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Sparkles, 
  Leaf, 
  Wand2, 
  User,
  Droplets,
  Zap,
  Moon,
  Wind,
  Flame,
  Activity,
  ShoppingBag,
  RefreshCw,
  Clock,
  Camera,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Star,
  Info,
  Package,
  Plus,
  X,
  Send,
  MessageCircle,
  Heart,
  Scissors
} from "lucide-react";

// --- Types ---
export type View = "home" | "routine" | "lab" | "shop" | "profile";

export const GlowingPoint = ({ color, delay = 0 }: { color: string, delay?: number }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
      filter: ["blur(20px)", "blur(40px)", "blur(20px)"]
    }}
    transition={{ duration: 4, repeat: Infinity, delay }}
    className={`absolute w-32 h-32 rounded-full -z-10 ${color}`}
  />
);

export const AtmosphericBackground = () => (
  <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-atmospheric opacity-60">
    <GlowingPoint color="bg-myrea-blue" />
    <GlowingPoint color="bg-myrea-orange" delay={2} />
    <GlowingPoint color="bg-myrea-pink" delay={1} />
    <div className="absolute inset-0 bg-white/20 backdrop-blur-[100px]" />
  </div>
);

export const SectionLabel = ({ children, icon: Icon, className = "" }: { children: React.ReactNode, icon?: any, className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {Icon && <Icon size={14} className="text-slate-400 shrink-0" />}
    <label className="text-slate-400">{children}</label>
  </div>
);

export const BottomNav = ({ active, onChange }: { active: View, onChange: (v: View) => void }) => {
  const tabs: { id: View; icon: string; label: string }[] = [
    { id: "home", icon: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Home.png", label: "Home" },
    { id: "routine", icon: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Routine.png", label: "Routine" },
    { id: "lab", icon: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Lab.png", label: "Lab" },
    { id: "shop", icon: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Shop.png", label: "Shop" },
    { id: "profile", icon: "https://raw.githubusercontent.com/chelseakattoura-boop/Chelsea/main/Profile%20Icon.png", label: "Profile" },
  ];

  return (
    <nav className="relative w-full glass-effect px-6 py-2 pb-5 z-50 flex justify-between items-center border-t border-slate-100/50">
      {tabs.map((tab) => {
        const IsActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center gap-1 relative px-3 py-2 transition-all active:scale-90"
          >
            {IsActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-slate-50 rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.div
              animate={{ 
                scale: IsActive ? 1.15 : 1,
                y: IsActive ? -2 : 0,
                opacity: IsActive ? 1 : 0.4
              }}
              className="relative flex items-center justify-center"
            >
              <div className={`w-6 h-6 flex items-center justify-center transition-all ${tab.id === 'profile' ? 'rounded-md overflow-hidden border ' + (IsActive ? 'border-myrea-orange' : 'border-slate-300') : ''}`}>
                <img 
                  src={tab.icon} 
                  alt={tab.label} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <span className={`text-[8px] font-bold uppercase tracking-[0.15em] transition-colors ${IsActive ? "text-slate-900" : "text-slate-400"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const Card = ({ children, className = "", onClick, variant = "glass" }: { children: React.ReactNode; className?: string; onClick?: () => void, variant?: "glass" | "solid" | "deep" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileTap={onClick ? { scale: 0.98 } : undefined}
    whileHover={onClick ? { y: -2 } : {}}
    onClick={onClick}
    className={`rounded-[32px] p-8 relative overflow-hidden transition-all duration-500 ${
      variant === "glass" ? "bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]" : 
      variant === "solid" ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50" :
      "bg-slate-900 shadow-[0_30px_60px_-12px_rgba(15,23,42,0.3)] text-white"
    } ${className}`}
  >
    {children}
  </motion.div>
);

export const Button = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  disabled = false,
  icon: Icon
}: { 
  children: React.ReactNode, 
  variant?: "primary" | "secondary" | "ghost", 
  onClick?: () => void, 
  className?: string,
  disabled?: boolean,
  icon?: any
}) => {
  const variants = {
    primary: "bg-slate-900 text-white shadow-xl hover:bg-slate-800",
    secondary: "bg-white text-slate-900 soft-shadow hover:bg-slate-50",
    ghost: "bg-slate-50 text-slate-500 hover:bg-slate-100"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{children}</span>
    </motion.button>
  );
};

export const SkinIndicator = ({ label, value, color, icon: Icon }: { label: string, value: number, color: string, icon: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon size={12} className={color} />
          <label>{label}</label>
        </div>
        <span className="text-[10px] font-bold text-slate-900">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );
};

export const IllustratedFace = ({ status = "normal", className = "" }: { status?: string, className?: string }) => (
  <div className={`relative w-48 h-64 ${className}`}>
    {/* Head Shape */}
    <motion.div 
      animate={{ 
        scale: status === "stressed" ? [1, 1.02, 1] : 1,
        rotate: status === "stressed" ? [0, 0.5, -0.5, 0] : 0
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="absolute inset-0 bg-[#FFE0B2] rounded-[100px] overflow-hidden"
    >
      {/* Cheeks / Redness */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-20 left-4 w-12 h-12 bg-myrea-pink rounded-full blur-xl" 
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-20 right-4 w-12 h-12 bg-myrea-pink rounded-full blur-xl" 
      />

      {/* Breakouts (Abstract) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
            className="absolute w-2 h-2 bg-myrea-orange rounded-full"
            style={{ 
              top: `${20 + Math.random() * 60}%`, 
              left: `${20 + Math.random() * 60}%` 
            }}
          />
        ))}
      </div>

      {/* Hydration Glow */}
      <motion.div 
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 left-10 right-10 h-20 bg-myrea-blue/20 rounded-full blur-2xl"
      />
    </motion.div>

    {/* Eyes */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 flex justify-between px-2">
      <div className="w-4 h-4 bg-slate-900 rounded-full" />
      <div className="w-4 h-4 bg-slate-900 rounded-full" />
    </div>

    {/* Mouth */}
    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 rounded-full" />
  </div>
);

export const IllustratedProduct = ({ color = "bg-myrea-blue", shape = "bottle", fill = 100 }: { color?: string, shape?: "bottle" | "jar" | "tube", fill?: number }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      whileHover={{ y: -5, rotate: 2 }}
      className={`relative ${shape === "bottle" ? "w-16 h-28" : shape === "jar" ? "w-20 h-16" : "w-12 h-32"} bg-white rounded-2xl soft-shadow overflow-hidden`}
    >
      {/* Liquid Fill */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${fill}%` }}
        className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-1000`}
      />

      {/* Cap */}
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${shape === "bottle" ? "w-8 h-4" : shape === "jar" ? "w-16 h-4" : "w-12 h-2"} bg-slate-900 rounded-t-lg z-10`} />
      
      {/* Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-white/30 rounded-lg flex flex-col gap-1 p-1 z-10">
        <div className="w-full h-1 bg-slate-900/10 rounded-full" />
        <div className="w-2/3 h-1 bg-slate-900/10 rounded-full" />
      </div>

      {/* Shine */}
      <div className="absolute top-2 left-2 w-2 h-1/2 bg-white/20 rounded-full blur-[1px] z-10" />
    </motion.div>
  </div>
);

export const SkinCoachFloating = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-[90px] left-6 z-[100] flex flex-col items-start gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-56 bg-slate-50/80 backdrop-blur-xl rounded-3xl p-5 text-slate-900 border border-slate-200/50 shadow-xl relative overflow-hidden"
          >
             <div className="relative z-10 space-y-3">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-myrea-blue" />
                 <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">Myrēa Intelligence</span>
               </div>
               <p className="text-[11px] font-medium leading-relaxed italic text-slate-600">"Your current profile suggests focusing on calming botanicals today."</p>
               <button className="text-[9px] font-black text-myrea-blue uppercase tracking-widest mt-1 hover:underline">Open Chat</button>
             </div>
             <button 
               onClick={() => setIsOpen(false)}
               className="absolute top-4 right-4 text-slate-300 hover:text-slate-900 transition-colors"
             >
               <X size={12} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        animate={isOpen ? { scale: 0.95 } : { scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg overflow-hidden ${isOpen ? "bg-slate-100" : "bg-white border border-slate-100"}`}
      >
        <AICoachEntitySmall />
      </motion.button>
    </div>
  );
};

export const AICoachEntitySmall = () => (
   <motion.div 
     className="relative w-4 h-4 flex items-center justify-center"
   >
     <div className="absolute inset-0 bg-myrea-blue rounded-full opacity-20 blur-[2px]" />
     <div className="w-2 h-2 bg-myrea-blue rounded-full relative z-10 shadow-sm" />
   </motion.div>
);

export const VialCard = ({ formula }: { formula: any }) => (
  <Card className="min-w-[140px] p-8 bg-white border-none flex flex-col items-center gap-4">
    <div className="relative w-12 h-20">
       <div className="absolute inset-0 bg-slate-100 rounded-b-2xl rounded-t-lg border border-slate-200" />
       <motion.div 
         initial={{ height: 0 }}
         animate={{ height: "60%" }}
         className={`absolute bottom-0 left-0 right-0 rounded-b-2xl ${formula.base === 'oil' ? 'bg-amber-400' : 'bg-myrea-blue'} opacity-60`}
       />
       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-slate-900/10 rounded-full" />
    </div>
    <div className="text-center">
      <h5 className="text-[10px] font-bold leading-tight truncate w-24">Draft #{formula.id}</h5>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{formula.type}</p>
    </div>
  </Card>
);
export const LiquidContainer = ({ ingredients, isMixing }: { ingredients: string[], isMixing: boolean }) => {
  // Determine color based on ingredients
  const getColor = () => {
    if (ingredients.includes("Rose") && ingredients.includes("Thyme")) return "bg-myrea-purple";
    if (ingredients.includes("Rose")) return "bg-myrea-pink";
    if (ingredients.includes("Thyme")) return "bg-myrea-green";
    if (ingredients.includes("Honey")) return "bg-myrea-yellow";
    if (ingredients.includes("Clay")) return "bg-slate-400";
    return "bg-slate-200";
  };

  return (
    <div className="relative w-48 h-64 flex items-end justify-center">
      {/* The Flask */}
      <div className="absolute inset-0 rounded-b-[48px] rounded-t-3xl overflow-hidden bg-white/50 backdrop-blur-sm soft-shadow">
        {/* Liquid */}
        <motion.div
          animate={{ 
            height: `${Math.min(ingredients.length * 25, 100)}%`,
            backgroundColor: isMixing ? ["#FF8A65", "#4FC3F7", "#81C784", "#BA68C8"] : undefined,
            filter: isMixing ? "hue-rotate(90deg) brightness(1.2)" : "hue-rotate(0deg) brightness(1)"
          }}
          transition={{ 
            height: { duration: 1 },
            backgroundColor: { duration: 0.5, repeat: isMixing ? Infinity : 0 },
            filter: { duration: 0.5, repeat: isMixing ? Infinity : 0 }
          }}
          className={`absolute bottom-0 w-full transition-colors duration-500 ${getColor()}`}
        >
          {/* Surface Tension / Waves */}
          <motion.div 
            animate={{ 
              x: [-100, 0],
              y: isMixing ? [0, -5, 0] : 0
            }}
            transition={{ 
              x: { duration: 2, repeat: Infinity, ease: "linear" },
              y: { duration: 0.5, repeat: Infinity }
            }}
            className="absolute -top-4 w-[200%] h-8 opacity-40"
            style={{ background: 'radial-gradient(circle, white 20%, transparent 20%)', backgroundSize: '40px 40px' }}
          />
        </motion.div>
        
        {/* Bubbles & Particles when mixing */}
        <AnimatePresence>
          {isMixing && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 200, x: Math.random() * 120 + 20, opacity: 0, scale: 0 }}
              animate={{ y: -20, opacity: [0, 1, 0], scale: [0, 1.5, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="absolute w-3 h-3 bg-white/60 rounded-full blur-[1px]"
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Glass Reflection */}
      <div className="absolute top-4 left-6 w-4 h-24 bg-white/20 rounded-full blur-sm pointer-events-none" />
    </div>
  );
};

export const ProductScanner = ({ onScan }: { onScan: (product: any) => void }) => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScan({ name: "Laurel Berry Elixir", score: 92, ingredients: ["Laurel Oil", "Vitamin E", "Rosemary"] });
    }, 2500);
  };

  return (
    <div className="relative w-full aspect-square bg-myrea-yellow/10 rounded-[40px] overflow-hidden flex items-center justify-center group">
      <div className="absolute inset-0 opacity-40">
        <IllustratedProduct color="bg-myrea-orange" />
      </div>
      
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-2 bg-myrea-blue shadow-[0_0_20px_#4FC3F7] z-20"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startScan}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center soft-shadow"
        >
          <Camera className={isScanning ? "animate-pulse text-myrea-blue" : "text-slate-900"} size={32} />
        </motion.button>
        <p className="text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em] bg-white/80 px-4 py-2 rounded-full backdrop-blur-md">
          {isScanning ? "Analyzing Soul..." : "Scan Product"}
        </p>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-slate-900/20 rounded-tl-xl" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-slate-900/20 rounded-tr-xl" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-slate-900/20 rounded-bl-xl" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-slate-900/20 rounded-br-xl" />
    </div>
  );
};

export const SkinScanCompare = () => {
  const [slider, setSlider] = useState(50);

  return (
    <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-[40px] overflow-hidden flex items-center justify-center">
      {/* After State */}
      <div className="absolute inset-0 flex items-center justify-center bg-myrea-green/5">
        <IllustratedFace status="normal" className="scale-110" />
      </div>
      
      {/* Before State (Clipped) */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-myrea-orange/5"
        style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
      >
        <IllustratedFace status="stressed" className="scale-110 grayscale" />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-slate-900/20 z-20"
        style={{ left: `${slider}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center soft-shadow cursor-ew-resize">
          <RefreshCw size={16} className="text-slate-900" />
        </div>
      </div>

      <input 
        type="range" 
        min="0" 
        max="100" 
        value={slider} 
        onChange={(e) => setSlider(parseInt(e.target.value))}
        className="absolute inset-0 opacity-0 z-30 cursor-ew-resize"
      />

      {/* Labels */}
      <div className="absolute bottom-6 left-6 bg-slate-900 text-white text-[8px] font-bold uppercase px-3 py-1.5 rounded-full">Before</div>
      <div className="absolute bottom-6 right-6 bg-myrea-green text-white text-[8px] font-bold uppercase px-3 py-1.5 rounded-full">After 7 Days</div>
    </div>
  );
};

export const StepByStepTutorial = ({ steps }: { steps: { title: string, description: string, icon: any }[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-64 bg-slate-900 rounded-[40px] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.2, opacity: 0, rotate: 10 }}
            className="flex flex-col items-center gap-4 text-white"
          >
            {React.createElement(steps[currentStep].icon, { size: 64, className: "text-myrea-yellow" })}
            <h4 className="text-xl font-bold uppercase tracking-tight">{steps[currentStep].title}</h4>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Dots */}
        <div className="absolute bottom-6 flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full border border-white/40 ${i === currentStep ? "bg-myrea-yellow w-6" : "bg-white/20"} transition-all duration-300`} 
            />
          ))}
        </div>
      </div>

      <div className="px-4 text-center">
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="flex gap-4">
        <button 
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(prev => prev - 1)}
          className="flex-1 py-4 bg-white rounded-2xl font-bold uppercase text-[10px] tracking-widest disabled:opacity-30 soft-shadow"
        >
          Back
        </button>
        <button 
          onClick={() => currentStep < steps.length - 1 ? setCurrentStep(prev => prev + 1) : setCurrentStep(0)}
          className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest soft-shadow"
        >
          {currentStep === steps.length - 1 ? "Start Over" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export const ChatMessage = ({ text, isBot }: { text: string, isBot: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: isBot ? -20 : 20, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2 w-full`}
  >
    <div 
      className={`max-w-[75%] p-[10px_14px] rounded-[18px] font-medium text-[14px] leading-1.5 soft-shadow ${
        isBot 
          ? "bg-[#F3F4F6] text-[#1A1F3C] rounded-tl-none" 
          : "bg-[#1A1F3C] text-white rounded-tr-none"
      }`}
    >
      {text}
    </div>
  </motion.div>
);

export const RefillIndicator = ({ daysLeft }: { daysLeft: number }) => {
  const percentage = Math.max(0, Math.min(100, (daysLeft / 30) * 100));
  const isLow = daysLeft < 7;

  return (
    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-slate-200"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - percentage }}
            className={isLow ? "text-myrea-pink" : "text-myrea-green"}
          />
        </svg>
        <Clock size={12} className="absolute text-slate-400" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.15em]">Refill in</p>
        <p className={`text-xs font-bold ${isLow ? "text-myrea-pink" : "text-slate-900"}`}>
          {daysLeft} Days
        </p>
      </div>
    </div>
  );
};

// --- Surreal Illustrations (Editorial Style) ---

export const AICoachEntity = () => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Minimal Outer Ring */}
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 border border-myrea-blue/20 rounded-full"
    />
    {/* Secondary Pulse */}
    <motion.div
      animate={{ 
        scale: [0.8, 1, 0.8],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-16 h-16 border border-myrea-blue/10 rounded-full"
    />
    {/* Core Geometric Shape */}
    <motion.div 
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center z-10 soft-shadow border border-slate-100"
    >
      <div className="w-3 h-3 bg-myrea-blue rounded-full shadow-inner" />
    </motion.div>
  </div>
);

export const SurrealPlantBody = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    <IllustratedFace status="normal" className="scale-75" />
    {/* Plant Hair */}
    <div className="absolute -top-4 flex gap-1">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          className="w-4 h-16 bg-myrea-green rounded-t-full origin-bottom"
        />
      ))}
    </div>
  </div>
);

export const GlowingDroplet = ({ color = "bg-myrea-blue" }: { color?: string }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6]
    }}
    transition={{ duration: 3, repeat: Infinity }}
    className={`w-8 h-10 ${color} rounded-t-full rounded-b-2xl relative`}
  >
    <div className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full" />
  </motion.div>
);

export const DistillationProcess = () => (
  <div className="relative w-full h-40 flex items-center justify-around bg-myrea-yellow/10 rounded-3xl overflow-hidden">
    <div className="flex flex-col items-center gap-2">
      <Flame className="text-myrea-orange animate-bounce" />
      <div className="w-12 h-16 bg-white rounded-lg relative soft-shadow">
        <div className="absolute bottom-0 w-full bg-myrea-blue/20 h-1/2" />
      </div>
    </div>
    <motion.div 
      animate={{ x: [0, 100], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-1.5 h-1.5 bg-slate-900/20 rounded-full"
    />
    <div className="flex flex-col items-center gap-2">
      <Droplets className="text-myrea-blue" />
      <div className="w-12 h-16 bg-white rounded-lg relative soft-shadow">
        <div className="absolute bottom-0 w-full bg-myrea-blue h-1/4" />
      </div>
    </div>
  </div>
);

export const StreakPlant = ({ streak }: { streak: number }) => {
  const stage = Math.min(Math.floor(streak / 5), 6); // 0 to 6 stages of growth
  
  return (
    <div className="relative w-32 h-32 flex items-end justify-center">
      {/* Pot */}
      <div className="w-16 h-12 bg-slate-900 rounded-b-2xl rounded-t-sm relative z-10">
        <div className="absolute -top-1 left-0 right-0 h-2 bg-slate-800 rounded-full" />
      </div>

      {/* The Plant */}
      <div className="absolute bottom-10 flex flex-col items-center">
        {/* Stem */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: stage * 12 + 10 }}
          className="w-1.5 bg-myrea-green rounded-full origin-bottom relative"
        >
          {/* Leaves */}
          {[...Array(stage)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: i % 2 === 0 ? 45 : -45 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`absolute w-6 h-4 bg-myrea-green rounded-full ${
                i % 2 === 0 ? "-left-6" : "-right-6"
              }`}
              style={{ bottom: i * 10 }}
            />
          ))}

          {/* Flower (Stage 6) */}
          {stage >= 6 && (
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="absolute -top-8 -left-4 w-10 h-10 flex items-center justify-center"
            >
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-4 h-8 bg-myrea-pink rounded-full origin-bottom"
                  style={{ transform: `rotate(${i * 72}deg)` }}
                />
              ))}
              <div className="w-4 h-4 bg-myrea-yellow rounded-full z-10" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Glow effect based on streak */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-0 w-24 h-24 bg-myrea-green/20 rounded-full blur-2xl pointer-events-none"
      />
    </div>
  );
};

export const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -20, x: Math.random() * 400, opacity: 1, rotate: 0 }}
        animate={{ 
          y: 600, 
          opacity: [1, 1, 0],
          rotate: 360,
          x: Math.random() * 400
        }}
        transition={{ 
          duration: 2 + Math.random() * 2, 
          repeat: Infinity,
          delay: Math.random() * 2
        }}
        className={`absolute w-3 h-3 rounded-sm ${["bg-myrea-pink", "bg-myrea-yellow", "bg-myrea-blue", "bg-myrea-green"][Math.floor(Math.random() * 4)]}`}
      />
    ))}
  </div>
);

export const ReflectionModal = ({ onSelect }: { onSelect: (feeling: string) => void }) => {
  const options = ["Refreshed", "Hydrated", "Calm", "No Change"];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-end justify-center p-6"
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        className="bg-white w-full rounded-[40px] p-8 flex flex-col gap-6 soft-shadow"
      >
        <div className="text-center">
          <h2 className="mb-2">How do you feel?</h2>
          <label>Quick Reflection</label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="py-4 bg-slate-50 rounded-[20px] font-semibold uppercase text-[10px] tracking-wider hover:bg-myrea-blue hover:text-white transition-colors active:scale-95 soft-shadow"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const RosemaryGroomingIllustration = () => {
  return (
    <div className="relative w-full aspect-square bg-slate-50 rounded-[48px] overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE0B2" />
            <stop offset="100%" stopColor="#FFCC80" />
          </linearGradient>
          <linearGradient id="rosemaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Character Face (Simplified) */}
        <motion.path
          d="M100,350 Q100,100 250,100 Q350,100 350,350"
          fill="url(#skinGradient)"
          filter="url(#softShadow)"
        />

        {/* Eye Area */}
        <circle cx="220" cy="200" r="40" fill="#FFB74D" opacity="0.3" filter="url(#softShadow)" />
        <circle cx="220" cy="200" r="8" fill="#263238" />

        {/* The Eyebrow (Botanical Transformation) */}
        <motion.g>
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${180 + i * 8},160 Q${185 + i * 8},140 ${190 + i * 8},155`}
              stroke="#2E7D32"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  `M${180 + i * 8},160 Q${185 + i * 8},140 ${190 + i * 8},155`,
                  `M${180 + i * 8},160 Q${185 + i * 8},120 ${195 + i * 8},150`,
                  `M${180 + i * 8},160 Q${185 + i * 8},140 ${190 + i * 8},155`
                ],
                strokeWidth: [2, 3, 2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>

        {/* Elongated Arm & Oversized Hand */}
        <motion.path
          d="M50,400 Q40,250 150,220"
          stroke="url(#skinGradient)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          filter="url(#softShadow)"
        />
        <motion.g
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Hand */}
          <path
            d="M140,220 Q130,180 170,170 Q190,170 180,210"
            fill="url(#skinGradient)"
            filter="url(#softShadow)"
          />
          
          {/* Rosemary Sprig (The Brush) */}
          <motion.g
            animate={{
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M165,200 L190,140" stroke="#558B2F" strokeWidth="4" strokeLinecap="round" />
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d={`M${190 - i * 2},${140 + i * 6} L${205 - i * 2},${135 + i * 6}`}
                stroke="url(#rosemaryGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </motion.g>

          {/* Green Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              r="2"
              fill="#81C784"
              animate={{
                x: [190, 210 + Math.random() * 40],
                y: [140, 120 - Math.random() * 40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-myrea-green/5 to-transparent pointer-events-none" />
    </div>
  );
};
