import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type Observation from "../../Intangible/Observation/index.ts"
import type GovernmentService from "../../Intangible/Service/GovernmentService/index.ts"
import type LocalBusiness from "../../Organization/LocalBusiness/index.ts"
import type CivicStructure from "../../Place/CivicStructure/index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type Dataset from "../Dataset/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type WebContent from "../WebContent/index.ts"

import { CategoryCode as CategoryCodeComponent } from "../../../../../components/index.tsx"
import { CivicStructure as CivicStructureComponent } from "../../../../../components/index.tsx"
import { DataFeed as DataFeedComponent } from "../../../../../components/index.tsx"
import { Dataset as DatasetComponent } from "../../../../../components/index.tsx"
import { GovernmentService as GovernmentServiceComponent } from "../../../../../components/index.tsx"
import { LocalBusiness as LocalBusinessComponent } from "../../../../../components/index.tsx"
import { Observation as ObservationComponent } from "../../../../../components/index.tsx"
import { PhysicalActivityCategory as PhysicalActivityCategoryComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"
import { WebContent as WebContentComponent } from "../../../../../components/index.tsx"

export type SpecialAnnouncementType = "SpecialAnnouncement"

export interface SpecialAnnouncementProps {
	"@type"?: SpecialAnnouncementType
	announcementLocation?:
		| CivicStructure
		| LocalBusiness
		| ReturnType<typeof CivicStructureComponent>
		| ReturnType<typeof LocalBusinessComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	datePosted?: Date | DateTime
	diseasePreventionInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	diseaseSpreadStatistics?:
		| Dataset
		| Observation
		| URL
		| WebContent
		| ReturnType<typeof DatasetComponent>
		| ReturnType<typeof ObservationComponent>
		| ReturnType<typeof WebContentComponent>
	gettingTestedInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	governmentBenefitsInfo?:
		| GovernmentService
		| ReturnType<typeof GovernmentServiceComponent>
	newsUpdatesAndGuidelines?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	publicTransportClosuresInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	quarantineGuidelines?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	schoolClosuresInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	travelBans?: URL | WebContent | ReturnType<typeof WebContentComponent>
	webFeed?: DataFeed | URL | ReturnType<typeof DataFeedComponent>
}

type SpecialAnnouncement = Thing & CreativeWorkProps & SpecialAnnouncementProps

export default SpecialAnnouncement
