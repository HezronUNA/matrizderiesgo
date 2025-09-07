"use client";
import ErrorBoundary from "@/components/error-boundary";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {children}
      </div>
    </ErrorBoundary>
  );
}
