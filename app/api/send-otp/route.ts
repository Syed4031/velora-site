import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { otpStore } from "@/app/lib/otpStore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"VELORA Security" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your VELORA Verification Code",

      html: `
      <div style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;color:#222;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;padding:40px;">

          <div style="text-align:center;margin-bottom:35px;">
            <div style="font-size:36px;font-weight:800;letter-spacing:8px;color:#111;">
              VELORA
            </div>

            <div style="margin-top:10px;font-size:12px;letter-spacing:3px;color:#777;text-transform:uppercase;">
              Premium Website Studio
            </div>
          </div>

          <h1 style="font-size:30px;margin:0 0 16px;color:#111;">
            New Sign-In Verification
          </h1>

          <p style="font-size:16px;line-height:1.7;color:#555;margin:0 0 24px;">
            A new sign-in attempt to your VELORA account was detected.
            Use the verification code below to continue securely.
          </p>

          <div style="background:#0f0f0f;border-radius:20px;padding:28px;text-align:center;margin:35px 0;">
            <div style="font-size:13px;color:#999;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
              One-Time Password
            </div>

            <div style="font-size:46px;font-weight:800;letter-spacing:12px;color:#d4af37;">
              ${otp}
            </div>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;background:#fafafa;border:1px solid #eee;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:16px;color:#777;font-size:14px;">Device</td>
              <td style="padding:16px;font-size:15px;font-weight:600;color:#111;">
                Chrome on Windows
              </td>
            </tr>

            <tr>
              <td style="padding:16px;color:#777;font-size:14px;">Security</td>
              <td style="padding:16px;font-size:15px;font-weight:600;color:#111;">
                Email OTP Verification
              </td>
            </tr>

            <tr>
              <td style="padding:16px;color:#777;font-size:14px;">Expires</td>
              <td style="padding:16px;font-size:15px;font-weight:600;color:#111;">
                5 Minutes
              </td>
            </tr>
          </table>

          <p style="margin-top:30px;font-size:15px;line-height:1.7;color:#555;">
            If this was you, no further action is needed.
            If you did not request this sign-in, ignore this email and secure your account.
          </p>

          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #eee;font-size:13px;color:#888;line-height:1.7;">
            <strong>VELORA Security</strong><br/>
            Premium business websites, portals, dashboards, and digital experiences.
          </div>

        </div>
      </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SEND_OTP_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}