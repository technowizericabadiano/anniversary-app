// Purple glowing flowers component
const PurpleFlowers = () => (
  <svg viewBox="0 0 400 500" className="w-full h-auto max-w-[20rem]">
    <defs>
      {/* Purple petal gradient */}
      <radialGradient id="purplePetal" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#e8a4ff" />
        <stop offset="40%" stopColor="#c44fd9" />
        <stop offset="100%" stopColor="#8a2be2" />
      </radialGradient>
      {/* Glow effect */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      {/* Stem gradient */}
      <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a7c59" />
        <stop offset="100%" stopColor="#2d5016" />
      </linearGradient>
    </defs>
    
    {/* Left flower */}
    <g transform="translate(120, 280)">
      {/* Stem */}
      <path d="M0,0 Q-10,80 -5,150" stroke="url(#stemGrad)" strokeWidth="4" fill="none" />
      {/* Leaves */}
      <ellipse cx="-25" cy="60" rx="15" ry="8" fill="#4a7c59" transform="rotate(-30)" />
      <ellipse cx="20" cy="100" rx="12" ry="6" fill="#4a7c59" transform="rotate(25)" />
      {/* Petals */}
      <ellipse cx="0" cy="-20" rx="18" ry="25" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(0)" />
      <ellipse cx="0" cy="-20" rx="18" ry="25" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(72)" />
      <ellipse cx="0" cy="-20" rx="18" ry="25" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(144)" />
      <ellipse cx="0" cy="-20" rx="18" ry="25" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(216)" />
      <ellipse cx="0" cy="-20" rx="18" ry="25" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(288)" />
      {/* Center glow */}
      <circle cx="0" cy="0" r="12" fill="#fff" filter="url(#glow)" opacity="0.9" />
      <circle cx="0" cy="0" r="8" fill="#ff69b4" opacity="0.6" />
    </g>
    
    {/* Center flower (taller) */}
    <g transform="translate(200, 250)">
      <path d="M0,0 Q5,100 0,180" stroke="url(#stemGrad)" strokeWidth="5" fill="none" />
      <ellipse cx="-30" cy="80" rx="18" ry="10" fill="#4a7c59" transform="rotate(-25)" />
      <ellipse cx="25" cy="120" rx="15" ry="8" fill="#4a7c59" transform="rotate(20)" />
      <ellipse cx="-20" cy="150" rx="12" ry="6" fill="#4a7c59" transform="rotate(-15)" />
      {/* Petals */}
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(0)" />
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(60)" />
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(120)" />
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(180)" />
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(240)" />
      <ellipse cx="0" cy="-25" rx="22" ry="30" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(300)" />
      {/* Center */}
      <circle cx="0" cy="0" r="15" fill="#fff" filter="url(#glow)" opacity="0.95" />
      <circle cx="0" cy="0" r="10" fill="#ff69b4" opacity="0.7" />
    </g>
    
    {/* Right flower */}
    <g transform="translate(280, 290)">
      <path d="M0,0 Q8,70 5,140" stroke="url(#stemGrad)" strokeWidth="4" fill="none" />
      <ellipse cx="25" cy="50" rx="14" ry="7" fill="#4a7c59" transform="rotate(30)" />
      <ellipse cx="-18" cy="90" rx="12" ry="6" fill="#4a7c59" transform="rotate(-20)" />
      <ellipse cx="0" cy="-18" rx="16" ry="22" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(0)" />
      <ellipse cx="0" cy="-18" rx="16" ry="22" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(72)" />
      <ellipse cx="0" cy="-18" rx="16" ry="22" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(144)" />
      <ellipse cx="0" cy="-18" rx="16" ry="22" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(216)" />
      <ellipse cx="0" cy="-18" rx="16" ry="22" fill="url(#purplePetal)" filter="url(#glow)" transform="rotate(288)" />
      <circle cx="0" cy="0" r="11" fill="#fff" filter="url(#glow)" opacity="0.9" />
      <circle cx="0" cy="0" r="7" fill="#ff69b4" opacity="0.6" />
    </g>
    
    {/* Ground grass */}
    <path d="M50,420 Q80,380 100,420" stroke="#3d6b4f" strokeWidth="3" fill="none" />
    <path d="M80,430 Q110,390 130,430" stroke="#4a7c59" strokeWidth="3" fill="none" />
    <path d="M120,425 Q150,385 170,425" stroke="#3d6b4f" strokeWidth="3" fill="none" />
    <path d="M230,430 Q260,390 280,430" stroke="#4a7c59" strokeWidth="3" fill="none" />
    <path d="M270,420 Q300,380 320,420" stroke="#3d6b4f" strokeWidth="3" fill="none" />
    <path d="M300,435 Q330,395 350,435" stroke="#4a7c59" strokeWidth="3" fill="none" />
  </svg>
);

export default PurpleFlowers;
