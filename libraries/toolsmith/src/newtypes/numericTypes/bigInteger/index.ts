import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isBigInteger from "./_isBigInteger/index.ts"

//++ Smart constructor that validates and creates a BigInteger - returns Result with helpful error on failure
export default function bigInteger(
	n: bigint,
): Result<ValidationError, BigInteger> {
	if (_isBigInteger(n)) {
		return ok(n as BigInteger)
	}

	return error({
		code: "BIGINTEGER_NOT_BIGINT",
		field: "bigInteger",
		messages: ["The system needs a bigint value."],
		received: n,
		expected: "BigInt",
		suggestion: "Use a bigint literal like 123n or BigInt(123)",
		severity: "requirement",
	})
}
