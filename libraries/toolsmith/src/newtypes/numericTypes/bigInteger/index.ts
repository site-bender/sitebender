import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import type { BigInteger } from "../../../types/branded/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import error from "../../../monads/result/error/index.ts"
import isBigInteger from "../../../predicates/isBigInteger/index.ts"

//++ Smart constructor that validates and creates a BigInteger - returns Result with helpful error on failure
export default function bigInteger(
	n: bigint,
): Result<ValidationError, BigInteger> {
	if (isBigInteger(n)) {
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
