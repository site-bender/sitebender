import type BaseProps from "../../../../../types/index.ts"
import type { EmergencyService as EmergencyServiceProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = EmergencyServiceProps & BaseProps

export default function EmergencyService({
	_type = "EmergencyService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
