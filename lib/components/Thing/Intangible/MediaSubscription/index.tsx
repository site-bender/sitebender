import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type MediaSubscriptionProps from "../../../../types/Thing/MediaSubscription/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	MediaSubscriptionProps,
	"MediaSubscription",
	ExtractLevelProps<MediaSubscriptionProps, IntangibleProps>
>

export default function MediaSubscription(
	{
		authenticator,
		expectsAcceptanceOf,
		schemaType = "MediaSubscription",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
