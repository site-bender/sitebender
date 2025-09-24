import { bundle } from "jsr:@deno/emit"
import { ensureDir } from "jsr:@std/fs"
import { join, toFileUrl } from "jsr:@std/path"

export default async function bundleHydrate(logger: Logger = defaultLogger) {
  const cwd = Deno.cwd()
  // Use the docs app's standardized hydrate entry
  const entryPath = join(cwd, ".sitebender", "hydrate", "index.ts")
  const outdir = join(cwd, "dist", "scripts", "hydrate")
  try {
    await Deno.stat(entryPath)
  } catch (_e) {
    logger.log("No .sitebender/hydrate/index.ts found; skipping hydrate bundle")
    return "No hydrate entry"
  }

  await ensureDir(outdir)

  // When invoked from applications/docs as CWD, libraries live two levels up
  const libEngineRoot = join(cwd, "..", "..", "libraries", "engine", "src")
  const libEngineTypesRoot = join(cwd, "..", "..", "libraries", "engine", "types")
  const libComponentsRoot = join(cwd, "..", "..", "libraries", "components", "src")
  const importMap: { imports: Record<string, string> } = {
    imports: {
      "@sitebender/engine": toFileUrl(libEngineRoot).href,
      "@sitebender/engine/": toFileUrl(libEngineRoot + "/").href,
      "@sitebender/engine-types/": toFileUrl(libEngineTypesRoot + "/").href,
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
