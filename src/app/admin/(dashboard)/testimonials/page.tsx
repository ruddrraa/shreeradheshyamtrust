"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { Testimonial } from "@/types";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function fetchTestimonials() {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function toggleApproval(id: string, currentStatus: boolean) {
    try {
      await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: !currentStatus }),
      });
      fetchTestimonials();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    try {
      await fetch(`/api/testimonials?id=${deleteId}`, {
        method: "DELETE",
      });
      setDeleteId(null);
      fetchTestimonials();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
      
      <AdminHeader
        title="Testimonials Management"
        description="Review, approve, and manage devotee comments before they appear on the website."
      />

      {loading ? (
        <p className="text-sm text-charcoal/50">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <div className="p-8 bg-white border border-charcoal/5 text-center">
          <p className="text-sm text-charcoal/60">No testimonials submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 bg-white border border-charcoal/5 flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-lg text-charcoal">{t.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal/40 bg-charcoal/5 px-2 py-0.5 rounded-sm">
                    {t.role}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1 ${
                      t.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.isApproved ? (
                      <><CheckCircle size={10} /> Approved (Live)</>
                    ) : (
                      <><XCircle size={10} /> Pending Review</>
                    )}
                  </span>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed italic border-l-2 border-gold/30 pl-3">
                  "{t.quote}"
                </p>
                <p className="text-xs text-charcoal/30 mt-3">
                  Submitted: {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-row md:flex-col gap-3 shrink-0">
                <button
                  onClick={() => toggleApproval(t._id, t.isApproved)}
                  className={`px-4 py-2 text-sm transition-colors border ${
                    t.isApproved
                      ? "border-amber-600/20 text-amber-700 hover:bg-amber-50"
                      : "border-green-600/20 text-green-700 hover:bg-green-50"
                  }`}
                >
                  {t.isApproved ? "Unapprove (Hide)" : "Approve (Publish)"}
                </button>
                <button
                  onClick={() => setDeleteId(t._id)}
                  className="px-4 py-2 text-sm border border-red-600/20 text-red-600 hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
