import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type GamePlayModeType = "GamePlayMode"

export interface GamePlayModeProps {
	"@type"?: GamePlayModeType
}

type GamePlayMode =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GamePlayModeProps

export default GamePlayMode
