import type { Integer, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PerformingGroup from "../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWorkSeason from "../CreativeWorkSeason/index.ts"
import type CreativeWorkSeries from "../CreativeWorkSeries/index.ts"
import type Episode from "../Episode/index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { MovieClipType } from "./MovieClip/index.ts"
import type { RadioClipType } from "./RadioClip/index.ts"
import type { TVClipType } from "./TVClip/index.ts"
import type { VideoGameClipType } from "./VideoGameClip/index.ts"

import { CreativeWorkSeason as CreativeWorkSeasonComponent } from "../../../../../components/index.tsx"
import { CreativeWorkSeries as CreativeWorkSeriesComponent } from "../../../../../components/index.tsx"
import { Episode as EpisodeComponent } from "../../../../../components/index.tsx"
import { HyperTocEntry as HyperTocEntryComponent } from "../../../../../components/index.tsx"
import { MusicGroup as MusicGroupComponent } from "../../../../../components/index.tsx"
import { PerformingGroup as PerformingGroupComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

export type ClipType =
	| "Clip"
	| RadioClipType
	| TVClipType
	| MovieClipType
	| VideoGameClipType

export interface ClipProps {
	"@type"?: ClipType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	clipNumber?: Integer | Text
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	endOffset?: HyperTocEntry | Number | ReturnType<typeof HyperTocEntryComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	partOfEpisode?: Episode | ReturnType<typeof EpisodeComponent>
	partOfSeason?:
		| CreativeWorkSeason
		| ReturnType<typeof CreativeWorkSeasonComponent>
	partOfSeries?:
		| CreativeWorkSeries
		| ReturnType<typeof CreativeWorkSeriesComponent>
	startOffset?:
		| HyperTocEntry
		| Number
		| ReturnType<typeof HyperTocEntryComponent>
}

type Clip = Thing & CreativeWorkProps & ClipProps

export default Clip
