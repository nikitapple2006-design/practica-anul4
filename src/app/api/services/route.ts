import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { parseStringList, serviceSchema } from "@/lib/validators";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(services);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const data = serviceSchema.parse({ ...body, features: parseStringList(body.features) });
    const service = await prisma.service.create({ data });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
