import type { Match } from "../../types/index.ts"

//++ Predicate: true for non-null Match values
export default function isNonNullMatch(v: Match | null): v is Match {
	return v !== null
}
