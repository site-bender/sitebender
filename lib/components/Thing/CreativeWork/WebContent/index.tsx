import type BaseProps from "../../../../types/index.ts"
import type { WebContent as WebContentProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebContentProps & BaseProps

export default function WebContent({
	_type = "WebContent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
