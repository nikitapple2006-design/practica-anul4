import { NextRequest, NextResponse } from "next/server";
import { handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { packageSchema, parseStringList } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const data = packageSchema.parse({
      ...body,
      deliverables: parseStringList(body.deliverables),
      targetIndustries: parseStringList(body.targetIndustries),
    });
    const servicePackage = await prisma.servicePackage.update({ where: { id }, data });
    return NextResponse.json(servicePackage);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    await prisma.servicePackage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
