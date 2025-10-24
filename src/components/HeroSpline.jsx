import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <Spline
        scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(109,40,217,0.18),_transparent_40%),_radial-gradient(ellipse_at_center,_rgba(59,130,246,0.18),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />
      <div className="absolute inset-x-0 top-10 mx-auto max-w-6xl px-6">
        <div className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur">AI-integrated Placement Tracker</div>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
          Stay on track. Learn smarter. Get placed.
        </h1>
        <p className="mt-3 max-w-2xl text-slate-200/90">
          A personal command center for DSA, CS fundamentals, projects, and interviews — powered by an AI planning assistant and proactive reminders.
        </p>
      </div>
    </div>
  );
}
