#!/usr/bin/env -S deno run -A

import { scaffoldApp } from "../scaffold/mod.ts"

function printHelp() {
	console.log(
		`Sitebender CLI\n\nUsage:\n  sb new <name> [--template docs|the-workshop] [--dir <path>]\n  sb help\n`,
	)
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
		let template: "mission-control" | "the-workshop" | undefined
		let targetDir: string | undefined
		while (args.length) {
			const a = args.shift()!
			if (a === "--template") {
				const t = args.shift()
				if (t === "mission-control" || t === "the-workshop") template = t
				else {
					console.error("--template must be 'docs' or 'the-workshop'")
					Deno.exit(1)
				}
			} else if (a === "--dir") targetDir = args.shift()
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
