export default function toTitleCase(str) {
	const [head, ...tail] = str.split("")

	return [
		head.toLocaleUpperCase(),
		...tail.map(c => (/[A-Z]/.test(c) ? ` ${c}` : c)),
	].join("")
}
