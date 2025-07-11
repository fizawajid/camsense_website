"use client"
import { useState, useEffect, useRef } from "react"
import "./style.css"
import { Shield, Eye, Zap, BarChart3, MapPin, Target, Camera, AlertTriangle, Brain, CheckCircle, ArrowRight, Play, Pause, Menu, X, Mail, Phone, Users, Linkedin, Github, Twitter } from 'lucide-react'

import {
  ParkingSquare,
  ShoppingCart,
  Briefcase,
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

  // Refs for intersection observer
  const observerRef = useRef(null)
  const elementsRef = useRef(new Map())

  // Handle scroll for parallax effects
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY)
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "product-overview", "modules", "achievements", "goals", "team", "location", "contact"]
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

  // Auto-cycle through modules
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "modules", "achievements", "goals", "team", "location", "contact"]
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

  // Intersection Observer for flying animations
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

    // Observe all elements with data-animate-id
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

  // Flying animation handler
  const handleFlyingClick = (elementId) => {
    setClickedElement(elementId)
    setTimeout(() => setClickedElement(null), 600)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "modules", label: "Modules" },
    { id: "achievements", label: "Achieve" },
    { id: "goals", label: "Goals" },
    { id: "team", label: "Team" },
    { id: "location", label: "Location" },
    { id: "contact", label: "Contact Us" },
  ]

const modules = [
  {
    icon: <ParkingSquare className="w-8 h-8" />, // choose a parking-related icon
    title: "Parking Lots Safety",
    description: "Monitor and secure parking areas with intelligent surveillance",
    color: "from-indigo-400 to-purple-400",
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />, // shoplifting
    title: "Shoplifting Prevention",
    description: "Detect and prevent theft in retail environments in real-time",
    color: "from-pink-400 to-red-400",
  },
  {
    icon: <Briefcase className="w-8 h-8" />, // office
    title: "Office Safety",
    description: "Ensure workplace safety and compliance effortlessly",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />, // university
    title: "University Safety",
    description: "Protect campuses with proactive monitoring and alerts",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />, // productivity
    title: "Employee Productivity",
    description: "Gain insights into workforce productivity and trends",
    color: "from-yellow-400 to-amber-400",
  },
  {
    icon: <Home className="w-8 h-8" />, // home
    title: "Home Safety",
    description: "Keep your home safe with smart, AI-powered monitoring",
    color: "from-purple-400 to-pink-400",
  },
];


  const goals = [
    "Reduce retail theft by 85% through AI-powered surveillance",
    "Provide real-time security insights to prevent incidents",
    "Seamlessly integrate with existing security systems",
    "Deliver actionable analytics for better security decisions",
  ]

  const achievements = [
    "Validated the market and built initial prototype.",
    "Secured $25k AWS credits to scale.",
    "Pilots and trials in marts, university & NICAT",
    "Booked 1000+ cameras to date",
  ]

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      description: "AI security expert with 15+ years in computer vision",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Machine learning specialist and former Google engineer",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Security",
      description: "Former law enforcement with retail security expertise",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Davis",
      role: "Lead Developer",
      description: "Full-stack developer specializing in real-time systems",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                clickedElement === "logo" ? "animate-flyTowards" : "hover:scale-110"
              }`}
              onClick={() => handleFlyingClick("logo")}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Camsense
              </span>
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

      {/* Hero Section with Video Background */}
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
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/40 rounded-full px-6 py-2 mb-6 backdrop-blur-sm animate-glow cursor-pointer transition-all duration-300 ${
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
                className={`text-center group cursor-pointer transition-all duration-300 ${
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-300 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section id="product-overview" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700 relative overflow-hidden">
        {/* Animated Background */}
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
                  className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
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
            <div
              className={`relative ${
                visibleElements.has("overview-preview") ? "animate-flyInFromRight" : "opacity-0"
              }`}
              data-animate-id="overview-preview"
            >
              <div
                className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl cursor-pointer transition-all duration-300 ${
                  clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105"
                }`}
                onClick={() => handleFlyingClick("preview-card")}
              >
                <div className="space-y-4">
                  <h3 className="text-xl text-cyan-300 font-semibold">Live Detection Feed</h3>
                  <div className="bg-slate-700/80 rounded-lg p-4 border border-cyan-400/20 shadow">
                    <ul className="space-y-2 text-sm text-gray-300 max-h-48 overflow-y-auto">
                      <li>
                        12:41 PM — <span className="text-orange-400">Suspicious Movement detected</span>
                      </li>
                      <li>
                        12:32 PM — <span className="text-green-400">All clear</span>
                      </li>
                      <li>
                        12:20 PM — <span className="text-red-400">Intrusion attempt</span>
                      </li>
                      <li>
                        12:05 PM — <span className="text-green-400">All clear</span>
                      </li>
                      <li>
                        11:45 AM — <span className="text-orange-400">Suspicious Activity</span>
                      </li>
                      <li>
                        11:50 AM — <span className="text-green-400">All clear</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
            {/* <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive security solutions powered by cutting-edge AI technology
            </p> */}
            
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-700 transform-gpu perspective-1000 ${
                  visibleElements.has(`module-${index}`) ? "animate-flyInFromBottom" : "opacity-0"
                } ${clickedElement === `module-${index}` ? "animate-flyTowards" : ""} ${
                  activeModule === index ? "scale-105 z-20" : "hover:scale-110 hover:z-10"
                }`}
                data-animate-id={`module-${index}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
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
  {/* Animated Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="data-stream"></div>
    <div className="security-grid"></div>
  </div>

  <div className="max-w-4xl mx-auto relative z-10">
    <div
      className={`text-center mb-16 ${
        visibleElements.has("achievements-title") ? "animate-flyInFromTop" : "opacity-0"
      }`}
      data-animate-id="achievements-title"
    >
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        What Have We Done So Far?
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Highlights of our journey and milestones we’ve reached
      </p>
    </div>

    <div className="relative border-l-2 border-cyan-400/30 ml-4">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className={`relative mb-12 pl-8 group cursor-pointer opacity-0 ${
            visibleElements.has(`achievement-${index}`)
              ? index % 2 === 0
                ? "animate-flyInFromLeft"
                : "animate-flyInFromRight"
              : ""
          }`}
          data-animate-id={`achievement-${index}`}
          style={{ animationDelay: `${index * 0.2}s` }}
          onClick={() => handleFlyingClick(`achievement-${index}`)}
        >
          <span className="absolute left-[-16px] top-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-md"></span>
          <div className="bg-slate-800/70 backdrop-blur-md border border-slate-600 rounded-xl p-6 shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 mb-2">
            {index + 1}.
            </h3>
            <p className="text-gray-300">{achievement}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>





    {/* goals */}
<section id="goals" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
  {/* Floating Orbs Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-32 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
    <div className="absolute bottom-32 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
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

    {/* Hexagonal Grid Layout */}
    <div className="relative">
      {/* Central Hub */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Goals arranged in a circular pattern */}
      <div className="relative flex flex-wrap justify-center gap-8">
        {goals.map((goal, index) => {
          const positions = [
            'transform translate-x-0 translate-y-0',
            'transform translate-x-8 translate-y-4',
            'transform -translate-x-8 translate-y-4',
            'transform translate-x-16 translate-y-8',
            'transform -translate-x-16 translate-y-8'
          ];
          
          return (
            <div
              key={index}
              className={`relative w-80 opacity-0 ${
                visibleElements.has(`goal-${index}`)
                  ? "animate-flyInFromBottom"
                  : ""
              }`}
              data-animate-id={`goal-${index}`}
              style={{ animationDelay: `${index * 0.3}s` }}
              onClick={() => handleFlyingClick(`goal-${index}`)}
            >
              {/* Connecting Lines */}
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-cyan-400/50 to-transparent transform -translate-x-1/2 -translate-y-8"></div>
              
              {/* Goal Card */}
              <div className="group cursor-pointer">
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-600/50 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 hover:rotate-1">
                  {/* Goal Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        Goal {index + 1}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {goal}
                    </p>
                  </div>
                  
                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

    {/* GOALS END */}


    






      {/* <section id="achieve" className="py-20 px-4 bg-gradient-to-b from-slate-600 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="data-stream"></div>
          <div className="security-grid"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${
              visibleElements.has("achieve-title") ? "animate-flyInFromTop" : "opacity-0"
            }`}
            data-animate-id="achieve-title"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Milestones Achieved
            </h2>
          </div>
          <div className="relative border-l-2 border-cyan-400/30 ml-4">
            {achieve.map((goal, index) => (
              <div
                key={index}
                className={`relative mb-12 pl-8 group cursor-pointer opacity-0 ${
                  visibleElements.has(`goal-${index}`)
                    ? index % 2 === 0
                      ? "animate-flyInFromLeft"
                      : "animate-flyInFromRight"
                    : ""
                }`}
                data-animate-id={`goal-${index}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleFlyingClick(`goal-${index}`)}
              >
                <span className="absolute left-[-16px] top-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-md"></span>
                <div className="bg-slate-800/70 backdrop-blur-md border border-slate-600 rounded-xl p-6 shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 mb-2">
                    Breakthrough {index + 1}
                  </h3>
                  <p className="text-gray-300">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section id="team" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="neural-network"></div>
          <div className="pulse-rings"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${
              visibleElements.has("team-title") ? "animate-flyInFromTop" : "opacity-0"
            }`}
            data-animate-id="team-title"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the experts behind our revolutionary AI security solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer ${
                  visibleElements.has(`team-${index}`) ? "animate-flyInFromBottom" : "opacity-0"
                } ${clickedElement === `team-${index}` ? "animate-flyTowards" : "hover:scale-105"}`}
                data-animate-id={`team-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFlyingClick(`team-${index}`)}
              >
                <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-400/30 flex items-center justify-center mb-6 overflow-hidden">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-300 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700 relative overflow-hidden">
        {/* Animated Background */}
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
                      className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
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

      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800 relative overflow-hidden">
        {/* Animated Background */}
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
          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email Us",
                primary: "muhammadsafiullah@gmail.com",
                secondary: "secondary@email.com",
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
                className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer ${
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
          {/* Social Links Section */}
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
