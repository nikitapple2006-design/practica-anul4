import { NextRequest, NextResponse } from "next/server";
import { handleApiError, rateLimit, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") ?? undefined;
    const service = searchParams.get("service") ?? undefined;
    const leads = await prisma.contactLead.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(service ? { serviceNeeded: service } : {}),
      },
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json(leads);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`lead:${ip}`, 5, 10 * 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const data = leadSchema.parse(body);
    const lead = await prisma.contactLead.create({ data });
    return NextResponse.json({ ok: true, id: lead.id, message: "Solicitarea a fost trimisă. Te vom contacta în curând." }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
