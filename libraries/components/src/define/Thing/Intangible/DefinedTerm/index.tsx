import type BaseProps from "../../../../../types/index.ts"
import type { DefinedTerm as DefinedTermProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DefinedTermProps & BaseProps

export default function DefinedTerm({
	_type = "DefinedTerm",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
