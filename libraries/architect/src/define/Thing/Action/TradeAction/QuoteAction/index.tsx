import type BaseProps from "../../../../../../types/index.ts"
import type { QuoteAction as QuoteActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = QuoteActionProps & BaseProps

export default function QuoteAction({
	_type = "QuoteAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
