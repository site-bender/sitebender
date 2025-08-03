import type BaseProps from "../../../../../types/index.ts"
import type { DryCleaningOrLaundry as DryCleaningOrLaundryProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = DryCleaningOrLaundryProps & BaseProps

export default function DryCleaningOrLaundry({
	_type = "DryCleaningOrLaundry",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
