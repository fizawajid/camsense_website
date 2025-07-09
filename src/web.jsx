// "use client"

// import { useState, useEffect } from "react"
// import {
//   Shield,
//   Eye,
//   Zap,
//   BarChart3,
//   MapPin,
//   Target,
//   Camera,
//   AlertTriangle,
//   Brain,
//   CheckCircle,
//   ArrowRight,
//   Play,
//   Pause,
//   Menu,
//   X,
//   Mail,
//   Phone,
//   Users,
//   Linkedin,
//   Github,
//   Twitter,
// } from "lucide-react"

// const AISecurityWebsite = () => {
//   const [isPlaying, setIsPlaying] = useState(true)
//   const [activeModule, setActiveModule] = useState(0)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")
//   const [scrollY, setScrollY] = useState(0)
//   const [clickedElement, setClickedElement] = useState(null)

//   // Handle scroll for parallax effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Auto-cycle through modules
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule((prev) => (prev + 1) % 4)
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [])

//   // Handle scroll for active section
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["home", "modules", "goals", "team", "location", "contact"]
//       const scrollPosition = window.scrollY + 100

//       for (const section of sections) {
//         const element = document.getElementById(section)
//         if (element) {
//           const { offsetTop, offsetHeight } = element
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             setActiveSection(section)
//             break
//           }
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//     setIsMenuOpen(false)
//   }

//   // Flying animation handler
//   const handleFlyingClick = (elementId) => {
//     setClickedElement(elementId)
//     setTimeout(() => setClickedElement(null), 600)
//   }

//   const navItems = [
//     { id: "home", label: "Home" },
//     { id: "modules", label: "Modules" },
//     { id: "goals", label: "Goals" },
//     { id: "team", label: "Team" },
//     { id: "location", label: "Location" },
//     { id: "contact", label: "Contact Us" },
//   ]

//   const modules = [
//     {
//       icon: <Eye className="w-8 h-8" />,
//       title: "Real-Time Detection",
//       description: "Advanced AI algorithms detect suspicious behavior instantly",
//       color: "from-blue-400 to-cyan-400",
//     },
//     {
//       icon: <AlertTriangle className="w-8 h-8" />,
//       title: "Instant Alerts",
//       description: "Immediate notifications sent to security personnel",
//       color: "from-orange-400 to-red-400",
//     },
//     {
//       icon: <BarChart3 className="w-8 h-8" />,
//       title: "Crime Analytics",
//       description: "Comprehensive insights and pattern recognition",
//       color: "from-purple-400 to-pink-400",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Seamless Integration",
//       description: "Works with your existing CCTV infrastructure",
//       color: "from-green-400 to-emerald-400",
//     },
//   ]

//   const goals = [
//     "Reduce retail theft by 85% through AI-powered surveillance",
//     "Provide real-time security insights to prevent incidents",
//     "Seamlessly integrate with existing security systems",
//     "Deliver actionable analytics for better security decisions",
//   ]

//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "CEO & Founder",
//       description: "AI security expert with 15+ years in computer vision",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Sarah Chen",
//       role: "CTO",
//       description: "Machine learning specialist and former Google engineer",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Head of Security",
//       description: "Former law enforcement with retail security expertise",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Emily Davis",
//       role: "Lead Developer",
//       description: "Full-stack developer specializing in real-time systems",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden">
//       {/* Navigation Header */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
//         <div className="max-w-7xl mx-auto px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div
//               className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
//                 clickedElement === "logo" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => handleFlyingClick("logo")}
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
//                 <Shield className="w-5 h-5" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
//                 SecureAI
//               </span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     handleFlyingClick(`nav-${item.id}`)
//                     scrollToSection(item.id)
//                   }}
//                   className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
//                     clickedElement === `nav-${item.id}` ? "animate-flyTowards" : ""
//                   } ${activeSection === item.id ? "text-cyan-300 scale-105" : "text-gray-300"}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className={`md:hidden transition-all duration-300 ${
//                 clickedElement === "menu" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => {
//                 handleFlyingClick("menu")
//                 setIsMenuOpen(!isMenuOpen)
//               }}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4 border-t border-slate-700/50 animate-slideDown">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     handleFlyingClick(`mobile-nav-${item.id}`)
//                     scrollToSection(item.id)
//                   }}
//                   className={`block w-full text-left py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
//                     clickedElement === `mobile-nav-${item.id}` ? "animate-flyTowards" : ""
//                   } ${activeSection === item.id ? "text-cyan-300" : "text-gray-300"}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section with Video Background */}
//       <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
//         {/* Video Background */}
//         <div className="absolute inset-0 z-0">
//           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
//             <source
//               src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-city-50063-large.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 z-10">
//           {/* Animated Grid with Parallax */}
//           <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
//             <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
//               {Array.from({ length: 96 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="border border-cyan-400/30 animate-pulse"
//                   style={{
//                     animationDelay: `${i * 0.05}s`,
//                     animationDuration: "4s",
//                   }}
//                 ></div>
//               ))}
//             </div>
//           </div>

//           {/* Floating Particles with Parallax */}
//           {Array.from({ length: 30 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-40 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${4 + Math.random() * 6}s`,
//                 transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Hero Content */}
//         <div
//           className="relative z-20 text-center max-w-6xl px-8 animate-fadeInUp"
//           style={{ transform: `translateY(${scrollY * 0.2}px)` }}
//         >
//           <div className="mb-8">
//             <div
//               className={`inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/40 rounded-full px-6 py-2 mb-6 backdrop-blur-sm animate-glow cursor-pointer transition-all duration-300 ${
//                 clickedElement === "badge" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => handleFlyingClick("badge")}
//             >
//               <Brain className="w-5 h-5 text-cyan-300" />
//               <span className="text-cyan-300 font-medium">AI-Powered Security</span>
//             </div>

//             <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight animate-slideInLeft">
//               <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
//                 Smart
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-slideInRight">
//                 Surveillance
//               </span>
//             </h1>

//             <p
//               className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
//               style={{ animationDelay: "0.3s" }}
//             >
//               Revolutionary AI agent that transforms your CCTV system into an intelligent security powerhouse, detecting
//               shoplifting in real-time with unprecedented accuracy.
//             </p>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex gap-6 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
//             <button
//               className={`group relative bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 ${
//                 clickedElement === "cta-primary" ? "animate-flyTowards" : "animate-bounce-subtle"
//               }`}
//               onClick={() => handleFlyingClick("cta-primary")}
//             >
//               <span className="flex items-center gap-2">
//                 Get Started
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
//             </button>

//             <button
//               className={`group border-2 border-slate-500 hover:border-cyan-300 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-cyan-400/10 backdrop-blur-sm ${
//                 clickedElement === "cta-secondary" ? "animate-flyTowards" : "hover:scale-105"
//               }`}
//               onClick={() => {
//                 handleFlyingClick("cta-secondary")
//                 setIsPlaying(!isPlaying)
//               }}
//             >
//               <span className="flex items-center gap-2">
//                 <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
//                   {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
//                 </div>
//                 Watch Demo
//               </span>
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
//             {[
//               { value: "99.7%", label: "Detection Accuracy" },
//               { value: "<2s", label: "Response Time" },
//               { value: "24/7", label: "Monitoring" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center group cursor-pointer transition-all duration-300 ${
//                   clickedElement === `stat-${index}` ? "animate-flyTowards" : "hover:scale-110"
//                 }`}
//                 onClick={() => handleFlyingClick(`stat-${index}`)}
//               >
//                 <div className="text-3xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200">{stat.value}</div>
//                 <div className="text-gray-300">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
//           <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-cyan-300 rounded-full animate-bounce mt-2"></div>
//           </div>
//         </div>
//       </section>

//       {/* Product Overview */}
//       <section className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Next-Generation Security
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Our vertical AI agent seamlessly integrates with your existing CCTV setup, providing instant alerts and
//               detailed crime analytics through our comprehensive desktop application.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8 animate-slideInLeft">
//               {[
//                 {
//                   icon: Camera,
//                   title: "Seamless Integration",
//                   desc: "Works with your existing CCTV infrastructure without any hardware changes.",
//                   color: "from-cyan-400 to-blue-500",
//                 },
//                 {
//                   icon: Zap,
//                   title: "Real-Time Detection",
//                   desc: "Advanced AI algorithms detect suspicious behavior and shoplifting attempts instantly.",
//                   color: "from-orange-400 to-red-500",
//                 },
//                 {
//                   icon: BarChart3,
//                   title: "Detailed Analytics",
//                   desc: "Comprehensive crime analytics and insights through our all-in-one desktop application.",
//                   color: "from-purple-400 to-pink-500",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
//                     clickedElement === `feature-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                   }`}
//                   onClick={() => handleFlyingClick(`feature-${index}`)}
//                 >
//                   <div
//                     className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-cyan-400/25`}
//                   >
//                     <item.icon className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-300">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="relative animate-slideInRight">
//               <div
//                 className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl cursor-pointer transition-all duration-300 ${
//                   clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 onClick={() => handleFlyingClick("preview-card")}
//               >
//                 <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/30 flex items-center justify-center mb-6">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//                       <Eye className="w-8 h-8" />
//                     </div>
//                     <p className="text-cyan-300 font-medium">AI Detection Preview</p>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-300">System Status: Active</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-300">Cameras Connected: 12</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-300">Alerts Today: 3</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modules Section */}
//       <section id="modules" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-600">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Our Modules
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Comprehensive security solutions powered by cutting-edge AI technology
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {modules.map((module, index) => (
//               <div
//                 key={index}
//                 className={`relative group cursor-pointer transition-all duration-500 animate-fadeInUp ${
//                   clickedElement === `module-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 } ${activeModule === index ? "scale-105" : ""}`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onMouseEnter={() => setActiveModule(index)}
//                 onClick={() => handleFlyingClick(`module-${index}`)}
//               >
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`}
//                 ></div>
//                 <div className="relative bg-slate-700 rounded-2xl p-8 border border-slate-600 group-hover:border-slate-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
//                   <div
//                     className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}
//                   >
//                     {module.icon}
//                   </div>
//                   <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition-colors">
//                     {module.title}
//                   </h3>
//                   <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{module.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Goals Section */}
//       <section id="goals" className="py-20 px-8 bg-gradient-to-b from-slate-600 to-slate-700">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Our Goals
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Revolutionizing retail security through intelligent AI solutions
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-8">
//             {goals.map((goal, index) => (
//               <div
//                 key={index}
//                 className={`group flex items-start gap-6 p-6 rounded-2xl bg-slate-700/50 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/70 animate-slideInUp cursor-pointer ${
//                   clickedElement === `goal-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`goal-${index}`)}
//               >
//                 <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
//                   <CheckCircle className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-lg text-gray-200 group-hover:text-white transition-colors">{goal}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section id="team" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Our Team
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Meet the experts behind our revolutionary AI security solutions
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 animate-fadeInUp shadow-lg hover:shadow-2xl cursor-pointer ${
//                   clickedElement === `team-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`team-${index}`)}
//               >
//                 <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-400/30 flex items-center justify-center mb-6 overflow-hidden">
//                   <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
//                     <Users className="w-8 h-8" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
//                   {member.name}
//                 </h3>
//                 <p className="text-cyan-300 font-medium mb-3">{member.role}</p>
//                 <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
//                   {member.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location Section */}
//       <section id="location" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Our Location
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Building the future of security from our headquarters
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl animate-slideInUp">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div className="space-y-6">
//                   {[
//                     {
//                       icon: MapPin,
//                       title: "Headquarters",
//                       desc: "Innovation District\nTech Hub Center\nCity, State 12345",
//                       color: "from-cyan-400 to-blue-500",
//                     },
//                     {
//                       icon: Target,
//                       title: "Global Reach",
//                       desc: "Serving clients worldwide with 24/7 support and monitoring capabilities",
//                       color: "from-purple-400 to-pink-500",
//                     },
//                   ].map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
//                         clickedElement === `location-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                       }`}
//                       onClick={() => handleFlyingClick(`location-${index}`)}
//                     >
//                       <div
//                         className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}
//                       >
//                         <item.icon className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-300 text-lg whitespace-pre-line">{item.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className={`aspect-square bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/30 flex items-center justify-center cursor-pointer transition-all duration-300 ${
//                     clickedElement === "map" ? "animate-flyTowards" : "hover:scale-105"
//                   }`}
//                   onClick={() => handleFlyingClick("map")}
//                 >
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
//                       <MapPin className="w-10 h-10" />
//                     </div>
//                     <p className="text-cyan-300 font-medium text-lg">Interactive Map</p>
//                     <p className="text-gray-300 text-sm mt-2">Click to explore our location</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us Section - Redesigned without form */}
//       <section id="contact" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               Contact Us
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Ready to revolutionize your security? Get in touch with our team
//             </p>
//           </div>

//           {/* Contact Cards Grid */}
//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             {[
//               {
//                 icon: Mail,
//                 title: "Email Us",
//                 primary: "contact@secureai.com",
//                 secondary: "support@secureai.com",
//                 color: "from-cyan-400 to-blue-500",
//               },
//               {
//                 icon: Phone,
//                 title: "Call Us",
//                 primary: "+1 (555) 123-4567",
//                 secondary: "24/7 Support Available",
//                 color: "from-green-400 to-emerald-500",
//               },
//               {
//                 icon: MapPin,
//                 title: "Visit Us",
//                 primary: "Innovation District",
//                 secondary: "Tech Hub Center, City, State 12345",
//                 color: "from-purple-400 to-pink-500",
//               },
//             ].map((contact, index) => (
//               <div
//                 key={index}
//                 className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer animate-fadeInUp ${
//                   clickedElement === `contact-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`contact-${index}`)}
//               >
//                 <div
//                   className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto`}
//                 >
//                   <contact.icon className="w-8 h-8" />
//                 </div>
//                 <div className="text-center">
//                   <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition-colors">
//                     {contact.title}
//                   </h3>
//                   <p className="text-gray-200 text-lg mb-2">{contact.primary}</p>
//                   <p className="text-gray-400">{contact.secondary}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Social Links Section */}
//           <div className="text-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
//             <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
//             <div className="flex justify-center gap-6">
//               {[
//                 { icon: Linkedin, color: "from-blue-400 to-blue-500", name: "linkedin" },
//                 { icon: Github, color: "from-gray-600 to-gray-700", name: "github" },
//                 { icon: Twitter, color: "from-cyan-400 to-blue-400", name: "twitter" },
//               ].map((social, index) => (
//                 <button
//                   key={index}
//                   className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
//                     clickedElement === `social-${social.name}` ? "animate-flyTowards" : "hover:scale-110"
//                   }`}
//                   onClick={() => handleFlyingClick(`social-${social.name}`)}
//                 >
//                   <social.icon className="w-6 h-6" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
//             <button
//               className={`bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-4 rounded-full font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-2xl hover:shadow-cyan-400/25 ${
//                 clickedElement === "contact-cta" ? "animate-flyTowards" : "hover:scale-105"
//               }`}
//               onClick={() => handleFlyingClick("contact-cta")}
//             >
//               Schedule a Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-8 border-t border-slate-600 bg-slate-800">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
//               SecureAI
//             </h3>
//             <p className="text-gray-300">Revolutionizing retail security through intelligent AI solutions</p>
//           </div>
//           <div className="text-gray-400 text-sm">© 2025 SecureAI. All rights reserved.</div>
//         </div>
//       </footer>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(180deg); }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
//           50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.5); }
//         }
        
//         @keyframes bounce-subtle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-5px); }
//         }
        
//         @keyframes flyTowards {
//           0% { 
//             transform: scale(1) translateZ(0) rotateX(0) rotateY(0);
//             box-shadow: 0 0 0 rgba(34, 211, 238, 0);
//           }
//           50% { 
//             transform: scale(1.2) translateZ(50px) rotateX(-10deg) rotateY(5deg);
//             box-shadow: 0 20px 40px rgba(34, 211, 238, 0.4);
//           }
//           100% { 
//             transform: scale(1.1) translateZ(30px) rotateX(-5deg) rotateY(2deg);
//             box-shadow: 0 15px 30px rgba(34, 211, 238, 0.3);
//           }
//         }
        
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-slideInRight {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .animate-slideInUp {
//           animation: slideInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out forwards;
//         }
        
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
        
//         .animate-bounce-subtle {
//           animation: bounce-subtle 2s ease-in-out infinite;
//         }
        
//         .animate-flyTowards {
//           animation: flyTowards 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//         }
        
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #1e293b;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #22d3ee, #3b82f6);
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #06b6d4, #2563eb);
//         }
//       `}</style>
//     </div>
//   )
// }

// export default AISecurityWebsite

















//pakistani jhanda

// "use client"

// import { useState, useEffect } from "react"
// import {
//   Shield,
//   Eye,
//   Zap,
//   BarChart3,
//   MapPin,
//   Target,
//   Camera,
//   AlertTriangle,
//   Brain,
//   CheckCircle,
//   ArrowRight,
//   Play,
//   Pause,
//   Menu,
//   X,
//   Mail,
//   Phone,
//   Users,
//   Linkedin,
//   Github,
//   Twitter,
// } from "lucide-react"

// const AISecurityWebsite = () => {
//   const [isPlaying, setIsPlaying] = useState(true)
//   const [activeModule, setActiveModule] = useState(0)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")
//   const [scrollY, setScrollY] = useState(0)
//   const [clickedElement, setClickedElement] = useState(null)

//   // Handle scroll for parallax effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Auto-cycle through modules
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule((prev) => (prev + 1) % 4)
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [])

//   // Handle scroll for active section
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["home", "modules", "goals", "team", "location", "contact"]
//       const scrollPosition = window.scrollY + 100

//       for (const section of sections) {
//         const element = document.getElementById(section)
//         if (element) {
//           const { offsetTop, offsetHeight } = element
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             setActiveSection(section)
//             break
//           }
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//     setIsMenuOpen(false)
//   }

//   // Flying animation handler
//   const handleFlyingClick = (elementId) => {
//     setClickedElement(elementId)
//     setTimeout(() => setClickedElement(null), 600)
//   }

//   const navItems = [
//     { id: "home", label: "Home" },
//     { id: "modules", label: "Modules" },
//     { id: "goals", label: "Goals" },
//     { id: "team", label: "Team" },
//     { id: "location", label: "Location" },
//     { id: "contact", label: "Contact Us" },
//   ]

//   const modules = [
//     {
//       icon: <Eye className="w-8 h-8" />,
//       title: "Real-Time Detection",
//       description: "Advanced AI algorithms detect suspicious behavior instantly",
//       color: "from-emerald-600 to-green-700",
//     },
//     {
//       icon: <AlertTriangle className="w-8 h-8" />,
//       title: "Instant Alerts",
//       description: "Immediate notifications sent to security personnel",
//       color: "from-green-600 to-emerald-700",
//     },
//     {
//       icon: <BarChart3 className="w-8 h-8" />,
//       title: "Crime Analytics",
//       description: "Comprehensive insights and pattern recognition",
//       color: "from-teal-600 to-green-700",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Seamless Integration",
//       description: "Works with your existing CCTV infrastructure",
//       color: "from-green-700 to-emerald-800",
//     },
//   ]

//   const goals = [
//     "Reduce retail theft by 85% through AI-powered surveillance",
//     "Provide real-time security insights to prevent incidents",
//     "Seamlessly integrate with existing security systems",
//     "Deliver actionable analytics for better security decisions",
//   ]

//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "CEO & Founder",
//       description: "AI security expert with 15+ years in computer vision",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Sarah Chen",
//       role: "CTO",
//       description: "Machine learning specialist and former Google engineer",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Head of Security",
//       description: "Former law enforcement with retail security expertise",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Emily Davis",
//       role: "Lead Developer",
//       description: "Full-stack developer specializing in real-time systems",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
//       {/* Navigation Header */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
//         <div className="max-w-7xl mx-auto px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div
//               className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
//                 clickedElement === "logo" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => handleFlyingClick("logo")}
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                 <Shield className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
//                 SecureAI
//               </span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     handleFlyingClick(`nav-${item.id}`)
//                     scrollToSection(item.id)
//                   }}
//                   className={`text-sm font-medium transition-all duration-300 hover:scale-110 ${
//                     clickedElement === `nav-${item.id}` ? "animate-flyTowards" : ""
//                   } ${activeSection === item.id ? "text-emerald-600 scale-105" : "text-gray-700"}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className={`md:hidden transition-all duration-300 text-gray-700 ${
//                 clickedElement === "menu" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => {
//                 handleFlyingClick("menu")
//                 setIsMenuOpen(!isMenuOpen)
//               }}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden py-4 border-t border-gray-200 animate-slideDown">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     handleFlyingClick(`mobile-nav-${item.id}`)
//                     scrollToSection(item.id)
//                   }}
//                   className={`block w-full text-left py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
//                     clickedElement === `mobile-nav-${item.id}` ? "animate-flyTowards" : ""
//                   } ${activeSection === item.id ? "text-emerald-600" : "text-gray-700"}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section with Video Background */}
//       <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
//         {/* Video Background */}
//         <div className="absolute inset-0 z-0">
//           <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
//             <source
//               src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-city-50063-large.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/80 to-emerald-50/70"></div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 z-10">
//           {/* Animated Grid with Parallax */}
//           <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
//             <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
//               {Array.from({ length: 96 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="border border-emerald-400/40 animate-pulse"
//                   style={{
//                     animationDelay: `${i * 0.05}s`,
//                     animationDuration: "4s",
//                   }}
//                 ></div>
//               ))}
//             </div>
//           </div>

//           {/* Floating Particles with Parallax */}
//           {Array.from({ length: 20 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-emerald-500 rounded-full opacity-20 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${4 + Math.random() * 6}s`,
//                 transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Hero Content */}
//         <div
//           className="relative z-20 text-center max-w-6xl px-8 animate-fadeInUp"
//           style={{ transform: `translateY(${scrollY * 0.2}px)` }}
//         >
//           <div className="mb-8">
//             <div
//               className={`inline-flex items-center gap-2 bg-white/80 border border-emerald-300 rounded-full px-6 py-2 mb-6 backdrop-blur-sm animate-glow cursor-pointer transition-all duration-300 shadow-lg ${
//                 clickedElement === "badge" ? "animate-flyTowards" : "hover:scale-110"
//               }`}
//               onClick={() => handleFlyingClick("badge")}
//             >
//               <Brain className="w-5 h-5 text-emerald-600" />
//               <span className="text-emerald-700 font-medium">AI-Powered Security</span>
//             </div>

//             <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight animate-slideInLeft">
//               <span className="bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
//                 Smart
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent animate-slideInRight">
//                 Surveillance
//               </span>
//             </h1>

//             <p
//               className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
//               style={{ animationDelay: "0.3s" }}
//             >
//               Revolutionary AI agent that transforms your CCTV system into an intelligent security powerhouse, detecting
//               shoplifting in real-time with unprecedented accuracy.
//             </p>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex gap-6 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
//             <button
//               className={`group relative bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 ${
//                 clickedElement === "cta-primary" ? "animate-flyTowards" : "animate-bounce-subtle"
//               }`}
//               onClick={() => handleFlyingClick("cta-primary")}
//             >
//               <span className="flex items-center gap-2 text-white">
//                 Get Started
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
//             </button>

//             <button
//               className={`group border-2 border-gray-400 hover:border-emerald-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-emerald-50 backdrop-blur-sm text-gray-700 hover:text-emerald-700 ${
//                 clickedElement === "cta-secondary" ? "animate-flyTowards" : "hover:scale-105"
//               }`}
//               onClick={() => {
//                 handleFlyingClick("cta-secondary")
//                 setIsPlaying(!isPlaying)
//               }}
//             >
//               <span className="flex items-center gap-2">
//                 <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
//                   {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
//                 </div>
//                 Watch Demo
//               </span>
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
//             {[
//               { value: "99.7%", label: "Detection Accuracy" },
//               { value: "<2s", label: "Response Time" },
//               { value: "24/7", label: "Monitoring" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center group cursor-pointer transition-all duration-300 ${
//                   clickedElement === `stat-${index}` ? "animate-flyTowards" : "hover:scale-110"
//                 }`}
//                 onClick={() => handleFlyingClick(`stat-${index}`)}
//               >
//                 <div className="text-3xl font-bold text-emerald-600 mb-2 group-hover:text-emerald-500">
//                   {stat.value}
//                 </div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
//           <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce mt-2"></div>
//           </div>
//         </div>
//       </section>

//       {/* Product Overview */}
//       <section className="py-20 px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
//               Next-Generation Security
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our vertical AI agent seamlessly integrates with your existing CCTV setup, providing instant alerts and
//               detailed crime analytics through our comprehensive desktop application.
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8 animate-slideInLeft">
//               {[
//                 {
//                   icon: Camera,
//                   title: "Seamless Integration",
//                   desc: "Works with your existing CCTV infrastructure without any hardware changes.",
//                   color: "from-emerald-600 to-green-700",
//                 },
//                 {
//                   icon: Zap,
//                   title: "Real-Time Detection",
//                   desc: "Advanced AI algorithms detect suspicious behavior and shoplifting attempts instantly.",
//                   color: "from-green-600 to-emerald-700",
//                 },
//                 {
//                   icon: BarChart3,
//                   title: "Detailed Analytics",
//                   desc: "Comprehensive crime analytics and insights through our all-in-one desktop application.",
//                   color: "from-teal-600 to-green-700",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
//                     clickedElement === `feature-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                   }`}
//                   onClick={() => handleFlyingClick(`feature-${index}`)}
//                 >
//                   <div
//                     className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50`}
//                   >
//                     <item.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors text-gray-900">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-600">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="relative animate-slideInRight">
//               <div
//                 className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-xl cursor-pointer transition-all duration-300 ${
//                   clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 onClick={() => handleFlyingClick("preview-card")}
//               >
//                 <div className="aspect-video bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 flex items-center justify-center mb-6">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg shadow-emerald-500/30">
//                       <Eye className="w-8 h-8 text-white" />
//                     </div>
//                     <p className="text-emerald-700 font-medium">AI Detection Preview</p>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-600">System Status: Active</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-600">Cameras Connected: 12</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-gray-600">Alerts Today: 3</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modules Section */}
//       <section id="modules" className="py-20 px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
//               Our Modules
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Comprehensive security solutions powered by cutting-edge AI technology
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {modules.map((module, index) => (
//               <div
//                 key={index}
//                 className={`relative group cursor-pointer transition-all duration-500 animate-fadeInUp ${
//                   clickedElement === `module-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 } ${activeModule === index ? "scale-105" : ""}`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onMouseEnter={() => setActiveModule(index)}
//                 onClick={() => handleFlyingClick(`module-${index}`)}
//               >
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity`}
//                 ></div>
//                 <div className="relative bg-white rounded-2xl p-8 border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl">
//                   <div
//                     className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-emerald-500/30`}
//                   >
//                     {module.icon}
//                   </div>
//                   <h3 className="text-2xl font-semibold mb-4 group-hover:text-emerald-600 transition-colors text-gray-900">
//                     {module.title}
//                   </h3>
//                   <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{module.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Goals Section */}
//       <section id="goals" className="py-20 px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
//               Our Goals
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Revolutionizing retail security through intelligent AI solutions
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-8">
//             {goals.map((goal, index) => (
//               <div
//                 key={index}
//                 className={`group flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg animate-slideInUp cursor-pointer ${
//                   clickedElement === `goal-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`goal-${index}`)}
//               >
//                 <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                   <CheckCircle className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors">{goal}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section id="team" className="py-20 px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
//               Our Team
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Meet the experts behind our revolutionary AI security solutions
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className={`group bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 transition-all duration-300 animate-fadeInUp shadow-lg hover:shadow-xl cursor-pointer ${
//                   clickedElement === `team-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`team-${index}`)}
//               >
//                 <div className="aspect-square bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 flex items-center justify-center mb-6 overflow-hidden">
//                   <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                     <Users className="w-8 h-8 text-white" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors text-gray-900">
//                   {member.name}
//                 </h3>
//                 <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
//                 <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
//                   {member.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location Section */}
//       <section id="location" className="py-20 px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
//               Our Location
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Building the future of security from our headquarters
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl animate-slideInUp">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div className="space-y-6">
//                   {[
//                     {
//                       icon: MapPin,
//                       title: "Headquarters",
//                       desc: "Innovation District\nTech Hub Center\nCity, State 12345",
//                       color: "from-emerald-600 to-green-700",
//                     },
//                     {
//                       icon: Target,
//                       title: "Global Reach",
//                       desc: "Serving clients worldwide with 24/7 support and monitoring capabilities",
//                       color: "from-green-600 to-emerald-700",
//                     },
//                   ].map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-start gap-4 group cursor-pointer transition-all duration-300 ${
//                         clickedElement === `location-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                       }`}
//                       onClick={() => handleFlyingClick(`location-${index}`)}
//                     >
//                       <div
//                         className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30`}
//                       >
//                         <item.icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors text-gray-900">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-600 text-lg whitespace-pre-line">{item.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className={`aspect-square bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 flex items-center justify-center cursor-pointer transition-all duration-300 ${
//                     clickedElement === "map" ? "animate-flyTowards" : "hover:scale-105"
//                   }`}
//                   onClick={() => handleFlyingClick("map")}
//                 >
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg shadow-emerald-500/30">
//                       <MapPin className="w-10 h-10 text-white" />
//                     </div>
//                     <p className="text-emerald-700 font-medium text-lg">Interactive Map</p>
//                     <p className="text-gray-600 text-sm mt-2">Click to explore our location</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us Section - Redesigned without form */}
//       <section id="contact" className="py-20 px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-fadeInUp">
//             <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
//               Contact Us
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Ready to revolutionize your security? Get in touch with our team
//             </p>
//           </div>

//           {/* Contact Cards Grid */}
//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             {[
//               {
//                 icon: Mail,
//                 title: "Email Us",
//                 primary: "contact@secureai.com",
//                 secondary: "support@secureai.com",
//                 color: "from-emerald-600 to-green-700",
//               },
//               {
//                 icon: Phone,
//                 title: "Call Us",
//                 primary: "+1 (555) 123-4567",
//                 secondary: "24/7 Support Available",
//                 color: "from-green-600 to-emerald-700",
//               },
//               {
//                 icon: MapPin,
//                 title: "Visit Us",
//                 primary: "Innovation District",
//                 secondary: "Tech Hub Center, City, State 12345",
//                 color: "from-teal-600 to-green-700",
//               },
//             ].map((contact, index) => (
//               <div
//                 key={index}
//                 className={`group bg-white rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer animate-fadeInUp ${
//                   clickedElement === `contact-${index}` ? "animate-flyTowards" : "hover:scale-105"
//                 }`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 onClick={() => handleFlyingClick(`contact-${index}`)}
//               >
//                 <div
//                   className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 mx-auto`}
//                 >
//                   <contact.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="text-center">
//                   <h3 className="text-2xl font-semibold mb-4 group-hover:text-emerald-600 transition-colors text-gray-900">
//                     {contact.title}
//                   </h3>
//                   <p className="text-gray-700 text-lg mb-2">{contact.primary}</p>
//                   <p className="text-gray-500">{contact.secondary}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Social Links Section */}
//           <div className="text-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
//             <h3 className="text-2xl font-semibold mb-6 text-gray-900">Follow Us</h3>
//             <div className="flex justify-center gap-6">
//               {[
//                 { icon: Linkedin, color: "from-emerald-600 to-green-700", name: "linkedin" },
//                 { icon: Github, color: "from-gray-700 to-gray-900", name: "github" },
//                 { icon: Twitter, color: "from-teal-600 to-emerald-700", name: "twitter" },
//               ].map((social, index) => (
//                 <button
//                   key={index}
//                   className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 ${
//                     clickedElement === `social-${social.name}` ? "animate-flyTowards" : "hover:scale-110"
//                   }`}
//                   onClick={() => handleFlyingClick(`social-${social.name}`)}
//                 >
//                   <social.icon className="w-6 h-6 text-white" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
//             <button
//               className={`bg-gradient-to-r from-emerald-600 to-green-700 px-12 py-4 rounded-full font-semibold text-lg hover:from-emerald-500 hover:to-green-600 transition-all duration-300 shadow-2xl shadow-emerald-500/30 text-white ${
//                 clickedElement === "contact-cta" ? "animate-flyTowards" : "hover:scale-105"
//               }`}
//               onClick={() => handleFlyingClick("contact-cta")}
//             >
//               Schedule a Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-8 border-t border-gray-200 bg-gray-50">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
//               SecureAI
//             </h3>
//             <p className="text-gray-600">Revolutionizing retail security through intelligent AI solutions</p>
//           </div>
//           <div className="text-gray-500 text-sm">© 2025 SecureAI. All rights reserved.</div>
//         </div>
//       </footer>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(180deg); }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
//           50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }
//         }
        
//         @keyframes bounce-subtle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-5px); }
//         }
        
//         @keyframes flyTowards {
//           0% { 
//             transform: scale(1) translateZ(0) rotateX(0) rotateY(0);
//             box-shadow: 0 0 0 rgba(16, 185, 129, 0);
//           }
//           50% { 
//             transform: scale(1.2) translateZ(50px) rotateX(-10deg) rotateY(5deg);
//             box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
//           }
//           100% { 
//             transform: scale(1.1) translateZ(30px) rotateX(-5deg) rotateY(2deg);
//             box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
//           }
//         }
        
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-slideInRight {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .animate-slideInUp {
//           animation: slideInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out forwards;
//         }
        
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
        
//         .animate-bounce-subtle {
//           animation: bounce-subtle 2s ease-in-out infinite;
//         }
        
//         .animate-flyTowards {
//           animation: flyTowards 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//         }
        
//         html {
//           scroll-behavior: smooth;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f3f4f6;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #10b981, #059669);
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #059669, #047857);
//         }
//       `}</style>
//     </div>
//   )
// }

// export default AISecurityWebsite









"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  Eye,
  Zap,
  BarChart3,
  MapPin,
  Target,
  Camera,
  AlertTriangle,
  Brain,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Menu,
  X,
  Mail,
  Phone,
  Users,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react"

const AISecurityWebsite = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeModule, setActiveModule] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [clickedElement, setClickedElement] = useState(null)

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
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
      const sections = ["home", "modules", "goals", "team", "location", "contact"]
      const scrollPosition = window.scrollY + 100

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
    { id: "goals", label: "Goals" },
    { id: "team", label: "Team" },
    { id: "location", label: "Location" },
    { id: "contact", label: "Contact Us" },
  ]

  const modules = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-Time Detection",
      description: "Advanced AI algorithms detect suspicious behavior instantly",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Instant Alerts",
      description: "Immediate notifications sent to security personnel",
      color: "from-orange-400 to-red-400",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Crime Analytics",
      description: "Comprehensive insights and pattern recognition",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Works with your existing CCTV infrastructure",
      color: "from-green-400 to-emerald-400",
    },
  ]

  const goals = [
    "Reduce retail theft by 85% through AI-powered surveillance",
    "Provide real-time security insights to prevent incidents",
    "Seamlessly integrate with existing security systems",
    "Deliver actionable analytics for better security decisions",
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                clickedElement === "logo" ? "animate-flyTowards" : "hover:scale-110"
              }`}
              onClick={() => handleFlyingClick("logo")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                SecureAI
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
        {/* Video Background */}
        {/* <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-city-50063-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80"></div>
        </div> */}

        
{/* <div className="absolute inset-0 z-0">
  <video 
    autoPlay 
    muted 
    loop 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover opacity-20"
  >
    <source
      src="/videos/26537-357886155_medium.mp4"// Changed to your video path
      type="video/mp4"
    />
  </video>
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80"></div>
</div>

        
        <div className="absolute inset-0 z-10">
         
          <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-cyan-400/30 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: "4s",
                  }}
                ></div>
              ))}
            </div>
          </div>

          
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
              }}
            ></div>
          ))}
        </div>

       
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
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              Revolutionary AI agent that transforms your CCTV system into an intelligent security powerhouse, detecting
              shoplifting in real-time with unprecedented accuracy.
            </p>
          </div>

          
          <div className="flex gap-6 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
            <button
              className={`group relative bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 ${
                clickedElement === "cta-primary" ? "animate-flyTowards" : "animate-bounce-subtle"
              }`}
              onClick={() => handleFlyingClick("cta-primary")}
            >
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>

            <button
              className={`group border-2 border-slate-500 hover:border-cyan-300 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-cyan-400/10 backdrop-blur-sm ${
                clickedElement === "cta-secondary" ? "animate-flyTowards" : "hover:scale-105"
              }`}
              onClick={() => {
                handleFlyingClick("cta-secondary")
                setIsPlaying(!isPlaying)
              }}
            >
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </div>
                Watch Demo
              </span>
            </button>
          </div>

       
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            {[
              { value: "99.7%", label: "Detection Accuracy" },
              { value: "<2s", label: "Response Time" },
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

       
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-300 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section> */}

<div className="absolute inset-0 z-0">
    <video 
      autoPlay 
      muted 
      loop 
      playsInline 
      className="absolute inset-0 w-full h-full object-cover opacity-20"
    >
      <source
        src="/videos/26537-357886155_medium.mp4"
        type="video/mp4"
      />
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
        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
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
        onClick={() => handleFlyingClick("cta-primary")}
      >
        <span className="flex items-center gap-2">
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>

      <button
        className={`group border-2 border-slate-500 hover:border-cyan-300 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-cyan-400/10 backdrop-blur-sm ${
          clickedElement === "cta-secondary" ? "animate-flyTowards" : "hover:scale-105"
        }`}
        onClick={() => {
          handleFlyingClick("cta-secondary")
          setIsPlaying(!isPlaying)
        }}
      >
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </div>
          Watch Demo
        </span>
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
      {[
        { value: "99.7%", label: "Detection Accuracy" },
        { value: "<2s", label: "Response Time" },
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
      <section className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Next-Generation Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our vertical AI agent seamlessly integrates with your existing CCTV setup, providing instant alerts and
              detailed crime analytics through our comprehensive desktop application.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slideInLeft">
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
                    clickedElement === `feature-${index}` ? "animate-flyTowards" : "hover:scale-105"
                  }`}
                  onClick={() => handleFlyingClick(`feature-${index}`)}
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
            <div className="relative animate-slideInRight">
              <div
                className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl cursor-pointer transition-all duration-300 ${
                  clickedElement === "preview-card" ? "animate-flyTowards" : "hover:scale-105"
                }`}
                onClick={() => handleFlyingClick("preview-card")}
              >
                <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/30 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Eye className="w-8 h-8" />
                    </div>
                    <p className="text-cyan-300 font-medium">AI Detection Preview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">System Status: Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Cameras Connected: 12</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Alerts Today: 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Modules
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive security solutions powered by cutting-edge AI technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 animate-fadeInUp ${
                  clickedElement === `module-${index}` ? "animate-flyTowards" : "hover:scale-105"
                } ${activeModule === index ? "scale-105" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveModule(index)}
                onClick={() => handleFlyingClick(`module-${index}`)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>
                <div className="relative bg-slate-700 rounded-2xl p-8 border border-slate-600 group-hover:border-slate-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}
                  >
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{module.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="py-20 px-8 bg-gradient-to-b from-slate-600 to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Goals
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionizing retail security through intelligent AI solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div
                key={index}
                className={`group flex items-start gap-6 p-6 rounded-2xl bg-slate-700/50 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/70 animate-slideInUp cursor-pointer ${
                  clickedElement === `goal-${index}` ? "animate-flyTowards" : "hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFlyingClick(`goal-${index}`)}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg text-gray-200 group-hover:text-white transition-colors">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
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
                className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 animate-fadeInUp shadow-lg hover:shadow-2xl cursor-pointer ${
                  clickedElement === `team-${index}` ? "animate-flyTowards" : "hover:scale-105"
                }`}
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
      <section id="location" className="py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Our Location
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building the future of security from our headquarters
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl animate-slideInUp">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Headquarters",
                      desc: "Innovation District\nTech Hub Center\nCity, State 12345",
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
                  className={`aspect-square bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/30 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    clickedElement === "map" ? "animate-flyTowards" : "hover:scale-105"
                  }`}
                  onClick={() => handleFlyingClick("map")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <MapPin className="w-10 h-10" />
                    </div>
                    <p className="text-cyan-300 font-medium text-lg">Interactive Map</p>
                    <p className="text-gray-300 text-sm mt-2">Click to explore our location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section - Redesigned without form */}
      <section id="contact" className="py-20 px-8 bg-gradient-to-b from-slate-700 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
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
                primary: "contact@secureai.com",
                secondary: "support@secureai.com",
                color: "from-cyan-400 to-blue-500",
              },
              {
                icon: Phone,
                title: "Call Us",
                primary: "+1 (555) 123-4567",
                secondary: "24/7 Support Available",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                primary: "Innovation District",
                secondary: "Tech Hub Center, City, State 12345",
                color: "from-purple-400 to-pink-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer animate-fadeInUp ${
                  clickedElement === `contact-${index}` ? "animate-flyTowards" : "hover:scale-105"
                }`}
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
          <div className="text-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
            <div className="flex justify-center gap-6">
              {[
                { icon: Linkedin, color: "from-blue-400 to-blue-500", name: "linkedin" },
                { icon: Github, color: "from-gray-600 to-gray-700", name: "github" },
                { icon: Twitter, color: "from-cyan-400 to-blue-400", name: "twitter" },
              ].map((social, index) => (
                <button
                  key={index}
                  className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    clickedElement === `social-${social.name}` ? "animate-flyTowards" : "hover:scale-110"
                  }`}
                  onClick={() => handleFlyingClick(`social-${social.name}`)}
                >
                  <social.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
            <button
              className={`bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-4 rounded-full font-semibold text-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-2xl hover:shadow-cyan-400/25 ${
                clickedElement === "contact-cta" ? "animate-flyTowards" : "hover:scale-105"
              }`}
              onClick={() => handleFlyingClick("contact-cta")}
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-slate-600 bg-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              SecureAI
            </h3>
            <p className="text-gray-300">Revolutionizing retail security through intelligent AI solutions</p>
          </div>
          <div className="text-gray-400 text-sm">© 2025 SecureAI. All rights reserved.</div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.5); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes flyTowards {
          0% { 
            transform: scale(1) translateZ(0) rotateX(0) rotateY(0);
            box-shadow: 0 0 0 rgba(34, 211, 238, 0);
          }
          50% { 
            transform: scale(1.2) translateZ(50px) rotateX(-10deg) rotateY(5deg);
            box-shadow: 0 20px 40px rgba(34, 211, 238, 0.4);
          }
          100% { 
            transform: scale(1.1) translateZ(30px) rotateX(-5deg) rotateY(2deg);
            box-shadow: 0 15px 30px rgba(34, 211, 238, 0.3);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-flyTowards {
          animation: flyTowards 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22d3ee, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #06b6d4, #2563eb);
        }
      `}</style>
    </div>
  )
}

export default AISecurityWebsite













