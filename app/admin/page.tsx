import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export default async function AdminPage() {
  const { data: inquiries } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div>
            <div className="text-sm uppercase tracking-[0.4em] text-white/40">
              Velora Internal
            </div>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
                Active Inquiries
              </div>

              <div className="mt-1 text-2xl font-bold">
                {inquiries?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl">
            <div className="text-sm text-white/50">
              Total Leads
            </div>

            <div className="mt-3 text-4xl font-black">
              {inquiries?.length || 0}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl">
            <div className="text-sm text-white/50">
              Dashboard Status
            </div>

            <div className="mt-3 text-2xl font-bold text-emerald-400">
              Online
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl">
            <div className="text-sm text-white/50">
              Backend
            </div>

            <div className="mt-3 text-2xl font-bold">
              Supabase Active
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {inquiries?.map((item: any) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="border-b border-white/10 px-8 py-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <div className="mt-2 text-white/50">
                      {item.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                      {item.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 px-8 py-8 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Company
                  </div>

                  <div className="mt-3 text-lg font-semibold">
                    {item.company || "Not Provided"}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Interested Service
                  </div>

                  <div className="mt-3 text-lg font-semibold">
                    {item.service || "General Inquiry"}
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                  <div className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">
                    Project Details
                  </div>

                  <div className="text-[15px] leading-8 text-white/75">
                    {item.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}