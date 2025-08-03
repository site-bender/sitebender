import type BaseProps from "../../../../../../types/index.ts"
import type { UnitPriceSpecification as UnitPriceSpecificationProps } from "../../../../../../types/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = UnitPriceSpecificationProps & BaseProps

export default function UnitPriceSpecification({
	_type = "UnitPriceSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
