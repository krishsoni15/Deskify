import { NextRequest, NextResponse } from "next/server";
import { generateRequestSchema } from "@/lib/validation";
import { generateProject, getZipFilename } from "@/lib/generator";
import { createZipBuffer } from "@/lib/zip";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const result = generateRequestSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        {
          error: firstError?.message || "Invalid request data",
          details: result.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const config = result.data;

    // Generate project files
    const files = await generateProject(config);

    // Create ZIP
    const zipBuffer = await createZipBuffer(files);
    const filename = getZipFilename(config.name);

    // Return ZIP as download
    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "X-Filename": filename,
        "Content-Length": String(zipBuffer.length),
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during generation." },
      { status: 500 }
    );
  }
}
