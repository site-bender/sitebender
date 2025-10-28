import type { Violation } from "./types/index.ts"

/**
 * Enforce repo alias policy for cross-package imports. One function per folder.
 * Helpers live in ./helpers and shared constants in scripts/constants.
 */

import { DEFAULT_ALIAS_SCOPES } from "../../constants/index.ts"
import runCli, { type CliRunArgs } from "../../utilities/cli/runCli/index.ts"
import findViolations from "./helpers/findViolations/index.ts"

export default async function runAliasGuards(
	rootsArg?: string[],
): Promise<Violation[]> {
	const roots = rootsArg?.length ? rootsArg : DEFAULT_ALIAS_SCOPES
	return await findViolations(roots)
}

if (import.meta.main) {
	await runCli({
		name: "alias-guards",
		version: "1.0.0",
		usage:
			"alias-guards [roots...] [--json] [--quiet]\n\nExamples:\n  alias-guards\n  alias-guards libraries/artificer libraries/architect --json",
		booleans: ["json", "quiet"],
		aliases: { q: "quiet", j: "json" },
		onRun: async ({ flags, positional, stderr, stdout }: CliRunArgs) => {
			const roots = positional.length ? positional : DEFAULT_ALIAS_SCOPES
			const violations = await runAliasGuards(roots)
			if (flags.json) {
				stdout(JSON.stringify({ violations }, null, 2))
				return violations.length ? 1 : 0
			}
			if (violations.length) {
				if (!flags.quiet) {
					stderr("Alias policy violations:\n")
					for (const v of violations) {
						stderr(
							`${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`,
						)
					}
					stderr(`\nTotal: ${violations.length} violation(s).`)
				}
				return 1
			}
			if (!flags.quiet) stdout("Alias policy: OK (no violations found).")
			return 0
		},
	})
}
