import type Thing from "../index.ts"

import IntangibleComponent from "../../../../components/Thing/Intangible/index.tsx"

export interface IntangibleProps {
}

type Intangible =
	& Thing
	& IntangibleProps

export default Intangible
