"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  isDestructive = true,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-ivory rounded-xl shadow-2xl overflow-hidden border border-charcoal/5"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-charcoal/10 flex items-center justify-between bg-white/50">
                <div className="flex items-center gap-3">
                  {isDestructive ? (
                    <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-maroon">
                      <AlertTriangle size={20} strokeWidth={1.5} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
                      <AlertTriangle size={20} strokeWidth={1.5} />
                    </div>
                  )}
                  <h3 className="font-display tracking-wide text-xl text-charcoal">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-charcoal/40 hover:text-charcoal transition-colors rounded-full hover:bg-charcoal/5"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                <p className="text-sm text-charcoal/70 leading-relaxed font-light">
                  {message}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 bg-charcoal/5 flex justify-end gap-3 border-t border-charcoal/5">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors hover:bg-charcoal/10 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 rounded-md shadow-lg hover:shadow-xl ${
                    isDestructive 
                      ? "bg-maroon hover:bg-maroon/90 shadow-maroon/20 hover:-translate-y-0.5" 
                      : "bg-gold hover:bg-gold-light shadow-gold/20 hover:-translate-y-0.5"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
