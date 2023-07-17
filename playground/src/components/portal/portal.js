import React, { useEffect, useRef, useState } from 'react';

const CircleClustersAnimation = () => {
  const circlesData = [
    { ring: 1, numCircles: 8 },
    { ring: 2, numCircles: 16 },
    { ring: 3, numCircles: 34 }
  ];

  const circleSize = 20;
  const center = { x: 300, y: 300 };
  const ringSpacing = 120; // Increased spacing between rings
  const waveSpeed = 0.12; // Speed of the wave animation

  const [animationType, setAnimationType] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const svgRef = useRef(null);

  const animateWave = () => {
    const numRings = circlesData.length;

    let frame = 0;
    const intervalId = setInterval(() => {
      if (!isPlaying) {
        clearInterval(intervalId);
        return;
      }

      for (let ring = 0; ring < numRings; ring++) {
        const circles = svgRef.current.querySelectorAll(`.circle-ring-${ring}`);

        for (let i = 0; i < circles.length; i++) {
          const circle = circles[i];
          const offset = Math.sin(frame * waveSpeed + (i / circles.length) * Math.PI * 2);
          const colorIntensity = Math.abs(offset);
          const colorValue = Math.floor(255 * colorIntensity);

          setTimeout(() => {
            circle.setAttribute('fill', `rgb(${colorValue}, ${colorValue}, ${colorValue})`);
          }, (numRings - ring) * 200);
        }
      }

      frame++;
    }, 1000 / 30); // Run the animation at 30 frames per second

    return () => {
      clearInterval(intervalId);
    };
  };

  const animateScatter = () => {
    const numRings = circlesData.length;

    let frame = 0;
    const intervalId = setInterval(() => {
      if (!isPlaying) {
        clearInterval(intervalId);
        return;
      }

      for (let ring = 0; ring < numRings; ring++) {
        const circles = svgRef.current.querySelectorAll(`.circle-ring-${ring}`);

        for (let i = 0; i < circles.length; i++) {
          const circle = circles[i];
          const xRange = (ring + 1) * ringSpacing * 0.8; // Adjust the scatter range here
          const yRange = (ring + 1) * ringSpacing * 0.8; // Adjust the scatter range here
          const x = center.x + xRange * (Math.random() - 0.5);
          const y = center.y + yRange * (Math.random() - 0.5);

          setTimeout(() => {
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
          }, (numRings - ring) * 200);
        }
      }

      frame++;
    }, 1000 / 60); // Run the animation at 60 frames per second

    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(() => {
    if (isPlaying) {
      switch (animationType) {
        case 'wave':
          animateWave();
          break;
        case 'scatter':
          animateScatter();
          break;
        default:
          break;
      }
    }
  }, [isPlaying, animationType]);

  useEffect(() => {
    for (let ring = 0; ring < circlesData.length; ring++) {
      const numCircles = circlesData[ring].numCircles;

      for (let i = 0; i < numCircles; i++) {
        const angle = (Math.PI * 2 * i) / numCircles;
        const radius = ring * ringSpacing;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);

        const circle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle.setAttribute('class', `circle-ring-${ring}`);
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', circleSize);
        circle.setAttribute('fill', 'white');
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('strokeWidth', '1');

        svgRef.current.appendChild(circle);
      }
    }
  }, []);

  const handleAnimationClick = (type) => {
    if (isPlaying && animationType === type) {
      setIsPlaying(false);
      setAnimationType('');
    } else {
      setIsPlaying(true);
      setAnimationType(type);
    }
  };

  return (
    <div>
      <svg
        ref={svgRef}
        width={600}
        height={600}
        style={{ background: 'black' }}
      />
      <div>
        <button onClick={() => handleAnimationClick('wave')}>
          {animationType === 'wave' && isPlaying ? 'Stop Wave' : 'Play Wave'}
        </button>
        <button onClick={() => handleAnimationClick('scatter')}>
          {animationType === 'scatter' && isPlaying ? 'Stop Scatter' : 'Play Scatter'}
        </button>
        {/* Add more buttons for additional animation types */}
      </div>
    </div>
  );
};

export default CircleClustersAnimation;
