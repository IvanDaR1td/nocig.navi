import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "chrome";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "safari";
  if (userAgent.includes("Firefox")) return "firefox";
  if (userAgent.includes("Edg")) return "edge";
  return "unknown";
};

const fakeOfflineUI = {
  chrome: "哎呀，您已断网。请检查互联网连接。\n(按空格开始游戏)",
  safari: "无法连接到 Internet。\nSafari 无法打开网页。",
  firefox: "服务器未找到。\n请检查网络连接。",
  edge: "Hmmm… 无法访问此页面。\n请检查你的网络连接。",
  unknown: "网络异常，请稍后再试。"
};

const Entry = () => {
  const [step, setStep] = useState<"offline" | "sike" | "redirect">("offline");
  const [browser, setBrowser] = useState("unknown");
  const navigate = useNavigate();

  useEffect(() => {
    const detected = getBrowserName();
    setBrowser(detected);

    const timer = setTimeout(() => setStep("sike"), 2500);
    const secondTimer = setTimeout(() => setStep("redirect"), 4000);
    const redirectTimer = setTimeout(() => navigate("/home"), 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div
        className="max-w-4xl w-full px-6 py-8 font-mono text-cyan-400 select-none whitespace-pre-wrap text-center"
        style={{ fontSize: 'clamp(16px, 4vw, 36px)' }}
      >
        <AnimatePresence mode="wait">
          {step === "offline" && (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              {fakeOfflineUI[browser]}
            </motion.div>
          )}
          {step === "sike" && (
            <motion.div
              key="sike"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-pink-600 dark:text-pink-400 font-bold"
              style={{ fontSize: 'clamp(40px, 10vw, 80px)' }}
            >
              SIKE!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Entry;
