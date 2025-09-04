#!/usr/bin/env -S deno run -A

import { scaffoldApp } from "../scaffold/mod.ts"

function printHelp() {
  console.log(`Sitebender CLI\n\nUsage:\n  sb new <name> [--template docs|playground] [--dir <path>]\n  sb help\n`)
}

if (import.meta.main) {
  const args = [...Deno.args]
  const cmd = args.shift()

  if (!cmd || cmd === "help" || cmd === "-h" || cmd === "--help") {
    printHelp()
    Deno.exit(0)
  }

  if (cmd === "new") {
    const name = args.shift()
    if (!name) {
      console.error("error: name is required")
      Deno.exit(1)
    }
  let template: "docs" | "playground" | undefined
    let targetDir: string | undefined
    while (args.length) {
      const a = args.shift()!
      if (a === "--template") {
        const t = args.shift()
        if (t === "docs" || t === "playground") template = t
        else {
          console.error("--template must be 'docs' or 'playground'")
          Deno.exit(1)
        }
      }
      else if (a === "--dir") targetDir = args.shift()
      else {
        console.error(`Unknown option: ${a}`)
        Deno.exit(1)
      }
    }
    await scaffoldApp({ name, template, targetDir })
    console.log(`✔ Created ${name}`)
    Deno.exit(0)
  }

  console.error(`Unknown command: ${cmd}`)
  printHelp()
  Deno.exit(1)
}
