import type BaseProps from "../../../../../types/index.ts"
import type { BrainStructureProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/BrainStructure/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BrainStructureProps & BaseProps

export default function BrainStructure({
	_type = "BrainStructure",
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
