import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface GamePlayModeProps {
	"@type"?: "GamePlayMode"}

type GamePlayMode =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GamePlayModeProps

export default GamePlayMode
