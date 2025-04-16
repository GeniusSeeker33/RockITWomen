import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const questions = [
  {
    question: 'If you could have any superpower at work, what would it be?',
    options: [
      'Mind-reading in meetings',
      'Instant code debugging',
      'Infinite coffee supply',
      'Time manipulation',
      'Teleportation to avoid traffic',
    ],
  },
  {
    question: 'What’s your favorite way to unwind after a long day?',
    options: [
      'Reading a good book',
      'Gaming with friends',
      'Binge-watching a series',
      'Cooking a new recipe',
      'Getting a workout in',
    ],
  },
  {
    question: 'If you could work from anywhere, where would you set up your office?',
    options: [
      'A beachside cabana',
      'A cozy mountain cabin',
      'A bustling city loft',
      'A spaceship in orbit',
      'A treehouse in the forest',
    ],
  },
  {
    question: 'What’s your go-to productivity boost?',
    options: [
      'A power nap',
      'A walk in nature',
      'Blasting your favorite playlist',
      'A strong cup of coffee',
      'A quick meditation session',
    ],
  },
  {
    question: 'Which fictional character would you pick as a mentor?',
    options: [
      'Scarlette OHara',
      'Katness Everdeen',
      'Daenerys Targaryen',
      'Maleficent',
      'Erin Brockovich',
    ],
  },
  {
    question: 'How do you prefer to learn new skills?',
    options: [
      'Online courses',
      'Hands-on workshops',
      'Reading books or articles',
      'Watching videos',
      'Mentorship or coaching',
    ],
  },
  {
    question: 'Which tech innovation excites you the most?',
    options: [
      'AI and machine learning',
      'Blockchain technology',
      'Virtual and augmented reality',
      'Quantum computing',
      'Renewable energy solutions',
    ],
  },
  {
    question: 'What’s your dream role in the next five years?',
    options: [
      'Leading a tech startup',
      'Becoming a subject matter expert',
      'Managing a team',
      'Innovating in a new field',
      'Consulting or freelancing',
    ],
  },
  {
    question: 'Which of these activities would you love to see at the conference?',
    options: [
      'Interactive workshops',
      'Networking mixers',
      'Keynote speeches',
      'Hands-on demos',
      'Venture capital pitches',
    ],
  },
  {
    question: 'Which of these would you bring to a desert island?',
    options: [
      'A solar-powered laptop',
      'An endless library of books',
      'A musical instrument',
      'A survival kit',
      'A hammock',
    ],
  },
  {
    question: 'If you could instantly master a new hobby, what would it be?',
    options: [
      'Painting or drawing',
      'Playing a musical instrument or singing',
      'Cooking gourmet meals',
      'A new sport',
      'Connecting with horses',
    ],
  },
  {
    question: 'Will you be attending next year’s Rocket Women Conference?',
    options: [
      'Definitely!',
      'Probably',
      'Not sure yet',
      'Unlikely',
      'No',
    ],
  },
  {
    question: 'How many years have you been working in your field?',
    options: [
      '0–1 years',
      '2–4 years',
      '5–9 years',
      '10–14 years',
      '15+ years',
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setStep((prev) => prev + 1);
  };

  const submitToFilebase = async () => {
    if (submitted) {
      alert('✅ Already submitted.');
      return;
    }

    const client = new S3Client({
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: '70E2AB534A8C912EF456',
        secretAccessKey: 'jqzDzHnpQak6GDbTwGcDFRosrFSVfLRUU2whSjXx',
      },
    });        

    const fileData = {
      timestamp: new Date().toISOString(),
      answers,
      source: 'rockitwomen-2025',
    };

    const fileName = `response-${Date.now()}.json`;

    const command = new PutObjectCommand({
      Bucket: 'rockitwomen-quiz-responses',
      Key: fileName,
      Body: JSON.stringify(fileData),
      ContentType: 'application/json',
    });

    try {
      const res = await client.send(command);
      setSubmitted(true);
      alert('✅ Submitted to Filebase!');
      console.log('✅ Filebase response:', res);
    } catch (err) {
      console.error('❌ Filebase upload error:', err);
      alert('❌ Something went wrong saving your answers.');
    }
  };

  if (step >= questions.length) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-bold">🎉 Thanks for completing the quiz!</h2>
        <ul className="mt-6 space-y-2 text-left max-w-xl mx-auto">
          {answers.map((a, i) => (
            <li key={i} className="bg-white/10 backdrop-blur-sm p-3 rounded-md">
              <span className="font-semibold">Q{i + 1}:</span> {a}
            </li>
          ))}
        </ul>
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
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}