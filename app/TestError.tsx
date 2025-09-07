'use client';

import * as Sentry from "@sentry/nextjs";

export default function TestError() {
  return (
    <button
      onClick={() => {
        throw new Error("💥 Error de prueba para Sentry!");
      }}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Disparar error
    </button>
  );
}
