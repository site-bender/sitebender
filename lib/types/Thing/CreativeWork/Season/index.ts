import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import SeasonComponent from "../../../../../components/Thing/CreativeWork/Season/index.tsx"

export interface SeasonProps {
}

type Season =
	& Thing
	& CreativeWorkProps
	& SeasonProps

export default Season
