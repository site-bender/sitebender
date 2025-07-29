import type BaseProps from "../../../types/index.ts"
import type TaxonProps from "../../../types/Thing/Taxon/index.ts"

import Thing from "../index.tsx"

export type Props = TaxonProps & BaseProps

export default function Taxon({
	childTaxon,
	hasDefinedTerm,
	parentTaxon,
	taxonRank,
	_type = "Taxon",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
			{...props}
			_type={_type}
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
