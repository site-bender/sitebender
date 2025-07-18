import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BioChemEntityProps from "../../../../types/Thing/BioChemEntity/index.ts"
import type GeneProps from "../../../../types/Thing/Gene/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = BaseComponentProps<
	GeneProps,
	"Gene",
	ExtractLevelProps<GeneProps, BioChemEntityProps>
>

export default function Gene(
	{
		alternativeOf,
		encodesBioChemEntity,
		expressedIn,
		hasBioPolymerSequence,
		schemaType = "Gene",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<BioChemEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				alternativeOf,
				encodesBioChemEntity,
				expressedIn,
				hasBioPolymerSequence,
				...subtypeProperties,
			}}
		/>
	)
}
