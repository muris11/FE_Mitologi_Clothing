"use client";
import { SectionHeading } from "components/ui/section-heading";
import { OrderStep } from "lib/api/types";
import { useState } from "react";
import { MotionSection } from "components/ui/motion";

export function OrderFlow({ orderSteps = [] }: { orderSteps?: OrderStep[] }) {
  const [activeTab, setActiveTab] = useState<"langsung" | "ecommerce">(
    "langsung",
  );

  if (orderSteps.length === 0) return null;

  const filteredSteps = orderSteps
    .filter(
      (step) =>
        step.type === activeTab || (!step.type && activeTab === "langsung"),
    ) // Fallback for legacy data
    .sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <MotionSection className="bg-slate-50 py-24 sm:py-32 border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 flex flex-col items-center">
          <SectionHeading
            overline="Alur Pemesanan"
            title="Cara Pemesanan"
            subtitle="Pilih metode pemesanan yang sesuai dengan kebutuhan Anda."
            className="items-center"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full flex shadow-sm border border-slate-100">
            <button
              onClick={() => setActiveTab("langsung")}
              className={`px-6 py-2.5 rounded-full font-sans tracking-wide font-bold text-sm transition-all duration-300 ${
                activeTab === "langsung"
                  ? "bg-mitologi-navy text-white shadow-md"
                  : "text-slate-500 hover:text-mitologi-navy hover:bg-slate-50"
              }`}
            >
              Order Langsung
            </button>
            <button
              onClick={() => setActiveTab("ecommerce")}
              className={`px-6 py-2.5 rounded-full font-sans tracking-wide font-bold text-sm transition-all duration-300 ${
                activeTab === "ecommerce"
                  ? "bg-mitologi-navy text-white shadow-md"
                  : "text-slate-500 hover:text-mitologi-navy hover:bg-slate-50"
              }`}
            >
              Via E-Commerce
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="p-8 md:p-12 min-h-[400px] border border-slate-100 rounded-3xl shadow-soft bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100px] -z-10 opacity-50 block" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rounded-tr-[100px] -z-10 opacity-50 block" />

            <div className="space-y-12 relative z-10">
              {/* Vertical Line */}
              <div className="absolute top-6 bottom-6 left-6 md:left-[1.625rem] w-0.5 bg-slate-100 -z-10" />

              {filteredSteps.length > 0 ? (
                filteredSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-6 relative group">
                    {/* Animated line progress overlay */}
                    <div className="absolute top-12 left-6 w-0.5 bg-mitologi-navy h-full -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 scale-y-0 origin-top group-hover:scale-y-100" />

                    <div className="flex-none">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-mitologi-navy border-4 border-white text-mitologi-gold font-sans font-bold text-lg shadow-md z-10 relative transition-transform duration-300 group-hover:scale-110">
                        {String(step.stepNumber).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-auto py-2">
                      <h4 className="text-xl font-sans font-bold text-mitologi-navy mb-2 tracking-tight group-hover:text-mitologi-gold transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-sm font-sans font-medium h-[250px]">
                  <svg
                    className="w-12 h-12 mb-4 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <p>Belum ada langkah pemesanan untuk tipe ini.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
