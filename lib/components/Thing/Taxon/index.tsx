import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type TaxonProps from "../../../types/Thing/Taxon/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	TaxonProps,
	"Taxon",
	ExtractLevelProps<TaxonProps, ThingProps>
>

export default function Taxon(
	{
		childTaxon,
		hasDefinedTerm,
		parentTaxon,
		taxonRank,
		schemaType = "Taxon",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				childTaxon,
				hasDefinedTerm,
				parentTaxon,
				taxonRank,
				...subtypeProperties,
			}}
		/>
	)
}
