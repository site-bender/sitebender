import type Thing from "../../../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../../components/index.tsx"

export type DrugLegalStatusType = "DrugLegalStatus"

export interface DrugLegalStatusProps {
	"@type"?: DrugLegalStatusType
	applicableLocation?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
}

type DrugLegalStatus =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DrugLegalStatusProps

export default DrugLegalStatus
