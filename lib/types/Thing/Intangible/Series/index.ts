import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import SeriesComponent from "../../../../../components/Thing/Intangible/Series/index.tsx"

export interface SeriesProps {
}

type Series =
	& Thing
	& IntangibleProps
	& SeriesProps

export default Series
