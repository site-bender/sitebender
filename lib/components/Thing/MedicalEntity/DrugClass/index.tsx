import type BaseProps from "../../../../types/index.ts"
import type DrugClassProps from "../../../../types/Thing/MedicalEntity/DrugClass/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = DrugClassProps & BaseProps

export default function DrugClass({
	drug,
	_type = "DrugClass",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				drug,
				...subtypeProperties,
			}}
		/>
	)
}
