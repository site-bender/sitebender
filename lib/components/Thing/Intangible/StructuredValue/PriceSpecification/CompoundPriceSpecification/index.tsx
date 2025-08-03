import type BaseProps from "../../../../../../types/index.ts"
import type { CompoundPriceSpecification as CompoundPriceSpecificationProps } from "../../../../../../types/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = CompoundPriceSpecificationProps & BaseProps

export default function CompoundPriceSpecification({
	_type = "CompoundPriceSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
