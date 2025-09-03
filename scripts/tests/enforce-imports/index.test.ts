import { expect } from "@std/expect"
import runAliasGuards from "../../enforceImports/aliasGuards/index.ts"

Deno.test("alias guards allow preferred aliases and flag deep imports", async () => {
  // Point the guard at a tiny synthetic scope: the scripts folder itself
  // It should not flag anything by default
  const noViolations = await runAliasGuards(["scripts"])
  expect(Array.isArray(noViolations)).toBe(true)
  // We can't rely on repo contents to assert zero, but we can assert the shape
  noViolations.forEach(v => {
    expect(typeof v.file).toBe("string")
    expect(typeof v.line).toBe("number")
    expect(typeof v.spec).toBe("string")
    expect(typeof v.hint).toBe("string")
  })

  // Now scan a directory that likely contains deep imports in docs/tests
  // We only check that any violations mention the expected guidance
  const violations = await runAliasGuards(["docs/src", "libraries/components/src"])
  if (violations.length) {
    const hints = violations.map(v => v.hint).join("\n")
    expect(hints.includes("@engineSrc/") || hints.includes("@engineTypes/") || hints.includes("@toolkit/")).toBe(true)
  }
})

Deno.test("alias guards detect deep engine import in synthetic project", async () => {
  const dir = "scripts/.aliastest/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/bad.ts`
    await Deno.writeTextFile(
      file,
      [
        "// bad deep import should be flagged",
        'import x from "libraries/engine/src/rendering/index.ts"',
      ].join("\n"),
    )
    const v = await runAliasGuards(["scripts/.aliastest"])
    // Ensure at least one violation with the expected hint
    expect(v.length >= 1).toBe(true)
    expect(v.map((x) => x.hint).join("\n").includes("@engineSrc/")).toBe(true)
  } finally {
    await Deno.remove("scripts/.aliastest", { recursive: true })
  }
})

Deno.test("alias guards allow alias import without violations", async () => {
  const dir = "scripts/.aliastest2/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/ok.ts`
    await Deno.writeTextFile(
      file,
      'import x from "@engineSrc/rendering/index.ts"\nexport const ok = x',
    )
    const v = await runAliasGuards(["scripts/.aliastest2"])
    expect(v.length).toBe(0)
  } finally {
    await Deno.remove("scripts/.aliastest2", { recursive: true })
  }
})

Deno.test("deep engine import allowed when file is inside engine", async () => {
  const dir = "scripts/.aliastest3/libraries/engine/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/inside.ts`
    await Deno.writeTextFile(
      file,
      'import y from "libraries/engine/src/rendering/index.ts"\nexport const y2 = y',
    )
    const v = await runAliasGuards(["scripts/.aliastest3"])
    expect(v.length).toBe(0)
  } finally {
    await Deno.remove("scripts/.aliastest3", { recursive: true })
  }
})

Deno.test("engine types deep import suggests @engineTypes", async () => {
  const dir = "scripts/.aliastest4/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/bad_types.ts`
    await Deno.writeTextFile(
      file,
      'import t from "libraries/engine/types/someType.ts"\nexport const t2 = t',
    )
    const v = await runAliasGuards(["scripts/.aliastest4"])
    expect(v.some((x) => x.hint.includes("@engineTypes/"))).toBe(true)
  } finally {
    await Deno.remove("scripts/.aliastest4", { recursive: true })
  }
})

Deno.test("toolkit deep import suggests @toolkit", async () => {
  const dir = "scripts/.aliastest5/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/bad_toolkit.ts`
    await Deno.writeTextFile(
      file,
      'import k from "libraries/toolkit/src/helpers/index.ts"\nexport const k2 = k',
    )
    const v = await runAliasGuards(["scripts/.aliastest5"])
    expect(v.some((x) => x.hint.includes("@toolkit/"))).toBe(true)
  } finally {
    await Deno.remove("scripts/.aliastest5", { recursive: true })
  }
})

Deno.test("missing root directory is handled without throwing", async () => {
  const v = await runAliasGuards(["scripts/.does_not_exist_anywhere"])
  expect(Array.isArray(v)).toBe(true)
})

Deno.test("export-from syntax is also scanned for deep paths", async () => {
  const dir = "scripts/.aliastest6/src"
  await Deno.mkdir(dir, { recursive: true })
  try {
    const file = `${dir}/bad_export.ts`
    await Deno.writeTextFile(
      file,
      'export { something } from "libraries/toolkit/src/foo/bar.ts"',
    )
    const v = await runAliasGuards(["scripts/.aliastest6"])
    expect(v.some((x) => x.hint.includes("@toolkit/"))).toBe(true)
  } finally {
    await Deno.remove("scripts/.aliastest6", { recursive: true })
  }
})
