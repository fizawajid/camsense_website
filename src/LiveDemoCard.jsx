import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import { createPortal } from "react-dom";

const HLS_URL = "https://api.camsense.org/hls/stream.m3u8";
const RTSP_RAW_URL = "rtsp://174.56.144.149:554/11";
const WS_URL = "wss://api.camsense.org/ws";
const ALERT_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

export default function LiveDemoCard() {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState({ persons: 0, cars: 0, timestamp: "", detections: [] });
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const audioRef = useRef(null);
  const wsRef = useRef(null);

  // HLS player — card video
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

  // HLS player — modal video
  useEffect(() => {
    if (!showDashboard || !modalVideoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true });
      hls.loadSource(HLS_URL);
      hls.attachMedia(modalVideoRef.current);
      return () => hls.destroy();
    } else if (modalVideoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      modalVideoRef.current.src = HLS_URL;
    }
  }, [showDashboard]);

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
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
            setAlerts([{ id, msg }]);
            setTimeout(() => setAlerts([]), 3000);
          } else if (!currentlyEnabled) {
            setAlerts([]);
          }
          return currentlyEnabled;
        });
      };

      ws.onclose = () => setTimeout(connect, 3000);
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
          <div key={a.id} className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block flex-shrink-0" />
            {a.msg}
          </div>
        ))}
      </div>

      {/* ── COMPACT CARD ── */}
      <div className="relative rounded-2xl border border-[#00d4ff]/20 shadow-2xl shadow-[#00d4ff]/5 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #041428 0%, #020B18 100%)" }}>

        {/* LIVE badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 border border-[#00d4ff]/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
          LIVE
        </div>

        {/* Alerts toggle */}
        <button
          onClick={e => { e.stopPropagation(); setAlertsEnabled(v => !v); }}
          className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold border transition-all backdrop-blur-sm ${
            alertsEnabled
              ? "bg-red-500/80 border-red-400 text-white"
              : "bg-black/60 border-[#00d4ff]/20 text-gray-300 hover:border-[#00d4ff]/50 hover:text-[#00d4ff]"
          }`}
        >
          {alertsEnabled ? "🔔 Alerts ON" : "🔕 Alerts OFF"}
        </button>

        {/* Clickable video */}
        <div className="relative cursor-pointer group" onClick={() => setShowDashboard(true)}>
          <video
            ref={videoRef}
            autoPlay muted playsInline
            className="w-full bg-black"
            style={{ maxHeight: "320px", objectFit: "cover" }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <span className="bg-black/70 text-[#00d4ff] text-sm px-5 py-2.5 rounded-full backdrop-blur-sm border border-[#00d4ff]/30 font-medium">
              Click to open dashboard
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#00d4ff]/10 text-sm font-mono"
          style={{ background: "#010814" }}>
          <span className="text-green-400 font-semibold flex items-center gap-1.5">
            <span>👤</span> {stats.persons} persons
          </span>
          <span className="text-[#00d4ff] font-semibold flex items-center gap-1.5">
            <span>🚗</span> {stats.cars} cars
          </span>
          <span className="text-gray-600">{time}</span>
        </div>
      </div>

      {/* ── FULL DASHBOARD MODAL ── */}
      {showDashboard && createPortal(
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 backdrop-blur-md"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(1,8,20,0.85)" }}
          onClick={() => setShowDashboard(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#00d4ff]/20 shadow-2xl shadow-[#00d4ff]/10 font-mono mx-auto"
            style={{ background: "linear-gradient(160deg, #041428 0%, #020B18 100%)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Subtle top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent" />

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-[#00d4ff]/15 sticky top-0 z-10 backdrop-blur-sm"
              style={{ background: "rgba(1,8,20,0.95)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                <h2 className="text-white text-lg font-semibold tracking-wide">Detection Dashboard</h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={RTSP_RAW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#00d4ff] border border-[#00d4ff]/30 px-3 py-1.5 rounded-full hover:bg-[#00d4ff]/10 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse inline-block" />
                  Open raw feed
                </a>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#00d4ff] border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="grid grid-cols-[200px_1fr]">

              {/* LEFT — Stats sidebar */}
              <div className="border-r border-[#00d4ff]/10 p-5 space-y-4" style={{ background: "rgba(1,8,20,0.6)" }}>

                {/* Persons */}
                <div className="rounded-xl p-4 border border-[#00d4ff]/15 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #071E3D 0%, #041428 100%)" }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
                  <p className="text-[9px] uppercase tracking-widest text-[#00d4ff]/50 mb-2">Persons</p>
                  <p className="text-5xl font-bold text-white mb-3">{stats.persons}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    stats.persons > 0
                      ? "bg-yellow-400/10 text-yellow-300 border border-yellow-400/30"
                      : "bg-green-400/10 text-green-400 border border-green-400/25"
                  }`}>
                    ● {stats.persons > 0 ? "Active" : "Clear"}
                  </span>
                </div>

                {/* Vehicles */}
                <div className="rounded-xl p-4 border border-[#00d4ff]/15 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #071E3D 0%, #041428 100%)" }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
                  <p className="text-[9px] uppercase tracking-widest text-[#00d4ff]/50 mb-2">Vehicles</p>
                  <p className="text-5xl font-bold text-white mb-3">{stats.cars}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    stats.cars > 0
                      ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30"
                      : "bg-green-400/10 text-green-400 border border-green-400/25"
                  }`}>
                    ● {stats.cars > 0 ? "Active" : "Clear"}
                  </span>
                </div>

                {/* Timestamp */}
                <div className="rounded-xl p-4 border border-[#00d4ff]/15 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #071E3D 0%, #041428 100%)" }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
                  <p className="text-[9px] uppercase tracking-widest text-[#00d4ff]/50 mb-2">Updated</p>
                  <p className="text-xl font-bold text-white mb-2">{time}</p>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/25">
                    ● Live
                  </span>
                </div>
              </div>

              {/* RIGHT — Video + tables */}
              <div className="flex flex-col">

                {/* Video */}
                <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
                  {/* Top cyan glow */}
                  <div className="absolute top-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 border border-[#00d4ff]/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                    LIVE
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 text-[10px] text-[#00d4ff]/60 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-[#00d4ff]/10">
                    30 FPS · 1080p
                  </div>
                  <video ref={modalVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                </div>

                {/* Detections table */}
                <div className="border-t border-[#00d4ff]/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white tracking-wide">Detections</h4>
                    <span className="text-xs text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/25 px-2.5 py-0.5 rounded-full font-medium">
                      {stats.detections.length} objects
                    </span>
                  </div>

                  {stats.detections.length === 0 ? (
                    <p className="text-gray-600 text-xs py-2">No detections in this frame</p>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-[#00d4ff]/15">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-[#00d4ff]/50 uppercase tracking-widest text-[10px]"
                            style={{ background: "rgba(1,8,20,0.8)" }}>
                            <th className="text-left px-4 py-2.5 font-medium">ID</th>
                            <th className="text-left px-4 py-2.5 font-medium">Class</th>
                            <th className="text-left px-4 py-2.5 font-medium">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.detections.map((d, i) => {
                            const conf = d.confidence * 100;
                            const barColor = conf >= 80 ? "#22c55e" : conf >= 65 ? "#eab308" : "#ef4444";
                            return (
                              <tr key={i} className="border-t border-[#00d4ff]/8 hover:bg-[#00d4ff]/5 transition-colors">
                                <td className="px-4 py-3 text-gray-600">{String(i + 1).padStart(2, "0")}</td>
                                <td className="px-4 py-3">
                                  <span className={`font-medium ${d.class === "person" ? "text-green-400" : "text-[#00d4ff]"}`}>
                                    {d.class}{d.track_id ? ` #${d.track_id}` : ""}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[#00d4ff]/10" style={{ maxWidth: "120px" }}>
                                      <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${conf}%`, backgroundColor: barColor }}
                                      />
                                    </div>
                                    <span style={{ color: barColor }} className="font-semibold tabular-nums w-8 text-right">
                                      {conf.toFixed(0)}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Activity log */}
                <div className="border-t border-[#00d4ff]/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white tracking-wide">Activity Log</h4>
                    <span className="text-xs text-gray-600">last 2 min</span>
                  </div>
                  <div className="max-h-36 overflow-y-auto">
                    {history.length === 0 ? (
                      <p className="text-gray-700 text-xs py-2">Waiting for data...</p>
                    ) : (
                      history.map((h, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs py-2 border-b border-[#00d4ff]/8 last:border-0">
                          <span className="text-gray-600 tabular-nums min-w-[70px]">
                            {new Date(h.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="text-green-400">👤 {h.persons}</span>
                          <span className="text-[#00d4ff]">🚗 {h.cars}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom glow line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
          </div>
        </div>
      , document.body)}
    </>
  );
}