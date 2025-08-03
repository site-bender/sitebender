import type BaseProps from "../../../../../types/index.ts"
import type { LegalValueLevel as LegalValueLevelProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = LegalValueLevelProps & BaseProps

export default function LegalValueLevel({
	_type = "LegalValueLevel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
