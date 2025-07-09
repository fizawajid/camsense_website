import React, { useState, useEffect } from 'react';
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
  Pause
} from 'lucide-react';

const AISecurityWebsite = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeModule, setActiveModule] = useState(0);

  // Auto-cycle through modules
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-Time Detection",
      description: "Advanced AI algorithms detect suspicious behavior instantly",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Instant Alerts",
      description: "Immediate notifications sent to security personnel",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Crime Analytics",
      description: "Comprehensive insights and pattern recognition",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Works with your existing CCTV infrastructure",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const goals = [
    "Reduce retail theft by 85% through AI-powered surveillance",
    "Provide real-time security insights to prevent incidents",
    "Seamlessly integrate with existing security systems",
    "Deliver actionable analytics for better security decisions"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Video Background Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div 
                  key={i}
                  className="border border-cyan-500/20 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>
          {/* Floating Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">AI-Powered Security</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Smart
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Surveillance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI agent that transforms your CCTV system into an intelligent 
              security powerhouse, detecting shoplifting in real-time with unprecedented accuracy.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center mb-12">
            <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            
            <button className="group border-2 border-gray-600 hover:border-cyan-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-cyan-400/10">
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </div>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">99.7%</div>
              <div className="text-gray-400">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">&lt;2s</div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-gray-400">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Next-Generation Security
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our vertical AI agent seamlessly integrates with your existing CCTV setup, 
              providing instant alerts and detailed crime analytics through our comprehensive desktop application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Seamless Integration</h3>
                  <p className="text-gray-400">Works with your existing CCTV infrastructure without any hardware changes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Real-Time Detection</h3>
                  <p className="text-gray-400">Advanced AI algorithms detect suspicious behavior and shoplifting attempts instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Detailed Analytics</h3>
                  <p className="text-gray-400">Comprehensive crime analytics and insights through our all-in-one desktop application.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/20 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8" />
                    </div>
                    <p className="text-cyan-400 font-medium">AI Detection Preview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">System Status: Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Cameras Connected: 12</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Alerts Today: 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Modules
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive security solutions powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeModule === index ? 'scale-105' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveModule(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 group-hover:border-gray-600 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {module.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Revolutionizing retail security through intelligent AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="group flex items-start gap-6 p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/70"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg text-gray-300 group-hover:text-white transition-colors">
                    {goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Location
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Building the future of security from our headquarters
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Headquarters</h3>
                      <p className="text-gray-400 text-lg">
                        Innovation District<br />
                        Tech Hub Center<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Global Reach</h3>
                      <p className="text-gray-400 text-lg">
                        Serving clients worldwide with 24/7 support and monitoring capabilities
                      </p>
                    </div>
                  </div>
                </div>

                <div className="aspect-square bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10" />
                    </div>
                    <p className="text-cyan-400 font-medium text-lg">Interactive Map</p>
                    <p className="text-gray-400 text-sm mt-2">Click to explore our location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SecureAI
            </h3>
            <p className="text-gray-400">
              Revolutionizing retail security through intelligent AI solutions
            </p>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 SecureAI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AISecurityWebsite;

