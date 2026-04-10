import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-mitologi-navy border-t-transparent"></div>
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
