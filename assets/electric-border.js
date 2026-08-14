/**
 * ElectricBorder — vanilla port of React Bits ElectricBorder
 * Inspired by @BalintFerenczy https://codepen.io/BalintFerenczy/pen/KwdoyEN
 */
(function () {
  'use strict';

  function random(x) {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }

  function noise2D(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;

    const a = random(i + j * 57);
    const b = random(i + 1 + j * 57);
    const c = random(i + (j + 1) * 57);
    const d = random(i + 1 + (j + 1) * 57);

    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);

    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  }

  function octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
    let y = 0;
    let amplitude = baseAmplitude;
    let frequency = baseFrequency;

    for (let i = 0; i < octaves; i++) {
      let octaveAmplitude = amplitude;
      if (i === 0) octaveAmplitude *= baseFlatness;
      y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return y;
  }

  function getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
    const angle = startAngle + progress * arcLength;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  }

  function getRoundedRectPoint(t, left, top, width, height, radius) {
    const straightWidth = width - 2 * radius;
    const straightHeight = height - 2 * radius;
    const cornerArc = (Math.PI * radius) / 2;
    const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
    const distance = t * totalPerimeter;
    let accumulated = 0;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + radius + progress * straightWidth, y: top };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left + width, y: top + radius + progress * straightHeight };
    }
    accumulated += straightHeight;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + width - radius - progress * straightWidth, y: top + height };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left, y: top + height - radius - progress * straightHeight };
    }
    accumulated += straightHeight;

    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
  }

  function mountElectricBorder(el, options) {
    const color = options.color || '#C6631F';
    const speed = options.speed ?? 1;
    const chaos = options.chaos ?? 0.12;
    const borderRadius = options.borderRadius ?? 10;

    el.classList.add('electric-border');
    el.style.setProperty('--electric-border-color', color);
    el.style.borderRadius = borderRadius + 'px';

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'eb-canvas-container';
    const canvas = document.createElement('canvas');
    canvas.className = 'eb-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvasContainer.appendChild(canvas);

    const layers = document.createElement('div');
    layers.className = 'eb-layers';
    layers.innerHTML =
      '<div class="eb-glow-1"></div><div class="eb-glow-2"></div><div class="eb-background-glow"></div>';

    const content = document.createElement('div');
    content.className = 'eb-content';
    while (el.firstChild) content.appendChild(el.firstChild);

    el.appendChild(canvasContainer);
    el.appendChild(layers);
    el.appendChild(content);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const octaves = 10;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const baseFlatness = 0;
    const displacement = 36;
    const borderOffset = 40;

    let width = 0;
    let height = 0;
    let lastDpr = 1;
    let time = 0;
    let lastFrameTime = 0;
    let raf = null;
    let running = false;

    function updateSize() {
      const rect = el.getBoundingClientRect();
      width = rect.width + borderOffset * 2;
      height = rect.height + borderOffset * 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDpr = dpr;
    }

    function draw(currentTime) {
      if (!running) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (dpr !== lastDpr) updateSize();

      const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0;
      time += deltaTime * speed;
      lastFrameTime = currentTime;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.floor(approximatePerimeter / 2);

      ctx.beginPath();
      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;
        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
        const xNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, time, 0, baseFlatness);
        const yNoise = octavedNoise(progress * 8, octaves, lacunarity, gain, amplitude, frequency, time, 1, baseFlatness);
        const displacedX = point.x + xNoise * displacement;
        const displacedY = point.y + yNoise * displacement;
        if (i === 0) ctx.moveTo(displacedX, displacedY);
        else ctx.lineTo(displacedX, displacedY);
      }
      ctx.closePath();
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      lastFrameTime = 0;
      updateSize();
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { rootMargin: '80px' }
    );
    io.observe(el);
  }

  function wrapServiceCards() {
    const cards = document.querySelectorAll('.services-grid > .service-card');
    cards.forEach((card) => {
      const wrap = document.createElement('div');
      wrap.className = 'service-electric';
      card.parentNode.insertBefore(wrap, card);
      wrap.appendChild(card);
      mountElectricBorder(wrap, {
        color: '#C6631F',
        speed: 0.4,
        chaos: 0.04,
        borderRadius: 10,
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapServiceCards);
  } else {
    wrapServiceCards();
  }
})();
