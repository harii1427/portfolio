import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface QuizQuestion {
  id: number;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options?: Array<{
    id: string;
    text: string;
    image?: string;
  }>;
  min?: number;
  max?: number;
}

const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      text: "What are you looking to improve?",
      type: "single",
      options: [
        { id: "hair", text: "Hair Loss", image: "https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: "weight", text: "Weight Management", image: "https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: "both", text: "Both", image: "https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
      ]
    },
    {
      id: 2,
      text: "What is your gender?",
      type: "single",
      options: [
        { id: "male", text: "Male" },
        { id: "female", text: "Female" },
        { id: "non-binary", text: "Non-binary" },
        { id: "prefer-not", text: "Prefer not to say" }
      ]
    },
    {
      id: 3,
      text: "How long have you been experiencing hair loss?",
      type: "single",
      options: [
        { id: "recent", text: "Recent (< 1 year)" },
        { id: "moderate", text: "Moderate (1-3 years)" },
        { id: "longer", text: "Longer (3+ years)" }
      ]
    },
    {
      id: 4,
      text: "Which areas are you experiencing hair loss?",
      type: "multiple",
      options: [
        { id: "crown", text: "Crown/Top of head" },
        { id: "hairline", text: "Receding hairline" },
        { id: "overall", text: "Overall thinning" },
        { id: "temple", text: "Temple area" },
        { id: "patches", text: "Patchy loss" }
      ]
    },
    {
      id: 5,
      text: "Have you tried any hair loss treatments before?",
      type: "multiple",
      options: [
        { id: "minoxidil", text: "Minoxidil (Rogaine)" },
        { id: "finasteride", text: "Finasteride (Propecia)" },
        { id: "supplements", text: "Supplements" },
        { id: "laser", text: "Laser therapy" },
        { id: "none", text: "None" }
      ]
    },
    {
      id: 6,
      text: "Rate your stress level (1-10)",
      type: "scale",
      min: 1,
      max: 10
    },
    {
      id: 7,
      text: "Do you have any medical conditions?",
      type: "multiple",
      options: [
        { id: "thyroid", text: "Thyroid disorder" },
        { id: "hormone", text: "Hormonal imbalance" },
        { id: "autoimmune", text: "Autoimmune condition" },
        { id: "diabetes", text: "Diabetes" },
        { id: "hypertension", text: "Hypertension" },
        { id: "none", text: "None" }
      ]
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "Personalized Treatment Quiz | Revitalize MD";
  }, []);

  const handleSingleSelect = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleMultipleSelect = (questionId: number, answerId: string) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || [];
      
      // If answerId is "none", clear other selections
      if (answerId === "none") {
        return {
          ...prev,
          [questionId]: ["none"]
        };
      }
      
      // If another answer is selected and "none" is already selected, remove "none"
      if (currentSelections.includes("none")) {
        return {
          ...prev,
          [questionId]: [answerId]
        };
      }
      
      // Toggle selection
      if (currentSelections.includes(answerId)) {
        return {
          ...prev,
          [questionId]: currentSelections.filter((id: string) => id !== answerId)
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentSelections, answerId]
        };
      }
    });
  };

  const handleScaleSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      setQuizComplete(true);
    }, 1500);
  };

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined && 
    (currentQuestion.type !== 'multiple' || 
    (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length > 0));

  // Check if we should show hair-related questions
  if (currentStep > 1 && currentQuestion.id > 2 && answers[1] === 'weight') {
    nextStep(); // Skip hair-related questions for weight loss focus
    return null;
  }

  return (
    <div className="min-h-screen pt-24 bg-charcoal-50">
      <div className="container-custom py-12">
        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Progress bar */}
              <div className="w-full bg-charcoal-100 h-2">
                <div 
                  className="bg-midnight-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-charcoal-800 mb-4">
                    Personalized Treatment Quiz
                  </h1>
                  <p className="text-charcoal-600">
                    Tell us about yourself to get a customized treatment plan.
                  </p>
                </div>

                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-medium text-charcoal-800 mb-6">
                    {currentQuestion.text}
                  </h2>

                  {/* Single select options with images */}
                  {currentQuestion.type === 'single' && currentQuestion.options && currentQuestion.options[0].image && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {currentQuestion.options.map(option => (
                        <div 
                          key={option.id}
                          className={`border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                            answers[currentQuestion.id] === option.id 
                              ? 'border-midnight-600 ring-2 ring-midnight-600/20' 
                              : 'border-charcoal-200'
                          }`}
                          onClick={() => handleSingleSelect(currentQuestion.id, option.id)}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={option.image} 
                              alt={option.text} 
                              className="w-full h-full object-cover"
                            />
                            {answers[currentQuestion.id] === option.id && (
                              <div className="absolute top-2 right-2 bg-midnight-600 text-white p-1 rounded-full">
                                <Check size={16} />
                              </div>
                            )}
                          </div>
                          <div className="p-4 text-center">
                            <span className="font-medium">{option.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Single select options without images */}
                  {currentQuestion.type === 'single' && currentQuestion.options && !currentQuestion.options[0].image && (
                    <div className="space-y-3 mb-8">
                      {currentQuestion.options.map(option => (
                        <div 
                          key={option.id}
                          className={`border p-4 rounded-lg cursor-pointer flex items-center transition-all ${
                            answers[currentQuestion.id] === option.id 
                              ? 'border-midnight-600 bg-midnight-50' 
                              : 'border-charcoal-200 hover:bg-charcoal-50'
                          }`}
                          onClick={() => handleSingleSelect(currentQuestion.id, option.id)}
                        >
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                            answers[currentQuestion.id] === option.id 
                              ? 'border-midnight-600 bg-midnight-600' 
                              : 'border-charcoal-400'
                          }`}>
                            {answers[currentQuestion.id] === option.id && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Multiple select options */}
                  {currentQuestion.type === 'multiple' && currentQuestion.options && (
                    <div className="space-y-3 mb-8">
                      {currentQuestion.options.map(option => {
                        const isSelected = answers[currentQuestion.id]?.includes(option.id);
                        return (
                          <div 
                            key={option.id}
                            className={`border p-4 rounded-lg cursor-pointer flex items-center transition-all ${
                              isSelected 
                                ? 'border-midnight-600 bg-midnight-50' 
                                : 'border-charcoal-200 hover:bg-charcoal-50'
                            }`}
                            onClick={() => handleMultipleSelect(currentQuestion.id, option.id)}
                          >
                            <div className={`w-5 h-5 rounded flex-shrink-0 mr-3 flex items-center justify-center border ${
                              isSelected 
                                ? 'border-midnight-600 bg-midnight-600' 
                                : 'border-charcoal-400'
                            }`}>
                              {isSelected && (
                                <Check size={12} className="text-white" />
                              )}
                            </div>
                            <span>{option.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Scale selection */}
                  {currentQuestion.type === 'scale' && currentQuestion.min !== undefined && currentQuestion.max !== undefined && (
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-charcoal-500">Low</span>
                        <span className="text-sm text-charcoal-500">High</span>
                      </div>
                      <div className="flex justify-between space-x-2">
                        {Array.from({ length: currentQuestion.max - currentQuestion.min + 1 }, (_, i) => i + currentQuestion.min!).map(value => (
                          <button
                            key={value}
                            className={`flex-1 py-3 rounded-lg transition-all ${
                              answers[currentQuestion.id] === value 
                                ? 'bg-midnight-600 text-white' 
                                : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                            }`}
                            onClick={() => handleScaleSelect(currentQuestion.id, value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      className="px-4 py-2 rounded-lg border border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50 flex items-center"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft size={20} className="mr-1" />
                      Back
                    </button>
                    <button
                      className={`px-6 py-2 rounded-lg flex items-center ${
                        isAnswered 
                          ? 'bg-midnight-600 text-white hover:bg-midnight-700' 
                          : 'bg-charcoal-300 text-charcoal-100 cursor-not-allowed'
                      }`}
                      onClick={nextStep}
                      disabled={!isAnswered || loading}
                    >
                      {loading ? (
                        <span className="animate-pulse">Processing...</span>
                      ) : (
                        <>
                          {isLastQuestion ? 'Complete' : 'Next'}
                          <ChevronRight size={20} className="ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={48} className="text-mint-600" />
              </div>
              <h2 className="text-3xl font-playfair font-semibold text-charcoal-800 mb-4">
                Your Treatment Plan is Ready!
              </h2>
              <p className="text-charcoal-600 mb-6 max-w-lg mx-auto">
                Based on your responses, our medical team will review your profile and prepare a personalized treatment plan tailored to your specific needs.
              </p>
              <div className="bg-charcoal-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
                <h3 className="font-semibold text-xl mb-3">What happens next?</h3>
                <ol className="text-left space-y-3 text-charcoal-700">
                  <li className="flex items-start">
                    <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">1</span>
                    <span>Our medical team reviews your responses (within 24 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">2</span>
                    <span>We'll email you with your personalized treatment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">3</span>
                    <span>Select your preferred plan and complete your order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-midnight-100 text-midnight-700 w-6 h-6 rounded-full flex items-center justify-center font-medium mr-3 flex-shrink-0">4</span>
                    <span>Receive your treatment kit with ongoing medical support</span>
                  </li>
                </ol>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/products" className="btn btn-primary">
                  Browse Treatments
                </a>
                <a href="/" className="btn btn-secondary">
                  Return to Home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;