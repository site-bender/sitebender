import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { WebContentProps } from "../../../../../types/Thing/CreativeWork/WebContent/index.ts"
import type { HealthTopicContentProps } from "../../../../../types/Thing/CreativeWork/WebContent/HealthTopicContent/index.ts"

import WebContent from "../index.tsx"

export type Props = BaseComponentProps<
	HealthTopicContentProps,
	"HealthTopicContent",
	ExtractLevelProps<ThingProps, CreativeWorkProps, WebContentProps>
>

export default function HealthTopicContent({
	hasHealthAspect,
	schemaType = "HealthTopicContent",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<WebContent
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasHealthAspect,
				...subtypeProperties,
			}}
		/>
	)
}
