import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"

export interface EndorseActionProps {
	endorsee?: Organization | Person
}

type EndorseAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& EndorseActionProps

export default EndorseAction
