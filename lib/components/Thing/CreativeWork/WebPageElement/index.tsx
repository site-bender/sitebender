import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { WebPageElementProps } from "../../../../types/Thing/CreativeWork/WebPageElement/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	WebPageElementProps,
	"WebPageElement",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function WebPageElement({
	cssSelector,
	xpath,
	schemaType = "WebPageElement",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				cssSelector,
				xpath,
				...subtypeProperties,
			}}
		/>
	)
}
