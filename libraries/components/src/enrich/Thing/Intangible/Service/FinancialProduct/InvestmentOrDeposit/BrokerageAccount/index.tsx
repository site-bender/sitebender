import type BaseProps from "../../../../../../../types/index.ts"
import type { BrokerageAccount as BrokerageAccountProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = BrokerageAccountProps & BaseProps

export default function BrokerageAccount({
	_type = "BrokerageAccount",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
