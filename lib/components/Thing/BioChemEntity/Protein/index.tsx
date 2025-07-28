import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { BioChemEntityProps } from "../../../../types/Thing/BioChemEntity/index.ts"
import type { ProteinProps } from "../../../../types/Thing/BioChemEntity/Protein/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = BaseComponentProps<
	ProteinProps,
	"Protein",
	ExtractLevelProps<ThingProps, BioChemEntityProps>
>

export default function Protein({
	hasBioPolymerSequence,
	schemaType = "Protein",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<BioChemEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasBioPolymerSequence,
				...subtypeProperties,
			}}
		/>
	)
}
