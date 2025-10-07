import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "@sitebender/architect-types/index.ts"

import Error from "@sitebender/architect/constructors/Error/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type HasRoleOp = { role?: unknown; roles?: unknown }

const toStringArray = (v: unknown): string[] => {
	if (Array.isArray(v)) return v.map((x) => String(x))
	if (typeof v === "string") return [v]
	return []
}

const hasRole = (op?: HasRoleOp): OperationFunction<boolean> =>
(
	_arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const expected = op?.role ? toStringArray(op.role) : toStringArray(op?.roles)
	// No expectation provided -> treat as not authorized
	if (expected.length === 0) {
		return Promise.resolve({
			left: [Error("HasRole")("Authorize")("No role specified.")],
		})
	}
	const user = localValues && (localValues as Record<string, unknown>)["user"]
	const rolesVal = user && (user as Record<string, unknown>)["roles"]
	const roles: string[] = toStringArray(rolesVal)
	const ok = roles.some((r) => expected.includes(r))
	if (ok) return Promise.resolve({ right: true })
	return Promise.resolve({
		left: [
			Error("HasRole")("Authorize")(
				`User lacks required role(s): ${expected.join(", ")}.`,
			),
		],
	})
}

export default hasRole
