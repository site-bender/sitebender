import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type PatientProps from "../../../../types/Thing/Patient/index.ts"
import type PersonProps from "../../../../types/Thing/Person/index.ts"

import Person from "./index.tsx"

export type Props = BaseComponentProps<
	PatientProps,
	"Patient",
	ExtractLevelProps<PatientProps, PersonProps>
>

export default function Patient(
	{
		diagnosis,
		drug,
		healthCondition,
		schemaType = "Patient",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Person
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				diagnosis,
				drug,
				healthCondition,
				...subtypeProperties,
			}}
		/>
	)
}
