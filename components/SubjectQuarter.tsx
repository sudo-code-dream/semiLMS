import React, { useEffect } from "react";
import styles from "../app/(css)/CardCanvas.module.css";
import { QuickActionType3 } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import clsx from "clsx";

const SteampunkCard = ({ action }: { action: QuickActionType3 }) => {
  const router = useRouter();
  const params = useParams();
  const subject = params.subject;
  const number = params.grade;

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
    router.push(`/study-materials/${subject}/${number}/q/${action.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["card-border"]}></div>
        <div className={styles["card-content"]}>
          <div className={clsx(styles.rivets, styles["rivet-1"])}></div>
          <div className={clsx(styles.rivets, styles["rivet-2"])}></div>
          <div className={clsx(styles.rivets, styles["rivet-3"])}></div>
          <div className={clsx(styles.rivets, styles["rivet-4"])}></div>
          <div className={styles["card-pattern"]}></div>

          <div className={clsx(styles.gear, styles["gear-1"])}></div>
          <div className={clsx(styles.gear, styles["gear-2"])}></div>

          <div className={styles["card-header"]}>STEAMPUNK</div>

          <div className={styles["card-image"]}></div>

          <div className={styles["card-body"]}>
            <h2 className={styles["card-title"]}>{action.title}</h2>
            <p className={styles["card-text"]}>{action.description}</p>
            <a href='#' className={styles.btn} onClick={handleLearnClick}>
              Learn
            </a>
          </div>

          <div className={styles["bolts-container"]}>
            <div className={clsx(styles.bolt, styles["bolt-1"])}></div>
            <div className={clsx(styles.bolt, styles["bolt-2"])}></div>
            <div className={clsx(styles.bolt, styles["bolt-3"])}></div>
            <div className={clsx(styles.bolt, styles["bolt-4"])}></div>
            <div className={clsx(styles.bolt, styles["bolt-5"])}></div>
            <div className={clsx(styles.bolt, styles["bolt-6"])}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteampunkCard;
