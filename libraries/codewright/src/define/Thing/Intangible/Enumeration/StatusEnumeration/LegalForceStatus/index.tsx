import type BaseProps from "../../../../../../../types/index.ts"
import type { LegalForceStatus as LegalForceStatusProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LegalForceStatusProps & BaseProps

export default function LegalForceStatus({
	_type = "LegalForceStatus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
