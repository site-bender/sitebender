import type BaseProps from "../../../../types/index.ts"
import type { PatientProps } from "../../../../types/Thing/Person/Patient/index.ts"

import Person from "../index.tsx"

export type Props = PatientProps & BaseProps

export default function Patient({
	diagnosis,
	drug,
	healthCondition,
	_type = "Patient",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Person
			{...props}
			_type={_type}
			subtypeProperties={{
				diagnosis,
				drug,
				healthCondition,
				...subtypeProperties,
			}}
		/>
	)
}
