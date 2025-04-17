import React, { useState } from 'react';

const questions = [
  {
    question: 'If you could have any superpower at work, what would it be?',
    options: [
      { label: 'Mind-reading in meetings', category: 'Arts', weight: 0.7 },
      { label: 'Instant code debugging', category: 'Technology', weight: 1.0 },
      { label: 'Infinite coffee supply', category: 'Math', weight: 0.5 },
      { label: 'Time manipulation', category: 'Science', weight: 0.8 },
      { label: 'Teleportation to avoid traffic', category: 'Engineering', weight: 0.9 },
    ],
  },
  {
    question: 'What’s your favorite way to unwind after a long day?',
    options: [
      { label: 'Reading a good book', category: 'Arts', weight: 0.9 },
      { label: 'Gaming with friends', category: 'Technology', weight: 0.6 },
      { label: 'Binge-watching a series', category: 'Arts', weight: 0.4 },
      { label: 'Cooking a new recipe', category: 'Science', weight: 0.5 },
      { label: 'Getting a workout in', category: 'Engineering', weight: 0.8 },
    ],
  },
  {
    question: 'If you could work from anywhere, where would you set up your office?',
    options: [
      { label: 'A beachside cabana', category: 'Arts', weight: 0.7 },
      { label: 'A cozy mountain cabin', category: 'Science', weight: 0.8 },
      { label: 'A bustling city loft', category: 'Math', weight: 0.6 },
      { label: 'A spaceship in orbit', category: 'Technology', weight: 1.0 },
      { label: 'A treehouse in the forest', category: 'Engineering', weight: 0.9 },
    ],
  },
  {
    question: 'What’s your go-to productivity boost?',
    options: [
      { label: 'A power nap', category: 'Science', weight: 0.7 },
      { label: 'A walk in nature', category: 'Engineering', weight: 0.8 },
      { label: 'Blasting your favorite playlist', category: 'Arts', weight: 0.5 },
      { label: 'A strong cup of coffee', category: 'Math', weight: 0.5 },
      { label: 'A quick meditation session', category: 'Science', weight: 0.9 },
    ],
  },
  {
    question: 'Which fictional character would you pick as a mentor?',
    options: [
      { label: 'Scarlette OHara', category: 'Arts', weight: 0.7 },
      { label: 'Katness Everdeen', category: 'Engineering', weight: 0.9 },
      { label: 'Daenerys Targaryen', category: 'Science', weight: 0.8 },
      { label: 'Maleficent', category: 'Arts', weight: 0.6 },
      { label: 'Erin Brockovich', category: 'Math', weight: 0.5 },
    ],
  },
  {
    question: 'How do you prefer to learn new skills?',
    options: [
      { label: 'Online courses', category: 'Technology', weight: 1.0 },
      { label: 'Hands-on workshops', category: 'Engineering', weight: 0.9 },
      { label: 'Reading books or articles', category: 'Arts', weight: 0.6 },
      { label: 'Watching videos', category: 'Arts', weight: 0.5 },
      { label: 'Mentorship or coaching', category: 'Math', weight: 0.7 },
    ],
  },
  {
    question: 'Which tech innovation excites you the most?',
    options: [
      { label: 'AI and machine learning', category: 'Technology', weight: 1.0 },
      { label: 'Blockchain technology', category: 'Technology', weight: 0.9 },
      { label: 'Virtual and augmented reality', category: 'Arts', weight: 0.7 },
      { label: 'Quantum computing', category: 'Science', weight: 1.0 },
      { label: 'Renewable energy solutions', category: 'Engineering', weight: 0.8 },
    ],
  },
  {
    question: 'What’s your dream role in the next five years?',
    options: [
      { label: 'Leading a tech startup', category: 'Technology', weight: 1.0 },
      { label: 'Becoming a subject matter expert', category: 'Math', weight: 0.8 },
      { label: 'Managing a team', category: 'Engineering', weight: 0.7 },
      { label: 'Innovating in a new field', category: 'Science', weight: 0.9 },
      { label: 'Consulting or freelancing', category: 'Arts', weight: 0.6 },
    ],
  },
  {
    question: 'Which of these activities would you love to see at the conference?',
    options: [
      { label: 'Interactive workshops', category: 'Engineering', weight: 0.9 },
      { label: 'Networking mixers', category: 'Arts', weight: 0.7 },
      { label: 'Keynote speeches', category: 'Math', weight: 0.6 },
      { label: 'Hands-on demos', category: 'Technology', weight: 1.0 },
      { label: 'Venture capital pitches', category: 'Math', weight: 0.8 },
    ],
  },
  {
    question: 'Which of these would you bring to a desert island?',
    options: [
      { label: 'A solar-powered laptop', category: 'Technology', weight: 0.9 },
      { label: 'An endless library of books', category: 'Arts', weight: 0.7 },
      { label: 'A musical instrument', category: 'Arts', weight: 0.6 },
      { label: 'A survival kit', category: 'Science', weight: 0.8 },
      { label: 'A hammock', category: 'Engineering', weight: 0.7 },
    ],
  },
  {
    question: 'If you could instantly master a new hobby, what would it be?',
    options: [
      { label: 'Painting or drawing', category: 'Arts', weight: 1.0 },
      { label: 'Playing a musical instrument or singing', category: 'Arts', weight: 1.0 },
      { label: 'Cooking gourmet meals', category: 'Science', weight: 0.7 },
      { label: 'A new sport', category: 'Engineering', weight: 0.6 },
      { label: 'Connecting with horses', category: 'Science', weight: 0.6 },
    ],
  },
  {
    question: 'Will you be attending next year’s Rocket Women Conference?',
    options: [
      { label: 'Definitely!', category: 'None', weight: 0 },
      { label: 'Probably', category: 'None', weight: 0 },
      { label: 'Not sure yet', category: 'None', weight: 0 },
      { label: 'Unlikely', category: 'None', weight: 0 },
      { label: 'No', category: 'None', weight: 0 },
    ],
  },
  {
    question: 'How many years have you been working in your field?',
    options: [
      { label: '0–1 years', category: 'Level1', weight: 0 },
      { label: '2–4 years', category: 'Level2', weight: 0 },
      { label: '5–9 years', category: 'Level3', weight: 0 },
      { label: '10–14 years', category: 'Level4', weight: 0 },
      { label: '15+ years', category: 'Level5', weight: 0 },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    setStep((prev) => prev + 1);
  };

  const calculateBadgeAndLevel = () => {
    const counts = { Science: 0, Technology: 0, Engineering: 0, Arts: 0, Math: 0 };
    let level = 1;

    answers.forEach((answerObj, index) => {
      const { category, weight } = answerObj;

      if (index === 11) return; // Skip attendance question (Q12)

      if (category && category.startsWith('Level')) {
        level = parseInt(category.replace('Level', ''), 10);
      } else if (counts[category] !== undefined) {
        counts[category] += weight ?? 1;
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const badge = sorted[0][0];
    return { badge, level };
  };

  const submitToFilebase = async () => {
    if (submitted) {
      alert('✅ Already submitted.');
      return;
    }

    const { badge, level } = calculateBadgeAndLevel();

    const fileData = {
      timestamp: new Date().toISOString(),
      answers,
      awardedBadge: badge,
      level,
      source: 'rockitwomen-2025',
    };

    try {
      const response = await fetch(
        'https://symphonious-sunshine-96ba29.netlify.app/.netlify/functions/upload',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fileData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
        alert('✅ Submitted to Filebase!');
        console.log('✅ Server response:', result);
      } else {
        console.error('❌ Upload failed:', result);
        alert('❌ Upload error: ' + result.error);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      alert('❌ Something went wrong connecting to the server.');
    }
  };

  if (step >= questions.length) {
    const { badge, level } = calculateBadgeAndLevel();

    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold">🎉 Thanks for completing the quiz!</h2>
        <ul className="mt-6 space-y-2 text-left max-w-xl mx-auto">
          {answers.map((a, i) => (
            <li key={i} className="bg-white/10 backdrop-blur-sm p-3 rounded-md">
              <span className="font-semibold">Q{i + 1}:</span> {a.label}
            </li>
          ))}
        </ul>
        <h3 className="text-xl mt-6">
          🏅 You’ve earned the <span className="font-bold">{badge}</span> STEAM badge!
        </h3>
        <p className="mt-2 text-lg">
          🔢 Your skill level: <span className="font-bold">Level {level}</span>
        </p>
        <button
          onClick={submitToFilebase}
          disabled={submitted}
          className={`mt-6 py-2 px-4 rounded-xl ${
            submitted
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {submitted ? '✅ Submitted' : '📡 Submit to Filebase'}
        </button>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 text-gray-800">
      <h2 className="text-xl font-semibold mb-4">{current.question}</h2>
      <div className="space-y-2">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl text-left"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
