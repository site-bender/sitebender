import type Thing from "../../../../index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

import { Organization as OrganizationComponent } from "../../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../../components/index.tsx"

export type EndorseActionType = "EndorseAction"

export interface EndorseActionProps {
	"@type"?: EndorseActionType
	endorsee?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type EndorseAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& EndorseActionProps

export default EndorseAction
