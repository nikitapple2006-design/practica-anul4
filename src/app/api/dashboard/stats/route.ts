import { NextResponse } from "next/server";
import { LeadStatus } from "@prisma/client";
import { handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const [projects, services, leads, recentLeads] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.contactLead.count({ where: { status: LeadStatus.NEW } }),
      prisma.contactLead.findMany({ orderBy: { submittedAt: "desc" }, take: 5 }),
    ]);

    return NextResponse.json({ projects, services, newLeads: leads, recentLeads });
  } catch (error) {
    return handleApiError(error);
  }
}
