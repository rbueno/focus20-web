import React, { useState, useEffect } from 'react';

export const Compass = ({ degrees = 0, isLoading = false }) => {
  const [rotation, setRotation] = useState(0);
  const [oscillation, setOscillation] = useState(0);

  useEffect(() => {
    let animationId;
    if (isLoading) {
      const animate = () => {
        setRotation(prev => (prev + 10) % 360);
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    } else {
      const targetRotation = degrees % 360;
      const animate = () => {
        setRotation(prev => {
          const diff = targetRotation - prev;
          if (Math.abs(diff) < 0.1) return targetRotation;
          return prev + diff * 0.1;
        });
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationId);
  }, [degrees, isLoading]);

  useEffect(() => {
    const oscillateInterval = setInterval(() => {
      setOscillation(prev => {
        const newValue = prev + 0.1;
        return newValue > Math.PI * 2 ? 0 : newValue;
      });
    }, 50);
    return () => clearInterval(oscillateInterval);
  }, []);

  const oscillationOffset = Math.sin(oscillation) * 3;

  const createArc = (startAngle, endAngle, color) => {
    const start = polarToCartesian(32, 32, 30, endAngle);
    const end = polarToCartesian(32, 32, 30, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A 30 30 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="relative w-64 h-64">
      {/* Colored perimeter */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
        <path d={createArc(0, 45, 'green')} fill="none" stroke="green" strokeWidth="4" />
        <path d={createArc(45, 135, 'yellow')} fill="none" stroke="yellow" strokeWidth="4" />
        <path d={createArc(135, 225, 'red')} fill="none" stroke="red" strokeWidth="4" />
        <path d={createArc(225, 315, 'yellow')} fill="none" stroke="yellow" strokeWidth="4" />
        <path d={createArc(315, 360, 'green')} fill="none" stroke="green" strokeWidth="4" />
      </svg>
      
      {/* Compass circle */}
      <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
      
      {/* Direction indicators */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute top-4 text-lg font-bold text-gray-700">N</span>
        <span className="absolute right-4 text-lg font-bold text-gray-700">E</span>
        <span className="absolute bottom-4 text-lg font-bold text-gray-700">S</span>
        <span className="absolute left-4 text-lg font-bold text-gray-700">W</span>
      </div>
      
      {/* Compass Needle */}
      <div 
        className={`absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-300 ease-out ${isLoading ? 'animate-pulse' : ''}`}
        style={{ transform: `translate(-50%, -100%) rotate(${rotation + oscillationOffset}deg)` }}
      >
        {/* Needle shaft */}
        <div className="w-1 h-14 bg-red-500"></div>
        {/* Triangle tip */}
        <div className="absolute top-0 left-1/2 w-0 h-0 transform -translate-x-1/2 -translate-y-full
                        border-l-4 border-r-4 border-b-8 
                        border-l-transparent border-r-transparent border-b-red-500"></div>
      </div>
      
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-gray-700 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};