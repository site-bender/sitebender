import type BaseProps from "../../../../types/index.ts"
import type LifestyleModificationProps from "../../../../types/Thing/MedicalEntity/LifestyleModification/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = LifestyleModificationProps & BaseProps

export default function LifestyleModification({
	_type = "LifestyleModification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MedicalEntity>
	)
}
