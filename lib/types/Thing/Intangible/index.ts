import type Thing from "../index.ts"

export interface IntangibleProps {
	"@type"?: "Intangible"}

type Intangible = Thing & IntangibleProps

export default Intangible
