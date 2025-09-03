#!/usr/bin/env -S deno run --allow-run --allow-write --allow-read
import installHooks from "./install/index.ts"

export default installHooks

if (import.meta.main) {
	await installHooks()
}
