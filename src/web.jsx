"use client"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { Shield, Eye, Zap, BarChart3, MapPin, Target, Camera, AlertTriangle, Brain, CheckCircle, ArrowRight, Play, Pause, Menu, X, Mail, Phone, Users, Linkedin, Github, Twitter } from 'lucide-react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
  import { ChevronDown, ChevronUp, Crown, Code, Briefcase, Palette} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ParkingSquare,
  ShoppingCart,
  GraduationCap,
  Home,
} from "lucide-react";



const AISecurityWebsite = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeModule, setActiveModule] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [clickedElement, setClickedElement] = useState(null)
  const [visibleElements, setVisibleElements] = useState(new Set())


const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const [expandedDepartment, setExpandedDepartment] = useState('leadership');


  const observerRef = useRef(null)
  const elementsRef = useRef(new Map())


    useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate-id');
            if (id) {
              setVisibleElements(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-animate-id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "product-overview", "modules", "achievements", "proud-moments", "goals", "team", "location", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  //scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "modules", "achievements","proud-moments", "goals", "team", "location", "contact"]
      // const scrollPosition = window.scrollY + 100
      const scrollPosition = window.scrollY + window.innerHeight / 2
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  //Intersection Observer for flying animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute("data-animate-id")
            if (elementId) {
              setVisibleElements((prev) => new Set([...prev, elementId]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    
    const elements = document.querySelectorAll("[data-animate-id]")
    elements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }




  // Sample team data with your departments
  const teamMembers = [
    // Leadership
    { name: "Hafiz Muhammad Safiullah", role: "CEO & Founder", department: "leadership", image: "/ceo.jpg"},
    { name: "Muhammad Abdullah Baig", role: "AI Advisor", department: "leadership", image: "/co.jpg" },
  
    // Business Management
    { name: "Eshaal Rasheed", role: "IT Coordinator", department: "business management", image: "/eshaal.jpg" },
    { name: "Bisma Wajid", role: "Business Manager", department: "business management", image: "/bisma.jpg"},

    // Software Engineering
    { name: "Fiza Wajid", role: "Full-Stack & Cloud Engineer", department: "software engineering", image: "/female2.png"},
    { name: "Mahad Malik", role: "Software Engineer", department: "software engineering", image: "/mahad.jpg"},
    { name: "Areeba Waqar", role: "Full-Stack engineer", department: "software engineering", image: "/areeba.jpg"},

    // AI Engineering
    { name: "Muhammad Ahsan", role: "ML Engineer", department: "ai engineering", image: "/ahsan.jpg"},
    { name: "Simran Fatima", role: "ML Engineer", department: "ai engineering", image: "/female2.png"},
    { name: "Kamran Ahmed", role: "ML Engineer", department: "ai engineering", image: "/kamran.jpg" },
    { name: "Iffah Naveed", role: "ML Engineer", department: "ai engineering", image: "/iffah.jpg"},
    { name: "Hassan bin Saqib", role: "ML Engineer", department: "ai engineering", image: "/hasan.jpg"},
    

    // Graphic Designers
    { name: "Ghulaam Fatima", role: "Creative Designer", department: "graphic designers", image: "/fatima.jpg"},
    { name: "Sidra Younas", role: "Creative Designer", department: "graphic designers", image: "/sidra.jpg" }
  ];

  const departments = {
    leadership: { 
      name: "Leadership", 
      icon: Crown, 
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-400/20 to-orange-500/20"
    },
    "software engineering": { 
      name: "Software Engineering", 
      icon: Code, 
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-400/20 to-cyan-500/20"
    },
    "ai engineering": { 
      name: "AI Engineering", 
      icon: Brain, 
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-400/20 to-pink-500/20"
    },
    "business management": { 
      name: "Business Management", 
      icon: Briefcase, 
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-400/20 to-emerald-500/20"
    },
    "graphic designers": { 
      name: "Graphic Designers", 
      icon: Palette, 
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-400/20 to-rose-500/20"
    }
  };


    const handleFlyingClick = (elementId) => {
    setClickedElement(elementId);
    setTimeout(() => setClickedElement(null), 600);
  };



  const navItems = [
    { id: "home", label: "Home" },
    { id: "modules", label: "Modules" },
    { id: "achievements", label: "Achievements" },
    { id: "proud-moments", label: "Accomplishments" },
    { id: "goals", label: "Goals" },
    { id: "team", label: "Team" },
    { id: "location", label: "Location" },
    { id: "contact", label: "Contact Us" },
  ]

const modules = [
  {
    icon: <ParkingSquare className="w-8 h-8" />, 
    title: "Parking Lots Safety",
    description: "Monitor and secure parking areas with intelligent surveillance",
    color: "from-indigo-400 to-purple-400",
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />, 
    title: "Shoplifting Prevention",
    description: "Detect and prevent theft in retail environments in real-time",
    color: "from-pink-400 to-red-400",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Office Safety",
    description: "Ensure workplace safety and compliance effortlessly",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "University Safety",
    description: "Protect campuses with proactive monitoring and alerts",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />, 
    title: "Employee Productivity",
    description: "Gain insights into workforce productivity and trends",
    color: "from-yellow-400 to-amber-400",
  },
  {
    icon: <Home className="w-8 h-8" />, 
    title: "Home Safety",
    description: "Keep your home safe with smart, AI-powered monitoring",
    color: "from-purple-400 to-pink-400",
  },
];


// Add these arrays after your existing arrays (around line 134, after the teamMembers array)

const proudMoments = [
    {
    title: "Hosted Mr. Rafique Ahmad Buriro (Additional Secretary MoIT) at NICAT, showcasing Camsense’s AI security tech",
    image: "/MIT.png", 
    date: "June, 2025"
  },
      {
    title: "Entered a strategic MoU with Family Cash and Carry to set new benchmarks in workplace security.",
    image: "/family-cash.jpg",
    date: "June, 2025"
  },
    {
    title: "Nayab Babar (PSF CIO) and investors visited NICAT, reconnecting to discuss Camsense’s AI-driven vision and growth journey",
    image: "/IMG_6705.png",
    date: "July, 2025"
  },
  {
    title: "Met Kamil Aziz (Zayn VC) at NICAT, discussing Camsense’s traction, growth vision, and fundraising opportunities.",
    image: "/IMG_6635.png",
    date: "July, 2025"
  },
  {
    title: "Signed an MoU with NICAT, marking the start of a strong partnership to redefine workplace security.",
    image: "/NICAT.JPG",
    date: "July, 2025"
  }
];



  const goals = [
    "Reduce retail theft by 85% through AI-powered surveillance",
    "Provide real-time security insights to prevent incidents",
    "Seamlessly integrate with existing security systems",
    "Deliver actionable analytics for better security decisions",
  ]

  
  const achievements = [
    {text:"Validated the market and built initial prototype.", date: "2024-Q4"},
    {text:"Secured $25k AWS credits to scale.", date:"2025-Q1"},
    {text:"Conducted pilots and trials in marts, universities, and offices, and booked 1,000+ cameras to date", date:"2025-Q2"}
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="px-8">
          <div className="flex items-center justify-between h-16">
<div
  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
    clickedElement === "logo" ? "animate-flyTowards" : "hover:scale-110"
  }`}
  onClick={() => handleFlyingClick("logo")}
>
  <img
    src="/logonew.png"
    alt="Camsense Logo"
    className="h-14 w-auto object-contain"
  />
</div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleFlyingClick(`nav-${item.id}`)
                    scrollToSection(item.id)
                  }}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
                    clickedElement === `nav-${item.id}` ? "animate-flyTowards" : ""
                  } ${activeSection === item.id ? "text-cyan-300 scale-105" : "text-gray-300"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-all duration-300 ${
                clickedElement === "menu" ? "animate-flyTowards" : "hover:scale-110"
              }`}
              onClick={() => {
                handleFlyingClick("menu")
                setIsMenuOpen(!isMenuOpen)
              }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700/50 animate-slideDown">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleFlyingClick(`mobile-nav-${item.id}`)
                    scrollToSection(item.id)
                  }}
                  className={`block w-full text-left py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    clickedElement === `mobile-nav-${item.id}` ? "animate-flyTowards" : ""
                  } ${activeSection === item.id ? "text-cyan-300" : "text-gray-300"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/*Video Background */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src="/videos/107773-678526591.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-20 text-center max-w-6xl px-8 animate-fadeInUp"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="mb-8">
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/40 rounded-full px-6 py-2 mb-6 backdrop-blur-sm animate-glow transition-all duration-300 ${
                clickedElement === "badge" ? "animate-flyTowards" : "hover:scale-110"
              }`}
              onClick={() => handleFlyingClick("badge")}
            >
              <Brain className="w-5 h-5 text-cyan-300" />
              <span className="text-cyan-300 font-medium">AI-Powered Security</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight animate-slideInLeft">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Smart
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideInRight">
                Surveillance
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-white-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              Revolutionary AI agent that transforms your CCTV system into an intelligent security powerhouse, detecting
              shoplifting in real-time with unprecedented accuracy.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
            <button
              className={`group relative bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 ${
                clickedElement === "cta-primary" ? "animate-flyTowards" : "animate-bounce-subtle"
              }`}
              onClick={() => {
                handleFlyingClick("cta-primary")
                document.getElementById("product-overview")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            {[
              { value: "99.7%", label: "Detection Accuracy" },
              { value: "<10s", label: "Response Time" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-300 ${
                  clickedElement === `stat-${index}` ? "animate-flyTowards" : "hover:scale-110"
                }`}
                onClick={() => handleFlyingClick(`stat-${index}`)}
              >
                <div className="text-3xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-300 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section id="product-overview" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="scanning-grid"></div>
          <div className="floating-dots"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${
              visibleElements.has("overview-title") ? "animate-flyInFromTop" : "opacity-0"
            }`}
            data-animate-id="overview-title"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Next-Generation Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our vertical AI agent seamlessly integrates with your existing CCTV setup, providing instant alerts and
              detailed crime analytics through our comprehensive desktop application.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: Camera,
                  title: "Seamless Integration",
                  desc: "Works with your existing CCTV infrastructure without any hardware changes.",
                  color: "from-cyan-400 to-blue-500",
                },
                {
                  icon: Zap,
                  title: "Real-Time Detection",
                  desc: "Advanced AI algorithms detect suspicious behavior and shoplifting attempts instantly.",
                  color: "from-orange-400 to-red-500",
                },
                {
                  icon: BarChart3,
                  title: "Detailed Analytics",
                  desc: "Comprehensive crime analytics and insights through our all-in-one desktop application.",
                  color: "from-purple-400 to-pink-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 group transition-all duration-300 ${
                    visibleElements.has(`overview-feature-${index}`) ? "animate-flyInFromLeft" : "opacity-0"
                  } ${clickedElement === `feature-${index}` ? "animate-flyTowards" : "hover:scale-105"}`}
                  data-animate-id={`overview-feature-${index}`}
                  onClick={() => handleFlyingClick(`feature-${index}`)}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-cyan-400/25`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>


            {/* NEW LIVE DETECTION FEED */}
{/* <div
  className={`relative ${
    visibleElements.has("overview-preview") ? "animate-flyInFromRight" : "opacity-0"
  }`}
  data-animate-id="overview-preview"
>
  <div
    className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl transition-all duration-300 ${
      clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105"
    }`}
    onClick={() => handleFlyingClick("preview-card")}
  >
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-300 font-semibold">Live Detection Feed</h3>

      <div className="rounded-lg p-4 shadow flex justify-center">

        <video
  src="https://res.cloudinary.com/drobocxkg/video/upload/v1754411116/demo-video1_smdxpa.mp4"
  
  autoPlay
  loop
  muted
  playsInline
  className="rounded-lg max-h-78"
/>

        
      </div>

    </div>
  </div>
</div> */}

<div
  className={`relative ${
    visibleElements.has("overview-preview") ? "animate-flyInFromRight" : "opacity-0"
  }`}
  data-animate-id="overview-preview"
>
  <div
    className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl transition-all duration-300 cursor-pointer ${
      clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105 hover:border-cyan-400/50"
    }`}
    onClick={() => {
      handleFlyingClick("preview-card")
      setIsVideoModalOpen(true)
    }}
  >
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-cyan-300 font-semibold">Live Detection Feed</h3>
        {/* Click indicator */}
        <div className="flex items-center gap-2 text-cyan-400 text-sm animate-pulse">
          <span>Click to expand</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="rounded-lg p-4 shadow flex justify-center relative group">
        <video
          src="https://res.cloudinary.com/drobocxkg/video/upload/v1754411116/demo-video1_smdxpa.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-lg max-h-78"
        />
        
        {/* Enhanced play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-2 animate-pulse">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-white text-sm font-medium">Click to watch with audio</p>
          </div>
        </div>
        
    
      </div>
      
      {/* Bottom CTA */}
      <div className="text-center pt-2">
        <p className="text-gray-400 text-sm">
          📺 Click anywhere to view full demo with sound
        </p>
      </div>
    </div>
  </div>
</div>

{/* Video Modal - Add this after your existing sections */}
{isVideoModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
    {/* Backdrop blur */}
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      onClick={() => setIsVideoModalOpen(false)}
    ></div>
    
    {/* Modal content */}
    <div className="relative z-10 bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-600 animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">Live Detection Feed</h3>
        <button
          onClick={() => setIsVideoModalOpen(false)}
          className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Video container */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          src="https://res.cloudinary.com/drobocxkg/video/upload/v1755700185/video3_d7m5wi.mp4"
          autoPlay
          loop
          controls
          playsInline
          className="w-full h-auto max-h-[70vh]"
          // Note: Remove muted to enable audio
        />
      </div>
      
      {/* Description */}
      <div className="mt-4 text-gray-300">
        <p className="text-sm">
          Watch our AI-powered security system detect suspicious activities in real-time with unprecedented accuracy.
        </p>
      </div>
    </div>
  </div>
)}

          </div>
        </div>
      </section>


     {/* Modules Section */}
<section id="modules" className="relative py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-600 overflow-hidden">
 
  <div className="absolute inset-0 pointer-events-none">
    <div className="circuit-pattern"></div>
    <div className="radar-sweep"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div
      className={`text-center mb-20 ${
        visibleElements.has("modules-title") ? "animate-flyInFromTop" : "opacity-0"
      }`}
      data-animate-id="modules-title"
    >
      <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
        Our Modules
      </h2>
      <div className="mt-8 flex justify-center">
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
      {modules.map((module, index) => (
        <div
          key={index}
          className={`relative group transition-all duration-700 transform-gpu perspective-1000 ${
            visibleElements.has(`module-${index}`) 
              ? "animate-slideInUp opacity-100" 
              : "opacity-0 translate-y-12"
          } ${clickedElement === `module-${index}` ? "animate-flyTowards" : ""} ${
            activeModule === index ? "scale-105 z-20" : "hover:scale-110 hover:z-10"
          }`}
          data-animate-id={`module-${index}`}
          style={{
            animationDelay: visibleElements.has(`module-${index}`) ? `${index * 150}ms` : '0ms',
            animationDuration: '800ms',
            animationFillMode: 'both',
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setActiveModule(index)}
          onClick={() => handleFlyingClick(`module-${index}`)}
        >
         
          <div
            className="relative h-80 transform-gpu transition-all duration-700 group-hover:rotateY-12 group-hover:rotateX-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl transform translate-y-4 group-hover:translate-y-6 transition-all duration-500"></div>
            
            <div className="relative h-full bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-2xl border border-slate-600/50 backdrop-blur-sm overflow-hidden group-hover:border-slate-500/70 transition-all duration-500 shadow-2xl group-hover:shadow-cyan-500/20">
            
              <div
                className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}
              ></div>
             
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              
              <div className="relative h-full p-8 flex flex-col justify-between">
                
                <div className="relative mb-6">
                  
                  <div
                    className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${module.color} rounded-xl opacity-0 group-hover:opacity-40 blur-lg transform scale-125 transition-all duration-500`}
                  ></div>
                
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center text-white shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:translate-y-[-8px]`}
                  >
                    {module.icon}
                   
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-xl"></div>
                  </div>
                  
                  <div
                    className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="absolute top-4 right-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
            
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-all duration-300 transform group-hover:translate-y-[-2px]">
                    {module.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-100 transition-all duration-300 leading-relaxed">
                    {module.description}
                  </p>
                </div>
                
                <div className="mt-6 relative">
                  <div className="w-full h-1 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${module.color} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                    ></div>
                  </div>
                </div>
              
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform rotate-45"></div>
              </div>
              
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-cyan-400/30 transition-all duration-500"></div>
            </div>
          </div>
          
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 z-10">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* achievements */}
<section id="achievements" className="py-20 px-4 min-h-[50vh] bg-gradient-to-b from-slate-600 to-slate-700 relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="data-stream"></div>
    <div className="security-grid"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div
      className={`text-center mb-16 ${
        visibleElements.has("achievements-title") ? "animate-flyInFromTop" : "opacity-0"
      }`}
      data-animate-id="achievements-title"
    >
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Achievements & Partners
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Our journey milestones and trusted partnerships
      </p>
    </div>

    {/* Main Grid Container */}
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
      
      {/* Left Side - What Have We Done */}
      <div className="space-y-8">
        <div className="mb-8">
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            What Have We Done So Far?
          </h3>
          <p className="text-lg text-gray-300">
            Highlights of our journey and milestones we've reached
          </p>
        </div>

        <div className="relative border-l-2 border-cyan-400/30 ml-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`relative mb-8 pl-8 group opacity-0 ${
                visibleElements.has(`achievement-${index}`)
                  ? "animate-flyInFromLeft"
                  : ""
              }`}
              data-animate-id={`achievement-${index}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleFlyingClick(`achievement-${index}`)}
            >
              {/* Timeline dot */}
              <span className="absolute left-[-16px] top-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-md"></span>

              {/* Achievement Box */}
              <div className="bg-slate-800/70 backdrop-blur-md border border-slate-600 rounded-xl p-6 shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300 relative">
                {/* Date Badge */}
                <div className="absolute top-2 right-4 text-sm px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                  {achievement.date}
                </div>

                {/* Text */}
                <h4 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 mb-2">
                  {index + 1}.
                </h4>
                <p className="text-gray-300 text-base">{achievement.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Partners */}
      <div className="space-y-8">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Our Partners
          </h3>
          <p className="text-gray-300 text-base">
            Trusted partnerships that drive our success
          </p>
        </div>

        <div
          className={` bg-slate-800/70 backdrop-blur-md border border-slate-600 rounded-xl p-8 shadow-lg ${
            visibleElements.has("partners-section") ? "animate-flyInFromRight" : "opacity-0"
          }`}
          data-animate-id="partners-section"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Partner Logos Grid */}
<div className="grid grid-cols-2 gap-8 items-center justify-items-center">
<div className="w-40 h-24 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30">
  <img 
    src="/image/images.jpeg" 
    alt="Company 2" 
    className="max-w-full max-h-full object-contain opacity-100 p-2"
  />
</div>
<div className="w-40 h-24 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30">
  <img 
    src="/image/nicat.png" 
    alt="Company 2" 
    className="max-w-full max-h-full object-contain opacity-100 p-2"
  />
</div>
</div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* PROUD MOMENTS */}
<section id="proud-moments" className="py-20 px-4 min-h-[60vh] bg-gradient-to-b from-slate-700 to-slate-800 relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="data-stream"></div>
    <div className="security-grid"></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    {/* Section Header */}
    <div
      className={`text-center mb-16 ${
        visibleElements.has("proud-moments-title") ? "animate-flyInFromTop" : "opacity-0"
      }`}
      data-animate-id="proud-moments-title"
    >
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Proud Moments
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Capturing the memories that define our journey and celebrate our achievements
      </p>
    </div>
    <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000 }}
  loop={true}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {proudMoments.map((moment, index) => (
    <SwiperSlide key={index}>
      <div
        className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 ${
          visibleElements.has(`moment-${index}`)
            ? "animate-scaleIn opacity-100"
            : "opacity-0 scale-90 translate-y-8"
        } ${
          clickedElement === `moment-${index}`
            ? "animate-flyTowards"
            : ""
        }`}
        data-animate-id={`moment-${index}`}
        style={{
          animationDelay: visibleElements.has(`moment-${index}`)
            ? `${index * 120}ms`
            : "0ms",
          animationDuration: "800ms",
          animationFillMode: "both",
          animationTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
        onClick={() => handleFlyingClick(`moment-${index}`)}
      >
        {/* Image Container */}
        <div className="aspect-video overflow-hidden bg-slate-900/50 flex items-center justify-center">
          <img
            src={moment.image || "/placeholder.png"}
            alt={moment.caption || "Proud moment"}
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { e.target.src = "/placeholder.png"; }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Caption Container */}
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
            {moment.title || `Moment ${index + 1}`}
          </h3>
          {moment.date && (
            <span className="text-sm text-cyan-400 font-medium">
              {moment.date}
            </span>
          )}
        </div>

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


  </div>
</section>







{/* goals */}
 
<section
  id="goals"
  className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
>
  {/* Background blobs */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-32 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
    <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
    <div className="absolute bottom-32 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    {/* Title */}
    <div
      className={`text-center mb-16 ${
        visibleElements.has("goals-title") ? "animate-flyInFromTop" : "opacity-0"
      }`}
      data-animate-id="goals-title"
    >
      <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Our Vision
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Transforming retail security through cutting-edge AI innovation
      </p>
    </div>

    {/* Central lightning bolt + goals around */}
<div className="relative flex flex-col md:flex-row md:justify-center md:items-center min-h-[500px] gap-6">
  {/* Lightning bolt */}
  <div className="relative z-10 flex justify-center mb-6 md:mb-0">
    <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 animate-ping opacity-20"></div>
  </div>

  {/* Goals */}
  <div className="relative flex flex-col md:absolute md:inset-0 md:justify-center md:items-center">
    {goals.map((goal, index) => {
      const radiusX = 270;
      const radiusY = 215;
      const angle = (2 * Math.PI / goals.length) * index;

      const x = radiusX * Math.cos(angle);
      const y = radiusY * Math.sin(angle);

      return (
        <div
          key={index}
          className={`w-80 mb-4 md:absolute`}
          style={{
            ...(window.innerWidth >= 768
              ? { transform: `translate(${x}px, ${y}px)` }
              : {}),
          }}
        >
          {/* <div className="group cursor-pointer"> */}
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-600/50 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 hover:rotate-1">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  Goal {index + 1}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {goal}
                </p>
              </div>
            </div>
          {/* </div> */}
        </div>
      );
    })}
  </div>
</div>


  </div>
</section>


{/* TEAM */}
 <section
      id="team"
      className="py-24 px-8 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/20 rounded-full filter blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className={`text-center mb-20 ${
            visibleElements.has("team-title")
              ? "animate-fadeInDown opacity-100"
              : "opacity-0 translate-y-[-30px]"
          }`}
          data-animate-id="team-title"
        >
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Team
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Meet the experts behind our revolutionary AI security solutions
          </p>
          
          {/* Team Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{teamMembers.length} Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{Object.keys(departments).length} Departments</span>
            </div>
          </div>
        </div>

        {/* Department Sections */}
        <div className="space-y-6">
          {Object.entries(departments).map(([deptKey, dept], deptIndex) => {
            const deptMembers = teamMembers.filter(member => member.department === deptKey);
            const isExpanded = expandedDepartment === deptKey;
            const IconComponent = dept.icon;
            
            return (
              <div
                key={deptKey}
                className={`${dept.bgColor} backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                  visibleElements.has(`dept-${deptKey}`) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                } ${isExpanded ? 'ring-1 ring-cyan-400/30' : ''}`}
                data-animate-id={`dept-${deptKey}`}
                style={{ animationDelay: `${deptIndex * 150}ms` }}
              >
                <button
                  onClick={() => setExpandedDepartment(isExpanded ? '' : deptKey)}
                  className={`w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group ${
                    isExpanded ? 'bg-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${dept.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {deptMembers.length} {deptMembers.length === 1 ? 'member' : 'members'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                      {deptMembers.slice(0, 3).map((member, idx) => (
                        <img
                          key={idx}
                          src={member.image}
                          alt={member.name}
                          className="w-8 h-8 rounded-full ring-2 ring-white/20 -ml-2"
                        />
                      ))}
                      {deptMembers.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-600 ring-2 ring-white/20 -ml-2 flex items-center justify-center text-xs text-white">
                          +{deptMembers.length - 3}
                        </div>
                      )}
                    </div>
                    {isExpanded ? 
                      <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" /> : 
                      <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    }
                  </div>
                </button>
                
                <div className={`transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="p-6 pt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {deptMembers.map((member, index) => (
                        <div
                          key={index}
                          className={`mt-4 group bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 ${
                            isExpanded ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                          } ${clickedElement === `${deptKey}-${index}` ? 'animate-pulse' : ''}`}
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => handleFlyingClick(`${deptKey}-${index}`)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <img
                                src={member.image || "/placeholder.png"}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all"
                                onError={(e) => (e.target.src = "/placeholder.png")}
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-base">
                                {member.name || "Name"}
                              </h4>
                              <p className="text-cyan-300 font-medium text-sm mb-2">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out forwards; }
      `}</style>
    </section>




      {/* Location*/}
      <section id="location" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="location-tracker"></div>
          <div className="satellite-orbit"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${
              visibleElements.has("location-title") ? "animate-flyInFromTop" : "opacity-0"
            }`}
            data-animate-id="location-title"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Location
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building the future of security from our headquarters
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl ${
                visibleElements.has("location-content") ? "animate-flyInFromBottom" : "opacity-0"
              }`}
              data-animate-id="location-content"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Headquarters",
                      desc: `NICAT, J442+J68, Old Airport Rd,\nOld Chaklala Cantt, Rawalpindi, 46000`,
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Target,
                      title: "Global Reach",
                      desc: "Serving clients worldwide with 24/7 support and monitoring capabilities",
                      color: "from-purple-400 to-pink-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 group transition-all duration-300 ${
                        clickedElement === `location-${index}` ? "animate-flyTowards" : "hover:scale-105"
                      }`}
                      onClick={() => handleFlyingClick(`location-${index}`)}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-lg whitespace-pre-line">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`rounded-lg overflow-hidden border border-slate-600 shadow ${
                    clickedElement === "map" ? "animate-flyTowards" : "hover:scale-105"
                  } transition-all duration-300`}
                  onClick={() => handleFlyingClick("map")}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.614147346385!2d73.0953105!3d33.5931424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df956b6b6e5a89%3A0xe3f41969a7c3b602!2sNICAT%20-%20National%20Incubation%20Center%20for%20Aerospace%20Technologies!5e0!3m2!1sen!2s!4v1719927842264!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Us*/}
      <section id="contact" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="communication-waves"></div>
          <div className="signal-towers"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${
              visibleElements.has("contact-title") ? "animate-flyInFromTop" : "opacity-0"
            }`}
            data-animate-id="contact-title"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to revolutionize your security? Get in touch with our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email Us",
                primary: "muhammadsafiullah@gmail.com",
                secondary: "hafizmuhammadsafiullah@gmail.com",
                color: "from-cyan-400 to-blue-500",
              },
              {
                icon: Phone,
                title: "Call Us",
                primary: "+92 333 5160474",
                secondary: "24/7 Support Available",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                primary: "NICAT",
                secondary: "J442+J68, Old Airport Rd, Old Chaklala Cantt., Rawalpindi, 46000",
                color: "from-purple-400 to-pink-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  visibleElements.has(`contact-${index}`) ? "animate-flyInFromBottom" : "opacity-0"
                } ${clickedElement === `contact-${index}` ? "animate-flyTowards" : "hover:scale-105"}`}
                data-animate-id={`contact-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFlyingClick(`contact-${index}`)}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto`}
                >
                  <contact.icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-gray-200 text-lg mb-2">{contact.primary}</p>
                  <p className="text-gray-400">{contact.secondary}</p>
                </div>
              </div>
            ))}
          </div>


          {/* Social Links*/}
          <div
            className={`text-center ${
              visibleElements.has("contact-social") ? "animate-flyInFromLeft" : "opacity-0"
            }`}
            data-animate-id="contact-social"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
            <div className="flex justify-center gap-6">
              {[
                {
                  icon: Linkedin,
                  color: "from-blue-400 to-blue-500",
                  name: "linkedin",
                  url: "https://www.linkedin.com/company/camsense/",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    clickedElement === `social-${social.name}` ? "animate-flyTowards" : "hover:scale-110"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleFlyingClick(`social-${social.name}`)
                    window.open(social.url, "_blank")
                  }}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>


          {/* Call to Action */}
          <div
            className={`text-center mt-12 ${
              visibleElements.has("contact-cta-section") ? "animate-flyInFromRight" : "opacity-0"
            }`}
            data-animate-id="contact-cta-section"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </section>



      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-600 bg-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Camsense
            </h3>
            <p className="text-gray-300">Revolutionizing retail security through intelligent AI solutions</p>
          </div>
          <div className="text-gray-400 text-sm">© 2025 Camsense. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default AISecurityWebsite
