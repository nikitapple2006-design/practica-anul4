import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[3/2] bg-slate-100">
          <Image src={project.imageUrl} alt={`Imagine pentru proiectul ${project.title}`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-orange-700">
            <span>{project.industry}</span>
            <span aria-hidden>•</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-slate-950">{project.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{tech}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
