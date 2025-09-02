import { SECTIONING_ELEMENTS } from "../../constants.ts"

const setLevel = (tag: string) => (level: number) =>
	SECTIONING_ELEMENTS.includes(tag) || tag === "Fragment" ? level + 1 : level

export default setLevel
