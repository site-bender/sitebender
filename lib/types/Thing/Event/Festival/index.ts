import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import FestivalComponent from "../../../../../components/Thing/Event/Festival/index.tsx"

export interface FestivalProps {
}

type Festival =
	& Thing
	& EventProps
	& FestivalProps

export default Festival
