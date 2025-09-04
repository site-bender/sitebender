#!/usr/bin/env -S deno run --allow-read --allow-write

const root = new URL("../../", import.meta.url).pathname
const includeDirs = [
  "applications/docs",
  "applications/playground",
  "libraries/components",
  "libraries/engine",
  "libraries/toolkit",
  "scripts",
]

const replacements: Array<[string, string]> = [
  ["@sitebender/engine-types/", "@sitebender/engine-types/"],
  ["@sitebender/engine/", "@sitebender/engine/"],
  ["@sitebender/toolkit/", "@sitebender/toolkit/"],
]

function shouldProcess(path: string): boolean {
  return path.endsWith(".ts") || path.endsWith(".tsx")
}

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  for await (const ent of Deno.readDir(dir)) {
    const p = `${dir}/${ent.name}`
    if (ent.isDirectory) await walk(p, out)
    else if (ent.isFile && shouldProcess(p)) out.push(p)
  }
  return out
}

let changed = 0
const walks = includeDirs.map((rel) => walk(`${root}${rel}`))
const fileLists = await Promise.all(walks)
const allFiles: string[] = fileLists.flat()

const ops: Promise<void>[] = []
for (const path of allFiles) {
  ops.push((async () => {
    const text = await Deno.readTextFile(path)
    let out = text
    for (const [from, to] of replacements) out = out.split(from).join(to)
    if (out !== text) {
      await Deno.writeTextFile(path, out)
      changed++
      console.log(`updated: ${path}`)
    }
  })())
}
await Promise.all(ops)
console.log(`done. files changed: ${changed}`)
