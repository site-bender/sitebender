import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import HackathonComponent from "../../../../../components/Thing/Event/Hackathon/index.tsx"

export interface HackathonProps {
}

type Hackathon =
	& Thing
	& EventProps
	& HackathonProps

export default Hackathon
