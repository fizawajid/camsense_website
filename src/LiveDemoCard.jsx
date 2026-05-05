import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_URL = "http://32.192.67.161/hls/stream.m3u8";
const RTSP_RAW_URL = "rtsp://174.56.144.149:554/11";  // shown in dashboard
const WS_URL = "ws://32.192.67.161:8765";
// const WS_URL = null;

const ALERT_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

export default function LiveDemoCard() {
  const videoRef = useRef(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState({ persons: 0, cars: 0, timestamp: "", detections: [] });
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const audioRef = useRef(null);
  const wsRef = useRef(null);

  // HLS player
  useEffect(() => {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true });
      hls.loadSource(HLS_URL);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = HLS_URL;
    }
  }, []);

  // WebSocket
  useEffect(() => {
    const connect = () => {
      if (!WS_URL) return;
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setStats(data);
        setHistory(prev => [data, ...prev].slice(0, 30));

        setAlertsEnabled(currentlyEnabled => {
          if (currentlyEnabled && (data.persons > 0 || data.cars > 0)) {
            const id = Date.now();
            const msg = `Detected: ${data.persons} person(s), ${data.cars} car(s)`;

            // Play sound
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }

            // Replace any existing alert with this one
            setAlerts([{ id, msg }]);

            // Clear after 3 seconds
            setTimeout(() => setAlerts([]), 3000);
          } else if (!currentlyEnabled) {
            // Immediately clear any lingering alert when disabled
            setAlerts([]);
          }
          return currentlyEnabled; // don't actually change the state
        });
      };

      ws.onclose = () => setTimeout(connect, 3000); // auto-reconnect
    };
    connect();
    return () => wsRef.current?.close();
  }, [alertsEnabled]);

  const time = stats.timestamp ? new Date(stats.timestamp).toLocaleTimeString() : "--:--:--";

  return (
    <>
      <audio ref={audioRef} src={ALERT_SOUND_URL} preload="auto" />

      {/* Alert toasts */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[999999] pointer-events-none">
        {alerts.map(a => (
          <div key={a.id} className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 animate-slideIn whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block flex-shrink-0"/>
            {a.msg}
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border border-slate-600 shadow-2xl overflow-hidden">
        {/* Live badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"/>
          LIVE
        </div>

        {/* Alert toggle button */}
        <button
          onClick={() => setAlertsEnabled(v => !v)}
          className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
            alertsEnabled
              ? "bg-red-500 border-red-400 text-white"
              : "bg-slate-700 border-slate-500 text-gray-300 hover:border-red-400"
          }`}
        >
          {alertsEnabled ? "🔔 Alerts ON" : "🔕 Alerts OFF"}
        </button>

        {/* Video */}
        <div className="relative cursor-pointer group" onClick={() => setShowDashboard(true)}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-t-2xl bg-black"
            style={{ maxHeight: "320px", objectFit: "cover" }}
          />
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
              Click for details dashboard
            </span>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900/60 text-sm">
          <span className="text-green-400 font-semibold">👤 {stats.persons} persons</span>
          <span className="text-blue-400 font-semibold">🚗 {stats.cars} cars</span>
          <span className="text-gray-400">{time}</span>
        </div>
      </div>

      {/* Dashboard modal */}
      {showDashboard && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowDashboard(false)}>
          <div className="relative bg-slate-800 rounded-2xl border border-slate-600 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Detection Dashboard</h3>
              <div className="flex items-center gap-3">
                <a href={RTSP_RAW_URL} target="_blank" rel="noreferrer"
                  className="text-xs text-cyan-400 border border-cyan-400/40 px-3 py-1 rounded-full hover:bg-cyan-400/10 transition">
                  Open raw feed ↗
                </a>
                <button onClick={() => setShowDashboard(false)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white">✕</button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 p-5">
              {[
                { label: "Persons now", value: stats.persons, color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
                { label: "Cars now", value: stats.cars, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
                { label: "Last update", value: time, color: "text-gray-300", bg: "bg-slate-700/50 border-slate-600" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl border p-4 text-center ${s.bg}`}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Detection list */}
            <div className="px-5 pb-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Current detections</h4>
              {stats.detections.length === 0
                ? <p className="text-gray-500 text-sm">No detections in this frame</p>
                : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {stats.detections.map((d, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                        <span className={d.class === "person" ? "text-green-400" : "text-blue-400"}>
                          {d.class} {d.track_id ? `#${d.track_id}` : ""}
                        </span>
                        <span className="text-gray-400">{(d.confidence * 100).toFixed(0)}% conf</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* History feed */}
            <div className="px-5 py-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Recent activity (last 2 min)</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-400 py-1 border-b border-slate-700/50">
                    <span className="text-gray-500 min-w-[70px]">{new Date(h.timestamp).toLocaleTimeString()}</span>
                    <span className="text-green-400">👤 {h.persons}</span>
                    <span className="text-blue-400">🚗 {h.cars}</span>
                  </div>
                ))}
                {history.length === 0 && <p className="text-gray-500 text-xs">Waiting for data...</p>}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}