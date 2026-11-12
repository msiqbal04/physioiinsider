"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, XCircle, Award, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CertificateVerificationPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/certificates/verify/${id}`
        );
        const json = await res.json();
        setData(json);
      } catch {
        setData({ success: false, isValid: false });
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center text-xs text-secondary-text">
        Verifying digital certificate with Physioiinsider registry...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-border-light text-center">
        {data?.isValid ? (
          <>
            <div className="w-16 h-16 rounded-full bg-sage-100 text-forest-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-forest-800 uppercase bg-sage-100 px-3 py-1 rounded-full">
              Authentic Certificate Verified
            </span>
            <h1 className="text-lg font-bold font-serif text-forest-950 mt-4">
              {data.certificate.studentName}
            </h1>
            <p className="text-xs text-secondary-text mt-1">has successfully completed</p>
            <h2 className="text-sm font-bold text-forest-800 mt-1 mb-4">
              {data.certificate.courseTitle}
            </h2>

            <div className="p-3 bg-cream-50 rounded-2xl border border-border-light text-xs text-left space-y-1.5 text-secondary-text">
              <div className="flex justify-between">
                <span>Certificate ID:</span>
                <span className="font-mono font-bold text-forest-950">{data.certificate.certificateId}</span>
              </div>
              <div className="flex justify-between">
                <span>Issued Date:</span>
                <span className="font-medium text-forest-950">
                  {new Date(data.certificate.issuedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-accent-coral/10 text-accent-coral flex items-center justify-center mx-auto mb-4">
              <XCircle size={36} />
            </div>
            <h1 className="text-base font-bold font-serif text-forest-950">Invalid or Unverified Record</h1>
            <p className="text-xs text-secondary-text mt-1">
              Certificate identifier &quot;{id}&quot; does not match any authenticated record in our database.
            </p>
          </>
        )}

        <div className="mt-6 pt-4 border-t border-cream-100">
          <Link href="/" className="text-xs font-semibold text-forest-800 hover:underline">
            Return to Physioiinsider
          </Link>
        </div>
      </div>
    </div>
  );
}