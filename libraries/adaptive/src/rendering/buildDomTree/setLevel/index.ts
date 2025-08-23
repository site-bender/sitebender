import { SECTIONING_ELEMENTS } from "../../../constants/index.ts"

const setLevel = (tag) => (level) =>
	SECTIONING_ELEMENTS.includes(tag) || tag === "Fragment" ? level + 1 : level

export default setLevel
