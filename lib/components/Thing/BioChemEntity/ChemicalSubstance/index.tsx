import type BaseProps from "../../../../types/index.ts"
import type { ChemicalSubstance as ChemicalSubstanceProps } from "../../../../types/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = ChemicalSubstanceProps & BaseProps

export default function ChemicalSubstance({
	_type = "ChemicalSubstance",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
