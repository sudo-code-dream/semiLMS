"use client"
import React from 'react';
import { QuickActionType2} from "@/constants";
import {Card} from "@/components/ui/card";

// some weird tw bug, but this is how it works
// from-orange-500/10 via-orange-500/5 to-transparent
// from-blue-500/10 via-blue-500/5 to-transparent
// from-purple-500/10 via-purple-500/5 to-transparent
// from-primary/10 via-primary/5 to-transparent

const StudyMaterialCard = ({action, onClick }: {action: QuickActionType2; onClick: () => void}) => {
    return (
        <Card
            className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={onClick}
        >
            
            <div
                className={`absolute inset-0 bg-gradient-to-br bg-center bg-no-repeat bg-contain opacity-100 group-hover:opacity-50 transition-opacity`}
                style={{ backgroundImage: `url(${action.bannerUrl})` }}
            />

            <div className="relative p-6 size-full">
                <div className="space-y-3">
                    {/* ACTION ICON */}
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10 group-hover:scale-110 transition-transform`}
                    >
                        <action.icon className={`h-6 w-6 text-${action.color}`} />
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                            {action.title}
                        </h3>
                        <p className="text-sm text-slate-400 hover:text-slate-200">{action.description}</p>
                    </div>


                </div>
            </div>
            

        </Card>
    );
};

export default StudyMaterialCard;
 