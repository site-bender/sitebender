import type BaseProps from "../../../../types/index.ts"
import type { BioChemEntity as BioChemEntityProps } from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = BioChemEntityProps & BaseProps

export default function BioChemEntity({
	_type = "BioChemEntity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
