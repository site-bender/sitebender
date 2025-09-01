import { copy, ensureDir } from "jsr:@std/fs"
import { join } from "jsr:@std/path"

export default async function copyStaticAssets() {
	const staticDir = join(Deno.cwd(), "assets")
	const distDir = join(Deno.cwd(), "dist")

	try {
		await copyStaticAssetsExcludingScripts(staticDir, distDir)
		console.log("📁 Copied static assets")
	} catch (error) {
		console.warn(
			"⚠️ No static assets to copy or copy failed:",
			(error as Error).message,
		)
	}
}

async function copyStaticAssetsExcludingScripts(
	srcDir: string,
	destDir: string,
) {
	try {
		for await (const entry of Deno.readDir(srcDir)) {
			if (entry.name === "scripts") {
				continue
			}

			const srcPath = join(srcDir, entry.name)
			const destPath = join(destDir, entry.name)

			if (entry.isDirectory) {
				await ensureDir(destPath)
				await copyStaticAssetsExcludingScripts(srcPath, destPath)
			} else {
				await ensureDir(destDir)
				await copy(srcPath, destPath, { overwrite: true })
			}
		}
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			return
		}
		throw error
	}
}
