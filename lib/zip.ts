import JSZip from "jszip";
import type { GeneratedFile } from "@/lib/generator";

export async function createZipBuffer(files: GeneratedFile[]): Promise<Buffer> {
  const zip = new JSZip();

  for (const file of files) {
    const isScript =
      file.path.endsWith(".sh") ||
      file.path.endsWith(".command") ||
      file.path.endsWith(".desktop");

    const options: JSZip.JSZipFileOptions = isScript
      ? { unixPermissions: 0o755 }
      : { unixPermissions: 0o644 };

    if (Buffer.isBuffer(file.content)) {
      zip.file(file.path, file.content, { binary: true, ...options });
    } else {
      zip.file(file.path, file.content, options);
    }
  }

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    platform: "UNIX",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return buffer;
}

