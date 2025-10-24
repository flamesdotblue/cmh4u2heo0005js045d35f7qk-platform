import React, { useMemo, useState } from 'react';
import { Brain, Wand2 } from 'lucide-react';

function generatePlan(goal, hours, focus) {
  const base = [
    { topic: 'DSA Practice', items: ['Arrays', 'Strings', 'Linked List', 'Stacks/Queues', 'Trees', 'Graphs'] },
    { topic: 'CS Fundamentals', items: ['OOP', 'OS', 'DBMS', 'Networks'] },
    { topic: 'Interview', items: ['Behavioral stories', 'Resume walkthrough', 'Company research'] },
  ];
  const weight = {
    DSA: 0.5,
    'CS Fundamentals': 0.3,
    Interview: 0.2,
  };
  const focusBoost = focus && weight[focus] ? 0.2 : 0;
  const totalHours = Math.max(1, Math.min(8, Number(hours) || 2));
  const allocations = {
    DSA: Math.round(totalHours * (weight.DSA + (focus === 'DSA' ? focusBoost : 0))),
    'CS Fundamentals': Math.round(totalHours * (weight['CS Fundamentals'] + (focus === 'CS Fundamentals' ? focusBoost : 0))),
    Interview: Math.max(1, totalHours) - 0, // placeholder, recompute below
  };
  allocations.Interview = Math.max(0, totalHours - allocations.DSA - allocations['CS Fundamentals']);

  const days = 7;
  const plan = [];
  for (let d = 1; d <= days; d += 1) {
    plan.push({
      day: d,
      sessions: [
        allocations.DSA > 0 ? { label: 'DSA', hours: Math.max(1, Math.round(allocations.DSA / 3)) } : null,
        allocations['CS Fundamentals'] > 0 ? { label: 'CS Fundamentals', hours: Math.max(1, Math.round(allocations['CS Fundamentals'] / 3)) } : null,
        allocations.Interview > 0 ? { label: 'Interview', hours: Math.max(1, Math.round(allocations.Interview / 3)) } : null,
      ].filter(Boolean),
    });
  }

  const tips = [
    'Prioritize weak areas first; end with a strong topic to boost morale.',
    'Use spaced repetition: quick reviews on days 3 and 6.',
    'Time-bound practice: 45m focus + 10m break cycles.',
    'Translate every solved problem into 2-3 “takeaway rules.”',
  ];

  return { goal, totalHours, plan, tips };
}

export default function AIPlanner() {
  const [goal, setGoal] = useState('SDE placement in 3 months');
  const [hours, setHours] = useState(3);
  const [focus, setFocus] = useState('DSA');
  const [result, setResult] = useState(null);

  const preview = useMemo(() => {
    if (!result) return null;
    return result.plan.slice(0, 3);
  }, [result]);

  const onPlan = (e) => {
    e.preventDefault();
    const r = generatePlan(goal, hours, focus);
    setResult(r);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold inline-flex items-center gap-2"><Brain className="w-5 h-5"/> AI Planner</h2>
        <span className="text-xs text-slate-300">Local heuristic planning</span>
      </div>

      <form onSubmit={onPlan} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 md:col-span-2"
          placeholder="Your goal"
        />
        <input
          type="number"
          min="1"
          max="8"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Daily hours"
        />
        <select
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          className="rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 md:col-span-3"
        >
          <option>DSA</option>
          <option>CS Fundamentals</option>
          <option>Interview</option>
        </select>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-sm font-medium md:col-span-3">
          <Wand2 className="w-4 h-4"/> Generate Plan
        </button>
      </form>

      {result && (
        <div>
          <div className="text-sm text-slate-300 mb-2">Plan for next 7 days • {result.totalHours}h/day</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {preview?.map(day => (
              <div key={day.day} className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
                <div className="text-xs text-slate-400">Day {day.day}</div>
                <ul className="mt-2 space-y-1 text-sm">
                  {day.sessions.map((s, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>{s.label}</span>
                      <span className="text-slate-400">{s.hours}h</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">Tips</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-200">
              {result.tips.map((t, i) => (<li key={i}>{t}</li>))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
