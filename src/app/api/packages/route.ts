import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { packageSchema, parseStringList } from "@/lib/validators";

export async function GET() {
  try {
    const packages = await prisma.servicePackage.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(packages);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const data = packageSchema.parse({
      ...body,
      deliverables: parseStringList(body.deliverables),
      targetIndustries: parseStringList(body.targetIndustries),
    });
    const servicePackage = await prisma.servicePackage.create({ data });
    return NextResponse.json(servicePackage, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
