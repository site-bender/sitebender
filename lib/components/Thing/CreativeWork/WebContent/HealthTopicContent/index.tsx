import type BaseProps from "../../../../../types/index.ts"
import type HealthTopicContentProps from "../../../../../types/Thing/CreativeWork/WebContent/HealthTopicContent/index.ts"

import WebContent from "../index.tsx"

export type Props = HealthTopicContentProps & BaseProps

export default function HealthTopicContent({
	hasHealthAspect,
	_type = "HealthTopicContent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebContent
			{...props}
			_type={_type}
			subtypeProperties={{
				hasHealthAspect,
				...subtypeProperties,
			}}
		/>
	)
}
