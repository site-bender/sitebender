export default function toTitleCase(str) {
	const [head, ...tail] = str.split("")

	return [head.toLocaleUpperCase(), ...tail].join("")
}
