import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  CarFront,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Compass,
  Crown,
  Heart,
  LoaderCircle,
  MapPin,
  MessageCircle,
  MessageSquare,
  Navigation,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Share2,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

type TabId = "ride" | "discover" | "ranks" | "profile";
type RideStep = "pick" | "bid" | "matching" | "matched";
type Accent = "gold" | "crimson";
type DiscoverCategory = "Mascot Hunt" | "Driver Life" | "Business";

type Tab = {
  id: TabId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof CarFront;
  accent: Accent;
  glyph: string;
};

type Vehicle = {
  id: string;
  name: string;
  kind: string;
  eta: string;
  description: string;
  price: number;
  basePrice: number;
  icon: typeof Bike;
  accent: Accent;
};

type DiscoverPost = {
  id: string;
  category: DiscoverCategory;
  accent: Accent;
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  location: string;
  initials: string;
  visual: string;
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

const vehicles: Vehicle[] = [
  {
    id: "boda",
    name: "Boda Spike",
    kind: "Motorbike",
    eta: "3 min",
    description: "Beat the traffic, keep it light.",
    price: 220,
    basePrice: 260,
    icon: Bike,
    accent: "gold",
  },
  {
    id: "econ",
    name: "Spike Econ",
    kind: "Standard car",
    eta: "5 min",
    description: "Everyday comfort for the city.",
    price: 480,
    basePrice: 565,
    icon: CarFront,
    accent: "gold",
  },
  {
    id: "gold",
    name: "Spike Gold",
    kind: "Premium car",
    eta: "7 min",
    description: "A little more room. A lot more calm.",
    price: 860,
    basePrice: 1_010,
    icon: Crown,
    accent: "crimson",
  },
];

const discoverPosts: DiscoverPost[] = [
  {
    id: "mascot-kilimani",
    category: "Mascot Hunt",
    accent: "gold",
    username: "@nairobi_nia",
    caption: "Found the tiny Spike fox hiding in Kilimani. KSh 2,000 reward secured!",
    likes: "18.4K",
    comments: "342",
    shares: "1.2K",
    location: "Kilimani · 4 min ago",
    initials: "NN",
    visual: "mascot-kilimani",
  },
  {
    id: "driver-week",
    category: "Driver Life",
    accent: "crimson",
    username: "@alex_on_the_move",
    caption: "Seven days, 86 rides, 4.96 stars. Nairobi, you kept me moving.",
    likes: "9.8K",
    comments: "188",
    shares: "403",
    location: "Westlands · 18 min ago",
    initials: "AM",
    visual: "driver-week",
  },
  {
    id: "business-offer",
    category: "Business",
    accent: "crimson",
    username: "@soko_supperclub",
    caption: "Dinner is calling. Free delivery across Lavington tonight with code SPIKE.",
    likes: "12.1K",
    comments: "96",
    shares: "2.4K",
    location: "Lavington · 32 min ago",
    initials: "SS",
    visual: "business-offer",
  },
  {
    id: "mascot-karura",
    category: "Mascot Hunt",
    accent: "gold",
    username: "@the_green_run",
    caption: "Spotted a gold tail by Karura. Is this the next mascot drop?",
    likes: "6.7K",
    comments: "521",
    shares: "908",
    location: "Karura · 1 hr ago",
    initials: "GR",
    visual: "mascot-karura",
  },
  {
    id: "business-roastery",
    category: "Business",
    accent: "crimson",
    username: "@w_estate_roastery",
    caption: "First coffee is on us. Tap in before the morning rush hits Waiyaki Way.",
    likes: "4.2K",
    comments: "74",
    shares: "687",
    location: "Waiyaki Way · 2 hrs ago",
    initials: "WR",
    visual: "business-roastery",
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

function ScreenTopline({ compact = false, onBack }: { compact?: boolean; onBack?: () => void }) {
  return (
    <div className={`screen-topline${compact ? " compact" : ""}`}>
      {onBack ? (
        <button className="icon-button back-button" type="button" aria-label="Back to vehicle selection" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
      ) : (
        <BrandMark />
      )}
      <div className="city-pill">
        <MapPin size={13} strokeWidth={2.25} />
        <span>Nairobi</span>
      </div>
    </div>
  );
}

function DestinationPill() {
  return (
    <div className="destination-pill">
      <div className="route-line" aria-hidden="true"><span /><i /><span /></div>
      <div className="destination-stop">
        <span className="stop-label">PICK UP</span>
        <strong>Westlands, Woodvale Grove</strong>
      </div>
      <ArrowRight className="route-arrow" size={15} />
      <div className="destination-stop dropoff">
        <span className="stop-label">DROP OFF</span>
        <strong>JKIA · Terminal 1A</strong>
      </div>
      <ChevronDown className="destination-chevron" size={16} />
    </div>
  );
}

function AbstractMap() {
  return (
    <div className="abstract-map" aria-label="Abstract map preview">
      <div className="map-sheen" /><div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" /><div className="map-road road-d" /><div className="map-road road-e" /><div className="map-area area-a" /><div className="map-area area-b" /><div className="map-area area-c" />
      <div className="map-label label-westlands">WESTLANDS</div><div className="map-label label-kilimani">KILIMANI</div><div className="map-label label-airport">JKIA</div><div className="map-route-line" />
      <div className="map-pin pickup"><MapPin size={18} fill="currentColor" /></div><div className="map-pin dropoff"><Target size={17} /></div>
      <div className="map-map-controls" aria-hidden="true"><span>+</span><span>−</span></div><div className="map-status-pill"><span className="live-dot" /> Live traffic</div><div className="map-corner-label">NAI / 001</div>
    </div>
  );
}

function VehicleCard({ vehicle, selected, onSelect }: { vehicle: Vehicle; selected: boolean; onSelect: () => void }) {
  const Icon = vehicle.icon;
  return (
    <button className={`vehicle-card${selected ? " selected" : ""}`} type="button" onClick={onSelect} aria-pressed={selected}>
      <div className={`vehicle-icon ${vehicle.accent}`}><Icon size={24} strokeWidth={1.8} /></div><div className="vehicle-info"><div className="vehicle-name-row"><strong>{vehicle.name}</strong>{vehicle.id === "econ" && <span className="popular-tag">POPULAR</span>}</div><span className="vehicle-kind">{vehicle.kind} <i /> {vehicle.description}</span><span className="vehicle-eta"><span className="eta-dot" /> {vehicle.eta} away</span></div><div className="vehicle-price-block"><strong>KSh {vehicle.price.toLocaleString()}</strong><span>incl. fees</span></div><span className="vehicle-selector" aria-hidden="true">{selected && <Check size={12} strokeWidth={3} />}</span>
    </button>
  );
}

function RidePick({ selectedVehicle, onSelectVehicle }: { selectedVehicle: Vehicle | null; onSelectVehicle: (vehicle: Vehicle) => void }) {
  return (
    <section className="ride-screen pick-screen" aria-labelledby="ride-pick-title">
      <ScreenTopline /><div className="ride-heading-row"><div><p className="eyebrow gold">RIDE / NOW</p><h1 id="ride-pick-title">Where to?</h1></div><div className="ride-heading-mark"><Navigation size={17} /></div></div><AbstractMap /><DestinationPill />
      <div className="section-heading vehicle-section-heading"><div><span className="section-kicker">CHOOSE YOUR RIDE</span><h2>Go your way.</h2></div><span className="surge-badge"><Zap size={11} fill="currentColor" /> Rush hour +15%</span></div>
      <div className="vehicle-list">{vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} selected={selectedVehicle?.id === vehicle.id} onSelect={() => onSelectVehicle(vehicle)} />)}</div><div className="ride-trust-row"><ShieldCheck size={14} /><span>Upfront pricing</span><i /><Users size={14} /><span>Verified drivers</span></div>
    </section>
  );
}

function BidScreen({ vehicle, bidPercent, onBidChange, onBack, onSendBid }: { vehicle: Vehicle; bidPercent: number; onBidChange: (value: number) => void; onBack: () => void; onSendBid: () => void }) {
  const bidPrice = Math.round(vehicle.basePrice * (1 - bidPercent / 100));
  const Icon = vehicle.icon;
  return (
    <section className="ride-screen bid-screen" aria-labelledby="bid-title"><ScreenTopline compact onBack={onBack} /><div className="step-progress" aria-label="Booking step 2 of 4"><span /><span className="active" /><span /><span /></div><p className="eyebrow gold">STEP 02 / BID</p><h1 id="bid-title">Name your<br />price.</h1><p className="bid-intro">Nearby drivers see your offer and can accept or decline. A sharper bid can mean a longer wait.</p>
      <div className="bid-trip-card"><div className={`vehicle-icon small ${vehicle.accent}`}><Icon size={20} /></div><div><strong>{vehicle.name}</strong><span>Westlands <ArrowRight size={11} /> JKIA</span></div><span className="bid-eta"><ClockIcon /> {vehicle.eta}</span></div><div className="bid-price-card"><div className="price-meta"><span>AI CALCULATED BASE</span><span className="ai-chip"><Sparkles size={11} /> AI fair</span></div><div className="price-values"><span className="base-price">KSh {vehicle.basePrice.toLocaleString()}</span><span className="bid-price">KSh {bidPrice.toLocaleString()}</span></div><div className="price-save"><span>YOUR BID</span><strong>Save KSh {(vehicle.basePrice - bidPrice).toLocaleString()}</strong></div></div>
      <div className="bid-slider-section"><div className="slider-label-row"><span>Ask for less</span><strong>{bidPercent}% off</strong><span>Faster match</span></div><input className="bid-slider" aria-label="Max bid discount" type="range" min="0" max="25" step="1" value={bidPercent} onChange={(event) => onBidChange(Number(event.target.value))} style={{ "--slider-progress": `${(bidPercent / 25) * 100}%` } as React.CSSProperties} /><div className="slider-endpoints"><span>0%</span><span>Max bid (25%)</span><span>25%</span></div></div><div className="bid-advice"><Sparkles size={16} /><p><strong>Spike tip</strong> Bids around 10–15% off usually get a quick yes around here.</p></div><button className="primary-action" type="button" onClick={onSendBid}><span>Send bid · KSh {bidPrice.toLocaleString()}</span><ArrowRight size={18} /></button>
    </section>
  );
}

function ClockIcon() { return <span className="clock-icon" aria-hidden="true"><span /></span>; }

function MatchingScreen({ vehicle, bidPercent }: { vehicle: Vehicle; bidPercent: number }) {
  return <section className="ride-screen matching-screen" aria-labelledby="matching-title"><ScreenTopline /><div className="step-progress" aria-label="Booking step 3 of 4"><span /><span /><span className="active" /><span /></div><div className="matching-visual" aria-hidden="true"><div className="matching-ring ring-one" /><div className="matching-ring ring-two" /><div className="matching-ring ring-three" /><div className="matching-core"><LoaderCircle size={28} /></div><div className="matching-route route-left"><span /></div><div className="matching-route route-right"><span /></div></div><p className="eyebrow gold">BID SENT / SEARCHING</p><h1 id="matching-title">Finding your<br />rider.</h1><p className="matching-copy">Your KSh {Math.round(vehicle.basePrice * (1 - bidPercent / 100)).toLocaleString()} bid is making its way through the city.</p><div className="drivers-notified"><div className="mini-avatar-stack"><span>JM</span><span>AK</span><span>NW</span></div><strong>12 nearby drivers</strong><span>received your bid</span></div><div className="matching-footnote"><span className="pulse-dot" /> Usually takes under 60 seconds</div></section>;
}

function MatchedScreen({ vehicle, onReset }: { vehicle: Vehicle; onReset: () => void }) {
  const [favorite, setFavorite] = useState(false);
  return <section className="ride-screen matched-screen" aria-labelledby="matched-title"><ScreenTopline /><div className="step-progress" aria-label="Booking step 4 of 4"><span /><span /><span /><span className="active" /></div><div className="matched-status"><span className="matched-check"><Check size={15} strokeWidth={3} /></span><span>MATCH CONFIRMED</span><span className="match-time">now</span></div><h1 id="matched-title">Your rider is<br />on the way.</h1><div className="driver-card"><div className="driver-card-top"><div className="driver-avatar">AM</div><div className="driver-identity"><strong>Alex Mwangi</strong><span><Star size={13} fill="currentColor" /> 4.96 <i /> 1,248 trips</span></div><span className="driver-online"><span /> online</span></div><div className="vehicle-detail-row"><div className="detail-pair"><span>PLATE</span><strong>KDA 482M</strong></div><div className="detail-pair"><span>VEHICLE</span><strong>Toyota Fielder</strong></div><div className="detail-pair"><span>COLOUR</span><strong>Midnight black</strong></div></div><div className="driver-arrival"><div><span>ARRIVES IN</span><strong>4 min</strong></div><div className="arrival-line"><span /><i /><span /></div><div className="arrival-pin"><Navigation size={15} fill="currentColor" /></div></div></div><div className="matched-actions"><button type="button"><Phone size={18} /><span>Call</span></button><button type="button"><MessageCircle size={18} /><span>WhatsApp</span></button><button className={favorite ? "is-favorite" : ""} type="button" onClick={() => setFavorite(!favorite)}><Heart size={18} fill={favorite ? "currentColor" : "none"} /><span>{favorite ? "Saved" : "Favorite"}</span></button></div><div className="safety-note"><ShieldCheck size={15} /><span>Your trip is protected by Spike Safety.</span><ChevronRight size={14} /></div><button className="cancel-request" type="button" onClick={onReset}><RotateCcw size={14} /> Cancel / new request</button></section>;
}

function RideFlow() {
  const [step, setStep] = useState<RideStep>("pick");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bidPercent, setBidPercent] = useState(12);
  useEffect(() => { if (step !== "matching") return undefined; const timeout = window.setTimeout(() => setStep("matched"), 3_200); return () => window.clearTimeout(timeout); }, [step]);
  const resetRide = () => { setSelectedVehicle(null); setBidPercent(12); setStep("pick"); };
  if (step === "bid" && selectedVehicle) return <BidScreen vehicle={selectedVehicle} bidPercent={bidPercent} onBidChange={setBidPercent} onBack={() => setStep("pick")} onSendBid={() => setStep("matching")} />;
  if (step === "matching" && selectedVehicle) return <MatchingScreen vehicle={selectedVehicle} bidPercent={bidPercent} />;
  if (step === "matched" && selectedVehicle) return <MatchedScreen vehicle={selectedVehicle} onReset={resetRide} />;
  return <RidePick selectedVehicle={selectedVehicle} onSelectVehicle={(vehicle) => { setSelectedVehicle(vehicle); setStep("bid"); }} />;
}

function DiscoverVisual({ visual }: { visual: string }) {
  return <div className={`discover-visual visual-${visual}`} aria-hidden="true"><div className="visual-noise" /><div className="visual-sun" /><div className="visual-orb orb-one" /><div className="visual-orb orb-two" /><div className="visual-silhouette" /><div className="visual-spark spark-one">✦</div><div className="visual-spark spark-two">✦</div><span className="visual-code">SPIKE / CITY FEED</span></div>;
}

function DiscoverPost({ post, liked, onToggleLike }: { post: DiscoverPost; liked: boolean; onToggleLike: () => void }) {
  return <article className={`discover-post post-${post.visual}`}><DiscoverVisual visual={post.visual} /><div className="discover-vignette" /><div className="discover-post-top"><span className={`discover-category ${post.accent}`}>{post.category === "Mascot Hunt" && <Sparkles size={11} />}{post.category}</span><span className="discover-post-index">{String(discoverPosts.findIndex((item) => item.id === post.id) + 1).padStart(2, "0")} / 05</span></div><div className="discover-side-rail"><button className={`discover-action${liked ? " liked" : ""}`} type="button" aria-label={liked ? "Unlike post" : "Like post"} onClick={onToggleLike}><Heart size={25} fill={liked ? "currentColor" : "none"} /><span>{liked ? "Liked" : post.likes}</span></button><button className="discover-action" type="button" aria-label={`Comment on ${post.username}`}><MessageSquare size={24} /><span>{post.comments}</span></button><button className="discover-action" type="button" aria-label={`Share ${post.username}'s post`}><Share2 size={23} /><span>{post.shares}</span></button>{post.category === "Mascot Hunt" && <button className="discover-mascot-action" type="button" aria-label="Open mascot hunt"><span>🦊</span></button>}</div><div className="discover-post-copy"><div className="discover-user-row"><span className="discover-avatar">{post.initials}</span><strong>{post.username}</strong><span className="discover-follow">Follow</span></div><p>{post.caption}</p><span className="discover-location"><MapPin size={11} /> {post.location}</span></div><div className="discover-swipe-cue"><span>swipe for more</span><ChevronDown size={15} /></div></article>;
}

function DiscoverFeed() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const toggleLike = (id: string) => setLikedPosts((current) => current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id]);
  return <section className="discover-screen" aria-label="Discover feed"><div className="discover-feed">{discoverPosts.map((post) => <DiscoverPost key={post.id} post={post} liked={likedPosts.includes(post.id)} onToggleLike={() => toggleLike(post.id)} />)}</div></section>;
}

function PlaceholderScreen({ tab }: { tab: Tab }) {
  const Icon = tab.icon;
  return <section className="placeholder-screen" aria-labelledby={`${tab.id}-title`}><div className="screen-topline"><BrandMark /><div className="city-pill"><MapPin size={13} strokeWidth={2.25} /><span>Nairobi</span></div></div><div className={`placeholder-art ${tab.accent}`} aria-hidden="true"><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-glow" /><div className="art-icon-wrap"><Icon size={30} strokeWidth={1.7} /></div><span className="art-index">/{tab.glyph}</span></div><div className="placeholder-copy"><p className={`eyebrow ${tab.accent}`}>{tab.eyebrow}</p><h1 id={`${tab.id}-title`}>{tab.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1><p className="placeholder-description">{tab.description}</p></div><div className="launch-note"><span className="launch-dot" /><span>Shell ready · feature layer next</span><ChevronRight size={15} /></div></section>;
}

function BottomNav({ activeTab, onChange }: { activeTab: TabId; onChange: (id: TabId) => void }) {
  return <nav className="bottom-nav" aria-label="Primary navigation">{tabs.map((tab) => { const Icon = tab.icon; const isActive = activeTab === tab.id; return <button key={tab.id} className={`nav-item${isActive ? " active" : ""}`} type="button" aria-current={isActive ? "page" : undefined} onClick={() => onChange(tab.id)}><span className="nav-icon-wrap"><Icon size={21} strokeWidth={isActive ? 2.25 : 1.8} />{isActive && <span className="active-indicator" />}</span><span className="nav-label">{tab.label}</span></button>; })}</nav>;
}

function Mascot() {
  const [open, setOpen] = useState(false);
  return <div className={`mascot-wrap${open ? " open" : ""}`}><div className="mascot-tip"><div className="tip-title"><Sparkles size={13} /> Spike says</div><p><strong>Westlands is heating up.</strong> Bid 10–15% off now for a good balance.</p></div><button className="mascot-button" type="button" aria-label="Toggle Spike AI tip" aria-expanded={open} onClick={() => setOpen(!open)}><span>🦊</span><i /></button></div>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("ride");
  const activeScreen = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  return <main className="app-stage"><div className="phone-shell"><StatusBar /><div className="app-content">{activeTab === "ride" ? <RideFlow /> : activeTab === "discover" ? <DiscoverFeed /> : <PlaceholderScreen tab={activeScreen} />}</div><Mascot /><BottomNav activeTab={activeTab} onChange={setActiveTab} /><div className="home-indicator" aria-hidden="true" /></div><div className="stage-caption" aria-hidden="true"><CircleUserRound size={14} /> <span>Spike · Nairobi, KE</span></div></main>;
}
