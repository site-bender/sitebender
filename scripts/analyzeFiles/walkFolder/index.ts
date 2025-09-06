import { join } from "jsr:@std/path"

export default async function* walkFolder(opts: {
	root: string
	dir: string
	exts: readonly string[]
	excludedDirNames: Set<string>
}): AsyncGenerator<string> {
	const base = join(opts.root, opts.dir)
	try {
		for await (const entry of Deno.readDir(base)) {
			const p = join(base, entry.name)
			if (entry.isDirectory) {
				if (opts.excludedDirNames.has(entry.name)) continue
				for await (
					const sub of walkFolder({ ...opts, dir: join(opts.dir, entry.name) })
				) {
					yield sub
				}
			} else if (entry.isFile) {
				if (opts.exts.some((e) => p.endsWith(e))) yield p
			}
		}
	} catch (_) {
		// ignore missing directories
	}
}
