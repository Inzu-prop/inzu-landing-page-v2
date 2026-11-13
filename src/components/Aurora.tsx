import { useEffect, useRef } from 'react';

// A slowly evolving field, rather than a fixed path, gives the ribbons room to
// fold and disappear beyond the edges of the panel.
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

float field(vec2 p, float t) {
  vec2 q = p;
  q += .25 * vec2(sin(p.y * 2.4 + t * .22), cos(p.x * 2.1 - t * .17));
  q += .14 * vec2(sin(p.y * 4.1 - p.x * 1.3 - t * .14), cos(p.x * 3.3 + p.y * 1.1 + t * .19));
  return sin(q.x * 2.5 + sin(q.y * 1.8 + t * .13) * 1.15)
       + .7 * cos(q.y * 3.1 - q.x * .9 - t * .12)
       + .32 * sin(q.x * 4.6 + q.y * 3.2 + t * .18);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = (uv - .5) * vec2(resolution.x / resolution.y, 1.0) * 2.2;
  float f = field(p, time);
  float ribbon = 1.0 - smoothstep(.04, .36, abs(f - .10));
  float edge = 1.0 - smoothstep(.20, .70, abs(f - .10));
  float core = 1.0 - smoothstep(.015, .15, abs(f - .10));
  float accents = smoothstep(-.5, .7, sin(p.x * 1.7 - p.y * 1.2 + time * .12));
  vec3 dark = vec3(.035, .095, .06);
  vec3 green = vec3(.25, .49, .33);
  vec3 sage = vec3(.60, .75, .52);
  vec3 coral = vec3(1.0, .30, .15);
  vec3 color = mix(dark, green, edge * .52);
  color = mix(color, sage, ribbon * .68);
  color = mix(color, coral, ribbon * accents * .86);
  color = mix(color, mix(sage, coral, accents), core * .28);
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - .5) * .018;
  gl_FragColor = vec4(color, 1.0);
}`;

const palettes = {
  home: ['.035, .095, .06', '.25, .49, .33', '.60, .75, .52', '1.0, .30, .15'],
  green: ['.07, .21, .14', '.18, .55, .33', '.71, .88, .58', '.34, .75, .45'],
  coral: ['.30, .08, .07', '.78, .23, .16', '1.0, .68, .42', '.99, .37, .24'],
  blue: ['.025, .12, .30', '.06, .34, .66', '.48, .78, .93', '.20, .53, .94'],
  hero: ['.035, .095, .06', '.25, .49, .33', '.60, .75, .52', '1.0, .30, .15'],
} as const;

// The hero field fades to the exact paper color before it reaches the white strip.
const heroFragment = fragment.slice(0, fragment.indexOf('void main()')) + `
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = (uv - .5) * vec2(resolution.x / resolution.y, 1.0) * 2.2;
  float f = field(p, time);
  float band = 1.0 - smoothstep(.03, .68, abs(f - .10));
  float core = 1.0 - smoothstep(.02, .25, abs(f - .10));
  float accents = smoothstep(-.5, .7, sin(p.x * 1.7 - p.y * 1.2 + time * .12));
  vec3 paper = vec3(248.0 / 255.0, 249.0 / 255.0, 244.0 / 255.0);
  vec3 sage = vec3(.72, .82, .72);
  vec3 coral = vec3(.96, .78, .70);
  vec3 mesh = mix(paper, mix(sage, coral, accents * .60), band * .60);
  mesh = mix(mesh, mix(sage, coral, accents * .65), core * .16);
  float fade = smoothstep(.0, .32, uv.y);
  gl_FragColor = vec4(mix(paper, mesh, fade), 1.0);
}`;

export default function Aurora({ variant = 'home' }: { variant?: keyof typeof palettes }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return; // The panel background remains visible without WebGL.

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }');
    const [dark, green, sage, coral] = palettes[variant];
    const shaderSource = variant === 'hero' ? heroFragment : fragment.replace('vec3(.035, .095, .06)', `vec3(${dark})`).replace('vec3(.25, .49, .33)', `vec3(${green})`).replace('vec3(.60, .75, .52)', `vec3(${sage})`).replace('vec3(1.0, .30, .15)', `vec3(${coral})`);
    const pixel = compile(gl.FRAGMENT_SHADER, shaderSource);
    const program = gl.createProgram();
    if (!vertex || !pixel || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, pixel);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const clock = gl.getUniformLocation(program, 'time');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    let elapsed = variant === 'blue' ? 9 : variant === 'coral' ? 19 : 0;
    let previous = 0;

    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { previous = 0; return; }
      if (previous && !motion.matches) elapsed += Math.min(now - previous, 100) / 1000;
      previous = now;
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(clock, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!motion.matches) frame = requestAnimationFrame(draw);
    };
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; previous = 0; schedule(); });
    intersection.observe(canvas);
    motion.addEventListener('change', schedule);
    document.addEventListener('visibilitychange', schedule);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      motion.removeEventListener('change', schedule);
      document.removeEventListener('visibilitychange', schedule);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(pixel);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="lp-aurora" aria-hidden="true" />;
}
