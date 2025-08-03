import type BaseProps from "../../../../../../types/index.ts"
import type { AutoDealer as AutoDealerProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutoDealerProps & BaseProps

export default function AutoDealer({
	_type = "AutoDealer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
