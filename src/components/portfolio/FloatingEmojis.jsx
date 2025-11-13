import React from 'react';

const emojis = [
  { emoji: '🎹', delay: '0s', duration: '15s', startX: '10%', endX: '20%' },
  { emoji: '🎸', delay: '2s', duration: '18s', startX: '85%', endX: '75%' },
  { emoji: '🎧', delay: '4s', duration: '20s', startX: '15%', endX: '25%' },
  { emoji: '📷', delay: '1s', duration: '16s', startX: '80%', endX: '70%' },
  { emoji: '🎵', delay: '3s', duration: '14s', startX: '50%', endX: '45%' },
  { emoji: '🎤', delay: '5s', duration: '17s', startX: '30%', endX: '35%' },
];

export default function FloatingEmojis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((item, index) => (
        <div
          key={index}
          className="absolute text-6xl opacity-20 animate-float"
          style={{
            left: item.startX,
            animation: `float-custom ${item.duration} infinite ease-in-out`,
            animationDelay: item.delay,
            '--end-x': item.endX,
          }}
        >
          {item.emoji}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float-custom {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20vh) translateX(20px) rotate(180deg);
            opacity: 0.2;
          }
          90% {
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float-custom 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}