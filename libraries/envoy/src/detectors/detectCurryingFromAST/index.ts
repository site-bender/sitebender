import type { AstNode } from "../detectMathPropertiesFromAST/types/index.ts"
import type { CurryInfo } from "./types/index.ts"

import countCurryLevels from "./countCurryLevels/index.ts"

//++ Detects if a function is curried by analyzing its AST
export default function detectCurryingFromAST(node: AstNode): CurryInfo {
	const levels = countCurryLevels(node)

	return {
		isCurried: levels > 1,
		levels: levels > 1 ? levels : 0,
	}
}

//++ [PRO] Can detect nested function returns indicating currying
//++ [CON] May miss complex currying patterns or false positive on closures
