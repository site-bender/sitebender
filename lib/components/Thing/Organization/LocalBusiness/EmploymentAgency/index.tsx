import type BaseProps from "../../../../../types/index.ts"
import type { EmploymentAgency as EmploymentAgencyProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = EmploymentAgencyProps & BaseProps

export default function EmploymentAgency({
	_type = "EmploymentAgency",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
