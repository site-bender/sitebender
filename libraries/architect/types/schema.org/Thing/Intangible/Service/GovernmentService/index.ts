import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

import OrganizationComponent from "../../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import AdministrativeAreaComponent from "../../../../../../../codewright/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type GovernmentServiceType = "GovernmentService"

export interface GovernmentServiceProps {
	"@type"?: GovernmentServiceType
	jurisdiction?:
		| AdministrativeArea
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
	serviceOperator?: Organization | ReturnType<typeof OrganizationComponent>
}

type GovernmentService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& GovernmentServiceProps

export default GovernmentService
