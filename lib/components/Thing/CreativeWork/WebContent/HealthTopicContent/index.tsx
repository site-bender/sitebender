import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HealthTopicContentProps from "../../../../../types/Thing/HealthTopicContent/index.ts"
import type WebContentProps from "../../../../../types/Thing/WebContent/index.ts"

import WebContent from "./index.tsx"

export type Props = BaseComponentProps<
	HealthTopicContentProps,
	"HealthTopicContent",
	ExtractLevelProps<HealthTopicContentProps, WebContentProps>
>

export default function HealthTopicContent(
	{
		hasHealthAspect,
		schemaType = "HealthTopicContent",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
