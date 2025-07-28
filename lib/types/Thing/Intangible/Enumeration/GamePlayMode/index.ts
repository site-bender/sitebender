import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import GamePlayModeComponent from "../../../../../../components/Thing/Intangible/Enumeration/GamePlayMode/index.tsx"

export interface GamePlayModeProps {
}

type GamePlayMode =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GamePlayModeProps

export default GamePlayMode
