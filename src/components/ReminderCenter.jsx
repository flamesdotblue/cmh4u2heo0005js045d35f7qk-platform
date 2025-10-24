import React, { useEffect, useRef, useState } from 'react';
import { Bell, Clock3 } from 'lucide-react';

export default function ReminderCenter() {
  const [message, setMessage] = useState('Practice 2 DSA problems');
  const [when, setWhen] = useState(() => new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16));
  const [status, setStatus] = useState('');
  const timersRef = useRef([]);

  useEffect(() => {
    if (Notification && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
    };
  }, []);

  const schedule = (e) => {
    e.preventDefault();
    const ts = new Date(when).getTime();
    const delay = ts - Date.now();
    if (isNaN(ts)) {
      setStatus('Invalid time');
      return;
    }
    const safeDelay = Math.max(0, delay);

    const id = setTimeout(() => {
      const body = message || 'Time to study!';
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('Prep Reminder', { body, silent: false });
        } catch {
          alert(body);
        }
      } else {
        alert(body);
      }
    }, safeDelay);

    timersRef.current.push(id);
    const mins = Math.round(safeDelay / 60000);
    setStatus(mins > 0 ? `Reminder set for ~${mins} min(s) from now` : 'Reminder set for now');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold inline-flex items-center gap-2"><Bell className="w-5 h-5"/> Reminders</h2>
        <span className="text-xs text-slate-300">Browser notifications</span>
      </div>

      <form onSubmit={schedule} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Reminder message"
          className="md:col-span-2 rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <div className="md:col-span-1 flex items-center gap-2 rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2">
          <Clock3 className="w-4 h-4 text-slate-300"/>
          <input
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="bg-transparent flex-1 focus:outline-none"
          />
        </div>
        <button type="submit" className="md:col-span-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm font-medium">Schedule</button>
      </form>

      {status && <div className="mt-3 text-sm text-slate-300">{status}</div>}

      <div className="mt-4 text-xs text-slate-400">
        Keep this tab open for reminders to trigger. For reliable notifications, allow browser permissions.
      </div>
    </div>
  );
}
