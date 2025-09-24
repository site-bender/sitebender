import type { ComplexityClass } from "../../types/index.ts"

//++ Derives complexity class from cyclomatic complexity number
export default function deriveComplexity(
	cyclomaticComplexity: number,
): ComplexityClass {
	if (cyclomaticComplexity === 1) return "O(1)"
	if (cyclomaticComplexity <= 3) return "O(log n)"
	if (cyclomaticComplexity <= 5) return "O(n)"
	if (cyclomaticComplexity <= 10) return "O(n log n)"
	if (cyclomaticComplexity <= 20) return "O(n²)"
	if (cyclomaticComplexity <= 50) return "O(2^n)"
	return "O(n!)"
}
