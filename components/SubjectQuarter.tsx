import React, { useEffect } from "react";
import "../app/(root)/study-materials/[subject]/[number]/CardCanvas.css";
import {QuickActionType3} from "@/constants";
import {useParams, useRouter} from "next/navigation";

const SteampunkCard = ({action}: {action: QuickActionType3}) => {
    const router = useRouter();
    const params = useParams();
    const subject = params.subject;
    const number = params.number;


    useEffect(() => {
        const pipeSystem = document.querySelector(".pipe-system");
        const joint = document.querySelector(".pipe-joint-1");

        if (pipeSystem && joint) {
            const interval = setInterval(() => {
                const steam = document.createElement("div");
                steam.classList.add("steam");

                const jointRect = joint.getBoundingClientRect();
                const offsetTop = jointRect.top + window.scrollY;
                const offsetLeft = jointRect.left + window.scrollX;

                steam.style.top = `${offsetTop}px`;
                steam.style.left = `${offsetLeft}px`;

                pipeSystem.appendChild(steam);

                setTimeout(() => {
                    steam.remove();
                }, 3000);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, []);

    const handleLearnClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/study-materials/${subject}/${number}/q-${action.id}`);
    };


    return (
        <div className="container"
        >

            <div className="card">
                <div className="card-border"></div>
                <div className="card-content">
                    <div className="rivets rivet-1"></div>
                    <div className="rivets rivet-2"></div>
                    <div className="rivets rivet-3"></div>
                    <div className="rivets rivet-4"></div>
                    <div className="card-pattern"></div>

                    <div className="gear gear-1"></div>
                    <div className="gear gear-2"></div>

                    <div className="card-header">STEAMPUNK</div>

                    <div className="card-image"></div>

                    <div className="card-body">
                        <h2 className="card-title">{action.title}</h2>
                        <p className="card-text">
                            {action.description}
                        </p>
                        <a
                            href="#"
                            className="btn"
                            onClick={handleLearnClick}
                        >Learn</a>
                    </div>

                    <div className="bolts-container">
                        <div className="bolt bolt-1"></div>
                        <div className="bolt bolt-2"></div>
                        <div className="bolt bolt-3"></div>
                        <div className="bolt bolt-4"></div>
                        <div className="bolt bolt-5"></div>
                        <div className="bolt bolt-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SteampunkCard;
