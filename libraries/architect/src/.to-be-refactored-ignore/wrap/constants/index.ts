export const EMOJI = {
	// Basic emotions
	happy: "😊", // smiling face
	sad: "😢", // crying face
	angry: "😠", // angry face
	fearful: "😨", // fearful face
	surprised: "😲", // astonished face
	disgusted: "🤢", // nauseated face

	// Positive tones
	joyful: "😂", // face with tears of joy
	excited: "🤩", // star-struck
	grateful: "🙏", // folded hands
	hopeful: "🤞", // crossed fingers
	affectionate: "🥰", // smiling face with hearts
	loving: "❤️", // red heart
	enthusiastic: "🎉", // party popper
	optimistic: "😃", // grinning face
	proud: "🦁", // lion (symbolizing pride)
	content: "😌", // relieved face
	amused: "😆", // grinning squinting face
	cheerful: "😄", // grinning face with smiling eyes
	playful: "😜", // winking face with tongue
	whimsical: "🤪", // zany face

	// Negative tones
	anxious: "😰", // anxious face with sweat
	depressed: "😞", // disappointed face
	guilty: "😳", // flushed face
	ashamed: "😔", // pensive face
	lonely: "😟", // worried face
	frustrated: "😤", // face with steam from nose
	resentful: "😒", // unamused face
	bitter: "😖", // confounded face
	jealous: "😏", // smirking face
	embarrassed: "😳", // flushed face
	disappointed: "😕", // confused face
	hopeless: "😣", // persevering face
	overwhelmed: "😫", // tired face
	stressed: "😩", // weary face

	// Neutral/moderate tones
	neutral: "😐", // neutral face
	curious: "🤔", // thinking face
	indifferent: "😶", // face without mouth
	contemplative: "🧐", // face with monocle
	nostalgic: "🕰️", // mantelpiece clock
	reflective: "👁️", // eye
	serious: "😐", // neutral face
	solemn: "🙁", // slightly frowning face

	// Complex/social tones
	sarcastic: "🙃", // upside-down face
	ironic: "😏", // smirking face
	sardonic: "😬", // grimacing face
	facetious: "😝", // squinting face with tongue
	caustic: "☠️", // skull and crossbones
	cynical: "😒", // unamused face
	mocking: "🃏", // joker (playing card)
	patronizing: "🤨", // face with raised eyebrow
	condescending: "👎", // thumbs down
	passiveAggressive: "😇", // smiling face with halo (fake innocence)
	dramatic: "🎭", // performing arts
	melodramatic: "💃", // dancing woman (flamboyant)

	// Intense tones
	furious: "👿", // angry face with horns
	enraged: "🤬", // face with symbols on mouth
	ecstatic: "🤯", // exploding head
	euphoric: "✨", // sparkles
	terrified: "😱", // face screaming in fear
	horrified: "💀", // skull
	desperate: "😵", // dizzy face
	hysterical: "😵‍💫", // face with spiral eyes

	// Professional/formal tones
	formal: "🎩", // top hat
	professional: "💼", // briefcase
	diplomatic: "🕊️", // peace dove
	respectful: "🙇", // person bowing
	courteous: "🤝", // handshake
	polite: "🌸", // cherry blossom (symbol of politeness in Japan)

	// Informal/casual tones
	casual: "👕", // t-shirt
	friendly: "😊", // smiling face
	warm: "☀️", // sun
	approachable: "👋", // waving hand
	laidBack: "🛋️", // couch and lamp
	relaxed: "😌", // relieved face

	// Persuasive tones
	persuasive: "🗣️", // speaking head
	convincing: "✅", // check mark
	insistent: "✊", // raised fist
	pleading: "🥺", // pleading face
	begging: "🙏", // folded hands (repeated)

	// Uncertainty
	uncertain: "🤷", // shrug
	hesitant: "😬", // grimacing face
	tentative: "🫣", // face with peeking eye
	doubtful: "🧐", // face with monocle
	skeptical: "🤨", // raised eyebrow

	// Confidence
	confident: "💪", // flexed biceps
	assertive: "👊", // oncoming fist
	authoritative: "👑", // crown
	commanding: "🪖", // military helmet

	// Other nuanced tones
	bittersweet: "☕", // hot beverage (metaphorical)
	wistful: "🌌", // milky way (longing)
	melancholic: "🎶", // musical notes
	sentimental: "📿", // prayer beads
	reverent: "🙌", // raising hands
	aweStruck: "😮", // face with open mouth
	vulnerable: "🫂", // hugging
	intimate: "💋", // kiss mark
	tender: "🤲", // palms up together
	compassionate: "🌱", // seedling (growth, care)
	empathetic: "💞", // revolving hearts
	sympathetic: "😔", // pensive face
	apologetic: "🙇‍♂️", // man bowing
	regretful: "😥", // disappointed but relieved face
	remorseful: "😓", // downcast face with sweat
} as const

export type Emoji = typeof EMOJI[keyof typeof EMOJI]

export const TONE = {
	// Basic emotions
	happy: "happy",
	sad: "sad",
	angry: "angry",
	fearful: "fearful",
	surprised: "surprised",
	disgusted: "disgusted",

	// Positive tones
	joyful: "joyful",
	excited: "excited",
	grateful: "grateful",
	hopeful: "hopeful",
	affectionate: "affectionate",
	loving: "loving",
	enthusiastic: "enthusiastic",
	optimistic: "optimistic",
	proud: "proud",
	content: "content",
	amused: "amused",
	cheerful: "cheerful",
	playful: "playful",
	whimsical: "whimsical",

	// Negative tones
	anxious: "anxious",
	depressed: "depressed",
	guilty: "guilty",
	ashamed: "ashamed",
	lonely: "lonely",
	frustrated: "frustrated",
	resentful: "resentful",
	bitter: "bitter",
	jealous: "jealous",
	embarrassed: "embarrassed",
	disappointed: "disappointed",
	hopeless: "hopeless",
	overwhelmed: "overwhelmed",
	stressed: "stressed",

	// Neutral/moderate tones
	neutral: "neutral",
	curious: "curious",
	indifferent: "indifferent",
	contemplative: "contemplative",
	nostalgic: "nostalgic",
	reflective: "reflective",
	serious: "serious",
	solemn: "solemn",

	// Complex/social tones
	sarcastic: "sarcastic",
	ironic: "ironic",
	sardonic: "sardonic",
	facetious: "facetious",
	caustic: "caustic",
	cynical: "cynical",
	mocking: "mocking",
	patronizing: "patronizing",
	condescending: "condescending",
	passiveAggressive: "passive-aggressive",
	dramatic: "dramatic",
	melodramatic: "melodramatic",

	// Intense tones
	furious: "furious",
	enraged: "enraged",
	ecstatic: "ecstatic",
	euphoric: "euphoric",
	terrified: "terrified",
	horrified: "horrified",
	desperate: "desperate",
	hysterical: "hysterical",

	// Professional/formal tones
	formal: "formal",
	professional: "professional",
	diplomatic: "diplomatic",
	respectful: "respectful",
	courteous: "courteous",
	polite: "polite",

	// Informal/casual tones
	casual: "casual",
	friendly: "friendly",
	warm: "warm",
	approachable: "approachable",
	laidBack: "laid-back",
	relaxed: "relaxed",

	// Persuasive tones
	persuasive: "persuasive",
	convincing: "convincing",
	insistent: "insistent",
	pleading: "pleading",
	begging: "begging",

	// Uncertainty
	uncertain: "uncertain",
	hesitant: "hesitant",
	tentative: "tentative",
	doubtful: "doubtful",
	skeptical: "skeptical",

	// Confidence
	confident: "confident",
	assertive: "assertive",
	authoritative: "authoritative",
	commanding: "commanding",

	// Other nuanced tones
	bittersweet: "bittersweet",
	wistful: "wistful",
	melancholic: "melancholic",
	sentimental: "sentimental",
	reverent: "reverent",
	aweStruck: "awe-struck",
	vulnerable: "vulnerable",
	intimate: "intimate",
	tender: "tender",
	compassionate: "compassionate",
	empathetic: "empathetic",
	sympathetic: "sympathetic",
	apologetic: "apologetic",
	regretful: "regretful",
	remorseful: "remorseful",
} as const

export type Tone = typeof TONE[keyof typeof TONE]
