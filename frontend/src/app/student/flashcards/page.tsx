"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Brain, Bone, Activity, Sparkles, 
  RotateCcw, CheckCircle2, ChevronRight,
  ChevronLeft, XCircle, RefreshCcw, Lightbulb, Shuffle
} from "lucide-react";

// --- AUTHENTIC FLASHCARD DATA (10 Per Subject) ---
const flashcardData: Record<string, any[]> = {
  "Anatomy Decks": [
    { id: "A1", category: "CLINICAL ANATOMY", title: "Brachial Plexus", question: "Which nerve roots combine to form the Brachial Plexus, and what is its primary clinical function?", hint: "Count the cervical and thoracic roots.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600", definition: "A somatic nerve plexus formed by the anterior rami of C5-T1 spinal nerves.", details: ["Supplies motor and sensory innervation to the entire upper limb.", "Clinical: Erb's Palsy (C5-C6 lesion) causes 'waiter's tip' deformity."] },
    { id: "A2", category: "ORTHOPAEDIC ANATOMY", title: "Anterior Cruciate Ligament (ACL)", question: "What is the primary anatomical restraint provided by the ACL in the knee joint?", hint: "Think about the translation of the tibia.", image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600", definition: "The ACL prevents anterior translation of the tibia on the femur.", details: ["Originates from lateral femoral condyle.", "Most commonly injured via non-contact rotational forces."] },
    { id: "A3", category: "CLINICAL ANATOMY", title: "Rotator Cuff Muscles", question: "Name the four muscles comprising the rotator cuff and their common insertion point.", hint: "Remember the acronym SITS.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600", definition: "Supraspinatus, Infraspinatus, Teres minor, and Subscapularis.", details: ["Stabilize the glenohumeral joint dynamically.", "Supraspinatus is the most frequently torn tendon."] },
    { id: "A4", category: "NEUROANATOMY", title: "Femoral Nerve", question: "What are the root values of the Femoral Nerve and which muscle compartment does it supply?", hint: "L2 to L4.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", definition: "Arises from L2-L4 nerve roots, innervating the anterior compartment of the thigh.", details: ["Motor to Quadriceps femoris.", "Sensory to anterior thigh and medial leg (via saphenous nerve)."] },
    { id: "A5", category: "NEUROANATOMY", title: "Circle of Willis", question: "Which major arteries join to form this crucial circulatory anastomosis at the base of the brain?", hint: "Internal carotid and...", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600", definition: "An anastomotic ring formed by the Internal Carotid and Vertebrobasilar systems.", details: ["Provides collateral blood flow to the brain.", "Common site for berry aneurysms."] },
    { id: "A6", category: "CLINICAL ANATOMY", title: "Menisci of the Knee", question: "How does the medial meniscus structurally differ from the lateral meniscus?", hint: "Shapes: C vs O.", image: "https://images.unsplash.com/photo-1576091160550-2173ff3a523e?auto=format&fit=crop&q=80&w=600", definition: "Medial is larger and C-shaped; Lateral is smaller and more O-shaped.", details: ["Medial is firmly attached to the MCL, making it more prone to injury.", "Avascular inner 2/3 limits healing capacity."] },
    { id: "A7", category: "NEUROANATOMY", title: "Sciatic Nerve", question: "What is the anatomical path and terminal bifurcation of the longest nerve in the human body?", hint: "Splits near the popliteal fossa.", image: "https://images.unsplash.com/photo-1505506874779-3b4b0e50a9bb?auto=format&fit=crop&q=80&w=600", definition: "Exits pelvis via greater sciatic foramen, bifurcating into Tibial and Common Fibular nerves.", details: ["Supplies the posterior thigh and entire leg/foot.", "Piriformis syndrome can cause compressive sciatica."] },
    { id: "A8", category: "CLINICAL ANATOMY", title: "Carpal Bones", question: "List the proximal row of carpal bones from lateral to medial.", hint: "Scaphoid comes first.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", definition: "Scaphoid, Lunate, Triquetrum, Pisiform.", details: ["Scaphoid is most fractured (anatomical snuffbox pain).", "Lunate is most commonly dislocated."] },
    { id: "A9", category: "CLINICAL ANATOMY", title: "Sternocleidomastoid", question: "What is the unilateral and bilateral action of the SCM muscle?", hint: "Contralateral rotation.", image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600", definition: "Unilateral: Lateral flexion to same side, rotation to opposite side. Bilateral: Neck flexion.", details: ["Innervated by Spinal Accessory Nerve (CN XI).", "Torticollis involves spasm/shortening of SCM."] },
    { id: "A10", category: "NEUROANATOMY", title: "Lumbar Plexus", question: "Identify the primary nerve branches originating from the Lumbar Plexus.", hint: "Think Femoral and Obturator.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", definition: "Formed by L1-L4. Main branches include Ilioinguinal, Femoral, and Obturator nerves.", details: ["Supplies lower abdomen and anterior/medial thigh.", "Obturator nerve innervates thigh adductors."] },
  ],
  "Biomechanics Decks": [
    { id: "B1", category: "JOINT KINEMATICS", title: "Screw-Home Mechanism", question: "What defines the 'Screw-Home Mechanism' during the final stages of knee extension?", hint: "Involves tibial rotation.", image: "https://images.unsplash.com/photo-1576091160550-2173ff3a523e?auto=format&fit=crop&q=80&w=600", definition: "The obligate 10° external rotation of the tibia on the femur during terminal knee extension.", details: ["Maximizes joint congruency and stability.", "Unlocked by the Popliteus muscle."] },
    { id: "B2", category: "ARTHROKINEMATICS", title: "Convex-Concave Rule", question: "State the Convex-Concave rule for joint mobilization.", hint: "Roll and glide directions.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", definition: "If a convex surface moves on a concave, roll and glide are in opposite directions.", details: ["If concave moves on convex, roll and glide are in the same direction.", "Crucial for determining mobilization force vectors."] },
    { id: "B3", category: "MUSCLE MECHANICS", title: "Active Insufficiency", question: "Explain the concept of Active Insufficiency in a two-joint muscle.", hint: "Relates to muscle shortening and tension.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600", definition: "Inability of a multi-joint muscle to generate maximal tension when it is fully shortened across all joints.", details: ["Caused by excessive overlap of actin and myosin filaments.", "Example: Weak grip when the wrist is fully flexed."] },
    { id: "B4", category: "MUSCLE MECHANICS", title: "Passive Insufficiency", question: "How does Passive Insufficiency restrict Range of Motion (ROM)?", hint: "Relates to muscle stretching.", image: "https://images.unsplash.com/photo-1505506874779-3b4b0e50a9bb?auto=format&fit=crop&q=80&w=600", definition: "Inability of a multi-joint muscle to lengthen sufficiently to allow full ROM at all joints it crosses simultaneously.", details: ["Occurs in the antagonist muscle.", "Example: Limited straight leg raise due to hamstring tightness."] },
    { id: "B5", category: "GAIT ANALYSIS", title: "Trendelenburg Gait", question: "Which muscle weakness causes Trendelenburg Gait, and what is the visual presentation?", hint: "Hip abductors.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600", definition: "Weakness of Gluteus Medius leading to a contralateral pelvic drop during the stance phase.", details: ["Compensated gait involves trunk leaning toward the weak side.", "Result of superior gluteal nerve injury."] },
    { id: "B6", category: "KINETICS", title: "Newton's Third Law", question: "What is Newton's Third Law of Motion and its relevance in biomechanics?", hint: "Action and reaction.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", definition: "For every action, there is an equal and opposite reaction.", details: ["Forms the basis for Ground Reaction Forces (GRF).", "Affects joint loading during running and jumping."] },
    { id: "B7", category: "LEVER SYSTEMS", title: "First-Class Lever", question: "Describe a First-Class Lever system and give a human body example.", hint: "Axis is in the middle.", image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600", definition: "The fulcrum (axis) lies between the applied force and the resistance load.", details: ["Designed primarily for balance.", "Example: Atlanto-occipital joint (head nodding)."] },
    { id: "B8", category: "KINETICS", title: "Force Couple", question: "Define a Force Couple and its role in scapular upward rotation.", hint: "Parallel forces in opposite directions.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600", definition: "Two parallel forces acting in opposite directions to produce rotation about a central axis.", details: ["Crucial for smooth joint mechanics.", "Scapula: Upper Trapezius, Lower Trapezius, and Serratus Anterior."] },
    { id: "B9", category: "CLINICAL BIOMECHANICS", title: "Q-Angle", question: "What anatomical landmarks define the Quadriceps Angle (Q-Angle)?", hint: "ASIS, Patella, Tibial Tuberosity.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", definition: "An angle formed by lines from ASIS to patella center, and patella center to tibial tuberosity.", details: ["Normal: 13-15° in males, 15-18° in females.", "Increased angle correlates with patellofemoral pain syndrome."] },
    { id: "B10", category: "POSTURE", title: "Center of Gravity (COG)", question: "Where is the normal anatomical location of the body's Center of Gravity in a standing adult?", hint: "Anterior to the sacrum.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600", definition: "The theoretical point where the entire weight of the body is concentrated.", details: ["Located just anterior to the S2 vertebra.", "Dynamically shifts during movement to maintain balance."] },
  ],
  "Neurology Decks": [
    { id: "N1", category: "CLINICAL NEUROLOGY", title: "Upper Motor Neuron (UMN) Lesion", question: "What are the hallmark clinical signs distinguishing a UMN lesion from a LMN lesion?", hint: "Think reflexes and muscle tone.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600", definition: "Damage to descending motor pathways causing Hyperreflexia, Spasticity, and Clonus.", details: ["Positive Babinski Sign (upgoing plantar reflex).", "Minimal to no muscle atrophy initially."] },
    { id: "N2", category: "CLINICAL NEUROLOGY", title: "Lower Motor Neuron (LMN) Lesion", question: "Describe the primary symptoms observed in a patient with a Lower Motor Neuron lesion.", hint: "Flaccid presentation.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", definition: "Damage to peripheral nerves causing Flaccidity, Hyporeflexia, and profound Muscle Atrophy.", details: ["Fasciculations (muscle twitches) are strongly indicative.", "Negative Babinski sign."] },
    { id: "N3", category: "NEURO ASSESSMENT", title: "Glasgow Coma Scale (GCS)", question: "What three parameters are assessed in the GCS to determine consciousness?", hint: "Eyes, Voice, Movement.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", definition: "Eye opening (1-4), Verbal response (1-5), and Motor response (1-6).", details: ["Maximum score: 15 (fully awake). Minimum score: 3 (deep coma).", "Score ≤ 8 indicates severe brain injury/coma."] },
    { id: "N4", category: "PATHOPHYSIOLOGY", title: "Parkinson's Disease", question: "Which specific brain structure degrades in Parkinson's, causing dopamine depletion?", hint: "Part of the Basal Ganglia.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600", definition: "Degeneration of dopaminergic neurons in the Substantia Nigra (Basal Ganglia).", details: ["Triad: Resting tremor (pill-rolling), Bradykinesia, Lead-pipe/Cogwheel Rigidity.", "Results in a festinating, shuffling gait."] },
    { id: "N5", category: "STROKE SYNDROMES", title: "Middle Cerebral Artery (MCA) Stroke", question: "What is the classic clinical presentation of an ischemic MCA stroke?", hint: "Face and Arm > Leg.", image: "https://images.unsplash.com/photo-1505506874779-3b4b0e50a9bb?auto=format&fit=crop&q=80&w=600", definition: "Contralateral hemiparesis and hemisensory loss, affecting the face and upper limb more than the lower limb.", details: ["If left hemisphere affected: Aphasia (Broca's/Wernicke's).", "If right hemisphere affected: Hemispatial neglect."] },
    { id: "N6", category: "PATHOPHYSIOLOGY", title: "Multiple Sclerosis (MS)", question: "What is the core pathophysiological mechanism driving Multiple Sclerosis?", hint: "Central nervous system attack.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600", definition: "An autoimmune disease causing demyelination of axons within the Central Nervous System (Brain and Spinal Cord).", details: ["Presents with fatigue, optic neuritis, and intention tremors.", "Characterized by relapsing-remitting episodes."] },
    { id: "N7", category: "PATHOPHYSIOLOGY", title: "Guillain-Barré Syndrome (GBS)", question: "Describe the typical onset and progression of Guillain-Barré Syndrome.", hint: "Ascending paralysis.", image: "https://images.unsplash.com/photo-1576091160550-2173ff3a523e?auto=format&fit=crop&q=80&w=600", definition: "Rapid-onset autoimmune demyelination of the Peripheral Nervous System (Schwann cells).", details: ["Presents as symmetrical ascending flaccid paralysis.", "Often triggered by a prior respiratory or GI infection."] },
    { id: "N8", category: "NEURO ASSESSMENT", title: "Deep Tendon Reflexes (DTR)", question: "State the primary spinal nerve roots for Biceps, Patellar, and Achilles reflexes.", hint: "Count in order: C5-C6, L3-L4, S1-S2.", image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600", definition: "Biceps (C5-C6), Triceps (C7-C8), Patellar (L3-L4), Achilles (S1-S2).", details: ["Tested to assess the integrity of the reflex arc.", "Graded 0 (absent) to 4+ (hyperactive with clonus)."] },
    { id: "N9", category: "CRANIAL NERVES", title: "Cranial Nerve VII (Facial)", question: "What condition arises from a lower motor neuron lesion of CN VII, and what are its symptoms?", hint: "Facial droop.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600", definition: "Bell's Palsy.", details: ["Unilateral facial paralysis (inability to close eye or raise eyebrow).", "Differentiates from stroke where the forehead is typically spared."] },
    { id: "N10", category: "SPINAL CORD INJURY", title: "Autonomic Dysreflexia", question: "What is Autonomic Dysreflexia and at what spinal cord injury level does it typically occur?", hint: "Medical emergency above T6.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600", definition: "A life-threatening sympathetic response to noxious stimuli occurring in SCI patients at or above T6.", details: ["Symptoms: Severe hypertension, pounding headache, bradycardia.", "Immediate action: Sit patient upright and remove stimulus (e.g., blocked catheter)."] },
  ]
};

const TABS = ["All Decks", "Anatomy Decks", "Biomechanics Decks", "Neurology Decks", "Orthopaedics Decks", "Cardiopulmonary Decks"];

export default function StudyAidsFlashcards() {
  const [activeTab, setActiveTab] = useState("Anatomy Decks");
  const [deck, setDeck] = useState<any[]>(flashcardData["Anatomy Decks"] || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewList, setReviewList] = useState<string[]>([]);
  const [masteredList, setMasteredList] = useState<string[]>([]);

  // Smooth reset of flip state when navigating or shuffling
  const triggerTransition = (action: () => void) => {
    setIsFlipped(false);
    setTimeout(action, 200); // Wait for the flip back animation to complete before changing card data
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      triggerTransition(() => setCurrentIndex(prev => prev + 1));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      triggerTransition(() => setCurrentIndex(prev => prev - 1));
    }
  };

  const handleShuffle = () => {
    triggerTransition(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    });
  };

  const handleTabChange = (tab: string) => {
    if (flashcardData[tab]) {
      triggerTransition(() => {
        setActiveTab(tab);
        setDeck(flashcardData[tab]);
        setCurrentIndex(0);
      });
    } else {
      setActiveTab(tab);
      setDeck([]);
      setCurrentIndex(0);
    }
  };

  const markNeedReview = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!reviewList.includes(id)) setReviewList([...reviewList, id]);
    handleNext();
  };

  const markMastered = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!masteredList.includes(id)) setMasteredList([...masteredList, id]);
    handleNext();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* 1. HEADER SECTION (Matches Dashboard / Course Theme) */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Link href="/student/dashboard" className="hover:text-blue-800 transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Study Aids</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-slate-900">Clinical Anatomy & Theory Flashcards</h1>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Spaced repetition flashcard decks for high-yield anatomical landmarks, nerve roots, and clinical special tests.
            </p>
          </div>
          
          <button 
            onClick={handleShuffle}
            className="flex items-center space-x-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold transition-colors shrink-0 h-fit"
          >
            <Shuffle size={16} />
            <span>Shuffle Deck</span>
          </button>
        </div>

        {/* PILLS ROW */}
        <div className="max-w-6xl mx-auto mt-8 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === tab
                    ? "bg-blue-900 border-blue-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {deck.length > 0 && (
            <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-slate-500 whitespace-nowrap ml-4">
               <span>Card</span>
               <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-900">{currentIndex + 1}</span>
               <span>of</span>
               <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-900">{deck.length}</span>
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN FLASHCARD AREA */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {deck.length > 0 ? (
          <>
            {/* THE CARD (Fixed Mirrored Bug & Styled) */}
            <div 
              className="relative w-full h-112.5 perspective-[1000px] cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-3d shadow-md hover:shadow-xl hover:-translate-y-1 ${isFlipped ? 'transform-[rotateY(180deg)]' : ''}`}>
                
                {/* ---------------- FRONT OF CARD ---------------- */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-3xl p-8 border border-slate-200 backface-hidden flex flex-col justify-between overflow-hidden">
                  
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-8 z-10">
                    <span className="bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
                      {deck[currentIndex].category}
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                      <RefreshCcw size={14} />
                      <span>Click to flip</span>
                    </span>
                  </div>

                  {/* Center Content (Title & Question) */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6">
                      {deck[currentIndex].title}
                    </h2>
                    <p className="text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                      {deck[currentIndex].question}
                    </p>
                  </div>

                  {/* Bottom Hint */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-center z-10">
                    <p className="text-xs font-medium text-blue-700 flex items-center justify-center space-x-1.5">
                      <Lightbulb size={14} className="text-amber-500" />
                      <span>Hint: {deck[currentIndex].hint}</span>
                    </p>
                  </div>
                </div>

                {/* ---------------- BACK OF CARD (Reveal + Photo) ---------------- */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-3xl border border-slate-200 backface-hidden transform-[rotateY(180deg)] flex flex-col overflow-hidden">
                  
                  {/* Top Header Row overlaying image */}
                  <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
                     <span className="bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                      CLINICAL ANSWER
                    </span>
                    <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1.5 hover:bg-black/60 transition-colors">
                      <RefreshCcw size={14} />
                      <span>Flip back</span>
                    </span>
                  </div>

                  {/* Real Photo Banner at Top */}
                  <div className="h-48 w-full shrink-0 relative bg-slate-900">
                    <img 
                      src={deck[currentIndex].image} 
                      alt={deck[currentIndex].title} 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent"></div>
                  </div>

                  {/* Content Area Below Photo */}
                  <div className="p-8 pt-4 flex-1 flex flex-col justify-center overflow-y-auto scrollbar-none">
                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">
                      {deck[currentIndex].definition}
                    </h3>
                    
                    <ul className="space-y-3 mt-2">
                      {deck[currentIndex].details.map((detail: string, i: number) => (
                        <li key={i} className="flex items-start space-x-3 text-sm text-slate-600 font-medium">
                          <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM ACTION BAR */}
            <div className="mt-8 flex items-center justify-between max-w-3xl mx-auto">
              {/* Prev / Next Buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === deck.length - 1}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Status Buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={(e) => markNeedReview(e, deck[currentIndex].id)}
                  className="px-6 py-2.5 rounded-full bg-white border border-red-200 text-red-600 text-sm font-bold flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                >
                  <XCircle size={18} />
                  <span>Need Review</span>
                </button>
                <button 
                  onClick={(e) => markMastered(e, deck[currentIndex].id)}
                  className="px-6 py-2.5 rounded-full bg-blue-900 border border-blue-900 text-white text-sm font-bold flex items-center space-x-2 hover:bg-blue-800 transition-all shadow-sm"
                >
                  <CheckCircle2 size={18} />
                  <span>Mastered</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm mt-12">
             <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               <Brain size={32} />
             </div>
             <h3 className="text-xl font-bold font-serif text-slate-900">More Decks Coming Soon</h3>
             <p className="text-sm text-slate-500 mt-2">
               We are currently working with clinical experts to bring you flashcards for {activeTab}. Please switch back to Anatomy, Biomechanics, or Neurology.
             </p>
          </div>
        )}

      </main>
    </div>
  );
}