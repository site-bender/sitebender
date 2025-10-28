import map from "@sitebender/toolsmith/array/map/index.ts"
import { expect } from "@std/expect"

import runAliasGuards from "../../enforceImports/aliasGuards/index.ts"

Deno.test("alias guards allow preferred aliases and flag deep imports", async () => {
	// Point the guard at a tiny synthetic scope: the scripts folder itself
	// It should not flag anything by default
	const noViolations = await runAliasGuards(["scripts"])
	expect(Array.isArray(noViolations)).toBe(true)
	// We can't rely on repo contents to assert zero, but we can assert the shape
	type Violation = {
		file: string
		line: number
		spec: string
		hint: string
	}
	map((v: Violation) => {
		expect(typeof v.file).toBe("string")
		expect(typeof v.line).toBe("number")
		expect(typeof v.spec).toBe("string")
		expect(typeof v.hint).toBe("string")
	})(noViolations)

	// Now scan a directory that likely contains deep imports in applications/mission-control/tests
	// We only check that any violations mention the expected guidance
	const violations = await runAliasGuards([
		"applications/mission-control/src",
		"libraries/architect/src",
	])
	if (violations.length) {
		const hints = violations.map((v) => v.hint).join("\n")
		expect(
			hints.includes("@sitebender/artificer/") ||
				hints.includes("@sitebender/artificer-types/") ||
				hints.includes("@sitebender/toolsmith/"),
		).toBe(true)
	}
})

Deno.test("alias guards detect deep artificer import in synthetic project", async () => {
	const dir = "scripts/.aliastest/src"
	await Deno.mkdir(dir, { recursive: true })
	try {
		const file = `${dir}/bad.ts`
		await Deno.writeTextFile(
			file,
			[
				"// bad deep import should be flagged",
				'import x from "libraries/artificer/src/rendering/index.ts"',
			].join("\n"),
		)
		const v = await runAliasGuards(["scripts/.aliastest"])
		// Ensure at least one violation with the expected hint
		expect(v.length >= 1).toBe(true)
		expect(v.map((x) => x.hint).join("\n").includes("@sitebender/artificer/"))
			.toBe(true)
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
			'import x from "@sitebender/artificer/rendering/index.ts"\nexport const ok = x',
		)
		const v = await runAliasGuards(["scripts/.aliastest2"])
		expect(v.length).toBe(0)
	} finally {
		await Deno.remove("scripts/.aliastest2", { recursive: true })
	}
})

Deno.test("deep artificer import allowed when file is inside artificer", async () => {
	const dir = "scripts/.aliastest3/libraries/artificer/src"
	await Deno.mkdir(dir, { recursive: true })
	try {
		const file = `${dir}/inside.ts`
		await Deno.writeTextFile(
			file,
			'import y from "libraries/artificer/src/rendering/index.ts"\nexport const y2 = y',
		)
		const v = await runAliasGuards(["scripts/.aliastest3"])
		expect(v.length).toBe(0)
	} finally {
		await Deno.remove("scripts/.aliastest3", { recursive: true })
	}
})

Deno.test("artificer types deep import suggests @architectTypes", async () => {
	const dir = "scripts/.aliastest4/src"
	await Deno.mkdir(dir, { recursive: true })
	try {
		const file = `${dir}/bad_types.ts`
		await Deno.writeTextFile(
			file,
			'import t from "libraries/artificer/types/someType.ts"\nexport const t2 = t',
		)
		const v = await runAliasGuards(["scripts/.aliastest4"])
		expect(v.some((x) => x.hint.includes("@sitebender/artificer-types/")))
			.toBe(
				true,
			)
	} finally {
		await Deno.remove("scripts/.aliastest4", { recursive: true })
	}
})

Deno.test("toolsmith deep import suggests @toolsmith", async () => {
	const dir = "scripts/.aliastest5/src"
	await Deno.mkdir(dir, { recursive: true })
	try {
		const file = `${dir}/bad_toolsmith.ts`
		await Deno.writeTextFile(
			file,
			'import k from "libraries/toolsmith/src/helpers/index.ts"\nexport const k2 = k',
		)
		const v = await runAliasGuards(["scripts/.aliastest5"])
		expect(v.some((x) => x.hint.includes("@sitebender/toolsmith/"))).toBe(
			true,
		)
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
			'export { something } from "libraries/toolsmith/src/foo/bar.ts"',
		)
		const v = await runAliasGuards(["scripts/.aliastest6"])
		expect(v.some((x) => x.hint.includes("@sitebender/toolsmith/"))).toBe(
			true,
		)
	} finally {
		await Deno.remove("scripts/.aliastest6", { recursive: true })
	}
})
