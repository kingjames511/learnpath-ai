import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingProps {
  progress: number; // 0–100
}

export const LoadingComponent: React.FC<LoadingProps> = ({ progress }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    const animation = animate(count, progress, {
      duration: 0.4,
      ease: "easeOut",
    });
    return animation.stop;
  }, [progress]);

  const layers = [
    { color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", delay: 0 },
    { color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", delay: 0.1 },
    { color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", delay: 0.2 },
    { color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", delay: 0.3 },
    { color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", delay: 0.4 },
    { color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", delay: 0.5 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      {/* 3D Stacked Layers Container */}
       <motion.div
        className="text-3xl  font-bold text-gray-800"
        style={{
          textShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {displayValue}%
      </motion.div>
      <div
        style={{
          perspective: "800px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "140px",
            transformStyle: "preserve-3d",
          }}
        >
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                width: "100px",
                height: "15px",
                background: layer.color,
                borderRadius: "6px",
                boxShadow: `
                  0 ${3 + index}px ${6 + index}px rgba(0, 0, 0, 0.2),
                  0 0 15px rgba(255, 255, 255, 0.1)
                `,
                top: `${index * 20}px`,
                transformStyle: "preserve-3d",
              }}
              initial={{
                x: index % 2 === 0 ? -200 : 200,
                opacity: 0,
                rotateY: index % 2 === 0 ? -90 : 90,
              }}
              animate={{
                x: 0,
                opacity: 1,
                rotateY: [
                  index % 2 === 0 ? -90 : 90,
                  0,
                  index % 2 === 0 ? 5 : -5,
                  index % 2 === 0 ? -5 : 5,
                  0,
                ],
                scale: [0.8, 1, 1.02, 0.98, 1],
                z: [0, 15, 8, 3, 0],
              }}
              transition={{
                duration: 1.5,
                delay: layer.delay,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>


     
    </div>
  );
};
