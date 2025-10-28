import type BaseProps from "../../../../../../../types/index.ts"
import type { AutomatedTeller as AutomatedTellerProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutomatedTellerProps & BaseProps

export default function AutomatedTeller({
	_type = "AutomatedTeller",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
