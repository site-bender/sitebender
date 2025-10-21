//++ Private helper that removes dangerous characters from name
export default function _sanitizeName(name: string): string {
	return name.replace(/[<>]/g, "")
}
