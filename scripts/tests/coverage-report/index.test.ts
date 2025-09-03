import { expect } from "@std/expect"
import reportCoverageIgnores from "../../coverage-tools/reportIgnored/index.ts"

Deno.test("coverage reporter finds markers and skips tests/", async () => {
  // Run reporter and capture console output
  const originalLog = console.log
  const lines: string[] = []
  console.log = (msg?: unknown, ...rest: unknown[]) => {
    lines.push(String(msg ?? ""), ...rest.map(String))
  }
  try {
    await reportCoverageIgnores()
  } finally {
    console.log = originalLog
  }

  const output = lines.join("\n")

  // Must include at least one known marker path from toolkit (non-test)
  expect(output.includes("libraries/toolkit")).toBe(true)
  // Must not include any tests/ entries
  const hasTests = /\btests\//.test(output)
  expect(hasTests).toBe(false)
})

Deno.test({
  name: "coverage reporter handles single and block markers with/without reasons",
  sanitizeResources: false,
  sanitizeOps: false,
}, async () => {
  const baseDir = "scripts/.covtest"
  await Deno.mkdir(baseDir, { recursive: true })
  try {
    const fileA = `${baseDir}/single.ts`
    const fileB = `${baseDir}/block.ts`
    const fileC = `${baseDir}/block_no_stop.ts`
    await Deno.writeTextFile(
      fileA,
      [
        "// deno-coverage-ignore: this is fine",
        "export const a = 1",
      ].join("\n"),
    )
    await Deno.writeTextFile(
      fileB,
      [
        "// deno-coverage-ignore-start: temporary workaround",
        "export const b = 2",
        "// deno-coverage-ignore-stop",
      ].join("\n"),
    )
    await Deno.writeTextFile(
      fileC,
      [
        "// deno-coverage-ignore-start",
        "export const c = 3",
        "// missing stop on purpose",
      ].join("\n"),
    )

    const originalLog = console.log
    const lines: string[] = []
    console.log = (msg?: unknown, ...rest: unknown[]) => {
      lines.push(String(msg ?? ""), ...rest.map(String))
    }
    try {
      await reportCoverageIgnores()
    } finally {
      console.log = originalLog
    }

    const output = lines.join("\n")
    expect(output.includes(".covtest/single.ts")).toBe(true)
    expect(output.includes("this is fine")).toBe(true)
    expect(output.includes(".covtest/block.ts")).toBe(true)
    expect(output.includes("temporary workaround")).toBe(true)
    expect(output.includes(".covtest/block_no_stop.ts")).toBe(true)
    // Missing reason should use default hint text
    expect(output.includes("<no reason provided>")).toBe(true)
  } finally {
    // cleanup
    await Deno.remove(baseDir, { recursive: true })
  }
})
