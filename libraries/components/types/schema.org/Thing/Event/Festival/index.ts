import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type FestivalType = "Festival"

export interface FestivalProps {
	"@type"?: FestivalType
}

type Festival = Thing & EventProps & FestivalProps

export default Festival
