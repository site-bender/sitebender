import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { SpecialAnnouncementProps } from "../../../../types/Thing/CreativeWork/SpecialAnnouncement/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	SpecialAnnouncementProps,
	"SpecialAnnouncement",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function SpecialAnnouncement({
	announcementLocation,
	category,
	datePosted,
	diseasePreventionInfo,
	diseaseSpreadStatistics,
	gettingTestedInfo,
	governmentBenefitsInfo,
	newsUpdatesAndGuidelines,
	publicTransportClosuresInfo,
	quarantineGuidelines,
	schoolClosuresInfo,
	travelBans,
	webFeed,
	schemaType = "SpecialAnnouncement",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				announcementLocation,
				category,
				datePosted,
				diseasePreventionInfo,
				diseaseSpreadStatistics,
				gettingTestedInfo,
				governmentBenefitsInfo,
				newsUpdatesAndGuidelines,
				publicTransportClosuresInfo,
				quarantineGuidelines,
				schoolClosuresInfo,
				travelBans,
				webFeed,
				...subtypeProperties,
			}}
		/>
	)
}
