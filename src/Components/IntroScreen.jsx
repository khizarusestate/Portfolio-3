import { useEffect, useState } from "react";

// Five original technology marks from the 3D portfolio's star animation.
const ICONS = [
  { name: "MongoDB", className: "mongo-item", color: "#47a248", start: "198px", delay: "2.65s" },
  { name: "Node.js", className: "node-item", color: "#83cd29", start: "99px", delay: "3.35s" },
  { name: "React", className: "react-item", color: "#61dafb", start: "0px", delay: "0.6s" },
  { name: "VPS hosting", className: "vps-item", color: "#8b9cff", start: "-99px", delay: "4.05s" },
  { name: "GitHub", className: "github-item", color: "#f4f4f4", start: "-198px", delay: "4.75s" },
];

function IconArtwork({ name }) {
  if (name === "MongoDB") {
    return <>
      <path d="M24 4.5c-1.8 6.3-10.4 11.2-10.4 22.1 0 7.7 4.2 12.7 9 14.4l1.4 3.1 1.4-3.1c4.8-1.7 9-6.7 9-14.4C34.4 15.7 25.8 10.8 24 4.5Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 13v28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>;
  }
  if (name === "Node.js") {
    return <>
      <path d="M24 3.8 42 14.2v19.6L24 44.2 6 33.8V14.2L24 3.8Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <text x="24" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">node</text>
      <text x="24" y="35" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="currentColor">JS</text>
    </>;
  }
  if (name === "React") {
    return <>
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="24" cy="24" rx="20" ry="7.8" />
        <ellipse cx="24" cy="24" rx="20" ry="7.8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7.8" transform="rotate(120 24 24)" />
      </g>
    </>;
  }
  if (name === "VPS hosting") {
    return <>
      <rect x="7" y="5" width="34" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <rect x="7" y="22" width="34" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="13" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="13" cy="28.5" r="1.5" fill="currentColor" />
      <path d="M19 11.5h16M19 28.5h16M18 42h12M24 35v7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </>;
  }
  return <path fill="currentColor" d="M24 4.5a19.5 19.5 0 0 0-6.17 38c.98.18 1.33-.42 1.33-.94v-3.3c-5.42 1.18-6.56-2.3-6.56-2.3-.89-2.26-2.17-2.86-2.17-2.86-1.77-1.21.13-1.19.13-1.19 1.96.14 2.99 2.01 2.99 2.01 1.74 2.98 4.57 2.12 5.68 1.62.18-1.26.68-2.12 1.24-2.61-4.33-.49-8.88-2.17-8.88-9.65 0-2.13.76-3.87 2.01-5.24-.2-.49-.87-2.48.19-5.17 0 0 1.64-.52 5.36 2a18.6 18.6 0 0 1 9.76 0c3.72-2.52 5.35-2 5.35-2 1.07 2.69.4 4.68.2 5.17 1.25 1.37 2 3.11 2 5.24 0 7.5-4.56 9.15-8.91 9.63.7.61 1.32 1.8 1.32 3.63v5.02c0 .52.35 1.13 1.34.94A19.5 19.5 0 0 0 24 4.5Z" />;
}

export default function IntroScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Let every star arrive and every icon finish materializing before exit.
    const exitTimer = window.setTimeout(() => setExiting(true), 7200);
    const completeTimer = window.setTimeout(() => onComplete?.(), 8000);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`star-intro-screen is-ready${exiting ? " is-exiting" : ""}`} aria-label="Technology icons intro animation">
      <style>{`
        .star-intro-screen{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#000;opacity:1}
        .star-intro-icons{display:flex;align-items:center;justify-content:center;gap:18px;padding:24px}
        .star-intro-item{position:relative;flex:0 0 81px;width:81px;height:81px;color:var(--icon-color)}
        .star-intro-mark{display:block;width:81px;height:81px;opacity:0;filter:drop-shadow(0 0 7px currentColor) drop-shadow(0 0 15px currentColor)}
        .star-intro-spark{position:absolute;z-index:2;top:50%;left:50%;width:5px;height:5px;border-radius:50%;opacity:0;background:#fff;pointer-events:none}
        .star-intro-screen.is-ready .star-intro-spark{animation:star-arrive 850ms cubic-bezier(.16,1,.3,1) var(--spark-delay) both,star-disappear 350ms ease 5.65s both}
        .star-intro-screen.is-ready .star-intro-item.react-item .star-intro-spark{animation:react-arrive 850ms cubic-bezier(.16,1,.3,1) .6s both,star-disappear 350ms ease 5.65s both}
        .star-intro-screen.is-ready .star-intro-mark{animation:icon-materialize 600ms cubic-bezier(.2,.8,.25,1) 5.85s both,icon-hover 5s ease-in-out 6.5s infinite}
        .star-intro-screen.is-exiting{animation:intro-screen-exit 800ms ease-in forwards}
        @keyframes star-arrive{
          0%{opacity:0;transform:translate(calc(-50% + var(--spark-start-x)),-50%) scale(.15);background:#fff;box-shadow:0 0 0 0 #fff}
          18%{opacity:1;transform:translate(calc(-50% + var(--spark-start-x)),-50%) scale(1.7);background:#fff;box-shadow:0 0 10px 5px #fff,0 0 30px 15px currentColor,0 0 65px 30px currentColor}
          48%{opacity:1;transform:translate(-50%,-50%) scale(1.35);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 32px 16px currentColor,0 0 58px 27px currentColor}
          78%{opacity:1;transform:translate(-50%,-50%) scale(1.25);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 30px 15px currentColor,0 0 55px 25px currentColor}
          100%{opacity:1;transform:translate(-50%,-50%) scale(1);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 30px 15px currentColor,0 0 55px 25px currentColor}
        }
        @keyframes react-arrive{
          0%{opacity:0;transform:translate(-50%,-50%) scale(.15);background:currentColor;box-shadow:0 0 0 0 currentColor}
          18%{opacity:1;transform:translate(-50%,-50%) scale(1.7);background:currentColor;box-shadow:0 0 10px 5px currentColor,0 0 30px 15px currentColor,0 0 65px 30px currentColor}
          48%{opacity:1;transform:translate(-50%,-50%) scale(1.35);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 32px 16px currentColor,0 0 58px 27px currentColor}
          78%{opacity:1;transform:translate(-50%,-50%) scale(1.25);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 30px 15px currentColor,0 0 55px 25px currentColor}
          100%{opacity:1;transform:translate(-50%,-50%) scale(1);background:currentColor;box-shadow:0 0 12px 6px currentColor,0 0 30px 15px currentColor,0 0 55px 25px currentColor}
        }
        @keyframes star-disappear{from{opacity:1}to{opacity:0}}
        @keyframes icon-materialize{
          0%{opacity:0;transform:scale(.15) rotate(-18deg);filter:brightness(3) drop-shadow(0 0 28px currentColor)}
          65%{opacity:1;transform:scale(1.12) rotate(4deg);filter:brightness(1.8) drop-shadow(0 0 22px currentColor) drop-shadow(0 0 35px currentColor)}
          100%{opacity:1;transform:scale(1) rotate(0);filter:drop-shadow(0 0 7px currentColor) drop-shadow(0 0 15px currentColor)}
        }
        @keyframes icon-hover{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes intro-screen-exit{from{opacity:1}to{opacity:0;visibility:hidden}}
        @media(max-width:600px){
          .star-intro-icons{gap:12px;padding:16px}
          .star-intro-item{flex-basis:60px;width:60px;height:60px}
          .star-intro-mark{width:60px;height:60px}
          .mongo-item{--spark-start-x:144px!important}
          .node-item{--spark-start-x:72px!important}
          .vps-item{--spark-start-x:-72px!important}
          .github-item{--spark-start-x:-144px!important}
        }
        @media(prefers-reduced-motion:reduce){
          .star-intro-screen.is-ready .star-intro-spark{animation:none;opacity:0}
          .star-intro-screen.is-ready .star-intro-mark{animation:icon-materialize 1ms linear forwards}
          .star-intro-screen.is-exiting{animation:intro-screen-exit 200ms ease-in forwards}
        }
      `}</style>
      <div className="star-intro-icons" aria-label="MongoDB, Node.js, React, VPS hosting and GitHub">
        {ICONS.map((icon) => (
          <div
            key={icon.name}
            className={`star-intro-item ${icon.className}`}
            style={{
              "--icon-color": icon.color,
              "--spark-start-x": icon.start,
              "--spark-delay": icon.delay,
            }}
          >
            <span className="star-intro-spark" aria-hidden="true" />
            <svg className="star-intro-mark" viewBox="0 0 48 48" role="img" aria-label={icon.name}>
              <IconArtwork name={icon.name} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
