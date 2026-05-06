"use client";

import { supabase } from "@/app/lib/supabase";
import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Crown,
  Eye,
  EyeOff,
  Fingerprint,
  Gem,
  Globe,
  Headphones,
  KeyRound,
  Laptop,
  Layers3,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Phone,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type PageName = "home" | "services" | "process" | "projects" | "pricing" | "contact" | "portal";

type UserProfile = {
  name: string;
  email: string;
  initials: string;
 
  plan: string;
  location: string;
  joinDate: string;
};

const navItems: { label: string; page: PageName }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Process", page: "process" },
  { label: "Projects", page: "projects" },
  { label: "Pricing", page: "pricing" },
  { label: "Contact", page: "contact" },
];

const services = [
  {
    icon: Laptop,
    title: "Business Websites",
    text: "Premium websites for companies that need a stronger online presence, clearer service pages, and a more professional first impression.",
    points: ["Corporate websites", "Service pages", "Responsive layout"],
  },
  {
    icon: LayoutDashboard,
    title: "Client Portals",
    text: "Secure portal-style experiences with login, email OTP, dashboards, project profiles, and inquiry workflows.",
    points: ["Email OTP login", "Client dashboards", "Protected areas"],
  },
  {
    icon: MousePointerClick,
    title: "Landing Pages",
    text: "Focused landing pages designed for campaigns, service launches, lead capture, and premium brand storytelling.",
    points: ["Lead capture", "Campaign pages", "CTA strategy"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    text: "Modern interfaces with strong hierarchy, elegant motion, better user flow, and a premium visual identity.",
    points: ["Wireframes", "UI systems", "Luxury visuals"],
  },
  {
    icon: SearchCheck,
    title: "Website Redesign",
    text: "Upgrade outdated websites into clean, fast, modern experiences that make the company look more credible.",
    points: ["Modern layout", "Copy structure", "Conversion flow"],
  },
  {
    icon: Rocket,
    title: "Launch Support",
    text: "Launch-ready structure with responsive testing, performance basics, contact flow, and deployment preparation.",
    points: ["Mobile testing", "Launch checklist", "Support guidance"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    text: "We understand your company, target audience, current challenges, services, and goals before structuring the website.",
  },
  {
    step: "02",
    title: "Strategy & Structure",
    text: "We plan the homepage, services, CTA flow, page hierarchy, and inquiry journey so visitors know what to do next.",
  },
  {
    step: "03",
    title: "Premium UI Design",
    text: "We shape the visual direction with refined typography, dark luxury UI, glass cards, motion, and responsive layouts.",
  },
  {
    step: "04",
    title: "Development",
    text: "The website is built with interactive pages, clean sections, contact flow, secure login options, and polished transitions.",
  },
  {
    step: "05",
    title: "Testing",
    text: "We test mobile responsiveness, forms, navigation, page transitions, button flow, and essential launch behavior.",
  },
  {
    step: "06",
    title: "Launch",
    text: "You receive a launch-ready website structure prepared for deployment, future scaling, and continuous improvement.",
  },
];

const projects = [
  {
    name: "Aurex Holdings",
    category: "Corporate Website",
    text: "A premium corporate layout for an investment-style company with trust sections, service clarity, and inquiry flow.",
    features: ["Dark corporate UI", "Lead capture", "Executive positioning"],
  },
  {
    name: "Zenith Interiors",
    category: "Luxury Services",
    text: "A visual service website for an interiors company focused on elegant project presentation and conversion sections.",
    features: ["Project showcase", "Premium visuals", "Consultation CTA"],
  },
  {
    name: "Nova Systems",
    category: "Client Portal",
    text: "A portal-style experience with login, dashboard preview, secure profile area, and inquiry management direction.",
    features: ["OTP login", "Dashboard cards", "Client area"],
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    text: "For companies that need a clean, professional website to establish trust online.",
    features: ["3–5 page structure", "Responsive design", "Service sections", "Contact inquiry form", "Basic launch guidance"],
  },
  {
    name: "Business Pro",
    price: "$999",
    text: "For companies that want stronger branding, premium sections, animations, and better lead conversion.",
    features: ["Everything in Starter", "Premium UI sections", "Animated interactions", "Service flow strategy", "SEO-ready structure", "Enhanced CTA layout"],
    featured: true,
  },
  {
    name: "Portal Plus",
    price: "$1,999",
    text: "For companies that want a secure portal-style website with login, profile, and dashboard-like functionality.",
    features: ["Everything in Business Pro", "Email OTP login", "Client profile area", "Dashboard preview", "Secure inquiry workflow", "Launch support"],
  },
];

const benefits = [
  "Premium first impression",
  "Clear service positioning",
  "Lead-focused inquiry flow",
  "Responsive mobile experience",
  "Secure OTP portal option",
  "Animated luxury interface",
];

const activity = [
  "Website inquiry received successfully",
  "Client project profile reviewed",
  "Email OTP verification completed",
  "New proposal request available",
];

const testimonials = [
  {
    name: "Ayaan Group",
    role: "Business Client",
    quote: "Velora helped us present our company in a more professional and premium way.",
  },
  {
    name: "Nova Services",
    role: "Service Company",
    quote: "The website flow made our services clearer and easier for clients to understand.",
  },
  {
    name: "Elite Works",
    role: "Corporate Client",
    quote: "The design feels clean, modern, and ready for real customers.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
async function getOrCreateProfile(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  const username = cleanEmail.split("@")[0] || "member";

  const displayName = username
    .split(/[._-]/)
    .filter(Boolean)
    .map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ") || "Velora Member";

  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", cleanEmail)
    .single();

  if (existing) {
    return existing;
  }

  const newProfile = {
    email: cleanEmail,
    name: displayName,
    plan: "Guest",
    membership: "Guest",
    status: "Pending",
  };

  await supabase
    .from("profiles")
    .insert([newProfile]);

  return newProfile;
}

function GlassCard({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div
        className={cx(
          "rounded-[28px] border border-white/10 bg-white/[0.06] shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
          className
        )}
      >
        {children}
      </div>
    );
  }

  function LuxuryButton({
    children,
    onClick,
    variant = "light",
    type = "button",
    className = "",
    disabled = false,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "light" | "outline";
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cx(
          "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
          variant === "light" && "bg-white text-black hover:bg-white/90",
          variant === "outline" &&
          "border border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.1]",
          className
        )}
      >
        {children}
      </button>
    );
  }

  function SectionTitle({
    eyebrow,
    title,
    text,
  }: {
    eyebrow: string;
    title: string;
    text: string;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
      </motion.div>
    );
  }

  function LoginModal({
    open,
    onClose,
    onLogin,
  }: {
    open: boolean;
    onClose: () => void;
    onLogin: (email: string) => void;
  }) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("client@company.com");
    const [password, setPassword] = useState("velora123");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState("");
    const [step, setStep] = useState<"auth" | "2fa">("auth");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);

    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
    const otpCode = otp.join("");

    function resetAndClose() {
      setError("");
      setOtp(["", "", "", "", "", ""]);
      setStep("auth");
      onClose();
    }

    function updateOtp(value: string, index: number) {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...otp];
      next[index] = digit;
      setOtp(next);

      if (digit && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (step === "auth") {
        if (mode === "signup" && !name.trim()) {
          setError("Please enter your name.");
          return;
        }

        if (!isValidEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }

        if (!password.trim()) {
          setError("Please enter your password.");
          return;
        }

        try {
          setLoading(true);
          setError("");

          const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            setError(data.error || "Failed to send OTP. Check Gmail settings.");
            return;
          }

          setStep("2fa");

          setTimeout(() => {
            otpRefs.current[0]?.focus();
          }, 150);
        } catch {
          setError("Could not connect to OTP server.");
        } finally {
          setLoading(false);
        }

        return;
      }

      if (step === "2fa") {
        if (otpCode.length !== 6) {
          setError("Please enter the 6-digit OTP.");
          return;
        }

        try {
          setLoading(true);
          setError("");

          const res = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp: otpCode }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            setError(data.error || "Invalid OTP. Please try again.");
            return;
          }

          onLogin(email);
          resetAndClose();
        } catch {
          setError("Could not verify OTP.");
        } finally {
          setLoading(false);
        }
      }
    }

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-md"
            >
              <GlassCard className="relative overflow-hidden p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%)]" />

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-white/[0.05] p-2 text-white hover:bg-white/[0.1]"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative z-10">
                  <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.08] p-3 text-white">
                    <KeyRound className="h-6 w-6" />
                  </div>

                  <h2 className="text-3xl font-semibold text-white">
                    {step === "2fa"
                      ? "Enter Security Code"
                      : mode === "login"
                        ? "Client Login"
                        : "Create Client Account"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {step === "2fa"
                      ? `Enter the 6-digit code sent to ${email}.`
                      : mode === "login"
                        ? "Sign in to preview your project profile and secure client portal."
                        : "Create an account and verify your email with OTP to preview the client portal."}
                  </p>

                  {step === "auth" && (
                    <div className="mt-6 grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login");
                          setError("");
                        }}
                        className={cx(
                          "rounded-full px-4 py-2 text-sm transition",
                          mode === "login" ? "bg-white text-black" : "text-white/60 hover:text-white"
                        )}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMode("signup");
                          setError("");
                        }}
                        className={cx(
                          "rounded-full px-4 py-2 text-sm transition",
                          mode === "signup" ? "bg-white text-black" : "text-white/60 hover:text-white"
                        )}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    {step === "auth" && mode === "signup" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm text-white/65">Full Name</label>
                          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                            <User className="h-5 w-5 text-white/45" />
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-transparent text-white outline-none placeholder:text-white/25"
                              placeholder="Enter your name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-white/65">Company Name</label>
                          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                            <BriefcaseBusiness className="h-5 w-5 text-white/45" />
                            <input
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="w-full bg-transparent text-white outline-none placeholder:text-white/25"
                              placeholder="Enter company name"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {step === "auth" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm text-white/65">
                            Email Address
                          </label>
                          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                            <Mail className="h-5 w-5 text-white/45" />
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={loading}
                              className="w-full bg-transparent text-white outline-none placeholder:text-white/25 disabled:opacity-70"
                              placeholder="Enter email"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm text-white/65">
                            Password
                          </label>
                          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                            <Lock className="h-5 w-5 text-white/45" />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full bg-transparent text-white outline-none placeholder:text-white/25"
                              placeholder="Enter password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="text-white/55 hover:text-white"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <label className="flex cursor-pointer items-center gap-2 text-white/65">
                            <input
                              checked={remember}
                              onChange={(e) => setRemember(e.target.checked)}
                              type="checkbox"
                              className="h-4 w-4 accent-white"
                            />
                            Remember me
                          </label>
                        </div>
                      </>
                    )}

                    {step === "2fa" && (
                      <div>
                        <label className="mb-3 block text-sm text-white/65">
                          Verification Code
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => {
                                otpRefs.current[index] = el;
                              }}
                              value={digit}
                              onChange={(e) => updateOtp(e.target.value, index)}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Backspace" &&
                                  !otp[index] &&
                                  index > 0
                                ) {
                                  otpRefs.current[index - 1]?.focus();
                                }
                              }}
                              className="h-12 rounded-2xl border border-white/10 bg-white/[0.05] text-center text-lg font-semibold text-white outline-none focus:border-white/30"
                              inputMode="numeric"
                              maxLength={1}
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-white/45">
                          Code expires in 5 minutes. Check inbox or spam.
                        </p>
                      </div>
                    )}

                    {error && (
                      <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                        {error}
                      </p>
                    )}

                    <LuxuryButton type="submit" className="w-full" disabled={loading}>
                      {loading
                        ? "Please wait..."
                        : step === "auth"
                          ? mode === "login"
                            ? "Continue to 2FA"
                            : "Create Account & Verify"
                          : "Verify & Login"}
                      <ArrowRight className="h-4 w-4" />
                    </LuxuryButton>

                    {step === "2fa" && (
                      <button
                        type="button"
                        onClick={() => {
                          setStep("auth");
                          setOtp(["", "", "", "", "", ""]);
                          setError("");
                        }}
                        className="w-full text-center text-sm text-white/55 hover:text-white"
                      >
                        Change email or try again
                      </button>
                    )}
                  </form>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
function makeUserFromEmail(email: string) {
  const cleanEmail = email.trim().toLowerCase();

  const username = cleanEmail.split("@")[0] || "member";

  const displayName = username
    .split(/[._-]/)
    .filter(Boolean)
    .map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ") || "Velora Member";

  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    name: displayName,
    email: cleanEmail,
    initials,
    plan: "Guest",
    location: "Global Member",
    joinDate: new Date().getFullYear().toString(),
  };
}
  export default function VeloraWebsiteStudio() {
    const [page, setPage] = useState<PageName>("home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState("client@company.com");
    const [twoFA, setTwoFA] = useState(true);

    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactCompany, setContactCompany] = useState("");
    const [contactBudget, setContactBudget] = useState("Not selected");
    const [contactTimeline, setContactTimeline] = useState("Not selected");
    const [contactService, setContactService] = useState("Business Website");
    const [contactMessage, setContactMessage] = useState("");
    const [contactStatus, setContactStatus] = useState("");

    const user = useMemo(
  () =>
  loggedInEmail
    ? makeUserFromEmail(loggedInEmail)
    : makeUserFromEmail("guest@velora.com"),
  [loggedInEmail]
);
    const securityScore = twoFA ? 96 : 72;

    function goToPage(nextPage: PageName) {
      setMobileOpen(false);
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleLogin(email: string) {
      setLoggedInEmail(email);
      setIsLoggedIn(true);
      setTwoFA(true);
    }

    function handleLogout() {
      setIsLoggedIn(false);
      setLoggedInEmail("client@company.com");
      setPage("home");
    }

    async function handleContactSubmit() {
      if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
        setContactStatus("Please fill your name, email, and project details.");
        return;
      }

      if (!isValidEmail(contactEmail)) {
        setContactStatus("Invalid email. Please enter a real email address.");
        return;
      }

      try {
        setContactStatus("Sending...");

        const message = `
Company: ${contactCompany || "Not provided"}
Interested Service: ${contactService}
Budget Range: ${contactBudget}
Timeline: ${contactTimeline}

Project Details:
${contactMessage}
      `;

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contactName,
            email: contactEmail,
            message,
          }),
        });

        if (!res.ok) {
          setContactStatus("Failed to send message. Please check the contact API.");
          return;
        }

        setContactStatus("Message sent successfully. We will contact you soon.");
        setContactName("");
        setContactEmail("");
        setContactCompany("");
        setContactBudget("Not selected");
        setContactTimeline("Not selected");
        setContactService("Business Website");
        setContactMessage("");
      } catch {
        setContactStatus("Could not connect to contact server.");
      }
    }

    return (
      <main className="min-h-screen overflow-x-hidden bg-[#070711] text-white selection:bg-white selection:text-black">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.16),transparent_30%),linear-gradient(180deg,#070711_0%,#0b0b18_45%,#05050b_100%)]" />
        <div className="fixed left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070711]/75 backdrop-blur-2xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <button onClick={() => goToPage("home")} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] text-white">
                <Crown className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold tracking-[0.35em] text-white">
                  VELORA
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                  Website Studio
                </div>
              </div>
            </button>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => goToPage(item.page)}
                  className={cx(
                    "text-sm transition",
                    page === item.page ? "text-white" : "text-white/65 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              {isLoggedIn ? (
                <>
                  <LuxuryButton variant="outline" onClick={() => goToPage("portal")}>
                    <User className="h-4 w-4" />
                    Client Portal
                  </LuxuryButton>
                  <LuxuryButton onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </LuxuryButton>
                </>
              ) : (
                <LuxuryButton onClick={() => setLoginOpen(true)}>
                  Client Login
                  <ArrowRight className="h-4 w-4" />
                </LuxuryButton>
              )}
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="border-t border-white/10 bg-[#090914] px-4 py-4 lg:hidden"
              >
                <div className="mx-auto flex max-w-7xl flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => goToPage(item.page)}
                      className="rounded-2xl px-4 py-3 text-left text-white/75 hover:bg-white/[0.06]"
                    >
                      {item.label}
                    </button>
                  ))}

                  {isLoggedIn ? (
                    <LuxuryButton
                      variant="outline"
                      onClick={() => {
                        setMobileOpen(false);
                        goToPage("portal");
                      }}
                    >
                      Client Portal
                    </LuxuryButton>
                  ) : (
                    <LuxuryButton
                      onClick={() => {
                        setMobileOpen(false);
                        setLoginOpen(true);
                      }}
                    >
                      Client Login
                    </LuxuryButton>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.45 }}
          >
            {page === "home" && (
              <HomePage
                isLoggedIn={isLoggedIn}
                goToPage={goToPage}
              />
            )}

            {page === "services" && <ServicesPage goToPage={goToPage} />}

            {page === "process" && <ProcessPage goToPage={goToPage} />}

            {page === "projects" && <ProjectsPage goToPage={goToPage} />}

            {page === "pricing" && <PricingPage goToPage={goToPage} />}

            {page === "portal" && (
              <PortalPage
                isLoggedIn={isLoggedIn}
                user={user}
                securityScore={securityScore}
                twoFA={twoFA}
                setTwoFA={setTwoFA}
                openLogin={() => setLoginOpen(true)}
                goToPage={goToPage}
              />
            )}

            {page === "contact" && (
              <ContactPage
                contactName={contactName}
                setContactName={setContactName}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                contactCompany={contactCompany}
                setContactCompany={setContactCompany}
                contactBudget={contactBudget}
                setContactBudget={setContactBudget}
                contactTimeline={contactTimeline}
                setContactTimeline={setContactTimeline}
                contactService={contactService}
                setContactService={setContactService}
                contactMessage={contactMessage}
                setContactMessage={setContactMessage}
                contactStatus={contactStatus}
                handleContactSubmit={handleContactSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <div className="text-sm font-bold tracking-[0.35em] text-white">
                VELORA
              </div>
              <div className="mt-2 text-sm text-white/45">
                Premium websites and secure portals for modern companies
              </div>
            </div>
            <div className="text-sm text-white/45">
              Built for better branding, more trust, and stronger inquiries.
            </div>
          </div>
        </footer>
      </main>
    );
  }

  function HomePage({
    isLoggedIn,
    goToPage,
  }: {
    isLoggedIn: boolean;
    goToPage: (page: PageName) => void;
  }) {
    return (
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Premium website studio
            </div>

            <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Websites that make companies look premium.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Velora designs modern business websites, client portals, and secure digital experiences for companies that want stronger branding, more trust, and better conversions.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <LuxuryButton onClick={() => goToPage("contact")}>
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </LuxuryButton>

              <LuxuryButton variant="outline" onClick={() => goToPage("services")}>
                View Services
                <Zap className="h-4 w-4" />
              </LuxuryButton>
            </div>
          </div>

          <GlassCard className="p-5">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/50">Studio Preview</div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {isLoggedIn ? "Client Portal Active" : "Project Inquiry Ready"}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                  {isLoggedIn ? <ShieldCheck className="h-6 w-6" /> : <MonitorSmartphone className="h-6 w-6" />}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Website", value: "Premium" },
                  { label: "Portal", value: "Secure" },
                  { label: "Inquiry", value: "Lead-ready" },
                  { label: "Launch", value: "Responsive" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/8 bg-white/[0.04] p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/40">
                      {item.label}
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.04] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Website Readiness</div>
                    <div className="text-xs text-white/45">Design + inquiry + secure access</div>
                  </div>
                  <BarChart3 className="h-5 w-5 text-white/65" />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: isLoggedIn ? "92%" : "68%" }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-white"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { value: "Custom", label: "Business websites" },
              { value: "Secure", label: "Client portals" },
              { value: "Lead-ready", label: "Inquiry systems" },
            ].map((item) => (
              <GlassCard key={item.label} className="p-6">
                <div className="text-4xl font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-sm text-white/55">{item.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Why Velora"
            title="Built for companies that need a stronger digital first impression"
            text="We combine visual identity, service clarity, user flow, inquiry capture, and secure portal capability into one premium website experience."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <GlassCard className="flex h-full items-center gap-3 p-5">
                  <Check className="h-5 w-5 text-emerald-200" />
                  <span className="text-sm text-white/70">{benefit}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <GlassCard key={item.name} className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-white/65">“{item.quote}”</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-sm text-white/45">{item.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    );
  }

  function ServicesPage({ goToPage }: { goToPage: (page: PageName) => void }) {
    return (
      <div>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Services"
            title="Everything a modern company website needs"
            text="Velora builds the structure, design, interactions, and secure flows that help businesses look professional and collect better inquiries."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <GlassCard className="group h-full p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.09]">
                    <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-white transition group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">{service.text}</p>
                    <div className="mt-6 space-y-2">
                      {service.points.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-sm text-white/70">
                          <Check className="h-4 w-4 text-emerald-200" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard className="p-7">
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
                Better Than Basic Websites
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Your website should work like a business asset, not just a page online.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Velora focuses on the parts clients actually notice: trust, clarity, mobile design, premium visuals, and a clear path to contact you.
              </p>
              <LuxuryButton className="mt-7" onClick={() => goToPage("contact")}>
                Request Website Quote
                <ArrowRight className="h-4 w-4" />
              </LuxuryButton>
            </GlassCard>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Trust-first sections", text: "Hero, services, process, projects, testimonials, pricing, and contact flow." },
                { title: "Premium UI", text: "Dark luxury style, glass cards, polished spacing, and modern interactions." },
                { title: "Lead capture", text: "Contact form with fields that help qualify the project before you reply." },
                { title: "Portal option", text: "Email OTP login and client dashboard preview for advanced projects." },
              ].map((item) => (
                <GlassCard key={item.title} className="p-5">
                  <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  function ProcessPage({ goToPage }: { goToPage: (page: PageName) => void }) {
    return (
      <div>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Process"
            title="A clear process from idea to launch"
            text="A professional website needs more than visuals. It needs structure, message clarity, trust, and a path for visitors to take action."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <GlassCard className="h-full p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/40">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <GlassCard className="p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  Launch Ready
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                  We build with the final user journey in mind.
                </h3>
                <p className="mt-5 text-sm leading-8 text-white/60">
                  Visitors should understand who you are, what you offer, why they should trust you, and how to contact you without confusion.
                </p>
                <LuxuryButton className="mt-7" onClick={() => goToPage("contact")}>
                  Start Project Discussion
                  <ArrowRight className="h-4 w-4" />
                </LuxuryButton>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "01", label: "Clear service story" },
                  { value: "02", label: "Premium interface" },
                  { value: "03", label: "Mobile-first flow" },
                  { value: "04", label: "Inquiry conversion" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/8 bg-black/20 p-6">
                    <div className="text-4xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm text-white/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    );
  }

  function ProjectsPage({ goToPage }: { goToPage: (page: PageName) => void }) {
    return (
      <div>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Projects"
            title="Sample directions for premium business websites"
            text="Use these as portfolio-style previews. They help visitors understand the type of websites Velora can create."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="h-full overflow-hidden">
                  <div className="h-44 border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
                    <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-24 rounded-full bg-white/20" />
                        <div className="h-8 w-8 rounded-2xl bg-white/20" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-32 rounded-full bg-white/25" />
                        <div className="h-3 w-44 rounded-full bg-white/15" />
                        <div className="h-3 w-28 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                      {project.category}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">{project.text}</p>

                    <div className="mt-6 space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-white/70">
                          <Check className="h-4 w-4 text-emerald-200" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <LuxuryButton onClick={() => goToPage("contact")}>
              Build a Website Like This
              <ArrowRight className="h-4 w-4" />
            </LuxuryButton>
          </div>
        </section>
      </div>
    );
  }

  function PricingPage({ goToPage }: { goToPage: (page: PageName) => void }) {
    return (
      <div>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Pricing"
            title="Website packages for different company needs"
            text="Choose a starting direction. Final pricing can be adjusted based on scope, pages, integrations, content, and launch requirements."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <GlassCard
                key={plan.name}
                className={cx(
                  "relative h-full p-6",
                  plan.featured && "border-white/20 bg-white/[0.09]"
                )}
              >
                {plan.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black">
                    Popular
                  </div>
                )}

                <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                  {plan.text}
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 text-5xl font-semibold text-white">{plan.price}</div>
                <div className="mt-2 text-sm text-white/50">starting from</div>

                <div className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                      {feature}
                    </div>
                  ))}
                </div>

                <LuxuryButton className="mt-8 w-full" onClick={() => goToPage("contact")}>
                  Request {plan.name}
                </LuxuryButton>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <GlassCard className="p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  What You Get
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                  A website that looks premium and works clearly.
                </h3>
                <p className="mt-5 text-sm leading-8 text-white/60">
                  The goal is not just design. The goal is clarity, trust, and an easier path for customers to contact your company.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { value: "Mobile", label: "Responsive design" },
                  { value: "Lead", label: "Inquiry capture" },
                  { value: "Premium", label: "Brand feel" },
                  { value: "Secure", label: "OTP-ready portal" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/8 bg-black/20 p-6">
                    <div className="text-4xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm text-white/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    );
  }

  function PortalPage({
    isLoggedIn,
    user,
    securityScore,
    twoFA,
    setTwoFA,
    openLogin,
    goToPage,
  }: {
    isLoggedIn: boolean;
    user: UserProfile;
    securityScore: number;
    twoFA: boolean;
    setTwoFA: React.Dispatch<React.SetStateAction<boolean>>;
    openLogin: () => void;
    goToPage: (page: PageName) => void;
  }) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
            Client Portal Preview
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-5xl">
            Project Profile & Security
          </h2>
        </div>

        {!isLoggedIn ? (
          <GlassCard className="p-7 text-center">
            <Lock className="mx-auto h-10 w-10 text-white/70" />
            <h3 className="mt-4 text-2xl font-semibold text-white">Portal Locked</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Login or create an account with email OTP to preview the secure client portal experience.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <LuxuryButton onClick={openLogin}>Login to Unlock</LuxuryButton>
              <LuxuryButton variant="outline" onClick={() => goToPage("contact")}>
                Request Project
              </LuxuryButton>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            <GlassCard className="overflow-hidden p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] border border-white/15 bg-white text-3xl font-bold text-black">
                    {user.initials}
                  </div>
                  <div>
                    <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                      Verified Client
                    </div>
                    <h3 className="mt-3 break-words text-3xl font-semibold text-white">
                      {user.name}
                    </h3>
                    <p className="mt-1 break-all text-white/55">{user.email}</p>
                  </div>
                </div>

                <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 lg:w-64">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                    Security Score
                  </div>
                  <div className="mt-2 text-4xl font-semibold text-white">
                    {securityScore}%
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: `${securityScore}%` }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[

                  { label: "Plan", value: user.plan, icon: Crown },
                  { label: "Location", value: user.location, icon: Globe },

                  { label: "Joined", value: user.joinDate, icon: Star },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-3xl border border-white/8 bg-white/[0.04] p-5">
                      <Icon className="h-5 w-5 text-white/70" />
                      <div className="mt-4 text-xs uppercase tracking-[0.22em] text-white/40">
                        {item.label}
                      </div>
                      <div className="mt-2 break-words text-sm font-medium text-white">
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <div className="grid gap-5 lg:grid-cols-2">
              <GlassCard className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xl font-semibold text-white">
                      <Fingerprint className="h-6 w-6" />
                      Two-Factor Authentication
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      Your client account uses email OTP during login.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTwoFA((v) => !v)}
                    className={cx(
                      "relative h-8 w-14 shrink-0 rounded-full transition",
                      twoFA ? "bg-emerald-400" : "bg-white/20"
                    )}
                  >
                    <motion.span
                      animate={{ x: twoFA ? 24 : 4 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 text-xl font-semibold text-white">
                  <Bell className="h-6 w-6" />
                  Recent Activity
                </div>
                <div className="mt-5 space-y-3">
                  {activity.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-white/65">
                      <Check className="h-4 w-4 text-emerald-200" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: "Project Brief", text: "Review website goals, company service needs, content direction, and preferred launch focus." },
                { title: "Website Package", text: "Preview selected package, estimated scope, design level, and feature requirements." },
                { title: "Security History", text: "Track OTP verification, recent login activity, and secure client access status." },
              ].map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  function ContactPage({
    contactName,
    setContactName,
    contactEmail,
    setContactEmail,
    contactCompany,
    setContactCompany,
    contactBudget,
    setContactBudget,
    contactTimeline,
    setContactTimeline,
    contactService,
    setContactService,
    contactMessage,
    setContactMessage,
    contactStatus,
    handleContactSubmit,
  }: {
    contactName: string;
    setContactName: (value: string) => void;
    contactEmail: string;
    setContactEmail: (value: string) => void;
    contactCompany: string;
    setContactCompany: (value: string) => void;
    contactBudget: string;
    setContactBudget: (value: string) => void;
    contactTimeline: string;
    setContactTimeline: (value: string) => void;
    contactService: string;
    setContactService: (value: string) => void;
    contactMessage: string;
    setContactMessage: (value: string) => void;
    contactStatus: string;
    handleContactSubmit: () => void;
  }) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Contact"
          title="Start a Website Project"
          text="Tell us about your company and the website you want to build. The form validates email before sending."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-7">
            <h2 className="text-3xl font-semibold text-white">Request Website Quote</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Your inquiry will be delivered through the contact API to your configured email so the Velora team can reply with the next steps.
            </p>

            <div className="mt-6 space-y-4">
              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/25"
                placeholder="Your name"
              />

              <input
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/25"
                placeholder="Email address"
              />

              <input
                value={contactCompany}
                onChange={(e) => setContactCompany(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/25"
                placeholder="Company name"
              />

              <select
                value={contactService}
                onChange={(e) => setContactService(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#11111c] px-4 py-3 text-white outline-none focus:border-white/25"
              >
                <option>Business Website</option>
                <option>Client Portal</option>
                <option>Landing Page</option>
                <option>E-commerce Website</option>
                <option>Website Redesign</option>
                <option>Secure Dashboard</option>
              </select>

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={contactBudget}
                  onChange={(e) => setContactBudget(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#11111c] px-4 py-3 text-white outline-none focus:border-white/25"
                >
                  <option>Not selected</option>
                  <option>Below $500</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $2,000</option>
                  <option>$2,000+</option>
                </select>

                <select
                  value={contactTimeline}
                  onChange={(e) => setContactTimeline(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#11111c] px-4 py-3 text-white outline-none focus:border-white/25"
                >
                  <option>Not selected</option>
                  <option>As soon as possible</option>
                  <option>Within 2 weeks</option>
                  <option>Within 1 month</option>
                  <option>Flexible timeline</option>
                </select>
              </div>

              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={6}
                className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/25"
                placeholder="Tell us about your company, required pages, features, and design style"
              />

              <LuxuryButton onClick={handleContactSubmit}>
                Send Website Inquiry
              </LuxuryButton>

              {contactStatus && (
                <p className="text-sm text-white/60">{contactStatus}</p>
              )}
            </div>
          </GlassCard>

          <div className="space-y-5">
            {[
              {
                icon: Mail,
                title: "Inquiry Delivered to Email",
                text: "Your website request is sent to the configured Velora email through the backend contact route.",
              },
              {
                icon: Headphones,
                title: "Website Consultation",
                text: "Use this form for business websites, portals, dashboards, service websites, and redesign requests.",
              },
              {
                icon: CalendarDays,
                title: "Launch Planning",
                text: "We can discuss pages, branding, features, timeline, content, and launch needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <GlassCard key={item.title} className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {item.text}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04]">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-white"
        >
          <span className="font-medium">{question}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm leading-7 text-white/60">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
