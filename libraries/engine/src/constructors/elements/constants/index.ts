/* Keep this file alphabetically sorted */

// Allow values for IFrame elements
export const ALLOW = {
	any: "*",
	none: "none",
	self: "self",
	src: "src",
}

export const ALLOWS = Object.values(ALLOW)

// Autocomplete values for form elements
export const AUTOCOMPLETE = {
	additionalName: "additional-name",
	addressLevel1: "address-level1",
	addressLevel2: "address-level2",
	addressLevel3: "address-level3",
	addressLevel4: "address-level4",
	addressLine1: "address-line1",
	addressLine2: "address-line2",
	addressLine3: "address-line3",
	birthday: "bday",
	birthdayDay: "bday-day",
	birthdayMonth: "bday-month",
	birthdayYear: "bday-year",
	country: "country",
	countryName: "country-name",
	creditCardAdditionalName: "cc-additional-name",
	creditCardExpiration: "cc-exp",
	creditCardExpirationMonth: "cc-exp-month",
	creditCardExpirationYear: "cc-exp-year",
	creditCardFamilyName: "cc-family-name",
	creditCardGivenName: "cc-given-name",
	creditCardName: "cc-name",
	creditCardNumber: "cc-number",
	creditCardSecurityCode: "cc-csc",
	creditCardType: "cc-type",
	currentPassword: "current-password",
	email: "email",
	familyName: "family-name",
	givenName: "given-name",
	honorificPrefix: "honorific-prefix",
	honorificSuffix: "honorific-suffix",
	iMPP: "impp",
	language: "language",
	name: "name",
	newPassword: "new-password",
	nickname: "nickname",
	off: "off",
	on: "on",
	oneTimeCode: "one-time-code",
	organization: "organization",
	organizationTitle: "organization-title",
	photo: "photo",
	postalCode: "postal-code",
	sex: "sex",
	streetAddress: "street-address",
	telephone: "tel",
	telephoneAreaCode: "telarea-code",
	telephoneCountryCode: "tel-country-code",
	telephoneExtension: "tel-extension",
	telephoneLocal: "tel-local",
	telephoneLocalPrefix: "tel-local-prefix",
	telephoneLocalSuffix: "tel-local-suffix",
	telephoneNational: "tel-national",
	transactionAmount: "transaction-amount",
	transactionCurrency: "transaction-currency",
	uRL: "url",
	username: "username",
}

export const AUTOCOMPLETES = Object.values(AUTOCOMPLETE)

// Blocking values
export const BLOCKING = {
	render: "render",
}

export const BLOCKINGS = Object.values(BLOCKING)

export const BUTTON_TYPE = {
	button: "button",
	reset: "reset",
	submit: "submit",
}

export const BUTTON_TYPES = Object.values(BUTTON_TYPE)

// Role constants for elements
export const BUTTON_ROLES = [
	"checkbox",
	"combobox",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"switch",
	"tab",
]

// Cross origin values
export const CROSS_ORIGIN = {
	anonymous: "anonymous",
	useCredentials: "use-credentials",
}

export const CROSS_ORIGINS = Object.values(CROSS_ORIGIN)

// Decoding hint values for Img elements
export const DECODING_HINT = {
	auto: "auto",
	async: "async",
	sync: "sync",
}

export const DECODING_HINTS = Object.values(DECODING_HINT)

// Destination values for Link elements
export const DESTINATION = {
	audio: "audio",
	audioWorklet: "audioworklet",
	document: "document",
	embed: "embed",
	empty: "",
	font: "font",
	frame: "frame",
	iframe: "iframe",
	image: "image",
	json: "json",
	manifest: "manifest",
	object: "object",
	plainWorklet: "paintworklet",
	report: "report",
	script: "script",
	serviceWorker: "serviceworker",
	sharedWorker: "sharedworker",
	style: "style",
	track: "track",
	video: "video",
	webIdentity: "webidentity",
	worker: "worker",
	xslt: "xslt",
}

export const DESTINATIONS = Object.values(DESTINATION)

// Fetch priority values
export const FETCH_PRIORITY = {
	auto: "auto",
	high: "high",
	low: "low",
}

export const FETCH_PRIORITIES = Object.values(FETCH_PRIORITY)

export const FOOTER_ROLES = ["group", "presentation", "none"]

export const FORM_ENCTYPE = {
	urlencoded: "application/x-www-form-urlencoded",
	multipart: "multipart/form-data",
	text: "text/plain",
}

export const FORM_ENCTYPES = Object.values(FORM_ENCTYPE)

export const FORM_METHOD = {
	dialog: "dialog",
	get: "get",
	post: "post",
}

export const FORM_METHODS = Object.values(FORM_METHOD)

export const FORM_TARGET = {
	_blank: "_blank",
	_parent: "_parent",
	_self: "_self",
	_top: "_top",
	_unfencedTop: "_unfencedTop",
}

export const FORM_TARGETS = Object.values(FORM_TARGET)

export const HEADER_ROLES = ["group", "presentation", "none"]

export const HEADING_ROLES = ["tab", "presentation", "none"]

// HTTP-EQUIV values for Meta elements
export const HTTP_EQUIV = {
	contentSecurityPolicy: "content-security-policy",
	contentType: "content-type",
	defaultStyle: "default-style",
	xUaCompatible: "x-ua-compatible",
	refresh: "refresh",
}

export const HTTP_EQUIVS = Object.values(HTTP_EQUIV)

// Loading values for Img elements
export const LOADING = {
	eager: "eager",
	lazy: "lazy",
}

export const LOADINGS = Object.values(LOADING)

export const OL_TYPES = ["1", "A", "a", "I", "i"]

export const POPOVER_TARGET_ACTION = {
	hide: "hide",
	show: "show",
	toggle: "toggle",
}

export const POPOVER_TARGET_ACTIONS = Object.values(POPOVER_TARGET_ACTION)

// Preload values for Audio/Video elements
export const PRELOAD = {
	auto: "auto",
	empty: "",
	metadata: "metadata",
	none: "none",
}

export const PRELOADS = Object.values(PRELOAD)

export const REFERRER_POLICY = {
	empty: "",
	noReferrerWhenDowngrade: "no-referrer-when-downgrade",
	noReferrer: "no-referrer",
	originWhenCrossOrigin: "origin-when-cross-origin",
	origin: "origin",
	sameOrigin: "same-origin",
	strictOriginWhenCrossOrigin: "strict-origin-when-cross-origin",
	strictOrigin: "strict-origin",
	unsafeUrl: "unsafe-url",
}

export const REFERRER_POLICIES = Object.values(REFERRER_POLICY)

export const REL_FOR_AREA_AND_A = {
	alternate: "alternate",
	author: "author",
	bookmark: "bookmark",
	external: "external",
	help: "help",
	license: "license",
	noFollow: "nofollow",
	noOpener: "noopener",
	noReferrer: "noreferrer",
	opener: "opener",
	privacyPolicy: "privacy-policy",
	search: "search",
	tag: "tag",
	termsOfService: "terms-of-service",
}

export const RELS_FOR_AREA = Object.values(REL_FOR_AREA_AND_A)

// Rel values for Link elements
export const REL_FOR_LINK = {
	alternate: "alternate",
	author: "author",
	canonical: "canonical",
	dnsPrefetch: "dns-prefetch",
	expect: "expect",
	help: "help",
	icon: "icon",
	license: "license",
	manifest: "manifest",
	modulePreload: "modulepreload",
	pingback: "pingback",
	preconnect: "preconnect",
	prefetch: "prefetch",
	preload: "preload",
	privacyPolicy: "privacy-policy",
	search: "search",
	stylesheet: "stylesheet",
	termsOfService: "terms-of-service",
}

export const RELS_FOR_LINK = Object.values(REL_FOR_LINK)

// Sandbox values for IFrame elements
export const SANDBOX = {
	allowDownloads: "allow-downloads",
	allowForms: "allow-forms",
	allowModals: "allow-modals",
	allowOrientationLock: "allow-orientation-lock",
	allowPointerLock: "allow-pointer-lock",
	allowPopups: "allow-popups",
	allowPopupsToEscapeSandbox: "allow-popups-to-escape-sandbox",
	allowPresentation: "allow-presentation",
	allowSameOrigin: "allow-same-origin",
	allowScripts: "allow-scripts",
	allowTopNavigation: "allow-top-navigation",
	allowTopNavigationByUserActivation:
		"allow-top-navigation-by-user-activation",
	allowTopNavigationToCustomProtocols:
		"allow-top-navigation-to-custom-protocols",
}

export const SANDBOXES = Object.values(SANDBOX)

export const SCOPE = {
	row: "row",
	col: "col",
	rowGroup: "rowgroup",
	colGroup: "colgroup",
	auto: "auto",
}

export const SCOPES = Object.values(SCOPE)

// Shadow DOM mode values for Template elements
export const SHADOW_ROOT_MODE = {
	closed: "closed",
	open: "open",
}

export const SHADOW_ROOT_MODES = Object.values(SHADOW_ROOT_MODE)

// Shape values for Area elements
export const SHAPE = {
	circle: "circle",
	circ: "circ",
	default: "default",
	poly: "poly",
	polygon: "polygon",
	rect: "rect",
	rectangle: "rectangle",
}

export const SHAPES = Object.values(SHAPE)

// Target values for Base elements
export const TARGET = {
	_blank: "_blank",
	_parent: "_parent",
	_self: "_self",
	_top: "_top",
}

export const TARGETS = Object.values(TARGET)

// Wrap values for TextArea
export const WRAP = {
	hard: "hard",
	soft: "soft",
}

export const WRAPS = Object.values(WRAP)
