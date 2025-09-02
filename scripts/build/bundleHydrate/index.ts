import { bundle } from "jsr:@deno/emit"
import { ensureDir } from "jsr:@std/fs"
import { join, toFileUrl } from "jsr:@std/path"

export default async function bundleHydrate(logger: Logger = defaultLogger) {
  const cwd = Deno.cwd()
  const entryPath = join(cwd, "src", "hydrate", "adaptive.ts")
  const outdir = join(cwd, "dist", "scripts", "hydrate")
  try {
    await Deno.stat(entryPath)
  } catch (_e) {
    logger.log("No src/hydrate/adaptive.ts found; skipping hydrate bundle")
    return "No hydrate entry"
  }

  await ensureDir(outdir)

  const libAdaptiveRoot = join(cwd, "..", "libraries", "adaptive", "src")
  const libAdaptiveTypesRoot = join(cwd, "..", "libraries", "adaptive", "types")
  const libComponentsRoot = join(cwd, "..", "libraries", "components", "src")
  const importMap = {
    imports: {
      "@sitebender/adaptive": toFileUrl(libAdaptiveRoot).href,
      "@sitebender/adaptive/": toFileUrl(libAdaptiveRoot + "/").href,
      "@adaptiveSrc/": toFileUrl(libAdaptiveRoot + "/").href,
      "@adaptiveTypes/": toFileUrl(libAdaptiveTypesRoot + "/").href,
      "@sitebender/components": toFileUrl(join(libComponentsRoot, "index.ts")).href,
      "@sitebender/components/": toFileUrl(libComponentsRoot + "/").href,
    },
  }

  logger.log("🧩 Bundling hydrate client...")
  const result = await bundle(toFileUrl(entryPath).href, { importMap })
  await Deno.writeTextFile(join(outdir, "adaptive.js"), result.code)
  logger.log("✅ Hydrate client bundled")
  return "Bundled hydrate"
}

export type Logger = {
  log: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}

const defaultLogger: Logger = {
  log: console.log,
  warn: console.warn,
  error: console.error,
}

if (import.meta.main) {
  await bundleHydrate()
}
