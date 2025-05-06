import React from 'react';

export default function InformationBox() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">Why Report Marine Pollution?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <i className="fas fa-fish text-primary text-lg mr-2"></i>
            <h4 className="font-medium">Protect Marine Life</h4>
          </div>
          <p className="text-sm text-neutral-700">Millions of marine animals are harmed by pollution each year. Your reports help identify hotspots that need cleanup.</p>
        </div>
        <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
          <div className="flex items-center mb-2">
            <i className="fas fa-chart-line text-secondary text-lg mr-2"></i>
            <h4 className="font-medium">Improve Data Collection</h4>
          </div>
          <p className="text-sm text-neutral-700">Accurate reporting helps researchers track pollution sources and develop better prevention methods.</p>
        </div>
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
          <div className="flex items-center mb-2">
            <i className="fas fa-hands-helping text-accent text-lg mr-2"></i>
            <h4 className="font-medium">Community Action</h4>
          </div>
          <p className="text-sm text-neutral-700">Your reports can trigger local cleanup efforts and help communities organize to protect their coastlines.</p>
        </div>
      </div>
    </div>
  );
}
