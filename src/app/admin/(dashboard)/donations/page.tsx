"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Donation } from "@/types";
import { Trash2, Edit } from "lucide-react";

interface DonationData {
  donations: Donation[];
  totalAmount: number;
  byPurpose: { _id: string; total: number; count: number }[];
}

const emptyData: DonationData = {
  donations: [],
  totalAmount: 0,
  byPurpose: [],
};

const purposes = [
  { value: "gau-seva", label: "Gau Seva" },
  { value: "general", label: "General" },
  { value: "event-sponsorship", label: "Event Sponsorship" },
  { value: "custom", label: "Custom" },
];

export default function DonationsAdminPage() {
  const [data, setData] = useState<DonationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [currency, setCurrency] = useState("INR");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState("");

  // Calculate converted amount
  const numericAmount = Number(amount) || 0;
  const convertedAmount = currency === "INR" ? numericAmount : numericAmount * exchangeRate;

  async function fetchDonations() {
    try {
      const res = await fetch("/api/donations");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load donations");
      }
      setData({
        donations: json.donations ?? [],
        totalAmount: json.totalAmount ?? 0,
        byPurpose: json.byPurpose ?? [],
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load donations");
      if (!data) setData(emptyData);
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    async function fetchRate() {
      if (currency === "INR") {
        setExchangeRate(1);
        setConversionError("");
        return;
      }
      setIsConverting(true);
      setConversionError("");
      try {
        const res = await fetch(`/api/exchange-rate?base=${currency}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setExchangeRate(data.rate);
      } catch (err) {
        setConversionError("Rate unavailable");
        setExchangeRate(1);
      } finally {
        setIsConverting(false);
      }
    }
    fetchRate();
  }, [currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = "/api/donations";
      const method = editingId ? "PUT" : "POST";
      const body = {
        amount: convertedAmount,
        purpose,
        donorName,
        donorEmail,
        isAnonymous,
        currency: "INR",
        originalAmount: currency !== "INR" ? numericAmount : undefined,
        originalCurrency: currency !== "INR" ? currency : undefined,
        ...(editingId && { id: editingId }),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");
      resetForm();
      setMessage(`Donation ${editingId ? "updated" : "logged"} successfully`);
      fetchDonations();
    } catch {
      setMessage(`Failed to ${editingId ? "update" : "log"} donation`);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setAmount("");
    setPurpose("general");
    setDonorName("");
    setDonorEmail("");
    setIsAnonymous(false);
    setCurrency("INR");
    setEditingId(null);
  }

  function handleEdit(donation: Donation) {
    setEditingId(donation._id);
    setAmount(donation.amount.toString());
    setPurpose(donation.purpose);
    setDonorName(donation.donorName);
    setDonorEmail(donation.donorEmail || "");
    setIsAnonymous(donation.isAnonymous || false);
    setCurrency(donation.currency || "INR");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this donation record?")) return;
    await fetch(`/api/donations?id=${id}`, {
      method: "DELETE",
    });
    fetchDonations();
  }

  if (!data) {
    return (
      <div>
        <AdminHeader title="Donation Management" />
        <p className="text-charcoal/50">Loading...</p>
      </div>
    );
  }

  const donations = data.donations ?? [];

  return (
    <div>
      <AdminHeader
        title="Donation Management"
        description="View donations, analytics, and manually log offline donations"
      />

      {error && (
        <p className="mb-6 text-sm text-maroon bg-maroon/5 border border-maroon/15 px-4 py-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white border border-charcoal/5">
          <p className="text-xs uppercase tracking-wider text-charcoal/40">
            Total Raised
          </p>
          <p className="mt-2 font-heading text-3xl text-charcoal font-light">
            {formatCurrency(data.totalAmount ?? 0)}
          </p>
        </div>
        <div className="p-6 bg-white border border-charcoal/5">
          <p className="text-xs uppercase tracking-wider text-charcoal/40">
            Total Donations
          </p>
          <p className="mt-2 font-heading text-3xl text-charcoal font-light">
            {donations.length}
          </p>
        </div>
        {(data.byPurpose ?? []).slice(0, 2).map((p) => (
          <div key={p._id} className="p-6 bg-white border border-charcoal/5">
            <p className="text-xs uppercase tracking-wider text-charcoal/40">
              {p._id.replace("-", " ")}
            </p>
            <p className="mt-2 font-heading text-2xl text-charcoal font-light">
              {formatCurrency(p.total)}
            </p>
            <p className="text-xs text-charcoal/40 mt-1">{p.count} donations</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white border border-charcoal/5 mb-8 space-y-4"
      >
        <h2 className="text-sm font-medium text-charcoal mb-4">
          {editingId ? "Edit Donation Record" : "Log Offline Donation"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Amount
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
            {currency !== "INR" && (
              <div className="mt-1.5 text-[10px] text-charcoal/60">
                {isConverting ? (
                  <span>Fetching live rate...</span>
                ) : conversionError ? (
                  <span className="text-maroon">{conversionError}</span>
                ) : (
                  <span>
                    1 {currency} = ₹{exchangeRate.toFixed(2)} | Total: ₹{convertedAmount.toFixed(2)}
                  </span>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            >
              {purposes.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Donor Name
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Donor Email (optional)
            </label>
            <input
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="accent-charcoal"
              />
              Mark as Anonymous
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {loading ? (editingId ? "Updating..." : "Logging...") : (editingId ? "Update Record" : "Log Donation")}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-sm border border-charcoal/15 text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
        {message && <p className="text-sm text-charcoal/60 mt-2">{message}</p>}
      </form>

      <div className="bg-white border border-charcoal/5 overflow-x-auto">
        {donations.length === 0 ? (
          <p className="p-8 text-center text-charcoal/50 text-sm">
            No donations recorded yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/5 text-left">
                <th className="p-4 text-xs uppercase tracking-wider text-charcoal/40 font-normal">
                  Donor
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-charcoal/40 font-normal">
                  Amount
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-charcoal/40 font-normal">
                  Purpose
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-charcoal/40 font-normal">
                  Date
                </th>
                <th className="p-4 text-xs uppercase tracking-wider text-charcoal/40 font-normal text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id} className="border-b border-charcoal/5 hover:bg-charcoal/[0.02] transition-colors">
                  <td className="p-4 text-charcoal">
                    {d.isAnonymous ? "Anonymous" : d.donorName}
                    {d.donorEmail && !d.isAnonymous && (
                      <span className="block text-xs text-charcoal/50">{d.donorEmail}</span>
                    )}
                  </td>
                  <td className="p-4 text-charcoal font-medium">
                    {formatCurrency(d.amount, "INR")}
                    {d.originalCurrency && d.originalAmount && (
                      <span className="block text-[10px] text-charcoal/50 font-normal mt-0.5">
                        ({d.originalAmount} {d.originalCurrency})
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-charcoal/60 capitalize">
                    {d.purpose.replace("-", " ")}
                  </td>
                  <td className="p-4 text-charcoal/60">
                    {formatDate(d.createdAt)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(d)}
                        className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                        title="Edit donation"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="p-2 text-charcoal/40 hover:text-red-600 transition-colors"
                        title="Delete donation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
