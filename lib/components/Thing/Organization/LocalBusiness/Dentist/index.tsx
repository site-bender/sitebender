import type BaseProps from "../../../../../types/index.ts"
import type { Dentist as DentistProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = DentistProps & BaseProps

export default function Dentist({
	_type = "Dentist",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
