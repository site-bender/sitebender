//++ Collection of contract violation checks (pure data)
import type { ViolationCheck } from "../types/index.ts"

// NOTE: Keep ordering stable; output preserves declaration order.
export const VIOLATION_CHECKS: Array<ViolationCheck> = [
	{
		name: "Libraries accessing Parser internals",
		command:
			`grep -r "from ['\\\"].*parser/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || grep -r "from ['\\\"]@sitebender/parser/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Cannot access Parser's internal directory! Use exports only.",
		severity: "error",
	},
	{
		name: "Libraries accessing Envoy internals",
		command:
			`grep -r "from ['\\\"].*envoy/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || grep -r "from ['\\\"]@sitebender/envoy/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Cannot access Envoy's internal directory! Use exports only.",
		severity: "error",
	},
	{
		name: "Libraries accessing Prover internals",
		command:
			`grep -r "from ['\\\"].*prover/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || grep -r "from ['\\\"]@sitebender/prover/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Cannot access Prover's internal directory! Use exports only.",
		severity: "error",
	},
	{
		name: "Libraries accessing Foundry internals",
		command:
			`grep -r "from ['\\\"].*foundry/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || grep -r "from ['\\\"]@sitebender/foundry/internal" libraries/*/src/ libraries/*/exports/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Cannot access Foundry's internal directory! Use exports only.",
		severity: "error",
	},
	{
		name: "Envoy importing TypeScript",
		command:
			`grep -r "from ['\\\"]typescript\\|from ['\\\"]@typescript" libraries/envoy/src/ libraries/envoy/exports/ libraries/envoy/internal/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Envoy is importing TypeScript compiler directly! Must use Parser.",
		severity: "error",
	},
	{
		name: "Envoy reading TS/TSX from filesystem",
		command:
			`grep -r "readFileSync.*\\.tsx\\?\\|readFile.*\\.tsx\\?" libraries/envoy/src/ libraries/envoy/exports/ libraries/envoy/internal/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Envoy is reading TS/TSX files directly! Must consume Parser output instead.",
		severity: "error",
	},
	{
		name: "Envoy using regex to parse TS syntax",
		command:
			`grep -r "new RegExp.*\\\\b\\(function\\|class\\|interface\\|export\\|import\\|type\\)\\\\b" libraries/envoy/src/ libraries/envoy/exports/ libraries/envoy/internal/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Envoy appears to regex-parse TS syntax! Must use Parser AST.",
		severity: "error",
	},
	{
		name: "Envoy importing from Prover",
		command:
			`grep -r "from ['\\\"].*prover" libraries/envoy/src/ libraries/envoy/exports/ libraries/envoy/internal/ 2>/dev/null || true`,
		errorMessage: "❌ CONTRACT VIOLATION: Envoy cannot import from Prover!",
		severity: "error",
	},
	{
		name: "Parser importing from Envoy",
		command:
			`grep -r "from ['\\\"].*envoy" libraries/parser/exports/ libraries/parser/internal/ 2>/dev/null || true`,
		errorMessage: "❌ CONTRACT VIOLATION: Parser cannot import from Envoy!",
		severity: "error",
	},
	{
		name: "Parser importing from Prover",
		command:
			`grep -r "from ['\\\"].*prover" libraries/parser/exports/ libraries/parser/internal/ 2>/dev/null || true`,
		errorMessage: "❌ CONTRACT VIOLATION: Parser cannot import from Prover!",
		severity: "error",
	},
	{
		name: "Prover importing TypeScript",
		command:
			`grep -r "from ['\\\"]typescript\\|from ['\\\"]@typescript" libraries/prover/src/ libraries/prover/exports/ libraries/prover/internal/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Prover cannot import TypeScript! Must use Parser.",
		severity: "error",
	},
	{
		name: "Prover importing from Envoy",
		command:
			`grep -r "from ['\\\"].*envoy" libraries/prover/src/ libraries/prover/exports/ libraries/prover/internal/ 2>/dev/null || true`,
		errorMessage: "❌ CONTRACT VIOLATION: Prover cannot import from Envoy!",
		severity: "error",
	},
	{
		name: "Toolkit importing @sitebender",
		command:
			`grep -r "from ['\\\"]@sitebender" libraries/toolkit/src/ libraries/toolkit/exports/ libraries/toolkit/internal/ 2>/dev/null || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Toolkit cannot import any @sitebender libraries!",
		severity: "error",
	},
	{
		name: "Foundry importing disallowed @sitebender libs",
		command:
			`(grep -r "from ['\\\"]@sitebender" libraries/foundry/src/ libraries/foundry/exports/ libraries/foundry/internal/ 2>/dev/null | grep -v "@sitebender/toolkit") || true`,
		errorMessage:
			"❌ CONTRACT VIOLATION: Foundry can only import @sitebender/toolkit.",
		severity: "error",
	},
]

export default VIOLATION_CHECKS
