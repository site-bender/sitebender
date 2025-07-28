import type BaseProps from "../../../../../types/index.ts"
import type { BoneProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Bone/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BoneProps & BaseProps

export default function Bone({
	_type = "Bone",
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
