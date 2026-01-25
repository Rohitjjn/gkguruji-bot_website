import React, { useState, useEffect } from 'react';
import { motion as fMotion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Brain, BookOpen, TrendingUp, 
  Download, Award, Target, Send, 
  ChevronDown, Star, Zap, Crown,
  Home, Layers, CreditCard, Sparkles, Trophy,
  Timer, Play, ArrowRight, RefreshCcw
} from 'lucide-react';
import { CONTENT, LOGO_URL, TELEGRAM_LINK, SUPPORT_EMAIL } from './constants';
import { Feature } from './types';
import { QUIZ_DATA } from './quizData';

const motion = fMotion as any;

const IconMap = ({ name, className }: { name: string; className?: string }) => {
  const icons: any = { Brain, BookOpen, TrendingUp, Download, Award, Target };
  const Icon = icons[name] || Star;
  return <Icon className={className} />;
};

const Logo = ({ className, large = false }: { className?: string, large?: boolean }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div className={`relative flex items-center justify-center bg-midnight-950 border border-gold-500/50 rounded-full shadow-glow-gold overflow-hidden ${className}`} style={{ aspectRatio: '1/1' }}>
        <div className="absolute inset-0 bg-gold-400/10"></div>
        <span className={`${large ? "text-3xl" : "text-base"} font-serif font-bold text-gold-400 z-10 tracking-tighter`}>GK</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden rounded-full`}>
      {loading && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}
      <img 
        src={LOGO_URL} 
        alt="GK Guruji" 
        className={`${className} object-contain transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-1'}`}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const QuizOverlay = ({ onClose }: { onClose: () => void }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<'question' | 'feedback' | 'finished'>('question');
  const [timer, setTimer] = useState(10);
  const [transitionTimer, setTransitionTimer] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [shuffledQuestions] = useState(() => {
    return [...QUIZ_DATA].sort(() => Math.random() - 0.5);
  });
  const currentQ = shuffledQuestions[qIndex];
  const totalQ = shuffledQuestions.length;

  useEffect(() => {
    let interval: any;
    if (quizState === 'question') {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState]);

  useEffect(() => {
    let interval: any;
    if (quizState === 'feedback') {
      interval = setInterval(() => {
        setTransitionTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState]);

  const handleTimeUp = () => {
    setQuizState('feedback');
    setSelectedOption(null);
  };

  const handleOptionClick = (option: string) => {
    if (quizState !== 'question') return;
    setSelectedOption(option);
    if (option === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setQuizState('feedback');
  };

  const handleNextQuestion = () => {
    if (qIndex < totalQ - 1) {
      setQIndex(prev => prev + 1);
      setTimer(10);
      setTransitionTimer(3);
      setQuizState('question');
      setSelectedOption(null);
    } else {
      setQuizState('finished');
    }
  };

  if (quizState === 'finished') {
    return (
      <div className="fixed inset-0 z-[100] bg-midnight-950 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="max-w-md w-full bg-white/5  border border-gold-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 to-gold-600"></div>
          <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-gold">
            <Trophy size={40} className="text-midnight-950" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-slate-400 mb-8">You have completed the challenge.</p>
          <div className="bg-midnight-900 rounded-2xl p-6 mb-8 border border-white/10">
            <p className="text-sm text-slate-400 uppercase tracking-widest mb-2">Your Score</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gold-gradient">{score}/{totalQ}</p>
          </div>
          <div className="space-y-3">
             <a href={TELEGRAM_LINK} className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-midnight-950 py-4 rounded-xl font-bold transition-all shadow-glow-gold">
               <Send size={18} /> Join Bot
             </a>
             <button onClick={onClose} className="w-full py-4 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-midnight-950 flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-midnight-900/50 ">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/50">
               <span className="text-xs font-bold text-gold-400">{qIndex + 1}/{totalQ}</span>
            </div>
         </div>
         <div className={`text-xl font-mono font-bold ${timer <= 3 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            00:{timer < 10 ? `0${timer}` : timer}
         </div>
         <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition">
            <X size={20} />
         </button>
      </div>
      <div className="w-full h-1 bg-white/5">
        <motion.div className="h-full bg-gold-500" initial={{ width: `${((qIndex)/totalQ)*100}%` }} animate={{ width: `${((qIndex + 1)/totalQ)*100}%` }} transition={{ duration: 0.5 }} />
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-20">
         <div className="max-w-2xl mx-auto mt-4 md:mt-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
               <Award size={12} className="text-blue-400" />
               <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{currentQ.examInfo}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">{currentQ.question}</h3>
            <div className="space-y-3">
               {currentQ.options.map((opt, idx) => {
                 let stateClass = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10";
                 if (quizState === 'feedback') {
                   if (opt === currentQ.correctAnswer) stateClass = "bg-green-500/20 border-green-500 text-green-300";
                   else if (opt === selectedOption) stateClass = "bg-red-500/20 border-red-500 text-red-300";
                   else stateClass = "bg-white/5 border-white/5 text-slate-500 opacity-50";
                 }
                 return (
                   <button key={idx} disabled={quizState === 'feedback'} onClick={() => handleOptionClick(opt)} className={`w-full p-4 rounded-xl border text-left font-medium transition-all duration-200 flex justify-between items-center ${stateClass}`}>
                     <span>{opt}</span>
                     {quizState === 'feedback' && opt === currentQ.correctAnswer && <Check size={18} className="text-green-400" />}
                     {quizState === 'feedback' && opt === selectedOption && opt !== currentQ.correctAnswer && <X size={18} className="text-red-400" />}
                   </button>
                 );
               })}
            </div>
            <AnimatePresence>
               {quizState === 'feedback' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
                    <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">Explanation (Next in {transitionTimer}s)</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [motionReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  const t = CONTENT;

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - lastScroll) > 20) {
        setScrolled(current > 20);
        lastScroll = current;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <AnimatePresence>{isQuizActive && <QuizOverlay onClose={() => setIsQuizActive(false)} />}</AnimatePresence>
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight-950/80 ">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-2xl font-bold text-midnight-950 font-serif leading-none mb-1">
                    {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Effective Date: Jan 2026</p>
                </div>
                <button onClick={() => setLegalModal(null)} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition shadow-sm"><X size={20} /></button>
              </div>
              
              <div className="p-8 md:p-10 text-slate-600 text-sm leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar">
                {legalModal === 'privacy' ? (
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">1. Data We Collect</h4>
                      <p>GK Guruji operates primarily through Telegram. We collect minimal information including your Telegram User ID, first name, and username. This is necessary to create your profile and track your quiz progress.</p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">2. How We Use Your Data</h4>
                      <p>Your data is used exclusively to:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li>Generate real-time leaderboards and rankings.</li>
                          <li>Track your score history and performance analytics.</li>
                          <li>Deliver personalized study materials based on your progress.</li>
                        </ul>
                      </p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">3. Data Security</h4>
                      <p>We do not store passwords or financial information. All payments are processed through secure third-party gateways. Your personal identity remains anonymous to other users unless you choose to display your full name on the leaderboard.</p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">4. Third-Party Sharing</h4>
                      <p>GK Guruji does not sell, trade, or rent user data to third parties. We only share data with service providers necessary for bot operation (e.g., cloud hosting and payment processors).</p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">1. Acceptance of Terms</h4>
                      <p>By accessing the GK Guruji website or Telegram bot, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.</p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">2. Intellectual Property</h4>
                      <p>All questions, explanations, graphics, and logos are the property of GK Guruji. Unauthorized reproduction, distribution, or commercial use of our proprietary content is strictly prohibited and may lead to account termination and legal action.</p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">3. Subscription & Refunds</h4>
                      <p>Premium plans provide instant access to digital content. Due to the nature of digital goods, all payments are non-refundable. Users can cancel their auto-renewal at any time through the bot settings.</p>
                    </section>
                    <section>
                      <h4 className="text-midnight-950 font-bold text-base mb-2">4. Disclaimer</h4>
                      <p>GK Guruji is an independent educational platform. We are NOT affiliated with RPSC, RSMSSB, or any other government recruitment board. While we strive for 100% accuracy, we do not guarantee exam results.</p>
                    </section>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button onClick={() => setLegalModal(null)} className="px-10 py-3 bg-midnight-950 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition">Got it</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Logo className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-2xl font-serif font-bold text-midnight-950 tracking-tight">GK <span className="text-gold-600">Guruji</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {['features', 'steps', 'pricing'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className={`text-xs font-bold uppercase tracking-[0.15em] hover:text-gold-600 transition-colors ${activeSection === item ? 'text-gold-600' : 'text-slate-500'}`}>{item}</button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a href={TELEGRAM_LINK} className="group relative bg-midnight-950 text-white px-7 py-3 rounded-full font-bold shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2 text-sm z-10 group-hover:text-midnight-950 transition-colors">{t.nav.cta} <Send size={14} /></span>
            </a>
          </div>
        </div>
      </header>

      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <div className="bg-midnight-950/90  rounded-2xl shadow-2xl p-2 flex justify-between items-center border border-white/10">
          {[{ id: 'hero', icon: Home, label: 'Home' }, { id: 'features', icon: Layers, label: 'Features' }, { id: 'pricing', icon: CreditCard, label: 'Plans' }].map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${activeSection === item.id ? 'text-gold-400 bg-white/10' : 'text-slate-400'}`}>
              <item.icon size={20} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          ))}
          <a href={TELEGRAM_LINK} className="flex-1 flex flex-col items-center py-2 text-gold-500">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-midnight-950 shadow-glow-gold -mt-6 border-4 border-midnight-900"><Send size={18} fill="currentColor" /></div>
            <span className="text-[10px] font-bold mt-1">Start</span>
          </a>
        </div>
      </div>

      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-midnight-950 text-white">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={false} animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8">
                <Sparkles size={14} className="text-gold-400" />
                <span className="text-xs font-bold text-gold-200 tracking-wider uppercase">{t.hero.badge}</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6">Unlock Your <br/><span className="text-transparent bg-clip-text bg-gold-gradient">Dream Job.</span></motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-slate-300 mb-10 max-w-lg font-light">{t.hero.subheadline}</motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                 <button onClick={() => setIsQuizActive(true)} className="w-full sm:w-auto group relative bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl overflow-hidden">
                  <span className="relative flex items-center justify-center gap-3"><Play size={24} fill="currentColor" /> Practice 50 GK questions</span>
                </button>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <a href={TELEGRAM_LINK} className="bg-gold-500 text-midnight-950 px-8 py-4 rounded-xl font-bold text-lg shadow-glow-gold flex items-center justify-center gap-3 transition-transform hover:-translate-y-1">{t.hero.ctaPrimary} <Zap size={20} fill="currentColor" /></a>
                  <button onClick={() => scrollToSection('pricing')} className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors hover:bg-white/10">View Plans</button>
                </div>
              </motion.div>
            </motion.div>
            <div className="relative hidden lg:block perspective-1000 animate-float">
               <div className="relative w-full max-w-sm mx-auto aspect-[4/5] bg-white/10  border border-white/20 rounded-[2.5rem] shadow-2xl p-8 flex flex-col justify-between">
                   <div className="flex justify-between items-center"><Logo className="w-12 h-12" /><div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Live Quiz</div></div>
                   <div className="my-auto"><h3 className="text-2xl font-serif font-bold text-white mb-2">Daily Challenge</h3><p className="text-slate-300 text-sm mb-6">Compete with 50k+ students.</p></div>
                   <div className="bg-midnight-900/50 rounded-xl p-4 flex items-center gap-3 border border-white/5"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">GK</div><div><p className="text-xs text-slate-400">Join the elite</p><p className="text-sm font-bold text-white">GK Guruji Premium</p></div></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight-950 mb-4">Why Rankers Choose Us</h2><div className="h-1 w-20 bg-gold-500 mx-auto rounded-full"></div></div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.features.list.map((feature, idx) => (
              <motion.div key={feature.id} initial={false} whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-midnight-900 group-hover:bg-gold-500 group-hover:text-white transition-colors"><IconMap name={feature.iconName} /></div>
                <h3 className="text-xl font-bold text-midnight-950 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12 text-center mb-16"><h2 className="text-3xl md:text-5xl font-serif font-bold text-midnight-950 mb-4">Premium Membership</h2></div>
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {t.pricing.plans.map((plan, idx) => (
              <div key={idx} className={`relative rounded-[2rem] p-8 transition-all border overflow-hidden ${plan.id === 'basic' ? 'bg-gradient-to-br from-purple-50 to-yellow-100 border-yellow-300 text-slate-800' : plan.id === 'pro' ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-2xl scale-105 border-black-400' : 'bg-white border-slate-200 text-slate-800'}`}>
                {plan.recommended && (
                  <div className="absolute top-0 right-0 px-5 py-1.5 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest bg-red text-red-400 shadow-lg">Most Popular</div>
                )}
                {!plan.recommended && plan.badge && (
                  <div className="absolute top-0 right-0 px-5 py-1.5 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg">{plan.badge}</div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${plan.recommended ? 'text-white' : plan.id === 'basic' ? 'text-amber-600' : 'text-slate-400'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8"><span className="text-5xl font-serif font-bold">{plan.price}</span><span className="text-sm opacity-70">{plan.priceSub}</span></div>
                <ul className="space-y-4 mb-8">{plan.features.map((f, i) => (<li key={i} className={`flex items-start gap-3 text-sm ${plan.recommended ? 'text-white' : ''}`}><Check size={16} className={`${plan.recommended ? 'text-white' : 'text-amber-500'} mt-0.5`} />{f}</li>))}</ul>
                <a href={TELEGRAM_LINK} className={`w-full block py-4 rounded-xl font-bold text-center transition-colors ${plan.recommended ? 'bg-white text-red-600 hover:bg-red-50 shadow-lg' : plan.id === 'basic' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-md' : 'bg-slate-100 text-midnight-950 hover:bg-slate-200'}`}>{plan.buttonText}</a>
              </div>
            ))}
         </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-16">
         <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
            <div><div className="flex items-center gap-2 mb-4"><Logo className="w-8 h-8" /><span className="font-serif font-bold text-midnight-950 text-lg">GK Guruji</span></div><p className="text-slate-400 text-sm">{t.footer.desc}</p></div>
            <div className="flex gap-8 text-sm font-medium text-slate-500"><button onClick={() => setLegalModal('privacy')} className="hover:text-gold-600 transition-colors">Privacy</button><button onClick={() => setLegalModal('terms')} className="hover:text-gold-600 transition-colors">Terms</button><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-gold-600 transition-colors">Support</a></div>
         </div>
      </footer>
    </div>
  );
}

export default App;
