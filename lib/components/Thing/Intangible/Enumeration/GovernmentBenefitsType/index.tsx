import type BaseProps from "../../../../../types/index.ts"
import type { GovernmentBenefitsType as GovernmentBenefitsTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = GovernmentBenefitsTypeProps & BaseProps

export default function GovernmentBenefitsType({
	_type = "GovernmentBenefitsType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
