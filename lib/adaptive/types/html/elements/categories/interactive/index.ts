import type { Override } from "../../shared"
import type { AudioElement } from "../embedded/audio"
import type { EmbedElement } from "../embedded/embed"
import type { IFrameElement } from "../embedded/iframe"
import type { ImageElement } from "../embedded/img"
import type { ObjectElement } from "../embedded/object"
import type { VideoElement } from "../embedded/video"
import type { ButtonElement } from "../forms/button"
import type { InputElement } from "../forms/input"
import type { HiddenInputElement } from "../forms/input/hidden"
import type { LabelElement } from "../forms/label"
import type { SelectElement } from "../forms/select"
import type { TextAreaElement } from "../forms/textarea"
import type { DetailsElement } from "../interactive/details"
import type { AnchorElement } from "../text-level-semantics/a"

export type InteractiveContent =
	| Override<AnchorElement, { href: string }>
	| Override<AudioElement, { controls: string }>
	| ButtonElement
	| DetailsElement
	| EmbedElement
	| IFrameElement
	| Override<ImageElement, { useMap: string }>
	| Exclude<InputElement, HiddenInputElement>
	| LabelElement
	| Override<ObjectElement, { useMap: string }>
	| SelectElement
	| TextAreaElement
	| Override<VideoElement, { controls: string }>
