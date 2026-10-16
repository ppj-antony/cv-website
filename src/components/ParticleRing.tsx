'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleRingProps {
  className?: string;
}

export default function ParticleRing({ className = '' }: ParticleRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: 'high-performance',
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL is not supported on this device/browser.');
      return;
    }

    const glCtx: WebGLRenderingContext = gl;
    const canvasEl: HTMLCanvasElement = canvas;

    // Vertex Shader in GLSL
    const vsSource = `
      precision highp float;

      attribute float a_id;
      attribute float a_type; // 0.0 = core, 1.0 = dust

      uniform vec2 u_resolution;
      uniform float u_dpr;
      uniform float u_time;
      uniform float u_intensity;
      uniform float u_tilt;
      uniform float u_spread;
      uniform vec2 u_centerOffset;

      varying vec3 v_color;
      varying float v_alpha;

      // Brand Palette: glowing warm orange (#FF8F48), amber gold (#FFAE33), coral (#FF6020), off-white (#FFF5EB)
      vec3 brandPalette(float t) {
        float phase = fract(t);
        vec3 cOrange = vec3(1.0, 0.56, 0.28);  // #FF8F48
        vec3 cAmber  = vec3(1.0, 0.74, 0.30);  // amber / gold
        vec3 cCoral  = vec3(1.0, 0.40, 0.16);  // coral / flame
        vec3 cWhite  = vec3(1.0, 0.96, 0.90);  // warm bright highlight

        if (phase < 0.33) {
          return mix(cOrange, cAmber, phase / 0.33);
        } else if (phase < 0.66) {
          return mix(cAmber, cCoral, (phase - 0.33) / 0.33);
        } else {
          return mix(cCoral, cWhite, (phase - 0.66) / 0.34);
        }
      }

      float hash11(float v) {
        return fract(sin(v * 12.9898) * 43758.5453);
      }

      float centeredRandom(float id, float offset) {
        return (
          hash11(id + offset) +
          hash11(id + offset + 19.19) +
          hash11(id + offset + 41.73) -
          1.5
        ) / 1.5;
      }

      void main() {
        float id = a_id;
        float isDust = a_type;

        // Crisper particle size configuration
        float particleSize = mix(0.9, 1.35, isDust);
        float cloudWidth = mix(0.95, 1.45, isDust);
        float baseOpacity = mix(0.95, 0.35, isDust);

        float seed = hash11(id + 1.0);
        float speed = 0.24 + hash11(id + 2.0) * 0.18;
        float phase = seed * 6.2831853 + u_time * speed;

        float radialOffset = centeredRandom(id, 3.0);
        float axialOffset = centeredRandom(id, 7.0);
        float tiltOffset = centeredRandom(id, 11.0);
        float rotationOffset = centeredRandom(id, 15.0);

        float radius = 0.72 + radialOffset * 0.16 * cloudWidth * u_spread;
        float axial = axialOffset * 0.2 * cloudWidth * u_spread;
        float angle = phase + centeredRandom(id, 17.0) * 0.04;
        float tilt = u_tilt + tiltOffset * 0.18;

        vec3 cylinder = vec3(
          cos(angle) * radius,
          sin(angle) * radius,
          axial
        );

        vec3 tilted = vec3(
          cylinder.x,
          cylinder.y * cos(tilt) + cylinder.z * sin(tilt),
          -cylinder.y * sin(tilt) + cylinder.z * cos(tilt)
        );

        float rotation = -0.24 + rotationOffset * 0.16;
        vec2 rotated = vec2(
          tilted.x * cos(rotation) - tilted.y * sin(rotation),
          tilted.x * sin(rotation) + tilted.y * cos(rotation)
        );

        float near = clamp(0.5 + tilted.z * 0.68, 0.0, 1.0);
        float perspective = 1.0 / (1.0 - tilted.z * 0.48);
        float aspect = u_resolution.x / u_resolution.y;

        vec2 particleCenter = vec2(rotated.x / aspect, rotated.y) * perspective + u_centerOffset;

        float depthScale = mix(0.65, 1.9, near);
        float viewportScale = clamp(min(u_resolution.x, u_resolution.y) / 700.0, 0.8, 2.2);
        
        // Exact sharp scale: visible fine specks of light
        float size = (0.55 + hash11(id + 5.0) * 0.7) * particleSize * depthScale * viewportScale * u_dpr * 1.55;

        gl_Position = vec4(particleCenter, 0.0, 1.0);
        gl_PointSize = max(1.5, size);

        v_color = brandPalette(phase / 6.2831853 + seed * 0.12 + u_time * 0.015);
        v_alpha = baseOpacity * mix(0.45, 1.0, near) * u_intensity;
      }
    `;

    // Fragment Shader in GLSL
    const fsSource = `
      precision highp float;

      varying vec3 v_color;
      varying float v_alpha;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord) * 2.0;
        if (dist > 1.0) {
          discard;
        }

        // Crisp, distinct circle with sharp anti-aliased edge instead of blurry haze
        float point = 1.0 - smoothstep(0.55, 0.98, dist);
        // Bright glittering diamond core
        float core = 1.0 - smoothstep(0.0, 0.35, dist);

        vec3 brightColor = v_color + vec3(0.4, 0.35, 0.25) * core;
        gl_FragColor = vec4(brightColor * point * v_alpha, point * v_alpha);
      }
    `;

    // Shader compilation helper
    function createShader(context: WebGLRenderingContext, type: number, source: string) {
      const shader = context.createShader(type);
      if (!shader) return null;
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error(context.getShaderInfoLog(shader));
        context.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(glCtx, glCtx.VERTEX_SHADER, vsSource);
    const fs = createShader(glCtx, glCtx.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = glCtx.createProgram();
    if (!program) return;
    glCtx.attachShader(program, vs);
    glCtx.attachShader(program, fs);
    glCtx.linkProgram(program);
    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      console.error(glCtx.getProgramInfoLog(program));
      return;
    }

    glCtx.useProgram(program);

    // Attribute & Uniform locations
    const aIdLoc = glCtx.getAttribLocation(program, 'a_id');
    const aTypeLoc = glCtx.getAttribLocation(program, 'a_type');

    const uResolutionLoc = glCtx.getUniformLocation(program, 'u_resolution');
    const uDprLoc = glCtx.getUniformLocation(program, 'u_dpr');
    const uTimeLoc = glCtx.getUniformLocation(program, 'u_time');
    const uIntensityLoc = glCtx.getUniformLocation(program, 'u_intensity');
    const uTiltLoc = glCtx.getUniformLocation(program, 'u_tilt');
    const uSpreadLoc = glCtx.getUniformLocation(program, 'u_spread');
    const uCenterOffsetLoc = glCtx.getUniformLocation(program, 'u_centerOffset');

    // Generate Particle Buffers - high density of fine particles
    const CORE_COUNT = 14000;
    const DUST_COUNT = 4000;
    const TOTAL_COUNT = CORE_COUNT + DUST_COUNT;

    const ids = new Float32Array(TOTAL_COUNT);
    const types = new Float32Array(TOTAL_COUNT);

    for (let i = 0; i < CORE_COUNT; i++) {
      ids[i] = i;
      types[i] = 0.0; // Core
    }
    for (let i = 0; i < DUST_COUNT; i++) {
      ids[CORE_COUNT + i] = 20000 + i;
      types[CORE_COUNT + i] = 1.0; // Dust
    }

    const idBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, idBuffer);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, ids, glCtx.STATIC_DRAW);
    glCtx.enableVertexAttribArray(aIdLoc);
    glCtx.vertexAttribPointer(aIdLoc, 1, glCtx.FLOAT, false, 0, 0);

    const typeBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, typeBuffer);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, types, glCtx.STATIC_DRAW);
    glCtx.enableVertexAttribArray(aTypeLoc);
    glCtx.vertexAttribPointer(aTypeLoc, 1, glCtx.FLOAT, false, 0, 0);

    // WebGL State: Additive Blending for glowing particles
    glCtx.enable(glCtx.BLEND);
    glCtx.blendFunc(glCtx.SRC_ALPHA, glCtx.ONE);
    glCtx.clearColor(0.0, 0.0, 0.0, 0.0);

    // State Variables for physics
    let speedTarget = 1.0;
    let speedCurrent = 1.0;
    let tiltTarget = 0.88;
    let tiltCurrent = 0.88;
    let spreadTarget = 1.0;
    let spreadCurrent = 1.0;
    let intensity = 0.0;
    let elapsed = 0.0;
    let lastTime = performance.now();
    let animId = 0;

    // Resize handling
    let width = 0;
    let height = 0;
    let currentDpr = 1.0;

    function resize() {
      if (!canvasEl || !container) return;
      const rect = container.getBoundingClientRect();
      currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      canvasEl.width = Math.floor(width * currentDpr);
      canvasEl.height = Math.floor(height * currentDpr);
      glCtx.viewport(0, 0, canvasEl.width, canvasEl.height);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Animation Loop
    function render(now: number) {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth lerp physics
      speedCurrent += (speedTarget - speedCurrent) * Math.min(delta * 4, 1);
      tiltCurrent += (tiltTarget - tiltCurrent) * Math.min(delta * 4, 1);
      spreadCurrent += (spreadTarget - spreadCurrent) * Math.min(delta * 6, 1);
      if (intensity < 1.0) {
        intensity = Math.min(intensity + delta * 1.2, 1.0);
      }

      elapsed += delta * speedCurrent;

      // Draw
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      glCtx.useProgram(program);
      glCtx.uniform2f(uResolutionLoc, canvasEl.width, canvasEl.height);
      glCtx.uniform1f(uDprLoc, currentDpr);
      glCtx.uniform1f(uTimeLoc, elapsed);
      glCtx.uniform1f(uIntensityLoc, intensity);
      glCtx.uniform1f(uTiltLoc, tiltCurrent);
      glCtx.uniform1f(uSpreadLoc, spreadCurrent);

      // On wide screens, position the center slightly right (+0.28) and slightly down (+0.05)
      // On narrow screens (mobile), keep it centered (0.0)
      const centerOffsetX = width > 768 ? 0.28 : 0.0;
      const centerOffsetY = width > 768 ? 0.02 : -0.08;
      glCtx.uniform2f(uCenterOffsetLoc, centerOffsetX, centerOffsetY);

      glCtx.drawArrays(glCtx.POINTS, 0, TOTAL_COUNT);

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    // Interactive pointer handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const xProgress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const yProgress = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      speedTarget = 0.2 + xProgress * 2.8;
      tiltTarget = 0.35 + yProgress * 1.05;
    };

    const handlePointerDown = () => {
      spreadTarget = 0.18; // Tighten the cloud!
    };

    const handlePointerUp = () => {
      spreadTarget = 1.0; // Expand back
    };

    const targetElement = container;
    targetElement.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      targetElement.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      // Cleanup WebGL
      glCtx.deleteBuffer(idBuffer);
      glCtx.deleteBuffer(typeBuffer);
      glCtx.deleteProgram(program);
      glCtx.deleteShader(vs);
      glCtx.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D particle vortex"
        className="w-full h-full block"
      />
    </div>
  );
}
