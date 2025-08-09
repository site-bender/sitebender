import head from "../../array/head"
import isDefined from "../../isDefined"
import isUndefined from "../../isUndefined"
import not from "../../predicates/not.js"

const pathOr = (path) => (or) => (source) => {
	if (isUndefined(source) || not(path) || typeof source !== "object") {
		return or
	}

	const segments = Array.isArray(path) ? path : path.split(".")

	const out = source[head(segments)]

	if (isUndefined(out)) {
		return or
	}

	const [, ...tail] = segments

	if (tail.length && isDefined(out) && typeof out !== "object") {
		return or
	}

	return tail.length ? pathOr(tail)(or)(out) : out
}

export default pathOr
