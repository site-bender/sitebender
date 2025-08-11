import type BaseProps from "../../../../types/index.ts"
import type { ChemicalSubstance as ChemicalSubstanceProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ChemicalSubstanceProps & BaseProps

export default function ChemicalSubstance({
	_type = "ChemicalSubstance",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
