#!/usr/bin/env -S deno run --allow-read --allow-write

const root = new URL("../../", import.meta.url).pathname
const src = `${root}tools/agent`
const dst = `${root}plugins/vscode`

async function copyDir(from: string, to: string) {
	await Deno.mkdir(to, { recursive: true })
	for await (const ent of Deno.readDir(from)) {
		const a = `${from}/${ent.name}`
		const b = `${to}/${ent.name}`
		if (ent.isDirectory) await copyDir(a, b)
		else if (ent.isFile) await Deno.copyFile(a, b)
	}
}

await copyDir(src, dst)
console.log("migrated tools/agent → plugins/vscode")
