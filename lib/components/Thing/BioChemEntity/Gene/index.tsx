import type BaseProps from "../../../../types/index.ts"
import type GeneProps from "../../../../types/Thing/BioChemEntity/Gene/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = GeneProps & BaseProps

export default function Gene({
	alternativeOf,
	encodesBioChemEntity,
	expressedIn,
	hasBioPolymerSequence,
	_type = "Gene",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<BioChemEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				alternativeOf,
				encodesBioChemEntity,
				expressedIn,
				hasBioPolymerSequence,
				...subtypeProperties,
			}}
		>
			{children}
		</BioChemEntity>
	)
}
