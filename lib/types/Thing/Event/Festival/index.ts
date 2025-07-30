import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface FestivalProps {
	"@type"?: "Festival"}

type Festival = Thing & EventProps & FestivalProps

export default Festival
