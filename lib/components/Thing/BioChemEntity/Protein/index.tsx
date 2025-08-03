import type BaseProps from "../../../../types/index.ts"
import type { Protein as ProteinProps } from "../../../../types/index.ts"

import BioChemEntity from "../index.tsx"

export type Props = ProteinProps & BaseProps

export default function Protein({
	_type = "Protein",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
