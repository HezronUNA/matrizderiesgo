// app/api/sentry-test/route.ts
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export function GET() {
  try {
    throw new Error("Sentry Test Error");
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
