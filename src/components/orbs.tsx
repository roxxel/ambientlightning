'use client'
// Yoinked from https://codepen.io/ykadosh/pen/XWqKyqg

import { ReactNode, memo, useState } from "react";
import { Slider } from "./ui/slider";
import Settings from "./settings";

const ORB_COUNT = 20;

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
const iterate = (count: number, mapper: (i: number) => ReactNode) =>
  [...new Array(count)].map((_, i) => mapper(i));
const distance = (a: number[], b: number[]) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]);

const Gooey = ({ id }: { id: string }) => (
  <filter id={id}>
    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
    <feColorMatrix
      in="blur"
      mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -5"
      result="goo"
    />
    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
  </filter>
);

const Blur = ({ id }: { id: string }) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
  </filter>
);

const Gradient = ({ id, hue }: { id: string; hue: number }) => {
  const h = hue + random(-40, 40);
  const f = [h, 80, 60];
  const t = [h + 20, 100, 30];
  return (
    <linearGradient id={id} x1="70%" x2="0%" y1="70%" y2="0%">
      <stop
        offset="0%"
        stop-color={`hsl(${t[0]},${t[1]}%,${t[2]}%)`}
        stop-opacity="1"
      />
      <stop
        offset="100%"
        stop-color={`hsl(${f[0]},${f[1]}%,${f[2]}%)`}
        stop-opacity="1"
      />
    </linearGradient>
  );
};

const Orb = ({ hue }: { hue: number }) => {
  const r = random(30, 100);
  const from = [random(0 - r, 1000 + r), random(0 - r, 1000 + r)];
  const to = [random(0 - r, 1000 + r), random(0 - r, 1000 + r)];
  const d = distance(from, to);
  const id = random(0, 1000);
  return (
    <>
      <circle
        cx={from[0]}
        cy={to[0]}
        r={r}
        fill={`url(#grad-${id})`}
        style={{
          //@ts-ignore
          "--duration": `${d / 15}s`,
          "--from-x": from[0],
          "--from-y": from[1],
          "--to-x": to[0],
          "--to-y": to[1],
        }}
      />
      <Gradient id={`grad-${id}`} hue={hue} />
    </>
  );
};

export const Orbs = memo(function Orbs() {
  const [hue, setHue] = useState(40);
  const [orbs, setOrbs] = useState(40);


  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    body  {
        background: black;
        overflow-y: hidden;
    }
    svg {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      circle {
        animation: move var(--duration) ease-in-out infinite;
      }
      @keyframes move {
        0%, 100%{
          cx: var(--from-x);
          cy: var(--from-y);
        }
        50% {
          cx: var(--to-x);
          cy: var(--to-y);
        }
      }
      
      `,
        }}
      ></style>
      <Settings>
        <div>Hue (0-361) [{hue || 0}]</div>
        {//@ts-ignore
        <Slider className="mt-2" value={[hue || 0]} onValueChange={(e) => setHue(e[0] > 0 ? e[0] : undefined)} min={0} max={360} />
        }
        <div className="mt-4">Orb Count (20-100) [{orbs}]</div>
        <Slider className="mt-2" value={[orbs]} onValueChange={(e) => setOrbs(e[0])} min={20} max={100} />
      </Settings>
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMinYMin slice"
        style={{
            height: '100vh',
          background: `linear-gradient(hsl(${hue},${80}%,${90}%), hsl(${hue},${100}%,${80}%))`,
        }}
      >
        <g filter="url(#blur)">
          <g filter="url(#gooey)">
            {iterate(orbs, (i) => (
              <Orb key={i} hue={hue} />
            ))}
          </g>
        </g>
        <defs>
          <Gooey id="gooey" />
          <Blur id="blur" />
        </defs>
      </svg>
    </>
  );
});
