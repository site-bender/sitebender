import type { AudioElement } from "../../embedded/audio/index.ts"
import type { EmbedElement } from "../../embedded/embed/index.ts"
import type { IFrameElement } from "../../embedded/iframe/index.ts"
import type { ImageElement } from "../../embedded/img/index.ts"
import type { ObjectElement } from "../../embedded/object/index.ts"
import type { VideoElement } from "../../embedded/video/index.ts"
import type { ButtonElement } from "../../forms/button/index.ts"
import type { HiddenInputElement } from "../../forms/input/hidden/index.ts"
import type { InputElement } from "../../forms/input/index.ts"
import type { LabelElement } from "../../forms/label/index.ts"
import type { SelectElement } from "../../forms/select/index.ts"
import type { TextAreaElement } from "../../forms/textarea/index.ts"
import type { Override } from "../../index.ts"
import type { DetailsElement } from "../../interactive/details/index.ts"
import type { AnchorElement } from "../../text-level-semantics/a/index.ts"

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
