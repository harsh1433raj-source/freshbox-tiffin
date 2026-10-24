import React from 'react';
import { OrderStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { FastForward, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DemoSimulatorProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const ALL_STAGES: OrderStatus[] = [
  'Order Placed',
  'Confirmed',
  'Preparing Food',
  'Ready for Pickup',
  'Out for Delivery',
  'Delivered'
];

export const DemoSimulator: React.FC<DemoSimulatorProps> = ({
  orderId,
  currentStatus
}) => {
  const { advanceOrderStatus, updateOrderStatus } = useApp();

  const currentIndex = ALL_STAGES.indexOf(currentStatus);
  const isFinal = currentIndex === ALL_STAGES.length - 1;
  const nextStage = !isFinal ? ALL_STAGES[currentIndex + 1] : null;

  return (
    <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-3xl p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Play className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-charcoal-800">
              Demo Order Status Simulator
            </h4>
            <p className="text-[11px] text-amber-800">
              Frontend simulation • Test rider progress and kitchen notifications
            </p>
          </div>
        </div>

        <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full font-mono">
          Stage {currentIndex + 1} of 6
        </span>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Advance Next Button */}
        <button
          type="button"
          onClick={() => advanceOrderStatus(orderId)}
          disabled={isFinal}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-md ${
            isFinal
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-forest-500 hover:bg-forest-600 text-white active:scale-98 shadow-forest-500/20'
          }`}
        >
          {isFinal ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Order Delivered (Complete)</span>
            </>
          ) : (
            <>
              <FastForward className="w-4 h-4" />
              <span>Advance to: {nextStage}</span>
            </>
          )}
        </button>

        {/* Jump to Any Stage Dropdown */}
        <div className="sm:w-56 flex items-center gap-2">
          <label htmlFor="stage-select" className="text-xs font-bold text-charcoal-600 shrink-0">
            Jump to:
          </label>
          <select
            id="stage-select"
            value={currentStatus}
            onChange={(e) => updateOrderStatus(orderId, e.target.value as OrderStatus)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-amber-300 bg-white text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer shadow-xs"
          >
            {ALL_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[11px] text-amber-800 mt-3 flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        Status updates persist in localStorage and immediately sync with the{' '}
        <a href="/admin" className="font-bold underline hover:text-amber-950">
          Admin Dashboard
        </a>.
      </p>
    </div>
  );
};
