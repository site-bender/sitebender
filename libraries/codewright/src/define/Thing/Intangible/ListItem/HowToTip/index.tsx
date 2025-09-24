import type BaseProps from "../../../../../../types/index.ts"
import type { HowToTip as HowToTipProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

// HowToTip adds no properties to the ListItem schema type
export type Props = HowToTipProps & BaseProps

export default function HowToTip({
	_type = "HowToTip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
