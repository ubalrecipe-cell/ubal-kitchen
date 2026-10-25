import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon, 
  CheckCircle, 
  Volume2, 
  ChefHat
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types/recipe';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { playCookingChime } from '../utils/audio';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  language: Language;
}

export const CookingMode: React.FC<CookingModeProps> = ({
  recipe,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = recipe.steps.length;
  const currentStep = recipe.steps[currentStepIndex];

  // Timer states
  const initialSeconds = currentStep.timerSeconds || (currentStep.durationMinutes ? currentStep.durationMinutes * 60 : 180);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize timer when step changes
  useEffect(() => {
    const secs = currentStep.timerSeconds || (currentStep.durationMinutes ? currentStep.durationMinutes * 60 : 180);
    setTimeLeft(secs);
    setIsTimerRunning(false);
    setTimerFinished(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [currentStepIndex, currentStep]);

  // Tick interval handler
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            setIsTimerRunning(false);
            setTimerFinished(true);
            playCookingChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerFinished(false);
    const secs = currentStep.timerSeconds || (currentStep.durationMinutes ? currentStep.durationMinutes * 60 : 180);
    setTimeLeft(secs);
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playCookingChime();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#162E23] text-[#FAF7F2] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Top Bar with Exit and Progress Indicator */}
      <div className="px-4 sm:px-8 py-4 bg-black/20 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E76F51] flex items-center justify-center shadow-xs">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
              {language === 'hi' ? recipe.nameHi : recipe.nameEn}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <span className="font-medium text-[#E76F51]">
                {t.step} {currentStep.stepNumber} {t.of} {totalSteps}
              </span>
            </div>
          </div>
        </div>

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">{t.exitCookMode}</span>
        </button>
      </div>

      {/* Progress Bar Strip */}
      <div className="w-full bg-white/10 h-1.5">
        <div 
          className="bg-[#E76F51] h-full transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Focus Area: Single Step Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-4xl mx-auto w-full flex flex-col justify-center gap-6">
        {/* Step Badge */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-bold tracking-wide">
          <span>{language === 'hi' ? `चरण ${currentStep.stepNumber}` : `Step ${currentStep.stepNumber}`}</span>
          {currentStep.durationMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>~{currentStep.durationMinutes} {language === 'hi' ? 'मिनट' : 'mins'}</span>
            </>
          )}
        </div>

        {/* Big Instruction Text */}
        <div className="space-y-4">
          <p className="text-xl sm:text-3xl font-medium text-white leading-relaxed tracking-tight">
            {language === 'hi' ? currentStep.instructionHi : currentStep.instructionEn}
          </p>

          {/* Bilingual secondary translation */}
          <p className="text-sm sm:text-base text-stone-400 font-normal leading-relaxed italic">
            {language === 'hi' ? currentStep.instructionEn : currentStep.instructionHi}
          </p>
        </div>

        {/* Step Tip if available */}
        {(currentStep.tipEn || currentStep.tipHi) && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
            <ChefHat className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <span>
              <strong>Tip: </strong>
              {language === 'hi' ? currentStep.tipHi || currentStep.tipEn : currentStep.tipEn || currentStep.tipHi}
            </span>
          </div>
        )}

        {/* Live Working Timer Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
              timerFinished ? 'bg-emerald-500 text-white animate-bounce' : isTimerRunning ? 'bg-[#E76F51] text-white animate-pulse' : 'bg-white/10 text-stone-300'
            }`}>
              <TimerIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-stone-400 block tracking-wider">
                {t.timer}
              </span>
              <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-mono tabular-nums ${
                timerFinished ? 'text-emerald-400' : 'text-white'
              }`}>
                {formattedTime}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                isTimerRunning 
                  ? 'bg-amber-500 hover:bg-amber-600 text-stone-950' 
                  : 'bg-[#E76F51] hover:bg-[#D65F42] text-white'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isTimerRunning ? t.pauseTimer : timeLeft === initialSeconds ? t.startTimer : t.resumeTimer}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={t.resetTimer}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={playCookingChime}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title="Test Sound"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timer Finished Alert */}
        {timerFinished && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{t.timerDone} {language === 'hi' ? 'अगले कदम पर चलें!' : 'Ready for next step!'}</span>
          </div>
        )}
      </div>

      {/* Bottom Floating Navigation Controls */}
      <div className="p-4 sm:p-6 bg-black/30 border-t border-white/10 flex items-center justify-between gap-4 max-w-4xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="px-4 sm:px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.prevStep}</span>
        </button>

        <div className="text-xs text-stone-400 font-medium">
          {currentStepIndex + 1} / {totalSteps}
        </div>

        <button
          onClick={handleNext}
          className={`px-5 sm:px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${
            isLastStep
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-[#E76F51] hover:bg-[#D65F42] text-white'
          }`}
        >
          <span>{isLastStep ? (language === 'hi' ? 'पूरा हुआ! 🎉' : 'Finish Cooking! 🎉') : t.nextStep}</span>
          {!isLastStep && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
