import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { PersonProps } from "../../../../types/Thing/Person/index.ts"
import type { PatientProps } from "../../../../types/Thing/Person/Patient/index.ts"

import Person from "../index.tsx"

export type Props = BaseComponentProps<
	PatientProps,
	"Patient",
	ExtractLevelProps<ThingProps, PersonProps>
>

export default function Patient({
	diagnosis,
	drug,
	healthCondition,
	schemaType = "Patient",
	subtypeProperties = {},
	...props
}): Props {
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
