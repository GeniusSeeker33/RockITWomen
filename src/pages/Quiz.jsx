// Updated Quiz.jsx with Post-Badge Flow: Membership and Mentorship Options

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
  const [badgeAndLevel, setBadgeAndLevel] = useState(null);
  const [showWorthPrompt, setShowWorthPrompt] = useState(false);
  const [worthAnswer, setWorthAnswer] = useState(null);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const result = calculateBadgeAndLevel(updatedAnswers);
      setBadgeAndLevel(result);
    }
  };

  const calculateBadgeAndLevel = (answersList) => {
    const counts = { Science: 0, Technology: 0, Engineering: 0, Arts: 0, Math: 0 };
    let level = 1;

    answersList.forEach((answerObj, index) => {
      const { category, weight } = answerObj;
      if (index === 11) return; // skip conference attendance
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
    if (submitted || !badgeAndLevel) return;

    const { badge, level } = badgeAndLevel;

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
      } else {
        alert('❌ Upload error: ' + result.error);
      }
    } catch (err) {
      alert('❌ Network error occurred.');
    }
  };

  if (badgeAndLevel && !showWorthPrompt && worthAnswer === null) {
    const { badge, level } = badgeAndLevel;
    const payRanges = {
      1: '$10–20/hr',
      2: '$20–30/hr',
      3: '$30–50/hr',
      4: '$50–100/hr',
      5: '$100+/hr',
    };

    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold">🎉 Badge Reveal</h2>
        <p className="mt-4 text-lg">
          🏅 You’ve earned the <span className="font-bold">{badge}</span> STEAM badge!
        </p>
        <p className="mt-2 text-lg">
          🔢 Level {level} — Expected Pay Range: <span className="font-bold">{payRanges[level]}</span>
        </p>
        <button
          onClick={() => {
            submitToFilebase();
            setShowWorthPrompt(true);
          }}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
        >
          Continue
        </button>
      </div>
    );
  }

  if (showWorthPrompt && worthAnswer === null) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-xl">Are you currently earning what you're worth?</h2>
        <div className="mt-4 space-x-4">
          <button
            onClick={() => setWorthAnswer('Yes')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Yes
          </button>
          <button
            onClick={() => setWorthAnswer('No')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  if (worthAnswer === 'No') {
    return (
      <div className="p-6 text-white text-left max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Let us help you get there</h2>
        <p className="mt-4 text-lg font-semibold">🚀 Become a RockIT Women Member Today — 50% OFF!</p>
        <p className="mt-2">💥 Just $100 for Two Years (normally $200 + fees)</p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>🧭 2-year membership</li>
          <li>🎁 Welcome gift + RockIT merch</li>
          <li>🎟 Free tickets to all virtual events (8–10/year)</li>
          <li>📬 Biannual member contact list</li>
          <li>🤝 Quarterly networking (virtual + in-person)</li>
          <li>🎫 Discounts for in-person events (WIT Conf)</li>
          <li>📣 Early access to limited-seating events</li>
          <li>🔐 Private social media groups</li>
          <li>📄 1 free job listing/month</li>
          <li>💬 30-minute 1:1 with Desiree (resume, brand, strategy, intros)</li>
        </ul>
        <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl">
          💫 Become a Member for $100 Today
        </button>
      </div>
    );
  }

  if (worthAnswer === 'Yes') {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
        <p className="mt-4">You're on the path you deserve—and we love to see it.</p>
        <p className="mt-2 text-lg font-semibold">Would you consider mentoring the next generation of talent?</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdRajT99G2i__xO6n5KRFpKSHmND84mC0PnZEZRRWT5aE7MWQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          🌟 Join as a Mentor
        </a>
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
