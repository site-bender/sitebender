import type Thing from "../index.ts"

export interface IntangibleProps {
}

type Intangible =
	& Thing
	& IntangibleProps

export default Intangible
