import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Performs logical NOT operation on a value
//++ Negates the truthiness of any value
export default function not(value: Value): boolean {
	//++ [EXCEPTION] ! permitted in Toolsmith for performance - provides not wrapper
	return !value
}
