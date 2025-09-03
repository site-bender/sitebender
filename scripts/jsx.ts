#!/usr/bin/env -S deno run -A
import demoJsxToIr from "./jsx/index.ts"

export default demoJsxToIr

if (import.meta.main) {
	await demoJsxToIr()
}
