// Updated Quiz.jsx with Post-Badge Flow: Membership and Mentorship Options

import React, { useState } from 'react';

const questions = [
  // your existing questions go here, unchanged...
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showWorthPrompt, setShowWorthPrompt] = useState(false);
  const [worthAnswer, setWorthAnswer] = useState(null);
  const [badgeAndLevel, setBadgeAndLevel] = useState(null);

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
    if (!badgeAndLevel) {
      const result = calculateBadgeAndLevel();
      setBadgeAndLevel(result);
      return null; // prevent double rendering
    }

    const { badge, level } = badgeAndLevel;

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
          <p className="mt-4 text-lg font-semibold">
            🚀 Become a RockIT Women Member Today — 50% OFF!
          </p>
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
          <p className="mt-2 text-lg font-semibold">
            Would you consider mentoring the next generation of talent?
          </p>
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

    if (!showWorthPrompt) {
      setShowWorthPrompt(true);
      return (
        <div className="p-6 text-white text-center">
          <h2 className="text-2xl font-bold">🎉 Thanks for completing the quiz!</h2>
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

