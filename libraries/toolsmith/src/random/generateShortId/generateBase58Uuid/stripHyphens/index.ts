import replaceAll from "../../../../vanilla/string/replaceAll/index.ts"

//++ Removes all hyphens from a UUID string
export default function stripHyphens(uuid: string): string {
	return replaceAll("-")("")(uuid)
}
