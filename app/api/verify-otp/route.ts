import { NextResponse } from "next/server";
import { otpStore } from "@/app/lib/otpStore";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = otpStore.get(email);

  if (!record) {
    return NextResponse.json({ error: "No OTP found" }, { status: 400 });
  }

  if (Date.now() > record.expires) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  if (record.otp !== otp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  otpStore.delete(email);

  return NextResponse.json({ success: true });
}