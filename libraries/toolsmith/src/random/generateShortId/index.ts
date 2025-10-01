import generateBase58Uuid from "./generateBase58Uuid/index.ts"

//++ Generates a valid HTML ID attribute with a unique identifier
export default function generateShortId(): string {
	return `_${generateBase58Uuid()}`
}
