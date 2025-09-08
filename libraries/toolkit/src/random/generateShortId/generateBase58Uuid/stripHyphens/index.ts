import replaceAll from "../../../../simple/string/replaceAll/index.ts"

//++ Removes all hyphens from a UUID string
export default function stripHyphens(uuid: string): string {
	return replaceAll("-")("")(uuid)
}

//?? [EXAMPLE] stripHyphens("550e8400-e29b-41d4-a716-446655440000") // "550e8400e29b41d4a716446655440000"
//?? [EXAMPLE] stripHyphens("no-hyphens-here") // "nohyphenshere"
