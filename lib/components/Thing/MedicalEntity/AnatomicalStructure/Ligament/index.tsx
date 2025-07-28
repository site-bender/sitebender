import type BaseProps from "../../../../../types/index.ts"
import type { LigamentProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Ligament/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = LigamentProps & BaseProps

export default function Ligament({
	_type = "Ligament",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AnatomicalStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
