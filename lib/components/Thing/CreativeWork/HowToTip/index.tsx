import type BaseProps from "../../../../types/index.ts"
import type { HowToTip as HowToTipProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HowToTipProps & BaseProps

export default function HowToTip({
	_type = "HowToTip",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
