import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export default function responsiveImages() {
  return {
    name: "responsive-images",
    async buildStart() {
      const sourceDir = "src/assets/responsive-images";
      const outputDir = "public/images";

      try {
        const files = await fs.readdir(sourceDir);

        for (const file of files) {
          if (file.match(/\.(jpg|png)$/i)) {
            const inputPath = path.join(sourceDir, file);
            const filename = path.parse(file).name;
            const extension = path.extname(file);

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

              // Fallback copy original file
              fs.copyFile(inputPath, `${outputDir}/${filename}${extension}`),
            ]);
          }
        }
      } catch (error) {
        console.error("Error processing assets:", error);
      }
    },
  };
}
