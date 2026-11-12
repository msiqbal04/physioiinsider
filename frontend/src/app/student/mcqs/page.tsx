"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, CheckCircle2, XCircle, ChevronRight, 
  ChevronLeft, Award, Brain, Bone, Activity, RefreshCcw
} from "lucide-react";

// --- AUTHENTIC MCQ DATA (10 Per Subject) ---
const mcqData = {
  Anatomy: [
    {
      id: "a1",
      question: "Which of the following nerves innervates the latissimus dorsi muscle?",
      options: ["Axillary nerve", "Thoracodorsal nerve", "Dorsal scapular nerve", "Long thoracic nerve"],
      correctAnswer: 1,
      explanation: "The latissimus dorsi is innervated by the thoracodorsal nerve (C6, C7, C8), a branch of the posterior cord of the brachial plexus."
    },
    {
      id: "a2",
      question: "The 'unhappy triad' of the knee involves injury to which structures?",
      options: ["ACL, PCL, Medial Meniscus", "ACL, MCL, Lateral Meniscus", "ACL, MCL, Medial Meniscus", "PCL, LCL, Lateral Meniscus"],
      correctAnswer: 2,
      explanation: "The classic 'unhappy triad' (O'Donoghue's triad) consists of tears to the Anterior Cruciate Ligament (ACL), Medial Collateral Ligament (MCL), and the Medial Meniscus."
    },
    {
      id: "a3",
      question: "Which muscle is NOT part of the rotator cuff?",
      options: ["Supraspinatus", "Infraspinatus", "Teres Major", "Subscapularis"],
      correctAnswer: 2,
      explanation: "The rotator cuff consists of the SITS muscles: Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis. The Teres Major is not part of this group."
    },
    {
      id: "a4",
      question: "The median nerve passes through which structure in the wrist?",
      options: ["Guyon's canal", "Carpal tunnel", "Anatomical snuffbox", "Cubital tunnel"],
      correctAnswer: 1,
      explanation: "The median nerve passes through the carpal tunnel along with nine flexor tendons. Compression here causes Carpal Tunnel Syndrome."
    },
    {
      id: "a5",
      question: "Which carpal bone is most commonly fractured?",
      options: ["Lunate", "Capitate", "Scaphoid", "Trapezium"],
      correctAnswer: 2,
      explanation: "The scaphoid is the most frequently fractured carpal bone, typically resulting from a fall on an outstretched hand (FOOSH), presenting with pain in the anatomical snuffbox."
    },
    {
      id: "a6",
      question: "What is the primary action of the gluteus medius muscle?",
      options: ["Hip flexion", "Hip adduction", "Hip abduction", "Hip extension"],
      correctAnswer: 2,
      explanation: "The primary action of the gluteus medius is hip abduction. It is crucial for stabilizing the pelvis during the stance phase of gait (preventing Trendelenburg sign)."
    },
    {
      id: "a7",
      question: "Which cranial nerve is responsible for the motor innervation of the muscles of facial expression?",
      options: ["Trigeminal (CN V)", "Facial (CN VII)", "Glossopharyngeal (CN IX)", "Vagus (CN X)"],
      correctAnswer: 1,
      explanation: "The Facial nerve (CN VII) provides motor innervation to the muscles of facial expression. Lesions can cause Bell's Palsy."
    },
    {
      id: "a8",
      question: "The anterior cruciate ligament (ACL) attaches to which part of the tibia?",
      options: ["Posterior intercondylar area", "Anterior intercondylar area", "Medial condyle", "Lateral condyle"],
      correctAnswer: 1,
      explanation: "The ACL originates on the lateral femoral condyle and inserts on the anterior intercondylar area of the tibia, preventing anterior tibial translation."
    },
    {
      id: "a9",
      question: "Which nerve is most at risk of injury in a mid-shaft fracture of the humerus?",
      options: ["Ulnar nerve", "Median nerve", "Musculocutaneous nerve", "Radial nerve"],
      correctAnswer: 3,
      explanation: "The radial nerve travels in the radial groove along the posterior mid-shaft of the humerus, making it highly susceptible to injury in mid-shaft fractures (leading to wrist drop)."
    },
    {
      id: "a10",
      question: "The deltoid ligament is located on which side of the ankle?",
      options: ["Medial", "Lateral", "Anterior", "Posterior"],
      correctAnswer: 0,
      explanation: "The deltoid ligament is a strong, fan-shaped ligament complex located on the medial side of the ankle joint, resisting excessive eversion."
    }
  ],
  Biomechanics: [
    {
      id: "b1",
      question: "According to the convex-concave rule, if a convex joint surface moves on a stationary concave surface, the roll and glide occur in:",
      options: ["The same direction", "Opposite directions", "Perpendicular directions", "No glide occurs"],
      correctAnswer: 1,
      explanation: "When a convex surface moves on a concave surface, the roll and glide occur in opposite directions to maintain joint congruency (e.g., glenohumeral joint)."
    },
    {
      id: "b2",
      question: "During normal walking, the maximum amount of knee flexion during the swing phase is approximately:",
      options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
      correctAnswer: 2,
      explanation: "Normal knee flexion reaches its peak of approximately 60 degrees during the initial swing phase to ensure toe clearance."
    },
    {
      id: "b3",
      question: "Which class of lever is most common in the human body?",
      options: ["First-class", "Second-class", "Third-class", "Fourth-class"],
      correctAnswer: 2,
      explanation: "Third-class levers (where the force is between the axis and the resistance) are the most common in the human body, favoring range of motion and speed over force generation (e.g., biceps brachii)."
    },
    {
      id: "b4",
      question: "What term describes the active tension developed by a muscle when it is stretched slightly beyond its resting length?",
      options: ["Active insufficiency", "Passive insufficiency", "Optimal length-tension relationship", "Stretch reflex"],
      correctAnswer: 2,
      explanation: "The optimal length-tension relationship occurs when a muscle is slightly stretched, allowing for the maximum number of actin-myosin cross-bridges to form, generating peak active tension."
    },
    {
      id: "b5",
      question: "During which phase of the gait cycle are the dorsiflexors working eccentrically to prevent 'foot slap'?",
      options: ["Mid-stance", "Initial contact to loading response", "Terminal stance", "Pre-swing"],
      correctAnswer: 1,
      explanation: "From initial contact (heel strike) to loading response (foot flat), the ankle dorsiflexors contract eccentrically to smoothly lower the foot to the ground."
    },
    {
      id: "b6",
      question: "The 'screw-home' mechanism of the knee during terminal extension involves which motion of the tibia relative to the femur (in an open kinematic chain)?",
      options: ["Internal rotation", "External rotation", "Anterior translation", "Posterior translation"],
      correctAnswer: 1,
      explanation: "In an open kinematic chain, the tibia externally rotates roughly 10 degrees on the femur during the last 20 degrees of extension to 'lock' the knee joint."
    },
    {
      id: "b7",
      question: "Which of the following defines 'Center of Mass' (COM)?",
      options: ["The point where all ground reaction forces summate", "The geometric center of an object", "The point around which the mass of a body is equally distributed", "The point of contact between the body and the ground"],
      correctAnswer: 2,
      explanation: "The Center of Mass (or Center of Gravity) is the theoretical point where the entire mass of an object is equally distributed in all directions."
    },
    {
      id: "b8",
      question: "A patient demonstrates a positive Trendelenburg sign on the right stance leg. Which muscle is weak?",
      options: ["Left gluteus medius", "Right gluteus medius", "Right gluteus maximus", "Left quadratus lumborum"],
      correctAnswer: 1,
      explanation: "A positive Trendelenburg sign (pelvic drop on the contralateral, unsupported side) indicates weakness of the hip abductors (primarily gluteus medius) on the stance (ipsilateral) side."
    },
    {
      id: "b9",
      question: "What is the primary function of the patella in knee biomechanics?",
      options: ["Increase the moment arm of the quadriceps", "Decrease the moment arm of the quadriceps", "Protect the cruciate ligaments", "Provide an attachment site for the hamstrings"],
      correctAnswer: 0,
      explanation: "The patella acts as an anatomical pulley, increasing the moment arm (lever arm) of the quadriceps muscle force, thus increasing its mechanical advantage."
    },
    {
      id: "b10",
      question: "In standard anatomical posture, the line of gravity passes:",
      options: ["Anterior to the ankle joint and posterior to the knee joint", "Posterior to the ankle joint and anterior to the knee joint", "Anterior to the ankle joint and anterior to the knee joint", "Posterior to the ankle joint and posterior to the knee joint"],
      correctAnswer: 2,
      explanation: "The line of gravity falls slightly anterior to the lateral malleolus (ankle) and slightly anterior to the axis of the knee joint, creating extension moments."
    }
  ],
  Neurology: [
    {
      id: "n1",
      question: "Which of the following is a classic sign of an Upper Motor Neuron (UMN) lesion?",
      options: ["Flaccid paralysis", "Muscle fasciculations", "Hyperreflexia", "Severe muscle atrophy"],
      correctAnswer: 2,
      explanation: "UMN lesions are characterized by spasticity, hyperreflexia, clonus, and a positive Babinski sign. Flaccidity, fasciculations, and severe atrophy are signs of LMN lesions."
    },
    {
      id: "n2",
      question: "A patient presents with a resting 'pill-rolling' tremor, bradykinesia, and rigidity. What is the most likely diagnosis?",
      options: ["Multiple Sclerosis", "Parkinson's Disease", "Amyotrophic Lateral Sclerosis", "Huntington's Disease"],
      correctAnswer: 1,
      explanation: "This is the classic triad of Parkinson's disease, caused by the degeneration of dopaminergic neurons in the substantia nigra of the basal ganglia."
    },
    {
      id: "n3",
      question: "Damage to Broca's area in the dominant hemisphere typically results in:",
      options: ["Fluent, meaningless speech (Wernicke's aphasia)", "Inability to understand written text", "Non-fluent, expressive aphasia", "Loss of memory consolidation"],
      correctAnswer: 2,
      explanation: "Broca's area (frontal lobe) is responsible for speech production. Damage causes non-fluent, expressive aphasia where comprehension is intact but speech is slow and difficult."
    },
    {
      id: "n4",
      question: "Which spinal tract is primarily responsible for conveying pain and temperature sensation?",
      options: ["Dorsal columns/Medial lemniscus", "Lateral spinothalamic tract", "Corticospinal tract", "Spinocerebellar tract"],
      correctAnswer: 1,
      explanation: "The lateral spinothalamic tract carries pain and temperature information. The dorsal columns carry fine touch, proprioception, and vibration."
    },
    {
      id: "n5",
      question: "A positive Babinski sign in an adult involves:",
      options: ["Plantarflexion of the great toe and fanning of other toes", "Dorsiflexion of the great toe and fanning of other toes", "Absence of any toe movement", "Involuntary knee extension"],
      correctAnswer: 1,
      explanation: "A positive Babinski response (normal in infants, abnormal in adults) is characterized by dorsiflexion (extension) of the great toe and fanning of the lateral toes, indicating a UMN lesion."
    },
    {
      id: "n6",
      question: "Guillain-Barré Syndrome (GBS) primarily affects the:",
      options: ["Central nervous system", "Peripheral nervous system", "Basal ganglia", "Cerebellum"],
      correctAnswer: 1,
      explanation: "GBS is an acute autoimmune polyneuropathy causing demyelination in the Peripheral Nervous System (PNS), typically presenting as ascending flaccid paralysis."
    },
    {
      id: "n7",
      question: "Which of the following describes 'Autonomic Dysreflexia'?",
      options: ["A normal response to exercise in SCI patients", "A sudden drop in blood pressure when standing", "A life-threatening hypertensive crisis in patients with SCI above T6", "Loss of bladder control in lower motor neuron lesions"],
      correctAnswer: 2,
      explanation: "Autonomic dysreflexia is a medical emergency in patients with SCI at or above T6, triggered by noxious stimuli below the lesion, causing severe hypertension and bradycardia."
    },
    {
      id: "n8",
      question: "The Glasgow Coma Scale (GCS) evaluates which three parameters?",
      options: ["Eye opening, Verbal response, Motor response", "Pupil dilation, Breathing rate, Heart rate", "Reflexes, Muscle tone, Sensation", "Speech, Memory, Orientation"],
      correctAnswer: 0,
      explanation: "The GCS assesses a patient's level of consciousness based on Eye opening (1-4), Verbal response (1-5), and Motor response (1-6). Max score is 15."
    },
    {
      id: "n9",
      question: "Which cranial nerve is assessed when testing the pupillary light reflex?",
      options: ["Optic (CN II) and Oculomotor (CN III)", "Olfactory (CN I) and Optic (CN II)", "Oculomotor (CN III) and Trochlear (CN IV)", "Trigeminal (CN V) and Facial (CN VII)"],
      correctAnswer: 0,
      explanation: "The afferent (sensory) limb of the reflex is the Optic nerve (CN II), and the efferent (motor) limb causing constriction is the Oculomotor nerve (CN III)."
    },
    {
      id: "n10",
      question: "What is the typical presentation of a Middle Cerebral Artery (MCA) stroke?",
      options: ["Contralateral leg weakness > arm weakness", "Contralateral arm and face weakness > leg weakness", "Ipsilateral ataxia and nystagmus", "Bilateral loss of pain and temperature"],
      correctAnswer: 1,
      explanation: "MCA strokes typically affect the lateral aspect of the cerebral hemisphere, causing contralateral hemiparesis and sensory loss affecting the face and upper extremity more than the lower extremity."
    }
  ]
};

export default function MCQBankPage() {
  const [activeSubject, setActiveSubject] = useState<"Anatomy" | "Biomechanics" | "Neurology">("Anatomy");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestions = mcqData[activeSubject];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleSubjectChange = (subject: "Anatomy" | "Biomechanics" | "Neurology") => {
    setActiveSubject(subject);
    resetQuiz();
  };

  const handleOptionSelect = (index: number) => {
    if (!isAnswerRevealed) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null && !isAnswerRevealed) {
      setIsAnswerRevealed(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* 1. HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center space-x-2 mb-2">
            <Link href="/student/dashboard" className="hover:text-blue-800 transition-colors">Dashboard</Link>
            <span>/</span>
            <span>Study Aids</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900">Clinical MCQ Bank</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Test your knowledge with high-yield clinical multiple-choice questions designed for physiotherapy students.
          </p>

          {/* Subject Tabs */}
          <div className="mt-8 flex items-center space-x-3 overflow-x-auto scrollbar-none pb-2">
            {(["Anatomy", "Biomechanics", "Neurology"] as const).map((subject) => (
              <button
                key={subject}
                onClick={() => handleSubjectChange(subject)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center space-x-2 ${
                  activeSubject === subject
                    ? "bg-blue-900 border-blue-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"
                }`}
              >
                {subject === "Anatomy" && <Bone size={14} />}
                {subject === "Biomechanics" && <Activity size={14} />}
                {subject === "Neurology" && <Brain size={14} />}
                <span>{subject}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. MAIN MCQ AREA */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {!quizCompleted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            
            {/* Progress Bar & Status */}
            <div className="flex items-center justify-between mb-8">
               <span className="bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Score: <span className="text-teal-600">{score}</span>
              </span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-blue-900 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-8 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                
                // Determine styling based on state
                let optionStyle = "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50";
                let icon = null;

                if (isAnswerRevealed) {
                  if (index === currentQuestion.correctAnswer) {
                    optionStyle = "bg-teal-50 border-teal-500 text-teal-900 shadow-sm";
                    icon = <CheckCircle2 size={18} className="text-teal-600" />;
                  } else if (index === selectedOption) {
                    optionStyle = "bg-red-50 border-red-300 text-red-900 opacity-70";
                    icon = <XCircle size={18} className="text-red-500" />;
                  } else {
                    optionStyle = "bg-white border-slate-200 text-slate-400 opacity-50";
                  }
                } else if (selectedOption === index) {
                  optionStyle = "bg-blue-50 border-blue-400 text-blue-900 ring-1 ring-blue-400";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswerRevealed}
                    className={`w-full text-left px-5 py-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {icon && <span>{icon}</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation Area (Shows only after answer is revealed) */}
            {isAnswerRevealed && (
              <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-800 mb-2">Clinical Explanation</div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end border-t border-slate-100 pt-6">
              {!isAnswerRevealed ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="px-8 py-3 rounded-xl bg-blue-900 text-white text-sm font-bold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition-all shadow-sm flex items-center space-x-2"
                >
                  <span>{currentQuestionIndex < currentQuestions.length - 1 ? "Next Question" : "View Results"}</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

          </div>
        ) : (
          
          // Quiz Completion Screen
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-slate-200 shadow-sm text-center animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600 shadow-inner">
               <Award size={40} />
             </div>
             <h2 className="text-3xl font-bold font-serif text-slate-900 mb-2">
               Quiz Completed!
             </h2>
             <p className="text-slate-500 mb-8">
               You scored <strong className="text-teal-600 text-lg">{score}</strong> out of {currentQuestions.length} in {activeSubject}.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={resetQuiz}
                  className="px-8 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all flex items-center space-x-2"
                >
                  <RefreshCcw size={16} />
                  <span>Retry Quiz</span>
                </button>
                <Link 
                  href="/student/dashboard"
                  className="px-8 py-3 rounded-xl bg-blue-900 text-white text-sm font-bold hover:bg-blue-800 transition-all shadow-sm"
                >
                  Back to Dashboard
                </Link>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}