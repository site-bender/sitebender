import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type SpecialAnnouncementProps from "../../../../types/Thing/SpecialAnnouncement/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	SpecialAnnouncementProps,
	"SpecialAnnouncement",
	ExtractLevelProps<SpecialAnnouncementProps, CreativeWorkProps>
>

export default function SpecialAnnouncement(
	{
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
	}: Props,
) {
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
