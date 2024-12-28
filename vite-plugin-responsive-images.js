import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export default function responsiveImages() {
  return {
    name: "responsive-images",
    async buildStart() {
      const sourceDir = "src/assets";
      const outputDir = "public";

      try {
        const files = await fs.readdir(sourceDir);

        for (const file of files) {
          if (file.match(/\.(jpg|png)$/i)) {
            const inputPath = path.join(sourceDir, file);
            const filename = path.parse(file).name;

            await Promise.all([
              // 2xl screens (1536px+)
              sharp(inputPath)
                .resize(1536, null, { withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(`${outputDir}/${filename}-2xl.webp`),

              // xl screens (1280px)
              sharp(inputPath)
                .resize(1280, null, { withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(`${outputDir}/${filename}-xl.webp`),

              // lg screens (1024px)
              sharp(inputPath)
                .resize(1024, null, { withoutEnlargement: true })
                .webp({ quality: 75 })
                .toFile(`${outputDir}/${filename}-lg.webp`),

              // md screens (768px)
              sharp(inputPath)
                .resize(768, null, { withoutEnlargement: true })
                .webp({ quality: 75 })
                .toFile(`${outputDir}/${filename}-md.webp`),

              // sm screens (640px)
              sharp(inputPath)
                .resize(640, null, { withoutEnlargement: true })
                .webp({ quality: 70 })
                .toFile(`${outputDir}/${filename}-sm.webp`),

              // Fallback JPEG (using lg breakpoint as default)
              sharp(inputPath)
                .resize(1024, null, { withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(`${outputDir}/${filename}.jpg`),
            ]);
          }
        }
      } catch (error) {
        console.error("Error processing images:", error);
      }
    },
  };
}
