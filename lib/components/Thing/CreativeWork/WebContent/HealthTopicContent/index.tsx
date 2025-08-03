import type BaseProps from "../../../../../types/index.ts"
import type { HealthTopicContent as HealthTopicContentProps } from "../../../../../types/index.ts"

import WebContent from "../index.tsx"

export type Props = HealthTopicContentProps & BaseProps

export default function HealthTopicContent({
	_type = "HealthTopicContent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
