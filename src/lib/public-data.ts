import { demoPackages, demoProjects, demoServices } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";

export async function getPublicServices(take?: number) {
  if (!process.env.DATABASE_URL) return take ? demoServices.slice(0, take) : demoServices;

  try {
    return await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" }, ...(take ? { take } : {}) });
  } catch {
    return take ? demoServices.slice(0, take) : demoServices;
  }
}

export async function getPublicPackages() {
  if (!process.env.DATABASE_URL) return demoPackages;

  try {
    return await prisma.servicePackage.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    return demoPackages;
  }
}

export async function getPublicProjects(take?: number) {
  if (!process.env.DATABASE_URL) return take ? demoProjects.slice(0, take) : demoProjects;

  try {
    return await prisma.project.findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, ...(take ? { take } : {}) });
  } catch {
    return take ? demoProjects.slice(0, take) : demoProjects;
  }
}

export async function getPublicProject(id: string) {
  if (!process.env.DATABASE_URL) return demoProjects.find((item) => item.id === id || item.slug === id) ?? null;

  try {
    const project = await prisma.project.findFirst({ where: { OR: [{ id }, { slug: id }] }, include: { images: { orderBy: { order: "asc" } } } });
    return project ?? demoProjects.find((item) => item.id === id || item.slug === id) ?? null;
  } catch {
    return demoProjects.find((item) => item.id === id || item.slug === id) ?? null;
  }
}

export async function getRelatedProjects(projectId: string, industry: string) {
  if (!process.env.DATABASE_URL) return demoProjects.filter((item) => item.industry === industry && item.id !== projectId).slice(0, 3);

  try {
    return await prisma.project.findMany({ where: { status: "PUBLISHED", industry, NOT: { id: projectId } }, take: 3 });
  } catch {
    return demoProjects.filter((item) => item.industry === industry && item.id !== projectId).slice(0, 3);
  }
}
