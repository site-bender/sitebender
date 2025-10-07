//++ Normalizes UUID to canonical lowercase form per RFC 4122
//++ Converts all hexadecimal letters to lowercase
export default function _normalizeUuid(uuid: string): string {
	return uuid.toLocaleLowerCase()
}
