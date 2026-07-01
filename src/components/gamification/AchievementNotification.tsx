"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

interface AchievementNotificationProps {
  title: string;
  description: string;
  show: boolean;
  onDismiss?: () => void;
}

export function AchievementNotification({
  title,
  description,
  show,
  onDismiss,
}: AchievementNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onDismiss?.(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="rounded-2xl border border-primary/20 bg-card p-4 shadow-lg flex items-center gap-3">
            <div className="shrink-0 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Award className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">🏆 {title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
