import type BaseProps from "../../../../../types/index.ts"
import type { MolecularEntity as MolecularEntityProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MolecularEntityProps & BaseProps

export default function MolecularEntity({
	_type = "MolecularEntity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
