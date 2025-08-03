import type BaseProps from "../../../../../types/index.ts"
import type { LegalService as LegalServiceProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = LegalServiceProps & BaseProps

export default function LegalService({
	_type = "LegalService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
