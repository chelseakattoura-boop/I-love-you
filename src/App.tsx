/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav, View, AtmosphericBackground, SkinCoachFloating } from "./components/UI";
import { HomeView, RoutineView, LabView, ShopView, ProfileView } from "./components/Views";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<View>("home");

  // Splash timeout
  useState(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  });

  const [lifestyle, setLifestyle] = useState({
    water: 4,
    sleep: "good",
    stress: "low",
    hormonal: "normal",
    diet: [] as string[],
    sun: "low",
    screen: 4,
    activity: "none",
    environment: "dry",
    consistency: "completed",
    mood: "happy",
    extraHydration: "none",
    breakouts: [] as string[],
    experimentation: "none",
    dailyNote: ""
  });

  const [skinGoals, setSkinGoals] = useState<string[]>(["Hydration"]);
  const [dailyGoal, setDailyGoal] = useState<string>("Achieve deep hydration");
  const [streak, setStreak] = useState(7);
  const [rewardProgress, setRewardProgress] = useState(18);
  const [completionHistory, setCompletionHistory] = useState<string[]>(() => {
    // Generate some mock history for the last 14 days
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      if (Math.random() > 0.3) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  });

  const [skinStatus, setSkinStatus] = useState({
    hydration: 70,
    redness: 10,
    irritation: 5,
    breakouts: 5,
    lastUpdated: "Yesterday"
  });

  const [savedFormulas, setSavedFormulas] = useState<any[]>([]);
  const [unlockedPlants, setUnlockedPlants] = useState<string[]>(["olive", "rose", "thyme"]);
  const [isCoachVisible, setIsCoachVisible] = useState(false);

  const [routineSteps, setRoutineSteps] = useState([
    { 
      id: "cleanser",
      title: "Cleanser", 
      product: "Gentle Thyme Wash", 
      frequency: "Daily",
      purpose: "Removes impurities and excess oil without stripping the skin.",
      instructions: "Massage onto damp skin for 60 seconds, then rinse with lukewarm water.",
      tips: "Use the '60-second rule' to allow active ingredients to actually work.",
      color: "bg-myrea-blue",
      shape: "bottle" as const
    },
    { 
      id: "toner",
      title: "Toner", 
      product: "Rose Water Mist", 
      frequency: "Daily",
      purpose: "Balances pH levels and provides immediate hydration.",
      instructions: "Spray directly onto face or apply with a reusable cotton pad.",
      tips: "Apply while skin is still damp to lock in maximum moisture.",
      color: "bg-myrea-pink",
      shape: "bottle" as const
    },
    { 
      id: "serum",
      title: "Serum", 
      product: "Thyme Infused Serum", 
      frequency: "Daily",
      purpose: "Concentrated treatment for specific skin concerns like breakouts.",
      instructions: "Apply 2-3 drops to fingertips and gently press into the skin.",
      tips: "Wait 30 seconds for the serum to absorb before moving to moisturizer.",
      color: "bg-myrea-green",
      shape: "bottle" as const
    },
    { 
      id: "mask",
      title: "Mask / Treatment", 
      product: "Botanical Clay Mask", 
      frequency: "2x Weekly",
      purpose: "Deeply cleanses and infuses the skin with antioxidants.",
      instructions: "Apply evenly, wait 10 minutes, and rinse.",
      tips: "Use this time to practice deep conscious breathing.",
      color: "bg-myrea-green",
      shape: "jar" as const
    },
    { 
      id: "moisturizer",
      title: "Moisturizer", 
      product: "Olive Squalane Cream", 
      frequency: "Daily",
      purpose: "Seals in hydration and strengthens the skin barrier.",
      instructions: "Apply a pea-sized amount in upward circular motions.",
      tips: "Don't forget your neck! It needs hydration just as much as your face.",
      color: "bg-myrea-yellow",
      shape: "jar" as const
    },
    { 
      id: "spf",
      title: "UV Protection", 
      product: "Solar Shield SPF 50", 
      frequency: "Daily",
      purpose: "Protects against UV damage and premature aging.",
      instructions: "Apply generously as the final step of your morning routine.",
      tips: "Reapply every 2 hours if you're spending time outdoors.",
      color: "bg-myrea-orange",
      shape: "tube" as const
    }
  ]);

  const addStepToRoutine = (product: any) => {
    const categoryMap: Record<string, string> = {
      "cleansers": "cleanser",
      "soaps": "cleanser",
      "serums": "serum",
      "oils": "serum",
      "moisturizers": "moisturizer",
      "masks": "mask"
    };

    const stepId = categoryMap[product.category];
    if (stepId) {
      setRoutineSteps(prev => prev.map(step => 
        step.id === stepId 
          ? { ...step, product: product.name, color: product.color }
          : step
      ));
      setCurrentView("routine");
    }
  };

  // Mock historical data for the dashboard
  const [history] = useState([
    { day: "Mon", hydration: 65, redness: 15, irritation: 10, water: 3, stress: 8, sleep: 6 },
    { day: "Tue", hydration: 68, redness: 12, irritation: 8, water: 5, stress: 7, sleep: 7 },
    { day: "Wed", hydration: 72, redness: 10, irritation: 6, water: 6, stress: 5, sleep: 8 },
    { day: "Thu", hydration: 70, redness: 14, irritation: 9, water: 4, stress: 9, sleep: 5 },
    { day: "Fri", hydration: 75, redness: 8, irritation: 5, water: 7, stress: 4, sleep: 8 },
    { day: "Sat", hydration: 80, redness: 5, irritation: 3, water: 8, stress: 2, sleep: 9 },
    { day: "Sun", hydration: 78, redness: 7, irritation: 4, water: 7, stress: 3, sleep: 8 },
  ]);

  const renderView = () => {
    switch (currentView) {
      case "home": return (
        <HomeView 
          lifestyle={lifestyle} 
          setLifestyle={setLifestyle}
          skinStatus={skinStatus} 
          setSkinStatus={setSkinStatus} 
          setCurrentView={setCurrentView} 
          history={history}
          rewardProgress={rewardProgress}
          savedFormulas={savedFormulas}
          skinGoals={skinGoals}
          setSkinGoals={setSkinGoals}
        />
      );
      case "routine": return (
        <RoutineView 
          skinStatus={skinStatus} 
          lifestyle={lifestyle} 
          setLifestyle={setLifestyle} 
          routineSteps={routineSteps}
          streak={streak}
          setStreak={setStreak}
          rewardProgress={rewardProgress}
          setRewardProgress={setRewardProgress}
          completionHistory={completionHistory}
          setCompletionHistory={setCompletionHistory}
          dailyGoal={dailyGoal}
          setDailyGoal={setDailyGoal}
        />
      );
      case "lab": return (
        <LabView 
          skinStatus={skinStatus} 
          lifestyle={lifestyle}
          skinGoals={skinGoals} 
          onSaveFormula={(formula) => setSavedFormulas(prev => [formula, ...prev])}
          unlockedPlants={unlockedPlants}
        />
      );
      case "shop": return (
        <ShopView 
          skinStatus={skinStatus} 
          addStepToRoutine={addStepToRoutine}
          setCurrentView={setCurrentView}
          savedFormulas={savedFormulas}
        />
      );
      case "profile": return <ProfileView />;
      default: return (
        <HomeView 
          lifestyle={lifestyle} 
          setLifestyle={setLifestyle}
          skinStatus={skinStatus} 
          setSkinStatus={setSkinStatus} 
          setCurrentView={setCurrentView} 
          history={history}
          rewardProgress={rewardProgress}
          savedFormulas={savedFormulas}
          skinGoals={skinGoals}
          setSkinGoals={setSkinGoals}
        />
      );
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex justify-center items-start transition-all duration-1000 ${lifestyle.sleep === "good" ? "ease-in-out" : "ease-linear"}`}>
      {/* Mobile Device Container */}
      <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-hidden shadow-2xl border-x border-slate-100 flex flex-col">
        <AnimatePresence>
          {showSplash && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-myrea-blue/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <img 
                  src="https://raw.githubusercontent.com/chelseakattoura-boop/I-love-you/main/Myrea%20Logo%20FInal.png" 
                  alt="Myrēa Logo" 
                  className="w-48 h-auto relative z-10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Indigenous Wisdom</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 h-1 bg-myrea-orange rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden no-scrollbar">
          <AtmosphericBackground />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                skewX: lifestyle.stress === "high" ? [0, 0.5, -0.5, 0] : 0
              }}
              exit={{ opacity: 0, y: -8, scale: 1.01 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                skewX: { duration: 0.2, repeat: Infinity }
              }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav active={currentView} onChange={setCurrentView} />

        {currentView !== "home" && (
          <SkinCoachFloating />
        )}
        
        {/* Background Decorative Elements (Scoped to Mobile Container) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Water Fluid Level */}
          <motion.div 
            animate={{ 
              height: `${(lifestyle.water / 8) * 100}%`,
              backgroundColor: lifestyle.water > 6 ? "rgba(79, 195, 247, 0.1)" : "rgba(79, 195, 247, 0.05)"
            }}
            className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
          />

          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -30, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl" 
          />
        </div>
      </div>
    </div>
  );
}
