import { Suspense } from "react";
import ResetPasswordClient from "@/app/resetPassword/ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading…</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
