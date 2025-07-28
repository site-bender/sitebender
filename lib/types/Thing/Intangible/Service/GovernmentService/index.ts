import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type Organization from "../../../Organization/index.ts"

import GovernmentServiceComponent from "../../../../../../components/Thing/Intangible/Service/GovernmentService/index.tsx"

export interface GovernmentServiceProps {
	jurisdiction?: AdministrativeArea | Text
	serviceOperator?: Organization
}

type GovernmentService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& GovernmentServiceProps

export default GovernmentService
