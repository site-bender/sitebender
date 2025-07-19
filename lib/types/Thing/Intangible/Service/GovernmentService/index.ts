import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"

export interface GovernmentServiceProps {
	/** Indicates a legal jurisdiction, e.g. of some legislation, or where some government service is based. */
	jurisdiction?: AdministrativeArea | Text
	/** The operating organization, if different from the provider.  This enables the representation of services that are provided by an organization, but operated by another organization like a subcontractor. */
	serviceOperator?: Organization
}

type GovernmentService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& GovernmentServiceProps

export default GovernmentService
