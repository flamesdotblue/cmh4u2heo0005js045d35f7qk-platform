import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';

const LS_KEY = 'placement.tasks.v1';

export default function ProgressTracker() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, pct };
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      done: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
    setTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Progress Tracker</h2>
        <div className="text-sm text-slate-300">{stats.done}/{stats.total} done • {stats.pct}%</div>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" style={{ width: `${stats.pct}%` }} />
      </div>

      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task (e.g., 10 LeetCode Easy strings)"
          className="flex-1 rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option>DSA</option>
          <option>CS Fundamentals</option>
          <option>System Design</option>
          <option>Projects</option>
          <option>Interview</option>
        </select>
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium">
          <Plus className="w-4 h-4"/> Add
        </button>
      </form>

      <ul className="space-y-2 max-h-[360px] overflow-auto pr-1">
        {tasks.length === 0 && (
          <li className="text-sm text-slate-400">No tasks yet. Add your first goal above.</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className="group flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                aria-label="toggle"
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}
              >
                {task.done && <CheckCircle2 className="w-4 h-4 text-white"/>}
              </button>
              <div>
                <div className={`text-sm ${task.done ? 'line-through text-slate-400' : ''}`}>{task.title}</div>
                <div className="text-xs text-slate-400">{task.category}</div>
              </div>
            </div>
            <button onClick={() => removeTask(task.id)} className="opacity-60 hover:opacity-100 text-slate-300">
              <Trash2 className="w-4 h-4"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
