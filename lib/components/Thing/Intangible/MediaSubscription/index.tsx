import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { MediaSubscriptionProps } from "../../../../types/Thing/Intangible/MediaSubscription/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	MediaSubscriptionProps,
	"MediaSubscription",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function MediaSubscription({
	authenticator,
	expectsAcceptanceOf,
	schemaType = "MediaSubscription",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				authenticator,
				expectsAcceptanceOf,
				...subtypeProperties,
			}}
		/>
	)
}
