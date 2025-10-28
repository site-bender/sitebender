import type BaseProps from "../../../../../../types/index.ts"
import type { FulfillmentTypeEnumeration as FulfillmentTypeEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FulfillmentTypeEnumerationProps & BaseProps

export default function FulfillmentTypeEnumeration({
	_type = "FulfillmentTypeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
