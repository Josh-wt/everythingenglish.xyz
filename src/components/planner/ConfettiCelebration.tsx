import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

interface ConfettiCelebrationProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  isActive,
  duration = 3000,
  onComplete
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE',
    '#85C1E9', '#F8C471'
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    velocityX: (Math.random() - 0.5) * 4,
    velocityY: Math.random() * 3 + 2,
    rotationSpeed: (Math.random() - 0.5) * 10
  });

  useEffect(() => {
    if (!isActive) {
      setConfetti([]);
      return;
    }

    let animationId: number;
    const pieces: ConfettiPiece[] = [];
    
    // Create initial confetti pieces
    for (let i = 0; i < 50; i++) {
      pieces.push(createConfettiPiece(i));
    }

    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Update confetti positions
      pieces.forEach(piece => {
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.rotation += piece.rotationSpeed;
        piece.velocityY += 0.3; // gravity
      });

      // Remove pieces that have fallen off screen and add new ones
      for (let i = pieces.length - 1; i >= 0; i--) {
        if (pieces[i].y > window.innerHeight + 20) {
          pieces.splice(i, 1);
          
          // Add new piece at the top occasionally
          if (Math.random() < 0.3) {
            pieces.push(createConfettiPiece(Date.now() + Math.random()));
          }
        }
      }

      setConfetti([...pieces]);

      if (pieces.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    // Stop animation after duration
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationId);
      setConfetti([]);
      onComplete?.();
    }, duration);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeout);
    };
  }, [isActive, duration, onComplete]);

  if (!isActive || confetti.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
};