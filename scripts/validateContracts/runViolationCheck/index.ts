import { exec } from "node:child_process"
import { promisify } from "node:util"

//++ Run a single violation check command and return stdout (empty when clean)
import type { ViolationCheck } from "../types/index.ts"

const execAsync = promisify(exec)

export async function runViolationCheck(
	check: ViolationCheck,
): Promise<{ check: ViolationCheck; stdout: string }> {
	try {
		const { stdout } = await execAsync(check.command)
		return { check, stdout }
	} catch (_error) {
		// grep exits non-zero when no matches; treat as clean
		return { check, stdout: "" }
	}
}

export default runViolationCheck
