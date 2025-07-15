import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PhysicianProps from "../../../../../../types/Thing/Physician/index.ts"
import type PhysiciansOfficeProps from "../../../../../../types/Thing/PhysiciansOffice/index.ts"

import Physician from "./index.tsx"

// PhysiciansOffice adds no properties to the Physician schema type
export type Props = BaseComponentProps<
	PhysiciansOfficeProps,
	"PhysiciansOffice",
	ExtractLevelProps<PhysiciansOfficeProps, PhysicianProps>
>

export default function PhysiciansOffice({
	schemaType = "PhysiciansOffice",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Physician
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
