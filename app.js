import React, { useState, useEffect, useRef } from 'react';

// This is the "Radio Station" that connects both tabs
const munChannel = new BroadcastChannel('mun_system');

const MUNApp = () => {
  const [role, setRole] = useState(null); // 'chair' or 'projector'
  const [speakers, setSpeakers] = useState(["United States", "France", "Brazil"]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isActive, setIsActive] = useState(false);

  // 1. Listen for messages from the other tab
  useEffect(() => {
    munChannel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'UPDATE_STATE') {
        setSpeakers(payload.speakers);
        setTimeLeft(payload.timeLeft);
        setIsActive(payload.isActive);
      }
    };
  }, []);

  // 2. Broadcast changes (Only if I am the Chair)
  useEffect(() => {
    if (role === 'chair') {
      munChannel.postMessage({
        type: 'UPDATE_STATE',
        payload: { speakers, timeLeft, isActive }
      });
    }
  }, [speakers, timeLeft, isActive, role]);

  // 3. Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // --- VIEW SELECTION ---
  if (!role) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold">Launch MUN System</h1>
        <button onClick={() => setRole('chair')} className="px-10 py-4 bg-blue-600 rounded-xl font-bold w-64">Open Chair Control</button>
        <button onClick={() => setRole('projector')} className="px-10 py-4 bg-slate-700 rounded-xl font-bold w-64">Open Projector View</button>
      </div>
    );
  }

  // --- PROJECTOR VIEW ---
  if (role === 'projector') {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-20 overflow-hidden">
        <div className="text-4xl text-blue-500 font-light mb-10 tracking-[0.5em] uppercase">Current Speaker</div>
        <div className="text-[12rem] font-black uppercase mb-10">{speakers[0] || "No Speaker"}</div>
        <div className={`text-[18rem] font-mono leading-none ${timeLeft < 10 ? 'text-red-600' : 'text-white'}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="mt-20 text-4xl text-slate-500">Up Next: {speakers[1] || "End of List"}</div>
      </div>
    );
  }

  // --- CHAIR VIEW ---
  return (
    <div className="h-screen bg-slate-100 p-8 flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-slate-800">Dais Control Panel</h1>
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left: Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-6xl font-mono font-bold text-center py-10 bg-slate-50 rounded-xl mb-6">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsActive(!isActive)} className={`flex-1 p-4 rounded-xl font-bold text-white ${isActive ? 'bg-orange-500' : 'bg-green-600'}`}>
              {isActive ? 'PAUSE' : 'START'}
            </button>
            <button onClick={() => {setIsActive(false); setTimeLeft(90)}} className="flex-1 p-4 bg-slate-200 rounded-xl font-bold">RESET</button>
          </div>
          <button 
            onClick={() => setSpeakers(speakers.slice(1))} 
            className="w-full mt-4 p-4 bg-blue-600 text-white rounded-xl font-bold"
          >
            NEXT SPEAKER
          </button>
        </div>

        {/* Right: Speaker List Management */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 overflow-y-auto">
          <h2 className="font-bold mb-4">Speakers' List</h2>
          {speakers.map((s, i) => (
            <div key={i} className="p-3 border-b flex justify-between">
              <span>{i+1}. {s}</span>
              <button onClick={() => setSpeakers(speakers.filter((_, idx) => idx !== i))} className="text-red-500 text-sm underline">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MUNApp;