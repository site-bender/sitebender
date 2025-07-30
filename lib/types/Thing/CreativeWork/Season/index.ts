import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface SeasonProps {
	"@type"?: "Season"}

type Season = Thing & CreativeWorkProps & SeasonProps

export default Season
