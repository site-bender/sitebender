import not from "../../predicates/not/index.js"

const toCamelCase = (s) => {
	if (not(s)) {
		return ""
	}

	const [[h, ...t], ...rest] = s.split(" ").map((word) => {
		const [h, ...t] = word.replace(/\W/g, "").split("")

		return [h.toLocaleUpperCase(), ...t].join("")
	})

	return [h.toLocaleLowerCase(), ...t, ...rest].join("")
}

export default toCamelCase
