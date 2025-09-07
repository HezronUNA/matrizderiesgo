"use client";
import * as Sentry from "@sentry/nextjs";

export default function TestSentry() {
  const enviarExcepcion = async () => {
    Sentry.captureException(new Error("Test: cliente OK"));
    // Fuerza el envío antes de que el navegador cambie de vista
    // (no siempre hace falta, pero ayuda durante pruebas)
    // @ts-ignore
    await Sentry.flush?.(3000);
  };

  const enviarMensaje = async () => {
    Sentry.captureMessage("Test: mensaje de negocio", "warning");
    // @ts-ignore
    await Sentry.flush?.(3000);
  };

  return (
    <div className="p-4 flex gap-3">
      <button onClick={enviarExcepcion} className="px-3 py-2 rounded bg-red-600 text-white">
        Enviar excepción
      </button>
      <button onClick={enviarMensaje} className="px-3 py-2 rounded border">
        Enviar mensaje
      </button>
    </div>
  );
}
