import { ENGINE_SRC, ENGINE_TYPES, TOOLKIT_SRC } from "../../../../constants/index.ts"
import type { Violation } from "../../types.ts"

const importPattern = /(import|export)\s+[^;]*?from\s+["']([^"']+)["']/g

function isInside(file: string, pkgDir: string): boolean {
  return file.includes(`/${pkgDir}/`)
}

async function* globWalk(root: string): AsyncGenerator<string> {
  for await (const entry of Deno.readDir(root)) {
    const full = `${root}/${entry.name}`
    if (entry.isDirectory) {
      yield* globWalk(full)
    } else if (entry.isFile && /\.(ts|tsx)$/.test(entry.name)) {
      yield full
    }
  }
}

export default async function findViolations(roots: string[]): Promise<Violation[]> {
  const violations: Violation[] = []
  for (const root of roots) {
    try {
      for await (const file of globWalk(root)) {
        const text = await Deno.readTextFile(file)
        const lines = text.split(/\r?\n/)
        lines.forEach((line, idx) => {
          let m: RegExpExecArray | null
          importPattern.lastIndex = 0
          while ((m = importPattern.exec(line))) {
            const spec = m[2]
            // Skip desired alias imports
            if (
              spec.startsWith("@engineSrc/") ||
              spec.startsWith("@engineTypes/") ||
              spec.startsWith("@toolkit/")
            ) {
              continue
            }

            // If this file is NOT inside engine/, disallow deep engine paths
            if (!isInside(file, "libraries/engine")) {
              if (spec.includes(ENGINE_SRC)) {
                violations.push({
                  file,
                  line: idx + 1,
                  spec,
                  hint: "Use @engineSrc/… instead of libraries/engine/src/…",
                })
              }
              if (spec.includes(ENGINE_TYPES)) {
                violations.push({
                  file,
                  line: idx + 1,
                  spec,
                  hint: "Use @engineTypes/… instead of libraries/engine/types/…",
                })
              }
            }

            // If this file is NOT inside toolkit/, disallow deep toolkit paths
            if (!isInside(file, "libraries/toolkit")) {
              if (spec.includes(TOOLKIT_SRC)) {
                violations.push({
                  file,
                  line: idx + 1,
                  spec,
                  hint: "Use @toolkit/… instead of libraries/toolkit/src/…",
                })
              }
            }
          }
        })
      }
    } catch (err) {
      // Non-fatal: missing scope directory
      if (!(err instanceof Deno.errors.NotFound)) throw err
    }
  }
  return violations
}
