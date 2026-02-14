"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseOffset: number;
}

function getScrollProgress(): number {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 0;
  return Math.max(0, Math.min(1, window.scrollY / scrollHeight));
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  const handleScroll = useCallback(() => {
    progressRef.current = getScrollProgress();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const NODE_COUNT = 65;
    const CONNECTION_DISTANCE = 190;
    const NODE_SPEED = 0.22;
    let time = 0;

    // Wispy line state
    const wisps = [
      { y: 0.3, speed: 0.08, offset: 0, amplitude: 40, frequency: 0.003 },
    ];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initNodes() {
      if (!canvas) return;
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseRadius = Math.random() * 1.8 + 0.5;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * NODE_SPEED,
          vy: (Math.random() - 0.5) * NODE_SPEED,
          radius: baseRadius,
          baseRadius,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      time += 0.004;

      const p = progressRef.current;
      // Enhanced opacity curve: visible on dark, subtle on light
      const baseOpacity = Math.max(0.15, 1 - p * 0.6);

      // Node color: warm amber → dark sienna (slightly more contrast now)
      const nr = Math.round(220 - p * 145);
      const ng = Math.round(130 - p * 80);
      const nb = Math.round(65 - p * 35);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow animated gradient overlay
      const gradAngle = time * 0.25;
      const gx = Math.cos(gradAngle) * canvas.width * 0.5 + canvas.width * 0.5;
      const gy = Math.sin(gradAngle) * canvas.height * 0.5 + canvas.height * 0.5;
      const gradient = ctx.createRadialGradient(
        gx,
        gy,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      const overlayMult = baseOpacity * 0.8;
      gradient.addColorStop(0, `rgba(${nr}, ${ng}, ${nb}, ${0.07 * overlayMult})`);
      gradient.addColorStop(0.5, `rgba(${nr}, ${ng}, ${nb}, ${0.04 * overlayMult})`);
      gradient.addColorStop(1, `rgba(${nr}, ${ng}, ${nb}, ${0.02 * overlayMult})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.radius =
          node.baseRadius +
          Math.sin(time * 2 + node.pulseOffset) * node.baseRadius * 0.45;
      }

      // Draw connections (slightly more visible)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity =
              (1 - distance / CONNECTION_DISTANCE) * 0.15 * baseOpacity;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${nr}, ${ng}, ${nb}, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse glow
      for (const node of nodes) {
        const pulseIntensity =
          0.35 + Math.sin(time * 2 + node.pulseOffset) * 0.18;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nr}, ${ng}, ${nb}, ${pulseIntensity * 0.09 * baseOpacity})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nr}, ${ng}, ${nb}, ${(pulseIntensity + 0.12) * baseOpacity})`;
        ctx.fill();
      }

      // Wispy atmospheric line (desktop only: skip if <768 wide)
      if (canvas.width >= 768) {
        for (const wisp of wisps) {
          const baseY = canvas.height * wisp.y;
          const shift = time * wisp.speed * canvas.width;
          ctx.beginPath();
          ctx.moveTo(0, baseY);
          for (let x = 0; x <= canvas.width; x += 4) {
            const waveY =
              baseY +
              Math.sin((x + shift) * wisp.frequency + wisp.offset) *
                wisp.amplitude +
              Math.sin((x + shift) * wisp.frequency * 2.3 + 1.5) *
                wisp.amplitude * 0.3;
            ctx.lineTo(x, waveY);
          }
          // Very faint: 5-8% opacity, white on dark, dark on light
          const wispOpacity = (0.04 + Math.sin(time * 0.5) * 0.02) * baseOpacity;
          const wR = p < 0.5 ? 255 : Math.round(255 - p * 200);
          const wG = p < 0.5 ? 255 : Math.round(255 - p * 200);
          const wB = p < 0.5 ? 255 : Math.round(255 - p * 200);
          ctx.strokeStyle = `rgba(${wR}, ${wG}, ${wB}, ${wispOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.filter = "blur(2px)";
          ctx.stroke();
          ctx.filter = "none";
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    initNodes();
    handleScroll();
    animate();

    const resizeHandler = () => {
      resize();
      initNodes();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
