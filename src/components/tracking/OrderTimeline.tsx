import React from 'react';
import { OrderStatus } from '../../types';
import {
  ClipboardCheck,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Bike,
  PartyPopper
} from 'lucide-react';

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  statusHistory?: { status: OrderStatus; timestamp: string; note: string }[];
}

const STAGES: {
  status: OrderStatus;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}[] = [
  {
    status: 'Order Placed',
    label: 'Order Placed',
    sublabel: 'Received by kitchen',
    icon: ClipboardCheck
  },
  {
    status: 'Confirmed',
    label: 'Confirmed',
    sublabel: 'Slot assigned',
    icon: CheckCircle2
  },
  {
    status: 'Preparing Food',
    label: 'Preparing Food',
    sublabel: 'Hot & fresh on tawa',
    icon: ChefHat
  },
  {
    status: 'Ready for Pickup',
    label: 'Packed & Ready',
    sublabel: 'Insulated hot box',
    icon: PackageCheck
  },
  {
    status: 'Out for Delivery',
    label: 'Out for Delivery',
    sublabel: 'Rider is on the way',
    icon: Bike
  },
  {
    status: 'Delivered',
    label: 'Delivered',
    sublabel: 'Enjoy your meal!',
    icon: PartyPopper
  }
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
  statusHistory = []
}) => {
  const currentIndex = STAGES.findIndex((s) => s.status === currentStatus);

  return (
    <div className="py-4">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute top-6 left-6 right-6 h-1.5 bg-cream-300 rounded-full z-0"></div>

          {/* Active Filled Line */}
          <div
            className="absolute top-6 left-6 h-1.5 bg-forest-500 rounded-full z-0 transition-all duration-500 ease-out"
            style={{
              width: `${(currentIndex / (STAGES.length - 1)) * 90}%`
            }}
          ></div>

          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isPending = idx > currentIndex;
            const Icon = stage.icon;

            const historyMatch = statusHistory.find((h) => h.status === stage.status);

            return (
              <div
                key={stage.status}
                className="relative z-10 flex flex-col items-center text-center max-w-[100px]"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isCurrent
                      ? 'bg-forest-500 text-white ring-4 ring-forest-100 scale-110 animate-pulse'
                      : isCompleted
                      ? 'bg-forest-700 text-cream-100'
                      : 'bg-white border-2 border-cream-300 text-charcoal-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-3">
                  <p
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-forest-700 font-extrabold'
                        : isCompleted
                        ? 'text-charcoal-800'
                        : 'text-charcoal-400'
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p className="text-[10px] text-charcoal-500 mt-0.5">
                    {historyMatch?.timestamp || stage.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden space-y-4">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;
          const Icon = stage.icon;

          const historyMatch = statusHistory.find((h) => h.status === stage.status);

          return (
            <div key={stage.status} className="flex items-start gap-3.5">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 ${
                    isCurrent
                      ? 'bg-forest-500 text-white ring-4 ring-forest-100'
                      : isCompleted
                      ? 'bg-forest-700 text-cream-100'
                      : 'bg-cream-100 border border-cream-300 text-charcoal-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {idx < STAGES.length - 1 && (
                  <div
                    className={`w-0.5 h-10 mt-1 ${
                      isCompleted ? 'bg-forest-500' : 'bg-cream-300'
                    }`}
                  ></div>
                )}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs sm:text-sm font-bold ${
                      isCurrent
                        ? 'text-forest-700 font-extrabold'
                        : isCompleted
                        ? 'text-charcoal-800'
                        : 'text-charcoal-400'
                    }`}
                  >
                    {stage.label}
                  </h4>
                  {historyMatch && (
                    <span className="text-[11px] font-mono text-charcoal-500">
                      {historyMatch.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  {historyMatch?.note || stage.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
