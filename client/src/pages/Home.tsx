import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Bike,
  BriefcaseBusiness,
  CarFront,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Compass,
  Crown,
  CreditCard,
  CircleDollarSign,
  Heart,
  Languages,
  LockKeyhole,
  LoaderCircle,
  LocateFixed,
  LogIn,
  MapPin,
  MapPinned,
  MessageCircle,
  MessageSquare,
  Navigation,
  Pencil,
  Gift,
  Phone,
  Power,
  Radio,
  Route,
  RotateCcw,
  Send,
  ShieldCheck,
  Share2,
  Sparkles,
  Star,
  Wallet,
  Target,
  Trophy,
  UserRound,
  Users,
  WalletCards,
  Wifi,
  X,
  Zap,
} from "lucide-react";

type TabId = "ride" | "discover" | "ranks" | "profile";
type RideStep = "pick" | "bid" | "matching" | "matched";
type Accent = "gold" | "crimson";
type DiscoverCategory = "Mascot Hunt" | "Driver Life" | "Business";
type RankView = "riders" | "hunters";
type DriverTabId = "home" | "earnings" | "subscription" | "driverProfile";
type DriverRole = "passenger" | "driver";
type DriverMode = "rider" | "driver";
type MascotView = "map" | "capture" | "wallet";

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

type RankEntry = {
  name: string;
  initials: string;
  stat: string;
  detail: string;
  accent: Accent;
};

type RideHistoryEntry = {
  from: string;
  to: string;
  date: string;
  driver: string;
  price: string;
  vehicle: string;
};

type DriverDemand = {
  area: string;
  detail: string;
  level: string;
  width: string;
};

type MascotCatch = {
  id: string;
  name: string;
  reward: number;
  date: string;
  location: string;
  tone: string;
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

const riderRanks: RankEntry[] = [
  { name: "Brian Otieno", initials: "BO", stat: "1,842 trips", detail: "KSh 284K earned", accent: "gold" },
  { name: "Alex Mwangi", initials: "AM", stat: "1,248 trips", detail: "KSh 198K earned", accent: "gold" },
  { name: "Mercy Wanjiku", initials: "MW", stat: "1,106 trips", detail: "KSh 176K earned", accent: "gold" },
  { name: "Kevin Kiptoo", initials: "KK", stat: "987 trips", detail: "KSh 154K earned", accent: "gold" },
  { name: "Faith Achieng", initials: "FA", stat: "914 trips", detail: "KSh 149K earned", accent: "gold" },
  { name: "Sammy Kamau", initials: "SK", stat: "866 trips", detail: "KSh 137K earned", accent: "gold" },
  { name: "Joy Njeri", initials: "JN", stat: "821 trips", detail: "KSh 129K earned", accent: "gold" },
];

const hunterRanks: RankEntry[] = [
  { name: "Nia Karanja", initials: "NK", stat: "48 mascots", detail: "Gold tier · KSh 42K prizes", accent: "gold" },
  { name: "Tasha Wambui", initials: "TW", stat: "36 mascots", detail: "Gold tier · KSh 31K prizes", accent: "gold" },
  { name: "The Green Run", initials: "GR", stat: "29 mascots", detail: "Silver tier · KSh 24K prizes", accent: "gold" },
  { name: "Nairobi Nia", initials: "NN", stat: "24 mascots", detail: "Silver tier · KSh 18K prizes", accent: "gold" },
  { name: "Wesley K.", initials: "WK", stat: "19 mascots", detail: "Bronze tier · KSh 12K prizes", accent: "gold" },
  { name: "Maya Maina", initials: "MM", stat: "16 mascots", detail: "Bronze tier · KSh 9K prizes", accent: "gold" },
  { name: "Jojo Finds", initials: "JF", stat: "13 mascots", detail: "Bronze tier · KSh 7K prizes", accent: "gold" },
];

const rideHistory: RideHistoryEntry[] = [
  { from: "Westlands", to: "JKIA · Terminal 1A", date: "Today · 08:42", driver: "Alex Mwangi", price: "KSh 480", vehicle: "Spike Econ" },
  { from: "Kilimani", to: "Lavington Mall", date: "Yesterday · 19:16", driver: "Mercy Wanjiku", price: "KSh 260", vehicle: "Boda Spike" },
  { from: "Karen", to: "Westlands", date: "Tue, 03 Sep · 14:05", driver: "Brian Otieno", price: "KSh 720", vehicle: "Spike Gold" },
  { from: "CBD · Kimathi St", to: "Upper Hill", date: "Sun, 01 Sep · 11:28", driver: "Kevin Kiptoo", price: "KSh 310", vehicle: "Spike Econ" },
];

const driverDemand: DriverDemand[] = [
  { area: "Westlands", detail: "Airport runs", level: "High", width: "88%" },
  { area: "Kilimani", detail: "Lunch rush", level: "Rising", width: "64%" },
  { area: "CBD", detail: "Office close", level: "Steady", width: "46%" },
];

const initialMascotCatches: MascotCatch[] = [
  { id: "fox-01", name: "Glow Fox", reward: 200, date: "08 Sep 2026", location: "Kilimani", tone: "amber" },
  { id: "fox-02", name: "Night Fox", reward: 100, date: "06 Sep 2026", location: "Westlands", tone: "crimson" },
  { id: "fox-03", name: "Mau Fox", reward: 300, date: "31 Aug 2026", location: "Karura", tone: "green" },
  { id: "fox-04", name: "City Fox", reward: 50, date: "29 Aug 2026", location: "CBD", tone: "violet" },
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

function DiscoverPost({ post, liked, onToggleLike, onOpenMascotHunt }: { post: DiscoverPost; liked: boolean; onToggleLike: () => void; onOpenMascotHunt: () => void }) {
  return <article className={`discover-post post-${post.visual}`}><DiscoverVisual visual={post.visual} /><div className="discover-vignette" /><div className="discover-post-top"><span className={`discover-category ${post.accent}`}>{post.category === "Mascot Hunt" && <Sparkles size={11} />}{post.category}</span><span className="discover-post-index">{String(discoverPosts.findIndex((item) => item.id === post.id) + 1).padStart(2, "0")} / 05</span></div><div className="discover-side-rail"><button className={`discover-action${liked ? " liked" : ""}`} type="button" aria-label={liked ? "Unlike post" : "Like post"} onClick={onToggleLike}><Heart size={25} fill={liked ? "currentColor" : "none"} /><span>{liked ? "Liked" : post.likes}</span></button><button className="discover-action" type="button" aria-label={`Comment on ${post.username}`}><MessageSquare size={24} /><span>{post.comments}</span></button><button className="discover-action" type="button" aria-label={`Share ${post.username}'s post`}><Share2 size={23} /><span>{post.shares}</span></button>{post.category === "Mascot Hunt" && <button className="discover-mascot-action" type="button" aria-label="Open mascot hunt" onClick={onOpenMascotHunt}><span>🦊</span></button>}</div><div className="discover-post-copy"><div className="discover-user-row"><span className="discover-avatar">{post.initials}</span><strong>{post.username}</strong><span className="discover-follow">Follow</span></div><p>{post.caption}</p><span className="discover-location"><MapPin size={11} /> {post.location}</span></div><div className="discover-swipe-cue"><span>swipe for more</span><ChevronDown size={15} /></div></article>;
}

function DiscoverFeed({ onOpenMascotHunt }: { onOpenMascotHunt: () => void }) {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const toggleLike = (id: string) => setLikedPosts((current) => current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id]);
  return <section className="discover-screen" aria-label="Discover feed"><div className="discover-feed">{discoverPosts.map((post) => <DiscoverPost key={post.id} post={post} liked={likedPosts.includes(post.id)} onToggleLike={() => toggleLike(post.id)} onOpenMascotHunt={onOpenMascotHunt} />)}</div></section>;
}

function HuntHeader({ view, setView, onExit }: { view: MascotView; setView: (view: MascotView) => void; onExit: () => void }) {
  return <div className="hunt-header"><button className="hunt-back" type="button" aria-label="Back to Discover" onClick={onExit}><ArrowLeft size={18} /></button><div><span className="hunt-brand"><span>🦊</span> SPIKE HUNT</span><small>Find the city’s hidden energy.</small></div><button className="hunt-wallet-button" type="button" aria-label="Open mascot wallet" onClick={() => setView("wallet")}><Wallet size={17} /><b>{initialMascotCatches.length}</b></button></div>;
}

function HuntMap({ onCapture }: { onCapture: () => void }) {
  return <div className="hunt-map"><div className="hunt-map-grid" /><div className="hunt-map-road hunt-road-one" /><div className="hunt-map-road hunt-road-two" /><div className="hunt-map-road hunt-road-three" /><div className="hunt-map-zone zone-one" /><div className="hunt-map-zone zone-two" /><span className="hunt-map-label hunt-label-westlands">WESTLANDS</span><span className="hunt-map-label hunt-label-kilimani">KILIMANI</span><span className="hunt-map-label hunt-label-karura">KARURA</span><div className="hunt-pin pin-one" onClick={onCapture}><span>🦊</span><i /></div><div className="hunt-pin pin-two" onClick={onCapture}><span>🦊</span><i /></div><div className="hunt-pin pin-three" onClick={onCapture}><span>🦊</span><i /></div><div className="hunt-user-position"><LocateFixed size={16} /><span>You</span></div><div className="hunt-map-topline"><span><span className="hunt-live-dot" /> 7 mascots nearby</span><span>2.4 km radius</span></div><div className="hunt-map-hint"><Sparkles size={14} /><span>Gold glow means a fresh drop</span></div><button className="nearby-mascot-card" type="button" onClick={onCapture}><span className="nearby-mascot-art">🦊</span><div><b>One is close.</b><small>Tap to check your radius</small></div><ChevronRight size={16} /></button></div>;
}

function CaptureScreen({ reward, onClaim }: { reward: number; onClaim: () => void }) {
  return <section className="capture-screen" aria-label="Mascot captured"><div className="capture-background"><div className="capture-grid" /><div className="capture-orbit capture-orbit-one" /><div className="capture-orbit capture-orbit-two" /><div className="capture-burst burst-one" /><div className="capture-burst burst-two" /></div><div className="capture-topline"><span><Sparkles size={13} /> MASCOT FOUND</span><span>NEAR KILIMANI</span></div><div className="capture-reveal"><div className="capture-ring ring-a" /><div className="capture-ring ring-b" /><div className="capture-mascot">🦊</div><span className="capture-star star-a">✦</span><span className="capture-star star-b">✦</span><span className="capture-star star-c">✦</span></div><p className="capture-eyebrow">YOU CAUGHT A</p><h1>Glow Fox.</h1><p className="capture-copy">Quick hands. Good timing. This little one was waiting for you.</p><div className="capture-reward"><span>CASH REWARD</span><strong>KSh {reward}</strong><small>Added to your Spike wallet when claimed</small></div><button className="claim-button" type="button" onClick={onClaim}><Gift size={17} /><span>Claim reward</span><ArrowRight size={17} /></button><div className="capture-footnote"><MapPinned size={13} /> Kilimani · 08 Sep 2026 · 14:32</div></section>;
}

function MascotCard({ mascot }: { mascot: MascotCatch }) {
  return <div className="mascot-wallet-card"><div className={`wallet-mascot-art ${mascot.tone}`}><span>🦊</span><i>✦</i></div><div className="wallet-card-copy"><strong>{mascot.name}</strong><span><MapPin size={10} /> {mascot.location}</span><small>{mascot.date}</small></div><b className="wallet-reward">KSh {mascot.reward}</b></div>;
}

function MascotWallet({ catches, setView }: { catches: MascotCatch[]; setView: (view: MascotView) => void }) {
  const total = catches.reduce((sum, mascot) => sum + mascot.reward, 0);
  return <section className="mascot-wallet-screen" aria-label="My mascots wallet"><div className="wallet-title-row"><div><p className="eyebrow gold">SPIKE / WALLET</p><h1>My mascots.</h1><p>Every find has a story. Every story pays.</p></div><div className="wallet-total"><Wallet size={17} /><strong>KSh {total.toLocaleString()}</strong><span>total rewards</span></div></div><div className="wallet-tabs"><button className="active" type="button">Caught <b>{catches.length}</b></button><button type="button" onClick={() => setView("map")}>Find more <MapPin size={13} /></button></div><div className="mascot-wallet-grid">{catches.map((mascot) => <MascotCard key={mascot.id} mascot={mascot} />)}</div><button className="wallet-find-button" type="button" onClick={() => setView("map")}><Sparkles size={15} /><span>Find another mascot</span><ArrowRight size={15} /></button></section>;
}

function MascotHuntScreen({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<MascotView>("map");
  const [catches, setCatches] = useState<MascotCatch[]>(initialMascotCatches);
  const [reward, setReward] = useState(200);
  const openCapture = () => { setReward(Math.floor(Math.random() * 6) * 50 + 50); setView("capture"); };
  const claimReward = () => { setCatches((current) => [{ id: `fox-${Date.now()}`, name: "Glow Fox", reward, date: "08 Sep 2026", location: "Kilimani", tone: "amber" }, ...current]); setView("wallet"); };
  return <section className={`mascot-hunt-screen hunt-${view}`} aria-label="Spike Mascot Hunt"><HuntHeader view={view} setView={setView} onExit={onExit} />{view === "map" && <><div className="hunt-title"><p className="eyebrow gold">CITYWIDE SCAVENGER RUN</p><h1>Find your<br />next fox.</h1><p>Hidden around Nairobi. Worth KSh 50–300.</p></div><HuntMap onCapture={openCapture} /><div className="hunt-bottom-stats"><div><strong>07</strong><span>nearby drops</span></div><i /><div><strong>12</strong><span>you've caught</span></div><i /><div><strong>KSh 2.4K</strong><span>earned so far</span></div></div><button className="hunt-wallet-cta" type="button" onClick={() => setView("wallet")}><Wallet size={15} /><span>Open my mascot wallet</span><ArrowRight size={15} /></button></>}{view === "capture" && <CaptureScreen reward={reward} onClaim={claimReward} />}{view === "wallet" && <MascotWallet catches={catches} setView={setView} />}</section>;
}

function RankPodium({ entries, view }: { entries: RankEntry[]; view: RankView }) {
  const podium = [entries[1], entries[0], entries[2]];
  const medals = ["🥈", "🥇", "🥉"];
  return <div className={`rank-podium ${view}`}>
    {podium.map((entry, index) => <div key={entry.name} className={`podium-place place-${index === 1 ? "first" : index === 0 ? "second" : "third"}`}>
      <div className="podium-medal">{medals[index]}</div>
      <div className="podium-avatar">{entry.initials}</div>
      <strong>{entry.name}</strong>
      <span>{view === "riders" ? entry.stat : entry.stat.replace(" mascots", "")}</span>
      <div className="podium-block"><b>{index === 1 ? "01" : index === 0 ? "02" : "03"}</b></div>
    </div>)}
  </div>;
}

function RankList({ entries, view }: { entries: RankEntry[]; view: RankView }) {
  return <div className="rank-list" aria-label={view === "riders" ? "Top riders leaderboard" : "Mascot hunters leaderboard"}>
    {entries.map((entry, index) => <div className={`rank-list-row${index === 0 ? " leader-row" : ""}`} key={entry.name}>
      <span className="rank-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="rank-avatar">{entry.initials}</span>
      <div className="rank-person"><strong>{entry.name}</strong><span>{entry.detail}</span></div>
      <div className="rank-stat"><strong>{entry.stat}</strong><span>{view === "riders" ? "on Spike" : "caught"}</span></div>
    </div>)}
  </div>;
}

function RanksScreen() {
  const [view, setView] = useState<RankView>("riders");
  const entries = view === "riders" ? riderRanks : hunterRanks;
  return <section className="ranks-screen" aria-label="Spike ranks">
    <div className="ranks-header"><div><p className="eyebrow gold">SPIKE / RANKS</p><h1>Earn your<br />place.</h1><p className="ranks-subtitle">Top 3 in each category win prizes every quarter.</p></div><div className="ranks-mark"><Trophy size={20} /></div></div>
    <div className="rank-toggle" role="tablist" aria-label="Ranks category"><button className={view === "riders" ? "active" : ""} type="button" role="tab" aria-selected={view === "riders"} onClick={() => setView("riders")}><CarFront size={14} /> Top Riders</button><button className={view === "hunters" ? "active" : ""} type="button" role="tab" aria-selected={view === "hunters"} onClick={() => setView("hunters")}><Sparkles size={14} /> Mascot Hunters</button></div>
    <div className="ranks-mode-line"><span>{view === "riders" ? "DRIVER LEAGUE" : "CITYWIDE HUNT"}</span><span className="live-rank"><span /> LIVE RANKINGS</span></div>
    <RankPodium entries={entries} view={view} />
    <div className="leaderboard-heading"><div><span>THE BOARD</span><h2>{view === "riders" ? "Top riders" : "Top hunters"}</h2></div><span className="season-pill">Q3 · 2026</span></div>
    <RankList entries={entries} view={view} />
  </section>;
}

function ProfileScreen({ onLoginAsDriver }: { onLoginAsDriver: () => void }) {
  const [bio, setBio] = useState("Moving through Nairobi, one good ride at a time.");
  const [editingBio, setEditingBio] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [language, setLanguage] = useState("English");
  const languages = ["English", "Swahili", "French", "Luo", "Kikuyu"];

  return <section className="profile-screen" aria-label="Spike profile">
    <div className="profile-header"><div><p className="eyebrow crimson">SPIKE / PROFILE</p><h1>Your Spike ID.</h1></div><button className="profile-more" type="button" aria-label="Profile options"><span /><span /><span /></button></div>
    <div className="profile-identity"><div className="profile-avatar"><span>AN</span><i /></div><div className="profile-name-block"><h2>Amina Njeri</h2><div className="profile-rating"><Star size={14} fill="currentColor" /><strong>4.98</strong><span>·</span><span>86 rides</span></div></div><span className="profile-member">SINCE 2026</span></div>
    <div className="bio-row">{editingBio ? <input className="bio-input" autoFocus value={bio} maxLength={76} onChange={(event) => setBio(event.target.value)} onBlur={() => setEditingBio(false)} onKeyDown={(event) => { if (event.key === "Enter") setEditingBio(false); }} aria-label="Edit profile bio" /> : <p>{bio}</p>}<button className="bio-edit" type="button" aria-label="Edit bio" onClick={() => setEditingBio(true)}><Pencil size={13} /></button></div>
    <div className="profile-stats"><div className="profile-stat-card"><Sparkles size={15} /><strong>12</strong><span>Mascots caught</span></div><div className="profile-stat-card"><Zap size={15} /><strong>KSh 2.4K</strong><span>Rewards earned</span></div><div className="profile-stat-card"><Heart size={15} /><strong>08</strong><span>Favorite drivers</span></div></div>
    <div className="profile-section-heading"><span>YOUR SETTINGS</span><small>PRIVATE BY DEFAULT</small></div>
    <div className="settings-card"><div className="settings-row"><div className="settings-icon gold"><ShieldCheck size={16} /></div><div className="settings-copy"><strong>Private account</strong><span>Only approved people can see your activity</span></div><button className={`switch${privateAccount ? " on" : ""}`} type="button" role="switch" aria-checked={privateAccount} aria-label="Private account" onClick={() => setPrivateAccount(!privateAccount)}><i /></button></div><div className="settings-divider" /><div className="settings-row language-row"><div className="settings-icon crimson"><Languages size={16} /></div><div className="settings-copy"><strong>Language</strong><span>Choose your preferred Spike language</span></div></div><div className="language-pills">{languages.map((item) => <button key={item} className={language === item ? "active" : ""} type="button" onClick={() => setLanguage(item)}>{item}</button>)}</div><div className="settings-divider" /><button className="settings-row payment-row" type="button"><div className="settings-icon gold"><CreditCard size={16} /></div><div className="settings-copy"><strong>M-Pesa &amp; cards</strong><span>Add or manage payment methods</span></div><ChevronRight size={17} /></button></div>
    <div className="profile-section-heading history-heading"><span>RECENT RIDES</span><button type="button">See all <ArrowRight size={12} /></button></div>
    <div className="history-list">{rideHistory.map((ride) => <div className="history-row" key={`${ride.date}-${ride.driver}`}><div className="history-route-icon"><span /><i /><span /></div><div className="history-route"><strong>{ride.from} <ArrowRight size={11} /> {ride.to}</strong><span>{ride.date} <i /> {ride.driver}</span><small>{ride.vehicle}</small></div><div className="history-price"><strong>{ride.price}</strong><span>paid</span></div></div>)}</div>
    <button className="driver-login-button" type="button" onClick={onLoginAsDriver}><LogIn size={15} /><span>Log in as driver</span><ArrowRight size={15} /></button>
  </section>;
}

function DriverTopline({ mode, onModeChange, onLogout }: { mode: DriverMode; onModeChange: (mode: DriverMode) => void; onLogout: () => void }) {
  return <div className="driver-topline"><div className="driver-brand"><span className="brand-mark">S</span><div><span className="driver-brand-name">spike</span><span className="driver-role-label">{mode === "rider" ? "RIDER APP" : "DRIVER APP"}</span></div></div><div className="driver-top-actions"><button className="driver-mode-toggle" type="button" onClick={() => onModeChange(mode === "rider" ? "driver" : "rider")} aria-label="Switch driver mode"><span className={mode === "rider" ? "active" : ""}>Bike</span><span className={mode === "driver" ? "active" : ""}>Car</span></button><button className="driver-logout" type="button" aria-label="Return to passenger app" onClick={onLogout}><LogIn size={15} /></button></div></div>;
}

function DriverHome({ mode, onModeChange, onLogout, online, setOnline, activeRide, setActiveRide }: { mode: DriverMode; onModeChange: (mode: DriverMode) => void; onLogout: () => void; online: boolean; setOnline: (value: boolean) => void; activeRide: boolean; setActiveRide: (value: boolean) => void }) {
  return <section className="driver-screen driver-home-screen" aria-label="Driver dashboard"><DriverTopline mode={mode} onModeChange={onModeChange} onLogout={onLogout} />
    <div className="driver-greeting"><div><p className="eyebrow gold">{mode === "rider" ? "RIDER / HOME" : "DRIVER / HOME"}</p><h1>Keep the city<br />moving.</h1></div><button className={`online-toggle${online ? " online" : ""}`} type="button" role="switch" aria-checked={online} onClick={() => setOnline(!online)}><span className="online-toggle-dot" /><span>{online ? "Online" : "Offline"}</span></button></div>
    <div className="driver-earnings-hero"><div className="driver-hero-orb" /><div className="driver-earnings-label"><span>TODAY'S EARNINGS</span><CircleDollarSign size={15} /></div><strong>KSh 4,860</strong><div className="driver-earnings-meta"><span>+18% vs last Tuesday</span><span>7 rides · 9.2 hrs</span></div><div className="driver-hero-line"><i /><i /><i /><i /><i /><i /><i /></div></div>
    <div className="driver-section-head"><div><span>AI CITY PULSE</span><h2>Where to head next.</h2></div><span className="pulse-live"><span /> LIVE</span></div>
    <div className="demand-card">{driverDemand.map((item) => <div className="demand-row" key={item.area}><div className="demand-area"><strong>{item.area}</strong><span>{item.detail}</span></div><div className="demand-meter"><i style={{ width: item.width }} /></div><span className={`demand-level ${item.level.toLowerCase()}`}>{item.level}</span><ChevronRight size={14} /></div>)}</div>
    <div className="driver-section-head bid-head"><div><span>NEARBY NOW</span><h2>Incoming bid</h2></div><button className={`active-ride-control${activeRide ? " engaged" : ""}`} type="button" onClick={() => setActiveRide(!activeRide)}>{activeRide ? <LockKeyhole size={11} /> : <Route size={11} />}{activeRide ? "Trip in progress" : "Test active ride"}</button></div>
    <div className={`incoming-bid-card${activeRide ? " locked" : ""}`}><div className="bid-card-top"><span className="nearby-dot" /><span>{activeRide ? "BID LOCKED" : "RIDER NEARBY"}</span><small>{activeRide ? "Finish current trip to accept" : "just now"}</small></div><div className="incoming-route"><div className="incoming-route-line"><span /><i /><span /></div><div><strong>Westlands, Woodvale Grove</strong><span>to JKIA · Terminal 1A</span></div></div><div className="incoming-bid-bottom"><div><span>RIDER BID</span><strong>KSh 420</strong><small>Standard KSh 480 · 12% off</small></div><div className="bid-actions"><button className="decline-bid" type="button" disabled={activeRide}>Decline</button><button className="accept-bid" type="button" disabled={activeRide}>{activeRide ? <LockKeyhole size={13} /> : <Check size={13} />} {activeRide ? "Locked" : "Accept"}</button></div></div></div>
  </section>;
}

function DriverEarnings({ mode, onModeChange, onLogout }: { mode: DriverMode; onModeChange: (mode: DriverMode) => void; onLogout: () => void }) {
  const [period, setPeriod] = useState("Today");
  return <section className="driver-screen driver-earnings-screen" aria-label="Driver earnings"><DriverTopline mode={mode} onModeChange={onModeChange} onLogout={onLogout} /><div className="driver-page-heading"><p className="eyebrow gold">{mode === "rider" ? "RIDER / EARNINGS" : "DRIVER / EARNINGS"}</p><h1>Make it<br />count.</h1><p>Stay close to the numbers that keep you moving.</p></div><div className="period-toggle">{["Today", "This week", "This month"].map((item) => <button key={item} className={period === item ? "active" : ""} type="button" onClick={() => setPeriod(item)}>{item}</button>)}</div><div className="earnings-total-card"><span>{period.toUpperCase()} NET</span><strong>{period === "Today" ? "KSh 4,860" : period === "This week" ? "KSh 28,440" : "KSh 104,260"}</strong><div><span><ArrowUpRightIcon /> 18.4%</span><small>after estimated costs</small></div></div><div className="goal-card"><div className="goal-top"><div><span>RUNNING GOAL</span><strong>2 more rides to hit your KSh 6,000 goal today</strong></div><span className="goal-percent">81%</span></div><div className="goal-track"><i /></div><div className="goal-meta"><span>KSh 4,860 made</span><span>KSh 1,140 to go</span></div></div><div className="driver-section-head cost-heading"><div><span>PROFIT SNAPSHOT</span><h2>Where it goes.</h2></div><span className="margin-pill">40% margin model</span></div><div className="cost-card"><div className="cost-line"><span className="cost-icon fuel"><Zap size={14} /></span><div><strong>Fuel estimate</strong><small>7 rides · 92 km today</small></div><strong className="cost-value">− KSh 1,920</strong></div><div className="cost-divider" /><div className="cost-line"><span className="cost-icon fare"><Banknote size={14} /></span><div><strong>Fare collected</strong><small>Gross rider payments</small></div><strong className="cost-value positive">KSh 4,860</strong></div><div className="cost-footer"><span>EST. TAKE-HOME</span><strong>KSh 2,940</strong></div></div></section>;
}

function ArrowUpRightIcon() { return <span className="arrow-up-right">↗</span>; }

function DriverSubscription({ mode, onModeChange, onLogout }: { mode: DriverMode; onModeChange: (mode: DriverMode) => void; onLogout: () => void }) {
  const isRider = mode === "rider";
  const dailyPrice = isRider ? "$1" : "$3";
  return <section className="driver-screen driver-subscription-screen" aria-label="Driver subscription"><DriverTopline mode={mode} onModeChange={onModeChange} onLogout={onLogout} /><div className="driver-page-heading"><p className="eyebrow crimson">{isRider ? "RIDER / ACCESS" : "DRIVER / ACCESS"}</p><h1>Keep your<br />wheels on.</h1><p>Stay active, earn freely, and keep every trip connected.</p></div><div className="current-plan-card"><div className="plan-glow" /><div className="plan-chip"><Sparkles size={11} /> CURRENT PLAN</div><div className="plan-title-row"><div><strong>{isRider ? "Rider" : "Driver"}</strong><span>Daily access</span></div><div><b>{dailyPrice}</b><small>/ day</small></div></div><div className="plan-status"><span /><span>Active today</span><span className="plan-renews">Renews at midnight</span></div></div><div className="subscription-section-label">CHOOSE YOUR RHYTHM</div><div className="monthly-plan-card"><div className="monthly-card-top"><div className="monthly-icon"><CalendarIcon /></div><div><strong>Monthly access</strong><span>Built for your full-time grind</span></div><span className="free-days">5 FREE DAYS</span></div><div className="monthly-price"><strong>{isRider ? "$25" : "$75"}</strong><span>/ month</span><button type="button">Choose plan <ArrowRight size={14} /></button></div></div><div className="payment-methods-card"><div className="payment-card-heading"><div><span>PAYMENT METHOD</span><strong>Simple, local, secure.</strong></div><ShieldCheck size={17} /></div><div className="payment-logos"><span className="mpesa-logo">M-PESA</span><span className="card-logo mastercard">●●</span><span className="card-logo visa">VISA</span></div><p>Pay with M-Pesa, Mastercard, or Visa. Change your method anytime.</p></div><div className="subscription-footnote"><LockKeyhole size={13} /> Payments are encrypted and protected by Spike.</div></section>;
}

function CalendarIcon() { return <span className="calendar-icon"><i /><b /></span>; }

function DriverProfile({ mode, onModeChange, onLogout }: { mode: DriverMode; onModeChange: (mode: DriverMode) => void; onLogout: () => void }) {
  const [privateProfile, setPrivateProfile] = useState(false);
  return <section className="driver-screen driver-profile-screen" aria-label="Driver profile"><DriverTopline mode={mode} onModeChange={onModeChange} onLogout={onLogout} /><div className="driver-profile-header"><div><p className="eyebrow crimson">{mode === "rider" ? "RIDER / PROFILE" : "DRIVER / PROFILE"}</p><h1>Your work,<br />your story.</h1></div><div className="driver-warning"><span><span /> 1 of 2</span><small>warnings</small></div></div><div className="driver-profile-identity"><div className="driver-profile-avatar">JM<i /></div><div><h2>James Mutua</h2><div><Star size={13} fill="currentColor" /> <strong>4.92</strong><span>· 1,106 trips</span></div></div><span className="verified-driver"><ShieldCheck size={12} /> VERIFIED</span></div><p className="driver-bio">{mode === "rider" ? "Your reliable two-wheel shortcut through Nairobi." : "Making Nairobi moves smoother, one ride at a time."}</p><div className="driver-photo-strip"><div className="driver-photo photo-one"><span>JM</span></div><div className="driver-photo photo-two"><Bike size={19} /></div><div className="driver-photo photo-three"><CarFront size={19} /></div><button className="add-photo" type="button">+<small>Add photo</small></button></div><div className="driver-profile-section-label">SOCIAL PROFILE</div><div className="driver-social-card"><div className="driver-social-row"><div><strong>Bio visibility</strong><span>Let riders get to know you</span></div><button className={`switch${privateProfile ? " on" : ""}`} type="button" role="switch" aria-checked={privateProfile} onClick={() => setPrivateProfile(!privateProfile)}><i /></button></div><div className="driver-social-divider" /><div className="driver-social-row"><div><strong>Private profile</strong><span>{privateProfile ? "Only matched riders can see your profile" : "Your profile is visible to riders"}</span></div><LockKeyhole size={15} /></div></div><button className="driver-logout-button" type="button" onClick={onLogout}><LogIn size={14} /> Return to passenger app</button></section>;
}

function DriverShell({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<DriverTabId>("home");
  const [mode, setMode] = useState<DriverMode>("rider");
  const [online, setOnline] = useState(true);
  const [activeRide, setActiveRide] = useState(false);
  const driverTabs: { id: DriverTabId; label: string; icon: typeof Radio }[] = [{ id: "home", label: "Home", icon: Radio }, { id: "earnings", label: "Earnings", icon: WalletCards }, { id: "subscription", label: "Access", icon: Crown }, { id: "driverProfile", label: "Profile", icon: UserRound }];
  const changeMode = (nextMode: DriverMode) => setMode(nextMode);
  return <div className="driver-app"><div className="driver-app-content">{activeTab === "home" ? <DriverHome mode={mode} onModeChange={changeMode} onLogout={onLogout} online={online} setOnline={setOnline} activeRide={activeRide} setActiveRide={setActiveRide} /> : activeTab === "earnings" ? <DriverEarnings mode={mode} onModeChange={changeMode} onLogout={onLogout} /> : activeTab === "subscription" ? <DriverSubscription mode={mode} onModeChange={changeMode} onLogout={onLogout} /> : <DriverProfile mode={mode} onModeChange={changeMode} onLogout={onLogout} />}</div><nav className="driver-bottom-nav" aria-label="Driver navigation">{driverTabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} className={activeTab === tab.id ? "active" : ""} type="button" onClick={() => setActiveTab(tab.id)}><span><Icon size={19} /></span><small>{tab.label}</small></button>; })}</nav></div>;
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
  const [role, setRole] = useState<DriverRole>("passenger");
  const [mascotHunt, setMascotHunt] = useState(false);
  const activeScreen = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  return <main className="app-stage"><div className="phone-shell"><StatusBar /><div className="app-content">{role === "driver" ? <DriverShell onLogout={() => setRole("passenger")} /> : mascotHunt ? <MascotHuntScreen onExit={() => setMascotHunt(false)} /> : activeTab === "ride" ? <RideFlow /> : activeTab === "discover" ? <DiscoverFeed onOpenMascotHunt={() => setMascotHunt(true)} /> : activeTab === "ranks" ? <RanksScreen /> : activeTab === "profile" ? <ProfileScreen onLoginAsDriver={() => setRole("driver")} /> : <PlaceholderScreen tab={activeScreen} />}</div>{role === "passenger" && !mascotHunt && <Mascot />}{role === "passenger" && !mascotHunt ? <BottomNav activeTab={activeTab} onChange={setActiveTab} /> : null}<div className="home-indicator" aria-hidden="true" /></div><div className="stage-caption" aria-hidden="true"><CircleUserRound size={14} /> <span>Spike · Nairobi, KE</span></div></main>;
}
