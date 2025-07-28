import type Thing from "../../../../index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

import OrganizationComponent from "../../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../../components/Thing/Person/index.ts"

export interface EndorseActionProps {
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
