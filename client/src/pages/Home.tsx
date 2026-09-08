import { useState } from "react";
import {
  CarFront,
  ChevronRight,
  CircleUserRound,
  Compass,
  MapPin,
  Trophy,
  UserRound,
} from "lucide-react";

type TabId = "ride" | "discover" | "ranks" | "profile";

type Tab = {
  id: TabId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof CarFront;
  accent: "gold" | "crimson";
  glyph: string;
};

const tabs: Tab[] = [
  {
    id: "ride",
    label: "Ride",
    eyebrow: "MOVE THROUGH NAIROBI",
    title: "Your next move\nstarts here.",
    description: "Your ride command center is getting ready.",
    icon: CarFront,
    accent: "gold",
    glyph: "01",
  },
  {
    id: "discover",
    label: "Discover",
    eyebrow: "THE CITY, IN MOTION",
    title: "See what’s\nhappening now.",
    description: "Your city feed will land here soon.",
    icon: Compass,
    accent: "crimson",
    glyph: "02",
  },
  {
    id: "ranks",
    label: "Ranks",
    eyebrow: "YOUR RUN, YOUR RANK",
    title: "Climb the\nNairobi board.",
    description: "Community rankings are on the way.",
    icon: Trophy,
    accent: "gold",
    glyph: "03",
  },
  {
    id: "profile",
    label: "Profile",
    eyebrow: "YOUR SPIKE ID",
    title: "Make the city\nknow your pace.",
    description: "Your profile will be ready to shape.",
    icon: UserRound,
    accent: "crimson",
    glyph: "04",
  },
];

function StatusBar() {
  return (
    <div className="status-bar" aria-label="Status bar">
      <span className="status-time">9:41</span>
      <div className="status-details" aria-hidden="true">
        <span className="signal-bars"><i /><i /><i /><i /></span>
        <span className="wifi-mark"><span /></span>
        <span className="battery-mark"><span /></span>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="brand-lockup" aria-label="Spike">
      <span className="brand-mark">S</span>
      <span className="brand-name">spike</span>
    </div>
  );
}

function PlaceholderScreen({ tab }: { tab: Tab }) {
  const Icon = tab.icon;

  return (
    <section className="placeholder-screen" aria-labelledby={`${tab.id}-title`}>
      <div className="screen-topline">
        <BrandMark />
        <div className="city-pill">
          <MapPin size={13} strokeWidth={2.25} />
          <span>Nairobi</span>
        </div>
      </div>

      <div className={`placeholder-art ${tab.accent}`} aria-hidden="true">
        <div className="art-grid" />
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-glow" />
        <div className="art-icon-wrap">
          <Icon size={30} strokeWidth={1.7} />
        </div>
        <span className="art-index">/{tab.glyph}</span>
      </div>

      <div className="placeholder-copy">
        <p className={`eyebrow ${tab.accent}`}>{tab.eyebrow}</p>
        <h1 id={`${tab.id}-title`}>
          {tab.title.split("\n").map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
        <p className="placeholder-description">{tab.description}</p>
      </div>

      <div className="launch-note">
        <span className="launch-dot" />
        <span>Shell ready · feature layer next</span>
        <ChevronRight size={15} />
      </div>
    </section>
  );
}

function BottomNav({ activeTab, onChange }: { activeTab: TabId; onChange: (id: TabId) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`nav-item${isActive ? " active" : ""}`}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(tab.id)}
          >
            <span className="nav-icon-wrap">
              <Icon size={21} strokeWidth={isActive ? 2.25 : 1.8} />
              {isActive && <span className="active-indicator" />}
            </span>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("ride");
  const activeScreen = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <main className="app-stage">
      <div className="phone-shell">
        <StatusBar />
        <div className="app-content">
          <PlaceholderScreen tab={activeScreen} />
        </div>
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
        <div className="home-indicator" aria-hidden="true" />
      </div>
      <div className="stage-caption" aria-hidden="true">
        <CircleUserRound size={14} /> <span>Spike · Nairobi, KE</span>
      </div>
    </main>
  );
}
