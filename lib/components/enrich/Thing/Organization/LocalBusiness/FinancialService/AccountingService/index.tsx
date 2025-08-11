import type BaseProps from "../../../../../../types/index.ts"
import type { AccountingService as AccountingServiceProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AccountingServiceProps & BaseProps

export default function AccountingService({
	_type = "AccountingService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
