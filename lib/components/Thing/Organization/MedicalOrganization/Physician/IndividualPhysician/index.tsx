import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type IndividualPhysicianProps from "../../../../../../types/Thing/IndividualPhysician/index.ts"
import type PhysicianProps from "../../../../../../types/Thing/Physician/index.ts"

import Physician from "../index.tsx"

export type Props = BaseComponentProps<
	IndividualPhysicianProps,
	"IndividualPhysician",
	ExtractLevelProps<IndividualPhysicianProps, PhysicianProps>
>

export default function IndividualPhysician(
	{
		practicesAt,
		schemaType = "IndividualPhysician",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Physician
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				practicesAt,
				...subtypeProperties,
			}}
		/>
	)
}
