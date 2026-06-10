import { NextRequest, NextResponse } from "next/server";
import { apiError, handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { parseStringList, projectSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const project = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { images: { orderBy: { order: "asc" } } },
    });

    if (!project) return apiError("Proiectul nu a fost găsit.", "NOT_FOUND", 404);
    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const data = projectSchema.parse({ ...body, technologies: parseStringList(body.technologies) });
    const project = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
