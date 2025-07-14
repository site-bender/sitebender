import { Text } from "../../../../DataType/index.ts"
import Organization from "../../../Organization/index.ts"
import AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import Service from "../index.ts"

export default interface GovernmentService extends Service {
	/** Indicates a legal jurisdiction, e.g. of some legislation, or where some government service is based. */
	jurisdiction?: AdministrativeArea | Text
	/** The operating organization, if different from the provider.  This enables the representation of services that are provided by an organization, but operated by another organization like a subcontractor. */
	serviceOperator?: Organization
}
