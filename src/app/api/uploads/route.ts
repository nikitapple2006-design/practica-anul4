import { mkdir, unlink } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { apiError, handleApiError, requireAdmin } from "@/lib/api";

const allowedTypes = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/webp", "webp"],
]);

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const altText = String(formData.get("altText") ?? "").trim();

    if (!(file instanceof File)) return apiError("Fișierul este obligatoriu.", "VALIDATION_ERROR", 400);
    if (!altText) return apiError("Textul alternativ este obligatoriu.", "VALIDATION_ERROR", 400);
    if (!allowedTypes.has(file.type)) return apiError("Sunt acceptate doar imagini PNG, JPG, JPEG sau WebP.", "VALIDATION_ERROR", 400);
    if (file.size > 5 * 1024 * 1024) return apiError("Imaginea nu poate depăși 5MB.", "VALIDATION_ERROR", 400);

    const ext = allowedTypes.get(file.type) ?? "jpg";
    const buffer = Buffer.from(await file.arrayBuffer());
    const baseName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/\.[^.]+$/, "")}`;
    const uploadRoot = path.join(process.cwd(), process.env.UPLOAD_DIR ?? "public/uploads");
    await mkdir(uploadRoot, { recursive: true });

    const variants = [
      { name: "original", width: 1600, height: 1066 },
      { name: "thumb", width: 300, height: 200 },
      { name: "card", width: 600, height: 400 },
      { name: "full", width: 1200, height: 800 },
    ];

    const files = await Promise.all(
      variants.map(async (variant) => {
        const filename = `${baseName}-${variant.name}.${ext}`;
        const target = path.join(uploadRoot, filename);
        await sharp(buffer)
          .resize(variant.width, variant.height, { fit: "cover", withoutEnlargement: true })
          .toFormat(ext === "png" ? "png" : ext === "webp" ? "webp" : "jpeg", { quality: 82 })
          .toFile(target);
        return { variant: variant.name, url: `/uploads/${filename}`, width: variant.width, height: variant.height };
      }),
    );

    return NextResponse.json({ altText, size: file.size, originalName: file.name, files }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { url } = await request.json();
    if (typeof url !== "string" || !url.startsWith("/uploads/")) {
      return apiError("Calea fișierului nu este validă.", "VALIDATION_ERROR", 400);
    }

    await unlink(path.join(process.cwd(), "public", url)).catch(() => undefined);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
