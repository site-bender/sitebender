import type BaseProps from "../../../../../types/index.ts"
import type { OpeningHoursSpecification as OpeningHoursSpecificationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OpeningHoursSpecificationProps & BaseProps

export default function OpeningHoursSpecification({
	_type = "OpeningHoursSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
