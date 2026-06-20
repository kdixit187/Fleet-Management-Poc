import React, { useState } from 'react';

// Yeh default export sahi hai
export default function LiveMap() {
  const [selectedVehicle, setSelectedVehicle] = useState('TRK-4022');
  // ... baaki ka aapka code ...

  const liveVehicles = [
    { id: 'TRK-4022', driver: 'Rajesh Kumar', route: 'Mumbai → Delhi', status: 'On Time', load: 'Electronic Items (14 Tons)', speed: '68 km/h', eta: '4 hrs' },
    { id: 'TRK-8819', driver: 'Amit Sharma', route: 'Jaipur → Udaipur', status: 'Delayed', load: 'Industrial Gears (22 Tons)', speed: '45 km/h', eta: '1.5 hrs' },
    { id: 'TRK-1092', driver: 'Vikram Singh', route: 'Ahmedabad → Bhilwara', status: 'On Time', load: 'Textile Fabric (8 Tons)', speed: '72 km/h', eta: '35 mins' },
    { id: 'TRK-5541', driver: 'Sanjay Dutt', route: 'Delhi → Chandigarh', status: 'Critical', load: 'Perishable Dairy (6 Tons)', speed: '0 km/h (Stopped)', eta: 'Unknown' },
  ];

  const currentVehicleData = liveVehicles.find(v => v.id === selectedVehicle) || liveVehicles[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live Shipment Fleet Map</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time GPS telemetry tracks and route tracking management.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar: Truck List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs h-[500px] flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <input 
              type="text" 
              placeholder="Search active trucks, routes..." 
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {liveVehicles.map((truck) => (
              <button
                key={truck.id}
                onClick={() => setSelectedVehicle(truck.id)}
                className={`w-full p-4 text-left flex justify-between items-start transition-colors ${
                  selectedVehicle === truck.id ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-mono font-bold text-slate-900">{truck.id}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{truck.route}</div>
                  <div className="text-xs text-slate-400 mt-1">Driver: {truck.driver}</div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  truck.status === 'On Time' ? 'bg-emerald-50 text-emerald-700' :
                  truck.status === 'Delayed' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {truck.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Visual Map Engine Simulator */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#0f172a] rounded-xl border border-slate-800 h-[340px] relative overflow-hidden flex items-center justify-center text-slate-500">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-dashed border-t-2 border-blue-500/40"></div>
            <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
            <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>

            <p className="z-10 text-xs font-mono tracking-wider text-slate-400 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700">
              📍 [MAP RENDERING CANVAS ENGINE Active for {currentVehicleData.id}]
            </p>
          </div>

          {/* Telemetry Status HUD */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xs">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Active Speed</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">{currentVehicleData.speed}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Est. Arrival Time</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">{currentVehicleData.eta}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-slate-400 font-medium uppercase">Manifest Load</p>
              <p className="text-sm font-semibold text-slate-700 mt-1 truncate">{currentVehicleData.load}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export default LiveMap;