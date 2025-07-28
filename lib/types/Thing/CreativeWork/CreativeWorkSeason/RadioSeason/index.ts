import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

import RadioSeasonComponent from "../../../../../../components/Thing/CreativeWork/CreativeWorkSeason/RadioSeason/index.tsx"

export interface RadioSeasonProps {
}

type RadioSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& RadioSeasonProps

export default RadioSeason
