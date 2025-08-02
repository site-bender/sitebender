import type BaseProps from "../../../../types/index.ts"
import type ProteinProps from "../../../../types/Thing/BioChemEntity/Protein/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = ProteinProps & BaseProps

export default function Protein({
	hasBioPolymerSequence,
	_type = "Protein",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BioChemEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				hasBioPolymerSequence,
				...subtypeProperties,
			}}
		>
			{children}
		</BioChemEntity>
	)
}
