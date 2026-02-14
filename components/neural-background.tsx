"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseOffset: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const NODE_COUNT = 60;
    const CONNECTION_DISTANCE = 180;
    const NODE_SPEED = 0.25;
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initNodes() {
      if (!canvas) return;
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseRadius = Math.random() * 1.5 + 0.5;
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
      time += 0.005;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow animated gradient overlay
      const gradAngle = time * 0.3;
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
      gradient.addColorStop(0, "rgba(140, 30, 20, 0.06)");
      gradient.addColorStop(0.5, "rgba(180, 80, 30, 0.04)");
      gradient.addColorStop(1, "rgba(200, 160, 60, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Gentle pulsing radius
        node.radius =
          node.baseRadius +
          Math.sin(time * 2 + node.pulseOffset) * node.baseRadius * 0.4;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(215, 120, 60, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse glow
      for (const node of nodes) {
        const pulseIntensity =
          0.3 + Math.sin(time * 2 + node.pulseOffset) * 0.15;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 120, 60, ${pulseIntensity * 0.08})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 120, 60, ${pulseIntensity + 0.1})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    initNodes();
    animate();

    const handleResize = () => {
      resize();
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
