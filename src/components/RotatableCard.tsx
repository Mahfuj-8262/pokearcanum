"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export interface RotatableCardProps {
  front: string;
  back: string;
  width?: number;
  height?: number;
}

function clampTo180(angle: number) {
  return ((((angle + 180) % 360) + 360) % 360) - 180;
}

export const RotatableCard: React.FC<RotatableCardProps> = ({
  front,
  back,
  width = 300,
  height = 420,
}) => {
  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isIdleSpinning, setIsIdleSpinning] = useState(true);
  const idleSpinRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const dragState = useRef<{ startX: number; startRotation: number } | null>(null);

  useEffect(() => {
    if (!isIdleSpinning) {
      if (idleSpinRef.current) cancelAnimationFrame(idleSpinRef.current);
      idleSpinRef.current = null;
      return;
    }
    let last = performance.now();
    function tick(now: number) {
      const dt = now - last;
      last = now;
      const degreesPerMs = 60 / 1000;
      rotation.set(rotation.get() + dt * degreesPerMs);
      idleSpinRef.current = requestAnimationFrame(tick);
    }
    idleSpinRef.current = requestAnimationFrame(tick);
    return () => {
      if (idleSpinRef.current) cancelAnimationFrame(idleSpinRef.current);
      idleSpinRef.current = null;
    };
  }, [isIdleSpinning]);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (idleSpinRef.current) cancelAnimationFrame(idleSpinRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsIdleSpinning(false);
    dragState.current = { startX: e.clientX, startRotation: rotation.get() };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    rotation.set(dragState.current.startRotation + dx);
  };

  const handlePointerUp = () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    setIsDragging(false);

    const angle = clampTo180(rotation.get());
    let target = 0;
    if (angle > 90) target = 180;
    else if (angle < -90) target = -180;

    animate(rotation, target, {
      type: "spring",
      stiffness: 400,
      damping: 32,
      onComplete: () => {
        rotation.set(target);
        setIsIdleSpinning(true); 
      },
    });

    dragState.current = null;
  };

  const disableDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={{
          width,
          height,
          perspective: 1200,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          position: "relative",
          touchAction: "none"
        }}
        onPointerDown={handlePointerDown}
        onDoubleClick={disableDoubleClick}
        tabIndex={0}
        role="button"
        aria-label="Rotate card"
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            rotateY: rotation,
            transition: isDragging
              ? "none"
              : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            position: "relative",
          }}
        >
          {/* Front */}
          <div
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <img
              src={front}
              alt="Front of card"
              draggable={false}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
              }}
            />
          </div>
          {/* back */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <img
              src={back}
              alt="Back of card"
              draggable={false}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 360 degree icon */}
      <div className="mt-2 flex flex-col items-center select-none opacity-90">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="40" y="18" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">360°</text>
          <path d="M10 30 Q40 45 70 30" stroke="#fff" strokeWidth="2.5" fill="none"/>
          <polygon points="18,33 10,30 18,27" fill="#fff"/>
          <polygon points="62,27 70,30 62,33" fill="#fff"/>
        </svg>
      </div>
    </div>
  );
};