import { NextRequest, NextResponse } from "next/server";
import { ProjectStatus } from "@prisma/client";
import { handleApiError, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { parseStringList, projectSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 9), 1), 24);
    const category = searchParams.get("category") ?? undefined;
    const industry = searchParams.get("industry") ?? undefined;
    const technology = searchParams.get("technology") ?? undefined;
    const search = searchParams.get("search") ?? undefined;
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    const where = {
      ...(includeDrafts ? {} : { status: ProjectStatus.PUBLISHED }),
      ...(category ? { category } : {}),
      ...(industry ? { industry } : {}),
      ...(technology ? { technologies: { has: technology } } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { description: { contains: search, mode: "insensitive" as const } },
              { industry: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { images: { orderBy: { order: "asc" } } },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const data = projectSchema.parse({ ...body, technologies: parseStringList(body.technologies) });
    const project = await prisma.project.create({ data });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
