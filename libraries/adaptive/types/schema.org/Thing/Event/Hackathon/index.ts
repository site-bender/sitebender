import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type HackathonType = "Hackathon"

export interface HackathonProps {
	"@type"?: HackathonType
}

type Hackathon = Thing & EventProps & HackathonProps

export default Hackathon
