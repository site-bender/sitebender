import replace from "@sitebender/toolsmith/string/replace/index.ts"

//++ Private helper that removes dangerous characters from name
export default function _sanitizeName(name: string): string {
	return replace(/[<>]/g)("")(name)
}
