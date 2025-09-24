import validActions from "../validActions/index.ts"

export default function isValidAction(action: string): boolean {
	return validActions.has(action)
}
