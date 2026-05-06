import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("inquiries")
      .insert([
        {
          name,
          email,
          company,
          service,
          message,
        },
      ]);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"VELORA Inquiries" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Website Inquiry",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>New Velora Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Service:</strong> ${service || "Not provided"}</p>

          <div style="margin-top:20px;padding:15px;background:#f5f5f5;border-radius:10px;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("CONTACT_ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}