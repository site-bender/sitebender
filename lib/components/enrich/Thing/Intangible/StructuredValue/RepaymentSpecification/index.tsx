import type BaseProps from "../../../../../types/index.ts"
import type { RepaymentSpecification as RepaymentSpecificationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RepaymentSpecificationProps & BaseProps

export default function RepaymentSpecification({
	_type = "RepaymentSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
