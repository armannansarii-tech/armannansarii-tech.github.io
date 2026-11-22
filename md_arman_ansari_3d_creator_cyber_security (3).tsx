import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

// ============================================================================
// WEB AUDIO API FUTURISTIC SOUND EFFECTS ENGINE FOR THOMAS
// ============================================================================

const playThomasSfx = (
  type: 'send' | 'receive' | 'activate' | 'micStart' | 'micStop',
  enabled: boolean
) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'receive') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(1046.5, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      osc.start(now);
      osc.stop(now + 0.34);
    } else if (type === 'activate') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.22);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'micStart') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'micStop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    }
  } catch {
    // Ignore audio context restrictions if blocked
  }
};

// ============================================================================
// TYPES & DATA
// ============================================================================

const SOCIAL_LINKS = {
  github: 'https://github.com/armannansarii-tech',
  linkedin: 'https://www.linkedin.com/in/arman-ansari-84471b451',
};

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

interface ProjectItem {
  number: string;
  title: string;
  category: 'Cyber Security' | 'Data Science' | 'Security Systems';
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  summary: string;
  year: string;
}

interface MarqueeCardItem {
  url: string;
  label: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

const MARQUEE_IMAGES: MarqueeCardItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85',
    label: 'Encrypted Data Server Core',
  },
  {
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=85',
    label: 'Cyber Security Firewall Grid',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
    label: 'Real-Time Data Telemetry',
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=85',
    label: 'Binary Cryptographic Stream',
  },
  {
    url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=85',
    label: 'Zero-Trust Access Shield',
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85',
    label: 'SOC Threat Defense Matrix',
  },
  {
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=85',
    label: 'Blockchain Data Ledger',
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85',
    label: 'Hardware Security Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=85',
    label: 'Packet Sniffer & Encryption',
  },
  {
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=85',
    label: 'Predictive Data Analytics',
  },
  {
    url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=85',
    label: 'Distributed Cloud Security',
  },
  {
    url: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=900&q=85',
    label: '3D Liquid Obsidian Sphere',
  },
  {
    url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=900&q=85',
    label: 'Cyber Telemetry Terminal',
  },
  {
    url: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=900&q=85',
    label: '3D Isometric Micro-Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=85',
    label: 'SOC Intrusion Monitor',
  },
  {
    url: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=900&q=85',
    label: '3D Neon Abstract Rings',
  },
  {
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85',
    label: 'Algorithmic Packet Parser',
  },
  {
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=85',
    label: '3D React Spatial Engine',
  },
  {
    url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=85',
    label: 'Penetration Audit Console',
  },
  {
    url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=85',
    label: '3D Fluid Glass Monolith',
  },
  {
    url: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=900&q=85',
    label: 'Cloud Perimeter Defense',
  },
];

const PROJECTS_DATA: ProjectItem[] = [
  {
    number: '01',
    title: 'CyberShield Threat Matrix',
    category: 'Cyber Security',
    col1Image1:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1280&q=85',
    col1Image2:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1280&q=85',
    col2Image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1280&q=85',
    summary:
      '3D network defense topology & real-time intrusion detection visualization built for enterprise SOC telemetry and threat hunting.',
    year: '2026',
  },
  {
    number: '02',
    title: 'DataVault Analytics Core',
    category: 'Data Science',
    col1Image1:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=85',
    col1Image2:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1280&q=85',
    col2Image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1280&q=85',
    summary:
      'Encrypted big-data pipeline & neural telemetry dashboard combining spatial 3D data clusters with zero-knowledge query auditing.',
    year: '2026',
  },
  {
    number: '03',
    title: 'ZeroTrust Protocol 3D',
    category: 'Security Systems',
    col1Image1:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1280&q=85',
    col1Image2:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1280&q=85',
    col2Image:
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1280&q=85',
    summary:
      'Cryptographic node architecture & blockchain security simulation modeling multi-layer packet verification in interactive 3D space.',
    year: '2026',
  },
];

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

/**
 * ContactButton
 * Rounded-full pill button with multi-stop iridescent gradient, inner glow,
 * inset white outline, and hover/tap micro-interactions.
 */
interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer select-none ${className}`}
    >
      Contact Me
    </button>
  );
};

/**
 * LiveProjectButton
 * Ghost/outline pill button for launching live project previews.
 */
interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer select-none ${className}`}
    >
      Live Project
    </button>
  );
};

/**
 * FadeIn
 * Framer Motion viewport-triggered entrance wrapper supporting dynamic tags via motion.create().
 */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
}) => {
  const MotionComponent = useMemo(() => {
    const motionMap = motion as unknown as Record<string, React.ElementType>;
    if (motionMap && motionMap[as]) {
      return motionMap[as];
    }
    return motion.div;
  }, [as]);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Magnet
 * Mouse-following magnetic hover effect that attracts the element toward the cursor
 * whenever the pointer enters within `padding` pixels of the element's bounds.
 */
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(e.clientX - centerX);
      const distY = Math.abs(e.clientY - centerY);

      if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
        setIsActive(true);
        setPosition({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

/**
 * AnimatedText
 * Character-by-character scroll-reveal text animation using useScroll + useTransform.
 * Each character renders an invisible/dim base placeholder alongside an absolute
 * animated span whose opacity interpolates from 0.2 to 1.
 */
interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      whileHover={{
        y: -7,
        scale: 1.25,
        color: '#FFFFFF',
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 16 }}
      className="relative inline-block cursor-default"
    >
      <span className="opacity-20">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 inline-block"
      >
        {char}
      </motion.span>
    </motion.span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
}) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = useMemo(() => text.split(' '), [text]);
  const totalChars = text.length;
  let globalCharIndex = 0;

  return (
    <p ref={paragraphRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const wordStartIdx = globalCharIndex;
        // Advance global index by word length + trailing space (except last word)
        globalCharIndex += wordChars.length + (wordIdx < words.length - 1 ? 1 : 0);

        return (
          <React.Fragment key={`word-${wordIdx}`}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char, charIdx) => {
                const idx = wordStartIdx + charIdx;
                const start = idx / totalChars;
                const end = (idx + 1) / totalChars;
                return (
                  <AnimatedChar
                    key={`char-${idx}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </span>
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};

/**
 * HoverPopText
 * Interactive hover pop-up animation for individual letters ('chars') or words ('words').
 * Note: For gradient text (like .hero-heading), apply `gradientClass` per letter so
 * background-clip: text remains visible on inline-block animated spans.
 */
interface HoverPopTextProps {
  text: string;
  mode?: 'chars' | 'words';
  className?: string;
  letterClassName?: string;
  yOffset?: number;
  hoverScale?: number;
}

const HoverPopText: React.FC<HoverPopTextProps> = ({
  text,
  mode = 'chars',
  className = '',
  letterClassName = '',
  yOffset = -10,
  hoverScale = 1.18,
}) => {
  const words = useMemo(() => text.split(' '), [text]);

  if (mode === 'words') {
    return (
      <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
        {words.map((word, idx) => (
          <motion.span
            key={`hw-${idx}`}
            whileHover={{ y: yOffset, scale: hoverScale }}
            transition={{ type: 'spring', stiffness: 420, damping: 17 }}
            className={`inline-block cursor-default ${letterClassName}`}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => (
        <React.Fragment key={`hwc-${wordIdx}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIdx) => (
              <motion.span
                key={`hc-${wordIdx}-${charIdx}`}
                whileHover={{ y: yOffset, scale: hoverScale }}
                transition={{ type: 'spring', stiffness: 460, damping: 15 }}
                className={`inline-block cursor-default ${letterClassName}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wordIdx < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
};

// ============================================================================
// MAIN PAGE SECTIONS
// ============================================================================

/**
 * 1. HERO SECTION
 */
interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenThomas: () => void;
  showGreeting: boolean;
  onDismissGreeting: () => void;
  latestThomasReply: string;
  isThomasSpeaking: boolean;
  isThomasTyping: boolean;
  isListening: boolean;
  onToggleMic: () => void;
  onAskThomasDirect: (question: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onOpenThomas,
  showGreeting,
  onDismissGreeting,
  latestThomasReply,
  isThomasSpeaking,
  isThomasTyping,
  isListening,
  onToggleMic,
  onAskThomasDirect,
}) => {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [heroQuestion, setHeroQuestion] = useState('');

  const handleHeroAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroQuestion.trim() || isThomasTyping) return;
    onAskThomasDirect(heroQuestion);
    setHeroQuestion('');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseTilt({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative h-screen w-full flex flex-col justify-between bg-[#0C0C0C] select-none overflow-hidden"
      style={{ overflowX: 'clip', perspective: '1200px' }}
    >
      {/* Interactive 3D Depth & Holographic Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, #16122B 0%, #0C0C0C 68%)',
        }}
      >
        {/* 3D Perspective Floor & Ceiling Wireframe Grids */}
        <div
          className="absolute inset-x-[-20%] bottom-[-18%] h-[58%] opacity-35 transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${68 + mouseTilt.y * 5}deg) rotateZ(${mouseTilt.x * -6}deg) translateZ(0px)`,
            transformOrigin: 'center bottom',
            backgroundImage:
              'linear-gradient(to right, rgba(187, 204, 215, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(182, 0, 168, 0.28) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse at 50% 40%, black 25%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 40%, black 25%, transparent 78%)',
          }}
        />

        {/* Parallax 3D Gyroscope Rings & Floating Geometric Polyhedra */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${mouseTilt.x * -24}px, ${mouseTilt.y * -18}px, 0) rotateX(${mouseTilt.y * 14}deg) rotateY(${mouseTilt.x * -14}deg)`,
          }}
        >
          {/* Outer 3D Orbital Ring */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 36, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-[#BBCCD7]/20 shadow-[0_0_50px_rgba(182,0,168,0.2)]"
            style={{ transform: 'rotateX(64deg) rotateY(14deg)' }}
          />

          {/* Inner Counter-Rotating 3D Ring */}
          <motion.div
            animate={{ rotateZ: -360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
            className="absolute inset-12 sm:inset-20 rounded-full border-2 border-dashed border-[#B600A8]/35"
            style={{ transform: 'rotateX(58deg) rotateY(-22deg)' }}
          />

          {/* Vertical Holographic Meridian Ring */}
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
            className="absolute inset-6 sm:inset-12 rounded-full border border-sky-400/20"
          />

          {/* Floating 3D Wireframe Cube Left */}
          <motion.div
            animate={{
              y: [-14, 14, -14],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="hidden sm:block absolute top-[20%] left-[4%] w-14 h-14 md:w-20 md:h-20 rounded-2xl border border-[#BBCCD7]/30 bg-gradient-to-br from-[#B600A8]/15 to-sky-400/10 backdrop-blur-sm shadow-[0_0_30px_rgba(182,0,168,0.3)]"
          />

          {/* Floating 3D Wireframe Diamond Right */}
          <motion.div
            animate={{
              y: [14, -14, 14],
              rotateZ: [45, 225, 405],
              rotateX: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="hidden sm:block absolute bottom-[24%] right-[5%] w-12 h-12 md:w-16 md:h-16 rounded-xl border border-sky-300/35 bg-gradient-to-tr from-[#7621B0]/20 to-amber-400/10 backdrop-blur-sm shadow-[0_0_30px_rgba(56,189,248,0.28)]"
          />
        </div>

        {/* Subtle Ambient Radial Glow Behind Portrait */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] rounded-full opacity-35 blur-[120px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouseTilt.x * 20}px, ${mouseTilt.y * 20}px, 0)`,
            background:
              'radial-gradient(circle, rgba(182,0,168,0.5) 0%, rgba(56,189,248,0.22) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* Top Navbar + Massive Hero Heading */}
      <div className="relative z-20 flex flex-col w-full">
        <FadeIn delay={0} y={-20} as="nav" className="w-full">
          <div className="flex items-center justify-between w-full px-6 md:px-10 pt-6 md:pt-8">
            <a
              href="#about"
              className="group relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 py-1"
            >
              <HoverPopText
                text="About"
                mode="chars"
                yOffset={-5}
                hoverScale={1.15}
              />
              <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#BBCCD7] to-[#B600A8] transition-all duration-300" />
            </a>
            <a
              href="#services"
              className="group relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 py-1"
            >
              <HoverPopText
                text="Price"
                mode="chars"
                yOffset={-5}
                hoverScale={1.15}
              />
              <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#BBCCD7] to-[#B600A8] transition-all duration-300" />
            </a>
            <a
              href="#projects"
              className="group relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 py-1"
            >
              <HoverPopText
                text="Projects"
                mode="chars"
                yOffset={-5}
                hoverScale={1.15}
              />
              <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#BBCCD7] to-[#B600A8] transition-all duration-300" />
            </a>
            <button
              type="button"
              onClick={onOpenContact}
              className="group relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 bg-transparent border-none cursor-pointer py-1"
            >
              <HoverPopText
                text="Contact"
                mode="chars"
                yOffset={-5}
                hoverScale={1.15}
              />
              <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#BBCCD7] to-[#B600A8] transition-all duration-300" />
            </button>
          </div>
        </FadeIn>

        <div className="w-full px-4 sm:px-6 md:px-10 mt-8 sm:mt-10 md:mt-12 py-2 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-2 sm:mb-3 inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-white/[0.04] backdrop-blur-md px-4 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#B600A8]" />
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.32em] text-[#BBCCD7]/85">
              3D Visual Artist &bull; Cyber Security
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
              delay: 0.12,
            }}
            style={{
              fontFamily: "'Cinzel', 'Syne', 'Kanit', serif",
              fontSize: 'clamp(1.75rem, 4.3vw, 3.75rem)',
              textShadow: '0 10px 35px rgba(182, 0, 168, 0.25)',
            }}
            className="font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-tight text-center max-w-4xl mx-auto"
          >
            <HoverPopText
              text="Hi, i'm md arman ansari"
              mode="chars"
              letterClassName="hero-heading"
              yOffset={-10}
              hoverScale={1.18}
            />
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-3 sm:mt-4 h-[1px] w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BBCCD7]/60 to-transparent"
          />
        </div>
      </div>

      {/* Center Portrait with Magnetic Mouse-Following Hover — THOMAS AI Assistant */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative group">
              {/* Stylish Holographic Backlight & Rim Glow Behind THOMAS */}
              <motion.div
                animate={{
                  scale: [1, 1.07, 1],
                  opacity: [0.55, 0.85, 0.55],
                }}
                transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-6 top-10 rounded-full blur-2xl -z-10"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(251, 191, 36, 0.35) 0%, rgba(182, 0, 168, 0.45) 45%, rgba(56, 189, 248, 0.3) 75%, transparent 100%)',
                }}
              />

              {/* Stylish Floating Cyber-Sparkle & Happy Vibe Badges Around Character */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                aria-hidden="true"
                className="pointer-events-none hidden sm:flex items-center gap-1.5 absolute top-[18%] -left-4 md:-left-8 z-20 rounded-full border border-amber-300/40 bg-[#121218]/85 backdrop-blur-md px-3 py-1.5 shadow-[0_8px_25px_rgba(251,191,36,0.28)]"
              >
                <span className="text-sm">😎</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200">
                  Ready to Vibe
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6], rotate: [6, -6, 6] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                aria-hidden="true"
                className="pointer-events-none hidden sm:flex items-center gap-1.5 absolute top-[34%] -right-4 md:-right-10 z-20 rounded-full border border-sky-300/40 bg-[#121218]/85 backdrop-blur-md px-3 py-1.5 shadow-[0_8px_25px_rgba(56,189,248,0.28)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200">
                  3D + Cyber AI
                </span>
              </motion.div>

              {/* Interactive On-Model AI Assistant Console & Live Reply Bubble */}
              <AnimatePresence>
                {showGreeting && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute -top-36 sm:-top-32 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-28 md:-right-44 z-30 w-[290px] sm:w-[340px] rounded-3xl border border-[#D7E2EA]/45 bg-[#101018]/92 backdrop-blur-2xl p-4 shadow-[0_20px_60px_rgba(182,0,168,0.42)] text-left"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BBCCD7]">
                          THOMAS &bull; {isThomasTyping ? 'THINKING...' : isThomasSpeaking ? 'SPEAKING' : 'AI GUIDE'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={onOpenThomas}
                          title="Expand Full Chat"
                          className="text-[10px] uppercase tracking-wider text-sky-300 hover:text-white px-2 py-0.5 rounded-full border border-sky-400/30 bg-sky-500/10 cursor-pointer"
                        >
                          Full Chat
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDismissGreeting();
                          }}
                          aria-label="Minimize assistant bubble"
                          className="text-[#D7E2EA]/50 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#D7E2EA] font-normal leading-snug max-h-24 overflow-y-auto pr-1">
                      {isThomasTyping ? (
                        <span className="inline-flex items-center gap-1.5 text-sky-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                            style={{ animationDelay: '0.15s' }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                            style={{ animationDelay: '0.3s' }}
                          />
                          <span>Solving your question...</span>
                        </span>
                      ) : (
                        latestThomasReply
                      )}
                    </p>

                    {/* Quick On-Model Portfolio & General AI Prompts */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {[
                        { label: 'About Arman', query: 'Who is Md Arman Ansari?' },
                        { label: 'Projects', query: 'Tell me about Arman’s Cyber Security & 3D projects' },
                        { label: 'Cyber Quiz', query: 'Explain Zero-Trust security simply' },
                        { label: 'Solve Anything', query: 'Give me an interesting tech & AI fact today' },
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => onAskThomasDirect(chip.query)}
                          className="rounded-full border border-[#D7E2EA]/25 bg-white/[0.05] hover:bg-[#B600A8]/30 hover:border-[#B600A8] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#D7E2EA] transition-colors cursor-pointer"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Direct Question + Voice Mic Input Right on the 3D Character */}
                    <form onSubmit={handleHeroAsk} className="mt-2.5 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={onToggleMic}
                        title={isListening ? 'Stop Listening' : 'Speak to THOMAS'}
                        aria-label={isListening ? 'Stop Listening' : 'Speak to THOMAS'}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                          isListening
                            ? 'border-rose-400 bg-rose-500/30 text-rose-200 animate-pulse'
                            : 'border-[#D7E2EA]/25 bg-white/[0.06] text-[#D7E2EA] hover:border-sky-400 hover:text-sky-300'
                        }`}
                      >
                        {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      </button>
                      <input
                        type="text"
                        value={heroQuestion}
                        onChange={(e) => setHeroQuestion(e.target.value)}
                        placeholder={isListening ? 'Listening to your voice...' : 'Ask THOMAS anything...'}
                        className="flex-1 rounded-full border border-[#D7E2EA]/25 bg-white/[0.06] px-3 py-1.5 text-xs text-white placeholder:text-[#D7E2EA]/45 focus:outline-none focus:border-sky-400"
                      />
                      <button
                        type="submit"
                        disabled={!heroQuestion.trim() || isThomasTyping}
                        aria-label="Ask THOMAS"
                        className="w-7 h-7 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white disabled:opacity-40 hover:brightness-110 transition-all shrink-0 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Clickable Portrait Trigger with Cheerful Idle Bounce & Stylish Hover */}
              <motion.div
                onClick={onOpenThomas}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenThomas();
                }}
                animate={{
                  y: isThomasSpeaking ? [0, -14, -4, -12, 0] : [0, -8, 0],
                  rotate: isThomasSpeaking ? [-2, 2, -1.5, 1.5, 0] : [-0.8, 0.8, -0.8],
                  scale: isThomasSpeaking ? [1, 1.03, 1.01, 1.03, 1] : 1,
                }}
                transition={{
                  repeat: Infinity,
                  duration: isThomasSpeaking ? 1.1 : 3.4,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.035,
                  y: -12,
                  rotate: 1.5,
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Chat with THOMAS, Md Arman Ansari's AI Assistant"
                className="relative cursor-pointer"
              >
                {/* Voice Wave Aura Ring When THOMAS Answers */}
                {isThomasSpeaking && (
                  <motion.div
                    animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.6, 0.15, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-4 rounded-full border-2 border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.6)]"
                  />
                )}

                <img
                  src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                  alt="THOMAS - Md Arman Ansari's Personal AI Assistant"
                  draggable={false}
                  style={{
                    filter:
                      'brightness(1.08) contrast(1.06) saturate(1.18) drop-shadow(0 24px 48px rgba(0,0,0,0.85)) drop-shadow(0 0 28px rgba(182,0,168,0.38))',
                  }}
                  className="w-full h-auto object-contain block transition-all duration-300"
                />

                {/* Interactive Floating Nameplate Badge on Character */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-amber-300/45 bg-gradient-to-r from-[#141022]/90 via-[#1C122B]/90 to-[#141022]/90 backdrop-blur-md px-4 py-1.5 shadow-[0_8px_30px_rgba(182,0,168,0.45)] whitespace-nowrap"
                >
                  {isThomasSpeaking ? (
                    <Volume2 className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {isThomasSpeaking ? 'THOMAS Speaking...' : '😄 THOMAS AI • Ask Me!'}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <div className="flex flex-col gap-3">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[290px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            <HoverPopText
              text="a 3d creator & bca data and cyber security student crafting striking digital experiences"
              mode="words"
              yOffset={-5}
              hoverScale={1.08}
            />
          </p>

          {/* GitHub & LinkedIn Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Md Arman Ansari GitHub Profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 bg-white/[0.05] hover:bg-white/[0.14] hover:border-white backdrop-blur-md px-3.5 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Md Arman Ansari LinkedIn Profile"
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/35 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-300 backdrop-blur-md px-3.5 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all duration-200"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-300" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

/**
 * 2. MARQUEE SECTION
 */
const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollState, setScrollState] = useState({ offset: 0, velocity: 0 });
  const lastScrollY = useRef(0);

  const row1Images = useMemo(() => {
    const first11 = MARQUEE_IMAGES.slice(0, 11);
    return [...first11, ...first11, ...first11];
  }, []);

  const row2Images = useMemo(() => {
    const remaining10 = MARQUEE_IMAGES.slice(11);
    return [...remaining10, ...remaining10, ...remaining10];
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const updateOffset = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const currentY = window.scrollY;
        const rawDelta = currentY - lastScrollY.current;
        lastScrollY.current = currentY;
        const clampedVelocity = Math.max(-25, Math.min(25, rawDelta));
        const computedOffset =
          (currentY - sectionTop + window.innerHeight) * 0.45;

        setScrollState({
          offset: computedOffset,
          velocity: clampedVelocity,
        });
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOffset);
      }
    };

    updateOffset();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const { offset, velocity } = scrollState;
  const tiltZ = Math.sin(offset * 0.004) * 2.6 + velocity * 0.08;
  const perspectiveRotateX = -10 + Math.cos(offset * 0.008) * 6;
  const perspectiveRotateY = Math.sin(offset * 0.006) * 7;

  return (
    <section
      ref={sectionRef}
      aria-label="Motion Showcase Marquee"
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-24 overflow-hidden"
      style={{ perspective: '1400px' }}
    >
      {/* Ambient Radial Spotlight Behind 3D Helical Showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[360px] sm:w-[920px] sm:h-[480px] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.38) 0%, rgba(182,0,168,0.42) 50%, transparent 75%)',
        }}
      />

      {/* 3D Helical Tilted Carousel Stage */}
      <div
        className="relative z-10 flex flex-col gap-7 w-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${perspectiveRotateX}deg) rotateY(${perspectiveRotateY}deg) rotateZ(${tiltZ}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Row 1: Moves LEFT with Helical Depth Wave */}
        <div
          className="flex flex-row gap-6 w-max"
          style={{
            transform: `translate3d(${-(offset * 1.15 - 120)}px, ${Math.sin(offset * 0.015) * 18}px, 36px)`,
            willChange: 'transform',
          }}
        >
          {row1Images.map((item, idx) => (
            <motion.div
              key={`r1-${idx}`}
              animate={{
                y: [idx % 2 === 0 ? -8 : 8, idx % 2 === 0 ? 8 : -8, idx % 2 === 0 ? -8 : 8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5 + (idx % 4) * 0.6,
                ease: 'easeInOut',
              }}
              whileHover={{
                y: -18,
                scale: 1.06,
                rotateY: 8,
                rotateX: 5,
              }}
              className="relative w-[420px] h-[270px] shrink-0 rounded-3xl overflow-hidden bg-[#14141A] border border-[#D7E2EA]/25 hover:border-sky-400 shadow-[0_24px_60px_rgba(0,0,0,0.88)] transition-colors duration-300 group"
            >
              <img
                src={item.url}
                alt={item.label}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-widest text-[#D7E2EA] bg-black/65 backdrop-blur-md border border-[#D7E2EA]/25 px-3.5 py-1.5 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Moves RIGHT with Counter-Helical Depth Wave */}
        <div
          className="flex flex-row gap-6 w-max -ml-[2600px]"
          style={{
            transform: `translate3d(${offset * 1.15 - 120}px, ${-Math.sin(offset * 0.015) * 18}px, -24px)`,
            willChange: 'transform',
          }}
        >
          {row2Images.map((item, idx) => (
            <motion.div
              key={`r2-${idx}`}
              animate={{
                y: [idx % 2 === 0 ? 8 : -8, idx % 2 === 0 ? -8 : 8, idx % 2 === 0 ? 8 : -8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.8 + (idx % 4) * 0.6,
                ease: 'easeInOut',
              }}
              whileHover={{
                y: -18,
                scale: 1.06,
                rotateY: -8,
                rotateX: 5,
              }}
              className="relative w-[420px] h-[270px] shrink-0 rounded-3xl overflow-hidden bg-[#14141A] border border-[#D7E2EA]/25 hover:border-[#B600A8] shadow-[0_24px_60px_rgba(0,0,0,0.88)] transition-colors duration-300 group"
            >
              <img
                src={item.url}
                alt={item.label}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-widest text-[#D7E2EA] bg-black/65 backdrop-blur-md border border-[#D7E2EA]/25 px-3.5 py-1.5 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 3. ABOUT SECTION
 */
interface AboutSectionProps {
  onOpenContact: () => void;
}

const COSMIC_STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  top: `${(i * 37) % 100}%`,
  left: `${(i * 61 + 13) % 100}%`,
  size: i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
  duration: 2.4 + (i % 5) * 0.7,
  delay: (i % 7) * 0.35,
  opacity: 0.45 + (i % 4) * 0.14,
}));

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#03040A] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Universe, Galaxy & Black Hole Background Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #0D0F24 0%, #050611 55%, #020206 100%)',
        }}
      >
        {/* Outer Spiral Galaxy Nebula Swirl */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] sm:w-[1040px] sm:h-[1040px] rounded-full opacity-40 blur-[90px]"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(182,0,168,0.42), rgba(56,189,248,0.32), rgba(118,33,176,0.48), rgba(251,146,60,0.28), rgba(182,0,168,0.42))',
          }}
        />

        {/* Black Hole Gravitational Lensing & Accretion Disk */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Accretion Halo */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 48, ease: 'linear' }}
            className="w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full opacity-55 blur-[26px]"
            style={{
              background:
                'conic-gradient(from 90deg, rgba(251,146,60,0.65), rgba(182,0,168,0.55), rgba(56,189,248,0.45), rgba(251,146,60,0.65))',
            }}
          />

          {/* Tilted Glowing Accretion Ring */}
          <div
            className="absolute w-[420px] h-[140px] sm:w-[680px] sm:h-[210px] rounded-full opacity-50 blur-[14px] -rotate-12"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 38%, rgba(251,146,60,0.7) 52%, rgba(182,0,168,0.55) 68%, transparent 80%)',
            }}
          />

          {/* Photon Ring */}
          <div
            className="absolute w-[190px] h-[190px] sm:w-[290px] sm:h-[290px] rounded-full border border-amber-300/35 shadow-[0_0_60px_rgba(251,146,60,0.45),inset_0_0_40px_rgba(182,0,168,0.45)]"
          />

          {/* Event Horizon (Pure Singularity Core) */}
          <div
            className="absolute w-[170px] h-[170px] sm:w-[260px] sm:h-[260px] rounded-full bg-[#020205] shadow-[0_0_70px_20px_rgba(0,0,0,0.98)]"
          />
        </div>

        {/* Deep Space Nebula Clouds */}
        <div
          className="absolute -top-28 left-1/4 w-[420px] h-[420px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-28 right-1/4 w-[440px] h-[440px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #B600A8 0%, transparent 70%)',
          }}
        />

        {/* Twinkling Starfield */}
        {COSMIC_STARS.map((star) => (
          <motion.span
            key={star.id}
            animate={{
              opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
              scale: [0.85, 1.3, 0.85],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          />
        ))}

        {/* 4 Cosmic Space Photos: Star, Neptune, Venus, Saturn */}
        {/* 1. Star (Top-Left) */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[4%] sm:left-[7%] md:left-[10%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-amber-300/40 shadow-[0_0_35px_rgba(251,191,36,0.45)]"
        >
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=85"
            alt="Glowing Cosmic Star"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-amber-300/20" />
        </motion.div>

        {/* 2. Neptune (Bottom-Left) */}
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 8.2, ease: 'easeInOut' }}
          className="absolute bottom-[10%] left-[4%] sm:left-[7%] md:left-[10%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-sky-400/45 shadow-[0_0_35px_rgba(56,189,248,0.5)]"
        >
          <img
            src="https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&w=600&q=85"
            alt="Planet Neptune"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-sky-400/25" />
        </motion.div>

        {/* 3. Venus (Top-Right) */}
        <motion.div
          animate={{ y: [9, -9, 9], rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 7.8, ease: 'easeInOut' }}
          className="absolute top-[10%] right-[4%] sm:right-[7%] md:right-[10%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-orange-300/45 shadow-[0_0_35px_rgba(251,146,60,0.45)]"
        >
          <img
            src="https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=600&q=85"
            alt="Planet Venus"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-orange-300/25" />
        </motion.div>

        {/* 4. Saturn (Bottom-Right) */}
        <motion.div
          animate={{ y: [-9, 9, -9], rotate: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[4%] sm:right-[7%] md:right-[10%] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-purple-300/45 shadow-[0_0_35px_rgba(192,132,252,0.5)]"
        >
          <img
            src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=600&q=85"
            alt="Planet Saturn"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-purple-300/20" />
        </motion.div>
      </div>

      {/* Central Content Stack */}
      <div className="relative z-10 flex flex-col items-center text-center gap-16 sm:gap-20 md:gap-24 w-full">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BBCCD7]/80 font-medium">
              <HoverPopText
                text="Inspiria Knowledge Campus • West Bengal, India"
                mode="words"
                yOffset={-4}
                hoverScale={1.08}
              />
            </span>
            <h2
              className="font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              <HoverPopText
                text="About me"
                mode="chars"
                letterClassName="hero-heading"
                yOffset={-14}
                hoverScale={1.15}
              />
            </h2>
          </div>

          <AnimatedText
            text="Hi, I'm Md Arman Ansari — a 1st-year BCA in Data and Cyber Security student at Inspiria Knowledge Campus, West Bengal, India. Alongside cybersecurity and data analytics, I craft 3D visuals, branding, and immersive web experiences. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={25}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ContactButton onClick={onOpenContact} />
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/60 bg-white/[0.04] hover:bg-[#D7E2EA]/15 hover:border-white px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-sky-400/60 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-300 px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-sky-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/**
 * 4. SERVICES SECTION
 */
const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] border-t border-[#D7E2EA]/20 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 pb-28 sm:pb-36 md:pb-44 shadow-[0_-30px_90px_rgba(0,0,0,0.92)] overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 25%, #111329 0%, #070812 52%, #05050A 100%)',
      }}
    >
      {/* Galaxy, Universe & Black Hole Background Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Large 3D Cyber-Sentinel Android Mascot in Top-Left Corner */}
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [2.5, -2.5, 2.5] }}
          transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
          className="absolute top-6 left-4 sm:top-10 sm:left-10 md:top-12 md:left-14 select-none flex flex-col items-center justify-center"
        >
          {/* Ambient Backlight Glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(182,0,168,0.48) 0%, rgba(251,146,60,0.32) 60%, transparent 80%)',
            }}
          />

          {/* Orbiting Cyber Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-dashed border-[#B600A8]/50 bg-white/[0.03] backdrop-blur-md shadow-[0_16px_50px_rgba(182,0,168,0.32),inset_0_0_25px_rgba(56,189,248,0.22)]"
          >
            <span className="absolute -bottom-1.5 w-2.5 h-2.5 rounded-full bg-[#B600A8] shadow-[0_0_12px_#B600A8]" />
          </motion.div>

          {/* Custom 3D Cyber-Sentinel Android Vector */}
          <svg
            viewBox="0 0 120 120"
            className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-[0_12px_32px_rgba(182,0,168,0.65)]"
            fill="none"
          >
            <defs>
              <linearGradient id="botLeftArmor" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="botLeftVisor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            {/* Dual Signal Fins */}
            <path d="M34 32L24 14L44 26Z" fill="#B600A8" />
            <path d="M86 32L96 14L76 26Z" fill="#38BDF8" />
            {/* Sleek 3D Armored Helmet */}
            <rect x="24" y="26" width="72" height="56" rx="24" fill="url(#botLeftArmor)" stroke="#E2E8F0" strokeWidth="2" />
            {/* Side Ear Pods */}
            <rect x="14" y="42" width="10" height="24" rx="5" fill="#1E293B" stroke="#B600A8" strokeWidth="1.5" />
            <rect x="96" y="42" width="10" height="24" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
            {/* Glowing Holographic Visor */}
            <rect x="32" y="40" width="56" height="24" rx="12" fill="#090A14" stroke="url(#botLeftVisor)" strokeWidth="2" />
            {/* Expressive Neon Eyes */}
            <circle cx="46" cy="52" r="5" fill="#38BDF8" />
            <circle cx="74" cy="52" r="5" fill="#F472B6" />
            <path d="M55 56Q60 60 65 56" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            {/* Chest Core Collar */}
            <path d="M38 86H82L76 102H44L38 86Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="60" cy="94" r="4" fill="#B600A8" />
          </svg>

          {/* Sleek Cyber-Sec Pill Label */}
          <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C14]/85 backdrop-blur-md px-3 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B600A8] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7E2EA]/90">
              Cyber Sentinel
            </span>
          </div>
        </motion.div>

        {/* Large 3D Quantum-Mech Android Mascot in Top-Right Corner */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          className="absolute top-6 right-4 sm:top-10 sm:right-10 md:top-12 md:right-14 select-none flex flex-col items-center justify-center"
        >
          {/* Ambient Backlight Glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(182,0,168,0.35) 60%, transparent 80%)',
            }}
          />

          {/* Orbiting Cyber Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-dashed border-sky-400/40 bg-white/[0.03] backdrop-blur-md shadow-[0_16px_50px_rgba(56,189,248,0.28),inset_0_0_25px_rgba(182,0,168,0.25)]"
          >
            <span className="absolute -top-1.5 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]" />
          </motion.div>

          {/* Custom 3D Quantum-Mech Android Vector */}
          <svg
            viewBox="0 0 120 120"
            className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-[0_12px_32px_rgba(56,189,248,0.65)]"
            fill="none"
          >
            <defs>
              <linearGradient id="botRightShell" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="50%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="botRightGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
            {/* Central Crown Antenna */}
            <line x1="60" y1="12" x2="60" y2="26" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="10" r="4.5" fill="#38BDF8" />
            {/* Spherical 3D Astro-Bot Head */}
            <circle cx="60" cy="54" r="32" fill="url(#botRightShell)" stroke="#BAE6FD" strokeWidth="2" />
            {/* Visor Screen */}
            <rect x="34" y="42" width="52" height="22" rx="11" fill="#060812" stroke="url(#botRightGlow)" strokeWidth="2" />
            {/* Digital Visor Eyes */}
            <rect x="43" y="49" width="11" height="7" rx="3.5" fill="#38BDF8" />
            <rect x="66" y="49" width="11" height="7" rx="3.5" fill="#38BDF8" />
            {/* Floating Hover Base Ring */}
            <ellipse cx="60" cy="95" rx="24" ry="7" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <ellipse cx="60" cy="95" rx="12" ry="3" fill="#38BDF8" />
          </svg>

          {/* Sleek Cyber-AI Pill Label */}
          <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C14]/85 backdrop-blur-md px-3 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7E2EA]/90">
              Quantum Droid
            </span>
          </div>
        </motion.div>

        {/* Large Professional Holographic Robot Mascot in Top-Right Corner */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          className="absolute top-6 right-4 sm:top-10 sm:right-10 md:top-12 md:right-14 select-none flex flex-col items-center justify-center"
        >
          {/* Ambient Backlight Glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(182,0,168,0.35) 60%, transparent 80%)',
            }}
          />

          {/* Orbiting Cyber Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-dashed border-sky-400/40 bg-white/[0.03] backdrop-blur-md shadow-[0_16px_50px_rgba(56,189,248,0.28),inset_0_0_25px_rgba(182,0,168,0.25)]"
          >
            <span className="absolute -top-1.5 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]" />
          </motion.div>

          {/* Large Centered Robot Emoji */}
          <span className="absolute text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_12px_32px_rgba(56,189,248,0.55)]">
            🤖
          </span>

          {/* Sleek Cyber-AI Pill Label */}
          <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C14]/85 backdrop-blur-md px-3 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7E2EA]/90">
              AI &amp; 3D Core
            </span>
          </div>
        </motion.div>

        {/* Rotating Cosmic Galaxy Swirl */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 110, ease: 'linear' }}
          className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] sm:w-[980px] sm:h-[980px] rounded-full opacity-35 blur-[100px]"
          style={{
            background:
              'conic-gradient(from 135deg, rgba(56,189,248,0.35), rgba(182,0,168,0.42), rgba(118,33,176,0.45), rgba(251,146,60,0.25), rgba(56,189,248,0.35))',
          }}
        />

        {/* Black Hole Accretion Vortex */}
        <div className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
            className="w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] rounded-full opacity-45 blur-[28px]"
            style={{
              background:
                'conic-gradient(from 45deg, rgba(182,0,168,0.6), rgba(56,189,248,0.5), rgba(251,146,60,0.5), rgba(182,0,168,0.6))',
            }}
          />
          <div
            className="absolute w-[380px] h-[120px] sm:w-[600px] sm:h-[180px] rounded-full opacity-40 blur-[16px] rotate-12"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 36%, rgba(56,189,248,0.6) 52%, rgba(182,0,168,0.55) 68%, transparent 80%)',
            }}
          />
          <div className="absolute w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] rounded-full border border-sky-300/25 shadow-[0_0_55px_rgba(182,0,168,0.4)]" />
          <div className="absolute w-[144px] h-[144px] sm:w-[216px] sm:h-[216px] rounded-full bg-[#04050B] shadow-[0_0_60px_18px_rgba(0,0,0,0.95)]" />
        </div>

        {/* Twinkling Cosmic Starfield */}
        {COSMIC_STARS.map((star) => (
          <motion.span
            key={`srv-star-${star.id}`}
            animate={{
              opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration + 0.4,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 sm:mb-20 md:mb-28">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BBCCD7]/65 font-medium mb-3">
            <HoverPopText
              text="Capabilities & Craft"
              mode="words"
              yOffset={-4}
              hoverScale={1.08}
            />
          </span>
          <h2
            className="font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <HoverPopText
              text="Services"
              mode="chars"
              letterClassName="hero-heading"
              yOffset={-14}
              hoverScale={1.15}
            />
          </h2>
        </div>

        <div className="max-w-5xl mx-auto w-full flex flex-col">
          {SERVICES_DATA.map((service, i) => (
            <FadeIn
              key={service.number}
              delay={i * 0.08}
              y={30}
              className="w-full"
            >
              <div
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-10 py-8 sm:py-10 md:py-12 px-4 sm:px-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.04] hover:border-[#D7E2EA]/30"
                style={{
                  borderTop:
                    i === 0 ? '1px solid rgba(215, 226, 234, 0.14)' : undefined,
                  borderBottom: '1px solid rgba(215, 226, 234, 0.14)',
                }}
              >
                {/* Left: Service Number */}
                <span
                  className="hero-heading font-black leading-none shrink-0 select-none transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </span>

                {/* Right: Service Name + Description */}
                <div className="flex flex-col gap-2 sm:gap-3 sm:max-w-2xl w-full">
                  <h3
                    className="font-medium uppercase text-[#D7E2EA] group-hover:text-white tracking-tight transition-colors duration-300"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    <HoverPopText
                      text={service.name}
                      mode="chars"
                      yOffset={-6}
                      hoverScale={1.14}
                    />
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#D7E2EA]/65 group-hover:text-[#D7E2EA]/85 transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    }}
                  >
                    <HoverPopText
                      text={service.description}
                      mode="words"
                      yOffset={-3}
                      hoverScale={1.06}
                    />
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 5. PROJECTS SECTION (Sticky Stacking Cards)
 */
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onSelectProject: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onSelectProject,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index / totalCards;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32 w-full">
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
          background:
            'linear-gradient(145deg, rgba(24, 29, 58, 0.88) 0%, rgba(16, 14, 38, 0.92) 50%, rgba(32, 16, 48, 0.9) 100%)',
          boxShadow:
            '0 30px 90px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.28), 0 0 45px rgba(118, 33, 176, 0.32)',
        }}
        className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#BBCCD7]/75 hover:border-sky-300 backdrop-blur-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 transition-colors duration-300 origin-top overflow-hidden"
      >
        {/* Subtle 3D Iridescent Sheen Inside Each Project Card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.55) 0%, rgba(182,0,168,0.45) 55%, transparent 80%)',
          }}
        />
        {/* Top Row: Number, Category + Name, and Live Project Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-4 pt-1">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA] select-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-medium uppercase text-[#D7E2EA] tracking-tight">
                <HoverPopText
                  text={project.title}
                  mode="chars"
                  yOffset={-7}
                  hoverScale={1.14}
                />
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onSelectProject(project)} />
        </div>

        {/* Bottom Row: Two-Column Image Grid (40% Left Stacked, 60% Right Tall) */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full">
          {/* Left Column: 40% width, 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6">
            <div
              onClick={() => onSelectProject(project)}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div
              onClick={() => onSelectProject(project)}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: 60% width, 1 tall image */}
          <div className="w-full md:w-[60%]">
            <div
              onClick={() => onSelectProject(project)}
              className="w-full h-[220px] sm:h-[280px] md:h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] cursor-pointer group"
            >
              <img
                src={project.col2Image}
                alt={`${project.title} showcase render`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackContainerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative w-full bg-[#04050B] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 shadow-[0_-30px_90px_rgba(0,0,0,0.9)]"
    >
      {/* Galaxy & Deep-Space 3D Nebula Photo Background Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      >
        {/* High-Resolution 3D Cosmic Nebula & Deep Space Galaxy Photo */}
        <motion.img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=85"
          alt=""
          animate={{ scale: [1.04, 1.12, 1.04], rotate: [0, 1.5, 0] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
        />

        {/* Deep-Space Vignette & Gradient Overlay for Crisp Card Readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(16,19,44,0.62) 0%, rgba(5,6,14,0.88) 60%, rgba(3,3,8,0.97) 100%)',
          }}
        />

        {/* Rotating Spiral Galaxy Swirl */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
          className="absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[1100px] sm:h-[1100px] rounded-full opacity-35 blur-[110px]"
          style={{
            background:
              'conic-gradient(from 45deg, rgba(182,0,168,0.42), rgba(56,189,248,0.34), rgba(118,33,176,0.48), rgba(251,146,60,0.24), rgba(182,0,168,0.42))',
          }}
        />

        {/* Secondary Deep-Space Nebula Glows */}
        <div
          className="absolute top-[38%] -left-24 w-[480px] h-[480px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[18%] -right-24 w-[520px] h-[520px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #B600A8 0%, transparent 70%)',
          }}
        />

        {/* Subtle Galactic Core Ring */}
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-1/2 w-[320px] h-[110px] sm:w-[620px] sm:h-[190px] rounded-full opacity-35 blur-[20px] -rotate-12 bg-gradient-to-r from-sky-400/30 via-fuchsia-500/40 to-amber-400/30" />

        {/* Twinkling Cosmic Starfield */}
        {COSMIC_STARS.map((star) => (
          <motion.span
            key={`proj-star-${star.id}`}
            animate={{
              opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
              scale: [0.85, 1.3, 0.85],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration + 0.3,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center mb-14 sm:mb-20 md:mb-24">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#BBCCD7]/60 font-medium mb-3">
            <HoverPopText
              text="Featured Security & 3D Works"
              mode="words"
              yOffset={-4}
              hoverScale={1.08}
            />
          </span>
          <h2
            className="font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <HoverPopText
              text="Project"
              mode="chars"
              letterClassName="hero-heading"
              yOffset={-14}
              hoverScale={1.15}
            />
          </h2>
        </div>

        <div ref={stackContainerRef} className="relative w-full flex flex-col">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              progress={scrollYProgress}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {/* Social Profile Footer Bar */}
        <div className="mt-12 pt-8 border-t border-[#D7E2EA]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D7E2EA]/70">
          <p className="uppercase tracking-widest font-light text-center sm:text-left">
            &copy; {new Date().getFullYear()} Md Arman Ansari &bull; 3D Creator &amp; Cyber Security
          </p>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all"
            >
              <Github className="w-4 h-4" />
              <span>armannansarii-tech</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-300 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all"
            >
              <Linkedin className="w-4 h-4 text-sky-300" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// INTERACTIVE MODALS (Contact & Project Preview)
// ============================================================================

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const creatorEmail = 'arman.a.1926@inspiria.edu.in';

  const handleCopyEmail = () => {
    const textArea = document.createElement('textarea');
    textArea.value = creatorEmail;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    );
    window.open(
      `mailto:${creatorEmail}?subject=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[36px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact dialog"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
              <HoverPopText
                text="Start a Project"
                mode="chars"
                letterClassName="hero-heading"
                yOffset={-8}
                hoverScale={1.15}
              />
            </h3>
            <p className="text-sm sm:text-base font-light text-[#D7E2EA]/75 mb-6">
              Connect with Md Arman Ansari — 3D Creator &amp; BCA Data &amp;
              Cyber Security student at Inspiria Knowledge Campus, West Bengal.
            </p>

            {/* Quick Copy Direct Email */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#D7E2EA]/20 bg-white/[0.03] px-4 py-3 mb-4">
              <a
                href={`mailto:${creatorEmail}`}
                className="flex items-center gap-2.5 text-sm truncate hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#BBCCD7] shrink-0" />
                <span className="truncate">{creatorEmail}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#D7E2EA]/30 hover:bg-[#D7E2EA]/10 transition-colors shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Social Links inside Contact Modal */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#D7E2EA]/25 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-300 px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4 text-sky-300" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-xl font-medium uppercase tracking-wide">
                  Message Sent to Arman
                </p>
                <p className="text-sm text-[#D7E2EA]/60 font-light">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#D7E2EA]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#D7E2EA]"
                />
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your 3D, security, or web project..."
                  className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#D7E2EA] resize-none"
                />
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                    className="w-full rounded-full text-white font-medium uppercase tracking-widest py-3.5 text-sm hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [project]);

  const images = project
    ? [project.col2Image, project.col1Image1, project.col1Image2]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-[36px] sm:rounded-[44px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                  {project.number} &bull; {project.category} &bull;{' '}
                  {project.year}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-1">
                  <HoverPopText
                    text={project.title}
                    mode="chars"
                    letterClassName="hero-heading"
                    yOffset={-8}
                    hoverScale={1.14}
                  />
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project showcase"
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Showcase Image with Carousel Controls */}
            <div className="relative w-full h-[240px] sm:h-[400px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#151515] mb-5">
              <img
                src={images[activeImgIdx]}
                alt={`${project.title} slide ${activeImgIdx + 1}`}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setActiveImgIdx(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#D7E2EA]/40 flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveImgIdx((prev) => (prev + 1) % images.length)
                }
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#D7E2EA]/40 flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIdx(idx)}
                  className={`h-16 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-[#D7E2EA] scale-[1.01]'
                      : 'border-transparent opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#D7E2EA]/15">
              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/80 max-w-xl">
                {project.summary}
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors shrink-0 cursor-pointer"
              >
                <span>Request Similar Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// THOMAS PERSONAL AI ASSISTANT CHAT WIDGET
// ============================================================================

interface ChatMessage {
  id: string;
  role: 'thomas' | 'user';
  text: string;
}

interface ThomasAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenContact: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
  isListening: boolean;
  onToggleMic: () => void;
  onSendMessage: (text: string) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

const THOMAS_QUICK_PROMPTS = [
  "Who is Md Arman Ansari?",
  "Explain how encryption protects data",
  "Write a quick Python port scanner tip",
  "What 3D & web services does Arman offer?",
];

const ThomasAssistant: React.FC<ThomasAssistantProps> = ({
  isOpen,
  onToggle,
  onOpenContact,
  messages,
  isTyping,
  isListening,
  onToggleMic,
  onSendMessage,
  voiceEnabled,
  onToggleVoice,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Docked Button for THOMAS */}
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle THOMAS AI Assistant"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-[#D7E2EA]/40 bg-[#0C0C0C]/90 backdrop-blur-xl px-4 py-2.5 text-[#D7E2EA] shadow-[0_12px_40px_rgba(182,0,168,0.35)] hover:border-white transition-colors cursor-pointer"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#BBCCD7]/50 bg-[#18181F] shrink-0">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="THOMAS Avatar"
            className="w-full h-full object-cover object-top scale-125"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0C0C0C]" />
        </div>
        <div className="text-left pr-1">
          <span className="block text-xs font-bold uppercase tracking-widest text-white leading-none">
            THOMAS
          </span>
          <span className="block text-[10px] text-[#BBCCD7]/75 tracking-wider mt-0.5">
            {isOpen ? 'Close Chat' : 'AI Assistant'}
          </span>
        </div>
      </motion.button>

      {/* Interactive Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            aria-label="THOMAS AI Assistant Chat"
            className="fixed bottom-20 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] sm:w-[390px] rounded-[30px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C]/95 backdrop-blur-2xl text-[#D7E2EA] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b border-[#D7E2EA]/15"
              style={{
                background:
                  'linear-gradient(123deg, rgba(24,1,31,0.95) 0%, rgba(182,0,168,0.28) 55%, rgba(118,33,176,0.35) 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D7E2EA]/60 bg-[#15151C]">
                  <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                    alt="THOMAS"
                    className="w-full h-full object-cover object-top scale-125"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white">
                      THOMAS
                    </h4>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D7E2EA]/70">
                    Md Arman Ansari&apos;s Personal AI
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleVoice}
                title={voiceEnabled ? 'Mute Voice & Sound FX' : 'Enable Voice & Sound FX'}
                aria-label={voiceEnabled ? 'Mute Voice & Sound FX' : 'Enable Voice & Sound FX'}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer mr-1.5 ${
                  voiceEnabled
                    ? 'border-sky-400/50 bg-sky-500/20 text-sky-300'
                    : 'border-[#D7E2EA]/25 text-[#D7E2EA]/50 hover:bg-white/10'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onToggle}
                aria-label="Close THOMAS chat"
                className="w-8 h-8 rounded-full border border-[#D7E2EA]/25 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex flex-col gap-3 p-4 max-h-[320px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/45 mb-1 px-1">
                    {msg.role === 'user' ? 'You' : 'THOMAS'}
                  </span>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white rounded-br-sm'
                        : 'bg-white/[0.06] border border-[#D7E2EA]/15 text-[#D7E2EA] rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex items-center gap-1.5 rounded-2xl bg-white/[0.06] border border-[#D7E2EA]/15 px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BBCCD7] animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#BBCCD7] animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#BBCCD7] animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {THOMAS_QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => onSendMessage(prompt)}
                  className="shrink-0 rounded-full border border-[#D7E2EA]/20 bg-white/[0.03] hover:bg-[#D7E2EA]/10 px-3 py-1 text-[11px] text-[#D7E2EA]/85 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 p-3 border-t border-[#D7E2EA]/15 bg-black/40"
            >
              <button
                type="button"
                onClick={onToggleMic}
                title={isListening ? 'Stop Listening' : 'Speak to THOMAS'}
                aria-label={isListening ? 'Stop Listening' : 'Speak to THOMAS'}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  isListening
                    ? 'border-rose-400 bg-rose-500/30 text-rose-200 animate-pulse'
                    : 'border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 hover:border-sky-400'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? 'Listening...' : 'Ask THOMAS anything...'}
                className="flex-1 rounded-full border border-[#D7E2EA]/20 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm text-white placeholder:text-[#D7E2EA]/40 focus:outline-none focus:border-[#D7E2EA]"
              />
              <button
                type="button"
                onClick={() => {
                  onToggle();
                  onOpenContact();
                }}
                title="Open Contact Form"
                className="w-9 h-9 rounded-full border border-[#D7E2EA]/25 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message to THOMAS"
                className="w-9 h-9 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white disabled:opacity-40 hover:brightness-110 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================================
// MAIN APP ENTRYPOINT
// ============================================================================

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isThomasOpen, setIsThomasOpen] = useState(false);
  const [showThomasGreeting, setShowThomasGreeting] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isThomasSpeaking, setIsThomasSpeaking] = useState(false);
  const [isThomasTyping, setIsThomasTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [thomasMessages, setThomasMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'thomas',
      text: "Hey! 👋 I'm THOMAS, Md Arman Ansari's real-time AI assistant. Ask me ANY question—tech, coding, cybersecurity, general knowledge, or Arman's 3D portfolio—by typing or tapping the mic!",
    },
  ]);

  const speakResponse = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const cleanText = text
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
        .replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => /Google UK English Male|Daniel|Alex|Microsoft Guy|Google US English/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 1.03;
      utterance.pitch = 1.02;
      utterance.onstart = () => setIsThomasSpeaking(true);
      utterance.onend = () => setIsThomasSpeaking(false);
      utterance.onerror = () => setIsThomasSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsThomasSpeaking(false);
    }
  };

  const getFallbackReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('who') || q.includes('arman') || q.includes('about') || q.includes('college')) {
      return "Md Arman Ansari is a 3D Creator and 1st-year BCA in Data & Cyber Security student at Inspiria Knowledge Campus in Siliguri, West Bengal, India. He combines 3D design with cybersecurity visualization.";
    }
    if (q.includes('project') || q.includes('cyber') || q.includes('data') || q.includes('security')) {
      return "Arman's top projects are 01. CyberShield Threat Matrix (3D SOC threat defense), 02. DataVault Analytics Core (encrypted big-data telemetry), and 03. ZeroTrust Protocol 3D (cryptographic node simulation).";
    }
    if (q.includes('service') || q.includes('3d') || q.includes('price') || q.includes('offer')) {
      return "Arman offers 5 services: 01. 3D Modeling, 02. Photorealistic Rendering, 03. Motion Design, 04. Branding, and 05. Modern Web Design.";
    }
    if (q.includes('social') || q.includes('github') || q.includes('linkedin') || q.includes('hire') || q.includes('contact')) {
      return "You can view Arman's code on GitHub (github.com/armannansarii-tech), connect on LinkedIn (linkedin.com/in/arman-ansari-84471b451), or email arman.a.1926@inspiria.edu.in!";
    }
    return "I'm THOMAS, Arman's AI chatbot! Ask me any question—from coding, cybersecurity, and general knowledge to Arman's 3D Modeling & Web Design portfolio.";
  };

  const handleAskThomas = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isThomasTyping) return;

    playThomasSfx('send', voiceEnabled);
    setShowThomasGreeting(true);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    setThomasMessages((prev) => [...prev, userMsg]);
    setIsThomasTyping(true);

    try {
      const apiKey = '';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const systemPrompt =
        "You are THOMAS, a super-smart, friendly, real-time AI chatbot and interactive 3D companion on Md Arman Ansari's portfolio website. You can solve and answer ANY question a visitor asks—including general knowledge, math, coding, science, cybersecurity concepts, career advice, creative ideas, AND questions about Md Arman Ansari's portfolio. Keep your answers clear, helpful, conversational, and concise (2-4 sentences so they sound great when spoken aloud). Portfolio knowledge base: Md Arman Ansari is a 3D Creator and 1st-year BCA in Data and Cyber Security student at Inspiria Knowledge Campus in Siliguri, West Bengal, India. Services: 01 3D Modeling, 02 Rendering, 03 Motion Design, 04 Branding, 05 Web Design. Featured Projects: 01 CyberShield Threat Matrix (Cyber Security), 02 DataVault Analytics Core (Data Science), 03 ZeroTrust Protocol 3D (Security Systems). GitHub: https://github.com/armannansarii-tech | LinkedIn: https://www.linkedin.com/in/arman-ansari-84471b451 | Email: arman.a.1926@inspiria.edu.in.";

      const payload = {
        contents: [
          ...thomasMessages.slice(-8).map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: trimmed }] },
        ],
        tools: [{ google_search: {} }],
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
      };

      let replyText = '';
      for (let attempt = 0; attempt < 3; attempt++) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const data = await response.json();
          replyText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          break;
        }
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }

      if (!replyText) {
        replyText = getFallbackReply(trimmed);
      }

      playThomasSfx('receive', voiceEnabled);
      setThomasMessages((prev) => [
        ...prev,
        {
          id: `thomas-${Date.now()}`,
          role: 'thomas',
          text: replyText,
        },
      ]);
      speakResponse(replyText);
    } catch {
      playThomasSfx('receive', voiceEnabled);
      const fallback = getFallbackReply(trimmed);
      setThomasMessages((prev) => [
        ...prev,
        {
          id: `thomas-${Date.now()}`,
          role: 'thomas',
          text: fallback,
        },
      ]);
      speakResponse(fallback);
    } finally {
      setIsThomasTyping(false);
    }
  };

  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      playThomasSfx('micStop', voiceEnabled);
      return;
    }

    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      const msg =
        "Voice recognition isn't supported in this browser, but you can type any question to me below!";
      setThomasMessages((prev) => [
        ...prev,
        { id: `thomas-${Date.now()}`, role: 'thomas', text: msg },
      ]);
      speakResponse(msg);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        playThomasSfx('micStart', voiceEnabled);
      };

      recognition.onresult = (event: any) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        if (transcript) {
          handleAskThomas(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  useEffect(() => {
    document.title = 'Md Arman Ansari -- 3D Creator & Cyber Security';

    // Load Google Fonts ('Kanit', 'Cinzel', and 'Syne') if not already injected
    const fontHref =
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Kanit:wght@300;400;500;600;700;800;900&family=Syne:wght@600;700;800&display=swap';
    if (!document.querySelector(`link[href="${fontHref}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontHref;
      document.head.appendChild(link);
    }

    // Smooth initial preloader counter
    const interval = window.setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 5, 100);
      });
    }, 45);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1150);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
      style={{
        overflowX: 'clip',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C] px-6 select-none"
          >
            {/* Glowing 3D Orbital Ring Spinner */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#BBCCD7] border-r-[#B600A8]"
              />
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.6, ease: 'linear' }}
                className="absolute inset-3 rounded-full border-2 border-transparent border-b-[#7621B0] border-l-[#BE4C00]"
              />
              <span className="text-sm font-bold tracking-widest text-[#D7E2EA]">
                {loadProgress}%
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hero-heading text-2xl sm:text-4xl font-black uppercase tracking-wider text-center"
            >
              Md Arman Ansari
            </motion.p>
            <span className="mt-2 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/50">
              Initializing 3D &amp; Cyber Environment
            </span>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
              <motion.div
                className="h-full bg-gradient-to-r from-[#BBCCD7] via-[#B600A8] to-[#BE4C00]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles & .hero-heading Gradient Class */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        html, body, #root {
          background-color: #0C0C0C;
          font-family: 'Kanit', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0C0C0C;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          border-radius: 9999px;
        }
        ::selection {
          background-color: rgba(182, 0, 168, 0.35);
          color: #FFFFFF;
        }
        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Section Order: Hero -> Marquee -> About -> Services -> Projects */}
      {!isLoading && (
        <main className="w-full bg-[#0C0C0C]">
          <HeroSection
            onOpenContact={() => setIsContactOpen(true)}
            onOpenThomas={() => {
              playThomasSfx('activate', voiceEnabled);
              setIsThomasOpen(true);
            }}
            showGreeting={showThomasGreeting}
            onDismissGreeting={() => setShowThomasGreeting(false)}
            latestThomasReply={
              [...thomasMessages].reverse().find((m) => m.role === 'thomas')?.text ||
              "Hey! 👋 I'm THOMAS, Arman's AI assistant. Ask me anything!"
            }
            isThomasSpeaking={isThomasSpeaking}
            isThomasTyping={isThomasTyping}
            isListening={isListening}
            onToggleMic={handleToggleMic}
            onAskThomasDirect={handleAskThomas}
          />
          <MarqueeSection />
          <AboutSection onOpenContact={() => setIsContactOpen(true)} />
          <ServicesSection />
          <ProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </main>
      )}

      {/* THOMAS Personal AI Assistant */}
      {!isLoading && (
        <ThomasAssistant
          isOpen={isThomasOpen}
          onToggle={() => {
            playThomasSfx('activate', voiceEnabled);
            setIsThomasOpen((prev) => !prev);
          }}
          onOpenContact={() => setIsContactOpen(true)}
          messages={thomasMessages}
          isTyping={isThomasTyping}
          isListening={isListening}
          onToggleMic={handleToggleMic}
          onSendMessage={handleAskThomas}
          voiceEnabled={voiceEnabled}
          onToggleVoice={() => {
            setVoiceEnabled((prev) => {
              if (prev && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setIsThomasSpeaking(false);
              }
              return !prev;
            });
          }}
        />
      )}

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => setIsContactOpen(true)}
      />
    </div>
  );
}