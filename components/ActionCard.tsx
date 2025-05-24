"use client";
import type { QuickActionType } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// some weird tw bug, but this is how it works
// from-orange-500/10 via-orange-500/5 to-transparent
// from-blue-500/10 via-blue-500/5 to-transparent
// from-purple-500/10 via-purple-500/5 to-transparent
// from-primary/10 via-primary/5 to-transparent

const ActionCard = ({
  action,
  onClick,
  className,
}: {
  action: QuickActionType;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-[#334155]/40 bg-[#1e293b]/40 hover:border-[#4ade80]/30 hover:bg-[#1e293b]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#4ade80]/5 cursor-pointer backdrop-blur-sm",
        className
      )}
      onClick={onClick}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-30 group-hover:opacity-20 transition-opacity`}
      />

      <div className='relative p-4 sm:p-6 size-full'>
        <div className='space-y-2 sm:space-y-3'>
          {/* ACTION ICON */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#1e293b]/80 border border-[#334155]/30 group-hover:scale-105 group-hover:border-[#4ade80]/20 transition-all duration-300`}>
            <action.icon
              className={`h-5 w-5 sm:h-6 sm:w-6 text-${action.color} group-hover:text-[#4ade80] transition-colors duration-300`}
            />
          </div>

          <div className='space-y-1'>
            <h3 className='font-semibold text-lg sm:text-xl text-[#e2e8f0] group-hover:text-[#4ade80] transition-colors duration-300'>
              {action.title}
            </h3>
            <p className='text-xs sm:text-sm text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors duration-300'>
              {action.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActionCard;
