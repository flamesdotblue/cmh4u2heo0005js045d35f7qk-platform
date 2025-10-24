import React from 'react';
import { Brain, Rocket, Bell } from 'lucide-react';
import HeroSpline from './components/HeroSpline';
import ProgressTracker from './components/ProgressTracker';
import AIPlanner from './components/AIPlanner';
import ReminderCenter from './components/ReminderCenter';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="relative">
        <HeroSpline />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Placement Prep Hub</h1>
              <p className="text-sm md:text-base text-slate-300">Track progress, generate AI study plans, and get timely reminders.</p>
            </div>
            <div className="hidden md:flex gap-3 text-slate-200">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><Rocket className="w-4 h-4"/>Launch Prep</span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><Brain className="w-4 h-4"/>AI Assist</span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><Bell className="w-4 h-4"/>Reminders</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-8 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="col-span-1">
          <ProgressTracker />
        </section>
        <section className="col-span-1 space-y-6">
          <AIPlanner />
          <ReminderCenter />
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        Built for your personalized placement journey.
      </footer>
    </div>
  );
}
