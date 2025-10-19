# Content Rules

## Use 'while' for time, 'although' for concession

- **Rule ID**: STRUNK_WHILE_ALTHOUGH_001
- **Description**: Reserve 'while' for temporal relationships (things happening simultaneously) and use 'although', 'though', or 'whereas' for contrasts or concessions. This distinction creates clearer logical relationships.
- **Keywords**: strunk-white, conjunctions, while, although, temporal, concession, clarity, logical-relationships, grammar, word-choice
- **Rationale**: Precise word choice clarifies the logical relationship between clauses, helping readers understand whether you're indicating time, contrast, or concession. Using 'while' for contrast can momentarily confuse readers about timing versus logical relationships, slowing comprehension and weakening argument structure. Each word should carry precise semantic meaning—using the right conjunction helps readers follow your logical flow effortlessly.

**Prohibited:**
```md
While I understand your concern, I disagree.

The system works while being inefficient.

While the code compiles, it has bugs.
```

*Reasoning*: These use 'while' to express contrast or concession rather than temporal relationships, creating confusion about whether events are simultaneous or contrasting

**Required:**
```md
Although I understand your concern, I disagree.

The system works, although inefficiently.

Though the code compiles, it has bugs.
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Avoid 'and/or' constructions

- **Rule ID**: STRUNK_AVOID_AND_OR_001
- **Description**: Instead of using 'and/or', choose either 'and' or 'or' based on the intended meaning, or rewrite the sentence to be clearer. The slash construction is often imprecise and can confuse readers about what relationships actually exist.
- **Keywords**: strunk-white, clarity, precision, ambiguity, conjunctions, and-or, word-choice, technical-writing, plain-language
- **Rationale**: The 'and/or' construction is imprecise and forces readers to interpret multiple possible meanings simultaneously, reducing clarity in professional communication. Using 'and/or' creates ambiguity about whether options are exclusive, inclusive, or both. This can lead to misunderstandings, especially in technical specifications or user instructions. Clear writing makes definitive statements about relationships between concepts rather than forcing readers to interpret multiple possibilities.

**Prohibited:**
```md
Users can edit and/or delete records.

Submit via email and/or fax.

Choose one and/or more options.
```

*Reasoning*: The 'and/or' construction leaves readers uncertain about whether options are mutually exclusive, both required, or any combination is acceptable

**Required:**
```md
Users can edit or delete records.

Submit via email or fax.

Choose one or more options.
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Form possessive of plural nouns correctly

- **Rule ID**: STRUNK_POSSESSIVE_PLURAL_001
- **Description**: For plural nouns ending in 's', add only an apostrophe ('employees' benefits'). For plural nouns not ending in 's', add apostrophe and 's' ('children's toys', 'people's opinions'). This maintains clear ownership relationships.
- **Keywords**: grammar, possessives, punctuation, apostrophes, plural-nouns, ownership, clarity, professional-writing
- **Rationale**: Correct possessive formation prevents confusion about ownership and maintains professional writing standards, especially important in business and technical contexts. Incorrect possessive forms can confuse readers about ownership relationships and appear unprofessional, potentially undermining credibility in formal documents. Precise punctuation serves as visual grammar that clarifies relationships between entities—correct possessives remove ambiguity about ownership.

**Prohibited:**
```md
employee's benefits (when referring to multiple employees)

childrens' toys

peoples' opinions

users's data
```

*Reasoning*: These forms incorrectly apply possessive rules, creating confusion about whether singular or plural ownership is intended

**Required:**
```md
employees' benefits

children's toys

people's opinions

users' data
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Write with nouns and verbs, not adjectives and adverbs

- **Rule ID**: STRUNK_NOUNS_VERBS_001
- **Description**: Strong words carry meaning better than modified weak words. Choose precise nouns and verbs over weak base words with adjective and adverb modifiers.
- **Keywords**: strunk-white, word-choice, nouns, verbs, adjectives, adverbs, clarity, conciseness, strong-writing
- **Rationale**: Nouns and verbs carry the core meaning. Adjectives and adverbs often compensate for weak word choices. Over-reliance on modifiers creates wordy, weak writing. Choose strong base words over weak words with modifiers.

**Prohibited:**
```md
walked very quickly

extremely important

really good
```

*Reasoning*: These examples use weak base words ('walked', 'important', 'good') propped up by modifiers instead of choosing stronger, more precise single words

**Required:**
```md
rushed

critical

excellent
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Use positive form

- **Rule ID**: STRUNK_POSITIVE_FORM_001
- **Description**: Tell what IS, not what ISN'T. State reality in positive terms rather than describing what something is not.
- **Keywords**: strunk-white, positive-form, clarity, directness, negative-constructions, plain-language, readability
- **Rationale**: Positive statements are clearer and more direct. Easier to understand what actually happens. Negative forms require mental processing to understand the actual situation. Direct communication means stating reality clearly.

**Prohibited:**
```md
He was not very often on time.

The report is not available.

This feature is not supported.
```

*Reasoning*: These negative constructions force readers to mentally process the negation to understand the actual state, adding unnecessary cognitive load

**Required:**
```md
He usually came late.

The report is unavailable.

This feature is unsupported.
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Distinguish between dash and hyphen usage

- **Rule ID**: STRUNK_DASH_HYPHEN_001
- **Description**: Use em dashes (—) for parenthetical breaks, interruptions, or to set off explanatory material. Use hyphens (-) for compound words, prefixes, and line breaks. En dashes (–) are for ranges and connections between equal elements.
- **Keywords**: punctuation, dashes, hyphens, em-dash, en-dash, typography, clarity, visual-grammar, professional-writing
- **Rationale**: Proper dash and hyphen usage creates clear visual distinctions between different types of breaks and connections, improving readability and professional appearance. Incorrect dash/hyphen usage creates visual inconsistency and can confuse readers about the relationship between ideas. Overuse of hyphens where dashes belong weakens the prose. Different punctuation marks serve specific semantic purposes—using them correctly helps readers understand the precise relationship between concepts.

**Prohibited:**
```md
The API - which handles authentication - was updated

twenty-five to thirty users (should use en dash for range)

The server crashed-we lost all data (should use em dash with proper spacing)
```

*Reasoning*: These examples use the wrong type of dash for the semantic purpose, creating visual inconsistency and potential confusion about relationships

**Required:**
```md
The API—which handles authentication—was updated

twenty-five to thirty users (or: 25–30 users with en dash)

The server crashed—we lost all data
```

*Scope*: All written content: component text, documentation, essays, user interfaces

## Know your audience and write for them

- **Rule ID**: AUDIENCE_AWARENESS_001
- **Description**: Ask 'Who is the intended audience?' if unclear. Generally Sitebender users are not developers—avoid technical jargon unless clearly addressing experts. Match content to audience knowledge and needs.
- **Keywords**: audience, plain-language, accessibility, jargon, user-centered, clarity, technical-writing, user-experience
- **Rationale**: Content must match audience knowledge and needs. Technical language excludes non-technical users. Wrong audience level creates confusion, exclusion, or condescension. Write for the reader, not the writer.

**Prohibited:**
```md
Configure the RESTful API endpoint parameters.

Modify the JSON payload schema.

Adjust the CORS headers in the middleware.
```

*Reasoning*: These examples use technical jargon that excludes Sitebender's target audience of designers, hobbyists, and laypersons who are not enterprise developers

**Required:**
```md
Set up your connection settings.

Change the data structure.

Update the security options.
```

*Scope*: Default audience: Sitebender end users (designers, hobbyists, laypersons) not enterprise developers. Adjust language complexity based on specific audience.

## Use semicolon to separate independent clauses

- **Rule ID**: STRUNK_SEMICOLON_001
- **Description**: Use semicolon to separate independent clauses not joined by conjunction. Avoid comma splices which create run-on sentences.
- **Keywords**: grammar, punctuation, semicolons, comma-splice, independent-clauses, sentence-structure, run-on-sentences
- **Rationale**: Comma splice is grammatically incorrect and creates run-on sentences. Comma splices confuse readers about sentence boundaries and relationships. Proper punctuation supports clear meaning.

**Prohibited:**
```md
The server crashed, all data was lost.

She studied hard, the test was still difficult.
```

*Reasoning*: These comma splices join independent clauses with only a comma, creating grammatically incorrect run-on sentences that confuse boundaries

**Required:**
```md
The server crashed; all data was lost.

She studied hard, but the test was still difficult.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use semicolon for independent clauses, or add conjunction with comma.

## Enclose parenthetic expressions between commas

- **Rule ID**: STRUNK_PARENTHETIC_001
- **Description**: Enclose parenthetic expressions between commas to signal that information is supplementary, not essential to the main statement.
- **Keywords**: punctuation, commas, parenthetic-expressions, non-restrictive-clauses, grammar, information-hierarchy
- **Rationale**: Commas signal that information is supplementary, not essential to the main statement. Missing commas make it unclear what information is essential versus supplementary. Punctuation should clarify meaning and information hierarchy.

**Prohibited:**
```md
The manager who started last month called a meeting.

My brother an engineer designed the bridge.
```

*Reasoning*: Without commas, these sentences suggest the information is restrictive (essential for identifying which manager or brother), when it should be parenthetical

**Required:**
```md
The manager, who started last month, called a meeting.

My brother, an engineer, designed the bridge.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use commas to set off non-restrictive (parenthetical) information.

## Make the paragraph the unit of composition

- **Rule ID**: STRUNK_PARAGRAPH_UNITY_001
- **Description**: Make the paragraph the unit of composition. Begin each paragraph with a topic sentence that states the main idea. Each paragraph should advance one main idea.
- **Keywords**: strunk-white, paragraph-structure, topic-sentences, unity, organization, clarity, composition, readability
- **Rationale**: Paragraphs with clear topic sentences help readers follow the argument and understand structure. Paragraphs without clear focus confuse readers about the main point. Each paragraph should advance one main idea.

**Prohibited:**
```md
Pagewright has many features. Components are accessible. We also have good performance. Users like the interface.
```

*Reasoning*: This unfocused paragraph jumps between multiple unrelated ideas without a clear topic sentence or unified theme

**Required:**
```md
Pagewright components ensure accessibility. Every component includes proper ARIA labels, keyboard navigation, and semantic structure.
```

*Scope*: Longer written content: documentation, essays. Each paragraph should have one clear topic introduced by a topic sentence.

## Place quotation marks correctly with periods and commas

- **Rule ID**: STRUNK_QUOTATION_MARKS_001
- **Description**: In American English, periods and commas always go inside quotation marks, regardless of whether they are part of the quoted material. This applies to both direct quotes and when referring to titles or specific terms.
- **Keywords**: punctuation, quotation-marks, quotes, periods, commas, american-english, typography, conventions
- **Rationale**: Consistent quotation mark placement follows established American English conventions and maintains professional appearance in documentation and user interfaces. Incorrect quotation mark placement appears unprofessional and can confuse readers about what is being quoted. In technical documentation, this inconsistency undermines credibility. Typographical conventions serve as shared standards that allow readers to focus on content rather than being distracted by formatting inconsistencies.

**Prohibited:**
```md
He said "Hello world". The function is called "getData".

The error message was "File not found"; please check the path.

Click the "Save" button, then close the dialog.
```

*Reasoning*: These examples place periods and commas outside quotation marks, violating American English conventions and creating visual inconsistency

**Required:**
```md
He said "Hello world." The function is called "getData."

The error message was "File not found;" please check the path.

Click the "Save" button, then close the dialog.
```

*Scope*: All written content following American English conventions: component text, documentation, essays, user interfaces

## Use active voice

- **Rule ID**: STRUNK_ACTIVE_VOICE_001
- **Description**: Use active voice to show who does what. Active voice is direct, clear, and assigns responsibility.
- **Keywords**: strunk-white, active-voice, passive-voice, clarity, directness, agency, responsibility, strong-writing
- **Rationale**: Active voice is direct, clear, and assigns responsibility. Shows who does what. Passive voice obscures agency and creates wordy, weak sentences. Direct communication means showing who acts.

**Prohibited:**
```md
Mistakes were made.

The system was updated.

Errors will be reported.
```

*Reasoning*: These passive constructions obscure who performs the actions, removing agency and creating weaker, wordier sentences

**Required:**
```md
We made mistakes.

Engineers updated the system.

The app will report errors.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use active voice except when the actor is truly unknown or unimportant.

## Omit needless words

- **Rule ID**: STRUNK_OMIT_NEEDLESS_001
- **Description**: Delete phrases like 'the fact that', 'in order to', 'for the purpose of'. Every word should earn its place.
- **Keywords**: strunk-white, conciseness, brevity, clarity, wordiness, economy, precision, editing
- **Rationale**: Every word should earn its place. Extra words dilute meaning and waste reader's time. Verbose writing obscures meaning and tests reader patience. Clarity through economy—no gratuitous words.

**Prohibited:**
```md
The fact that she was late is due to the reason that traffic was bad.
```

*Reasoning*: This verbose construction uses many unnecessary words ('the fact that', 'is due to the reason that') that obscure the simple underlying meaning

**Required:**
```md
She was late because of traffic.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Eliminate needless words and phrases that don't add meaning.

## Form possessive singular by adding 's

- **Rule ID**: STRUNK_POSSESSIVE_001
- **Description**: Form possessive singular by adding 's: James's, Mars's, the witness's. This applies to all singular nouns.
- **Keywords**: grammar, possessives, singular-nouns, apostrophes, punctuation, consistency, style
- **Rationale**: Consistent possessive formation eliminates confusion and follows standard English rules. Inconsistent possessives (James' vs James's) create style inconsistency. Consistency in grammar supports clear communication.

**Prohibited:**
```md
James' book

Mars' surface

the witness' testimony
```

*Reasoning*: These forms omit the 's' after the apostrophe, creating inconsistency with standard possessive formation rules

**Required:**
```md
James's book

Mars's surface

the witness's testimony
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Always add 's for singular possessives.

## Write at 8th grade reading level maximum

- **Rule ID**: PLAIN_LANGUAGE_LEVEL_001
- **Description**: Write at 8th grade reading level maximum for Sitebender content. Use simple sentences and common words unless technical precision requires complexity.
- **Keywords**: plain-language, readability, accessibility, grade-level, clarity, simplicity, user-centered, cognitive-load
- **Rationale**: 8th grade level ensures accessibility for most readers while maintaining precision. Complex language excludes users and increases cognitive load. Universal understanding through clear communication. Sitebender targets designers, hobbyists, and laypersons—not enterprise developers.

**Prohibited:**
```md
Utilize this functionality to accomplish your objective.
```

*Reasoning*: This unnecessarily complex phrasing uses formal words ('utilize', 'functionality', 'accomplish', 'objective') that increase reading difficulty without adding meaning

**Required:**
```md
Use this feature to reach your goal.
```

*Scope*: All Sitebender content: component text, documentation, essays, user interfaces. Target 8th grade reading level maximum.

## Express coordinate ideas in similar form

- **Rule ID**: STRUNK_PARALLEL_CONSTRUCTION_001
- **Description**: Express coordinate ideas in similar form. Use parallel construction in series and comparisons. Similar ideas deserve similar expression.
- **Keywords**: strunk-white, parallel-structure, grammar, parallelism, series, consistency, rhythm, clarity
- **Rationale**: Parallel structure makes relationships clear and creates rhythm that aids comprehension. Mixed constructions confuse readers about relationships between ideas. Similar ideas deserve similar expression.

**Prohibited:**
```md
The system is fast, reliable, and has good security.
```

*Reasoning*: This mixes adjectives ('fast', 'reliable') with a verb phrase ('has good security'), breaking parallel structure and creating awkward rhythm

**Required:**
```md
The system is fast, reliable, and secure.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Maintain parallel grammatical structure for coordinate ideas.

## Use definite, specific, concrete language

- **Rule ID**: STRUNK_CONCRETE_LANGUAGE_001
- **Description**: Use definite, specific, concrete language. Choose precise words over vague abstractions.
- **Keywords**: strunk-white, concrete-language, specificity, precision, clarity, vagueness, word-choice, imagery
- **Rationale**: Concrete words create clear mental images. Vague language forces readers to guess meaning. Abstract language creates confusion and misunderstanding. Precision in language creates precision in thought.

**Prohibited:**
```md
A period of unfavorable weather

A considerable amount of

At this point in time
```

*Reasoning*: These vague, abstract phrases force readers to interpret what is meant instead of providing clear, concrete information

**Required:**
```md
Rain

Much

Now
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Choose concrete, specific words over vague abstractions.

## Use serial comma before 'and' in series

- **Rule ID**: STRUNK_SERIAL_COMMA_001
- **Description**: Use serial comma before 'and' in series: 'A, B, and C' not 'A, B and C'. Clarity over brevity—one character prevents misunderstanding.
- **Keywords**: punctuation, serial-comma, oxford-comma, clarity, lists, ambiguity, grammar
- **Rationale**: Serial comma prevents ambiguity and misreading. Eliminates confusion about grouping. Missing serial comma can create unintended associations or unclear meaning. Clarity over brevity—one character prevents misunderstanding.

**Prohibited:**
```md
I invited my parents, Einstein and Tesla.
```

*Reasoning*: Without the serial comma, this appears to say that the parents ARE Einstein and Tesla, rather than three separate parties being invited

**Required:**
```md
I invited my parents, Einstein, and Tesla.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Always use serial comma before final 'and' in series.

## Avoid beginning sentences with 'there is/are'

- **Rule ID**: STRUNK_AVOID_THERE_ARE_001
- **Description**: Avoid beginning sentences with 'there is/are'. Lead with the actual subject or a more direct statement. This creates stronger, more engaging prose that gets to the point quickly.
- **Keywords**: strunk-white, expletive-constructions, directness, strong-writing, sentence-openings, clarity, conciseness
- **Rationale**: Eliminating 'there is/are' openings creates more direct, engaging prose by putting the real subject first and reducing unnecessary words. Overusing 'there is/are' constructions creates weak, wordy prose that delays getting to the main point, potentially losing reader attention and reducing impact. Strong writing leads with meaningful subjects and active constructions rather than delaying the real content with filler words.

**Prohibited:**
```md
There are several bugs in the code.

There is a problem with the server.

There are three options available.
```

*Reasoning*: These expletive constructions delay the real subject with filler words, creating weaker, wordier openings

**Required:**
```md
Several bugs exist in the code.

The server has a problem.

Three options are available.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Lead with the actual subject instead of 'there is/are'.

## Place emphatic words at the end of sentences

- **Rule ID**: STRUNK_EMPHATIC_END_001
- **Description**: Place emphatic words at the end of sentences. The end position receives natural emphasis in English—important words should go there.
- **Keywords**: strunk-white, emphasis, sentence-structure, word-order, rhetoric, impact, clarity
- **Rationale**: The end position receives natural emphasis in English. Important words should go there. Burying important words in the middle weakens impact and clarity. Sentence structure should support meaning and emphasis.

**Prohibited:**
```md
Socialism is a good thing, I suppose.

The server crashed, unfortunately.
```

*Reasoning*: These sentences bury the qualifying or important information at the end as an afterthought, weakening the main assertion

**Required:**
```md
I suppose socialism is a good thing.

Unfortunately, the server crashed.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Place emphatic or important words in positions of natural emphasis.

## Maintain verb tense consistency

- **Rule ID**: STRUNK_TENSE_CONSISTENCY_001
- **Description**: Maintain verb tense consistency throughout passages. Once you establish a tense for describing events or procedures, maintain that tense throughout the section unless there's a clear logical reason to shift.
- **Keywords**: grammar, verb-tense, consistency, procedural-writing, technical-documentation, clarity, flow
- **Rationale**: Consistent verb tense creates smooth reading flow and prevents confusion about when actions occur. In technical documentation, tense shifts can make procedures unclear. Inconsistent tense creates jarring reading experiences and can confuse users about the sequence or timing of actions, especially in instructional content. Consistent grammatical patterns allow readers to focus on content meaning rather than being distracted by structural inconsistencies.

**Prohibited:**
```md
First, open the file. Then you will save it. Next, we closed the application.

The user clicks the button and then selected an option.

Configure the settings, then you have tested the connection.
```

*Reasoning*: These examples shift verb tenses inconsistently, creating confusion about the timing and sequence of actions

**Required:**
```md
First, open the file. Then save it. Next, close the application.

The user clicks the button and then selects an option.

Configure the settings, then test the connection.
```

*Scope*: All written content, especially procedural: component text, documentation, essays, user interfaces. Maintain consistent tense within sections.

## Keep related words together

- **Rule ID**: STRUNK_RELATED_WORDS_001
- **Description**: Keep related words together. Place modifiers near what they modify. Word order should reflect logical relationships.
- **Keywords**: strunk-white, word-order, modifiers, clarity, grammar, misplaced-modifiers, proximity
- **Rationale**: Separated related words create confusion about what modifies what. Misplaced words can completely change meaning or create ambiguity. Word order should reflect logical relationships.

**Prohibited:**
```md
He only found two coins.

She almost ate everything.
```

*Reasoning*: The modifiers 'only' and 'almost' are placed too far from the words they modify, creating potential ambiguity about meaning

**Required:**
```md
He found only two coins.

She ate almost everything.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Place modifiers immediately adjacent to what they modify.

## Use 'that' for restrictive clauses, 'which' for non-restrictive

- **Rule ID**: STRUNK_THAT_WHICH_001
- **Description**: Use 'that' for restrictive clauses, 'which' for non-restrictive clauses. The distinction clarifies whether information is essential or supplementary.
- **Keywords**: grammar, that-which, restrictive-clauses, non-restrictive-clauses, clarity, precision, relative-pronouns
- **Rationale**: That/which distinction clarifies whether information is essential or supplementary. Wrong usage creates ambiguity about what information is critical. Grammar should clarify meaning, not obscure it.

**Prohibited:**
```md
The report which was filed yesterday needs review (when identifying specific report).

The car, that is red, is mine (when adding supplementary detail).
```

*Reasoning*: Using 'which' for restrictive clauses or 'that' for non-restrictive clauses confuses whether the information is essential for identification

**Required:**
```md
The report that was filed yesterday needs review (restrictive—identifies specific report).

The report, which was filed yesterday, needs review (non-restrictive—adds supplementary info).
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use 'that' for essential info, 'which' (with commas) for supplementary.

## No gratuitous anything (Occam's Razor)

- **Rule ID**: OCCAMS_RAZOR_001
- **Description**: No gratuitous anything (Occam's Razor correctly understood). If two solutions solve the problem equally, choose the simpler. Every element must justify its existence by supporting the goal.
- **Keywords**: occams-razor, simplicity, necessity, parsimony, purpose, minimalism, clarity, efficiency
- **Rationale**: Entities should not be multiplied without necessity. Complexity should serve purpose, not ego. Gratuitous elements waste cognitive resources and obscure core purpose. Every word, sentence, paragraph, feature must have a purpose that supports the objective.

**Prohibited:**
```md
Unnecessary adjectives, redundant explanations, decorative but meaningless elements, features added for completeness rather than user needs.
```

*Reasoning*: Elements that exist without serving the core purpose waste reader attention and cognitive resources while obscuring the main goal

**Required:**
```md
Every element chosen because it advances understanding or serves the user's needs. Each word, sentence, feature, and design choice must justify its existence by supporting the goal.
```

*Scope*: All aspects of creation: content, design, code, features. Apply Occam's Razor to eliminate gratuitous complexity.

## Use comma after introductory expressions

- **Rule ID**: STRUNK_INTRODUCTORY_COMMA_001
- **Description**: When starting a sentence with introductory words, phrases, or clauses, place a comma after them to separate them from the main clause. This helps readers identify where the introduction ends and the main sentence begins.
- **Keywords**: punctuation, commas, introductory-elements, sentence-structure, clarity, visual-grammar, readability
- **Rationale**: Introductory commas provide essential visual breaks that help readers parse sentence structure correctly and understand the relationship between introductory elements and main clauses. Without introductory commas, readers may misparse sentences, leading to confusion about meaning and awkward reading rhythm. This is particularly problematic in technical documentation where precision is crucial. Clear punctuation serves as visual syntax that guides readers through complex ideas, mirroring how code uses indentation and brackets to show structure.

**Prohibited:**
```md
After the meeting we discussed the results.

In the morning the server crashed.

Because of the error users couldn't login.
```

*Reasoning*: Without commas, readers must work harder to identify where the introductory element ends and the main clause begins

**Required:**
```md
After the meeting, we discussed the results.

In the morning, the server crashed.

Because of the error, users couldn't login.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use comma after introductory elements.

## Use 'data' as a plural noun

- **Rule ID**: STRUNK_DATA_PLURAL_001
- **Description**: In formal writing, treat 'data' as plural ('data are', 'these data show'), not singular. Use 'datum' for the singular form when referring to a single piece of information, though 'data point' is also acceptable in modern usage.
- **Keywords**: grammar, data, plural, singular, technical-writing, formal-writing, precision, style
- **Rationale**: Proper treatment of 'data' as plural maintains formal writing standards and demonstrates attention to linguistic precision, which is especially important in technical and scientific contexts. Using 'data is' instead of 'data are' can appear informal or imprecise in professional documentation, potentially undermining credibility in technical contexts. Linguistic precision in technical writing mirrors the precision expected in code—both reflect attention to detail and professional standards.

**Prohibited:**
```md
The data is stored in the database.

This data shows clear trends.

Data is being processed.
```

*Reasoning*: Treating 'data' as singular ('data is') violates formal writing conventions and appears imprecise in technical contexts

**Required:**
```md
The data are stored in the database.

These data show clear trends.

Data are being processed.
```

*Scope*: Formal and technical writing: component text, documentation, essays, user interfaces. Treat 'data' as plural in professional contexts.

## Use 'fewer' for countable nouns, 'less' for mass nouns

- **Rule ID**: STRUNK_FEWER_LESS_001
- **Description**: Use 'fewer' when you can count individual items ('fewer errors', 'fewer users'). Use 'less' for quantities that cannot be counted individually ('less time', 'less memory', 'less complexity').
- **Keywords**: grammar, fewer, less, countable, uncountable, mass-nouns, count-nouns, precision, usage
- **Rationale**: The fewer/less distinction reflects logical differences between countable and uncountable quantities, maintaining precision in technical and professional communication. Using 'less' with countable nouns sounds informal and can distract readers from your content, potentially undermining professional credibility in formal documents. Language precision mirrors the logical distinctions that matter in programming—different types of quantities deserve different grammatical treatment.

**Prohibited:**
```md
less bugs

less features

less options

less iterations
```

*Reasoning*: Using 'less' with countable nouns violates grammatical precision and sounds informal in professional writing

**Required:**
```md
fewer bugs

fewer features

fewer options

fewer iterations
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Use 'fewer' for countable, 'less' for uncountable quantities.

## Murder your darlings

- **Rule ID**: MURDER_DARLINGS_001
- **Description**: Murder your darlings—cut beautiful prose that doesn't serve the purpose. Personal attachment to clever writing shouldn't override clarity and goal.
- **Keywords**: editing, revision, clarity, purpose, conciseness, kill-your-darlings, arthur-quiller-couch, writing-craft
- **Rationale**: Beautiful but purposeless content distracts from the main goal. Every sentence must earn its place. Keeping irrelevant beautiful content confuses readers and obscures purpose. Purpose over personal attachment—serve the reader's needs. (Origin: Sir Arthur Quiller-Couch—when writing doesn't serve the story, cut it regardless of beauty.)

**Prohibited:**
```md
Elaborate metaphor that sounds clever but confuses the point.

Lengthy poetic description that distracts from the core message.

Clever wordplay that obscures rather than illuminates.
```

*Reasoning*: Writing that exists for its own beauty rather than to serve the reader's needs should be cut, no matter how attached you are to it

**Required:**
```md
Direct statement of the concept.

Clear explanation that serves the reader's understanding.

Precise language that advances the goal.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Ruthlessly cut content that doesn't serve the purpose.

## Avoid qualifiers

- **Rule ID**: STRUNK_AVOID_QUALIFIERS_001
- **Description**: Avoid qualifiers like 'rather', 'very', 'pretty', 'quite'. Use definite language or choose stronger words. Strong words stand alone.
- **Keywords**: strunk-white, qualifiers, hedging, definiteness, precision, strong-writing, word-choice, clarity
- **Rationale**: Qualifiers weaken statements and add vagueness. Strong words stand alone. Qualifiers make writing tentative and unconvincing. Confidence in expression—say what you mean clearly.

**Prohibited:**
```md
rather difficult

very important

pretty good

quite sure
```

*Reasoning*: Qualifiers weaken the base words and make statements tentative instead of definite and clear

**Required:**
```md
difficult

crucial

excellent

certain
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Choose strong definite words over weak words with qualifiers.

## Avoid succession of loose sentences

- **Rule ID**: STRUNK_SENTENCE_VARIETY_001
- **Description**: Vary sentence structure. Connect related ideas with subordination and coordination. Avoid monotonous succession of loose sentences.
- **Keywords**: strunk-white, sentence-variety, rhythm, flow, subordination, coordination, style, readability
- **Rationale**: Monotonous sentence patterns create boring, choppy prose. Variety creates flow and emphasizes relationships. All simple sentences create choppy, elementary writing style. Sentence structure should support meaning and create readable rhythm.

**Prohibited:**
```md
The user clicked submit. The form validated. The data was saved. A confirmation appeared.
```

*Reasoning*: This series of simple sentences creates choppy, monotonous prose that fails to show relationships between ideas

**Required:**
```md
When the user clicked submit, the form validated and saved the data, then displayed a confirmation.
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Vary sentence structure to create flow and show relationships.

## Handle split infinitives thoughtfully

- **Rule ID**: STRUNK_SPLIT_INFINITIVES_001
- **Description**: While the traditional rule against split infinitives has relaxed in modern usage, generally avoid splitting infinitives unless it creates more natural, clearer expression. When an adverb fits naturally between 'to' and the verb, splitting may be acceptable.
- **Keywords**: grammar, split-infinitives, infinitives, adverbs, style, naturalness, formality
- **Rationale**: Thoughtful handling of infinitives maintains smooth prose flow while allowing for natural expression. Extreme adherence can create awkward phrasing, but unnecessary splits can sound casual. Awkward infinitive handling can make prose sound either overly stiff or too casual. In professional documentation, this affects perceived credibility and readability. Grammar rules should serve clarity and naturalness—rigid adherence that harms comprehension defeats the purpose of good writing.

**Prohibited:**
```md
To really understand the concept

To carefully review each item

To boldly go where no one has gone
```

*Reasoning*: These split infinitives can be avoided without creating awkward phrasing, maintaining a more formal professional tone

**Required:**
```md
To understand the concept thoroughly

To review each item carefully

To go boldly where no one has gone
```

*Scope*: All written content: component text, documentation, essays, user interfaces. Avoid split infinitives when possible without awkwardness.
