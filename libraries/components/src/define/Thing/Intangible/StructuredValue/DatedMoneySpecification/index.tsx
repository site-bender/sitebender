import type BaseProps from "../../../../../../types/index.ts"
import type { DatedMoneySpecification as DatedMoneySpecificationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DatedMoneySpecificationProps & BaseProps

export default function DatedMoneySpecification({
	_type = "DatedMoneySpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
