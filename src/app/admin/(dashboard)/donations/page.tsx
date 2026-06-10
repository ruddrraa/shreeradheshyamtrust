"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Donation } from "@/types";

interface DonationData {
  donations: Donation[];
  totalAmount: number;
  byPurpose: { _id: string; total: number; count: number }[];
}

export default function DonationsAdminPage() {
  const [data, setData] = useState<DonationData | null>(null);

  useEffect(() => {
    fetch("/api/donations")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div>
        <AdminHeader title="Donation Management" />
        <p className="text-charcoal/50">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Donation Management"
        description="View donations and analytics"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white border border-charcoal/5">
          <p className="text-xs uppercase tracking-wider text-charcoal/40">
            Total Raised
          </p>
          <p className="mt-2 font-heading text-3xl text-charcoal font-light">
            {formatCurrency(data.totalAmount)}
          </p>
        </div>
        <div className="p-6 bg-white border border-charcoal/5">
          <p className="text-xs uppercase tracking-wider text-charcoal/40">
            Total Donations
          </p>
          <p className="mt-2 font-heading text-3xl text-charcoal font-light">
            {data.donations.length}
          </p>
        </div>
        {data.byPurpose?.slice(0, 2).map((p) => (
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

      <div className="bg-white border border-charcoal/5 overflow-x-auto">
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
            </tr>
          </thead>
          <tbody>
            {data.donations.map((d) => (
              <tr key={d._id} className="border-b border-charcoal/5">
                <td className="p-4 text-charcoal">
                  {d.isAnonymous ? "Anonymous" : d.donorName}
                </td>
                <td className="p-4 text-charcoal font-medium">
                  {formatCurrency(d.amount)}
                </td>
                <td className="p-4 text-charcoal/60 capitalize">
                  {d.purpose.replace("-", " ")}
                </td>
                <td className="p-4 text-charcoal/60">
                  {formatDate(d.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
