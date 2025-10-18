# Content Rules

## Use 'while' for time, 'although' for concession

- **Description**: Use 'while' for time, 'although' for concession. Reserve 'while' for temporal relationships (things happening simultaneously) and use 'although', 'though', or 'whereas' for contrasts or concessions. This distinction creates clearer logical relationships.
- **Rule ID**: STRUNK_WHILE_ALTHOUGH_001
- **Category**: content
- **Priority**: 7
- **Reason**: Precise word choice clarifies the logical relationship between clauses, helping readers understand whether you're indicating time, contrast, or concession.
- **Consequences**: Using 'while' for contrast can momentarily confuse readers about timing versus logical relationships, slowing comprehension and weakening argument structure.
- **Philosophy**: Each word should carry precise semantic meaning—using the right conjunction helps readers follow your logical flow effortlessly.
- **Examples**:
  - Incorrect:
    1. While I understand your concern, I disagree
    2. The system works while being inefficient
    3. While the code compiles, it has bugs
  - Correct:
    1. Although I understand your concern, I disagree
    2. The system works, although inefficiently
    3. Though the code compiles, it has bugs
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Avoid 'and/or' constructions

- **Description**: Avoid 'and/or' constructions. Instead of using 'and/or', choose either 'and' or 'or' based on the intended meaning, or rewrite the sentence to be clearer. The slash construction is often imprecise and can confuse readers about what relationships actually exist.
- **Rule ID**: STRUNK_AVOID_AND_OR_001
- **Category**: content
- **Priority**: 8
- **Reason**: The 'and/or' construction is imprecise and forces readers to interpret multiple possible meanings simultaneously, reducing clarity in professional communication.
- **Consequences**: Using 'and/or' creates ambiguity about whether options are exclusive, inclusive, or both. This can lead to misunderstandings, especially in technical specifications or user instructions.
- **Philosophy**: Clear writing makes definitive statements about relationships between concepts rather than forcing readers to interpret multiple possibilities.
- **Examples**:
  - Vague:
    1. Users can edit and/or delete records
    2. Submit via email and/or fax
    3. Choose one and/or more options
  - Concrete:
    1. Users can edit or delete records
    2. Submit via email or fax
    3. Choose one or more options
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Form possessive of plural nouns correctly

- **Description**: Form possessive of plural nouns correctly. For plural nouns ending in 's', add only an apostrophe ('employees' benefits'). For plural nouns not ending in 's', add apostrophe and 's' ('children's toys', 'people's opinions'). This maintains clear ownership relationships.
- **Rule ID**: STRUNK_POSSESSIVE_PLURAL_001
- **Category**: content
- **Priority**: 8
- **Reason**: Correct possessive formation prevents confusion about ownership and maintains professional writing standards, especially important in business and technical contexts.
- **Consequences**: Incorrect possessive forms can confuse readers about ownership relationships and appear unprofessional, potentially undermining credibility in formal documents.
- **Philosophy**: Precise punctuation serves as visual grammar that clarifies relationships between entities—correct possessives remove ambiguity about ownership.
- **Examples**:
  - Incorrect:
    1. employee's benefits (multiple employees)
    2. childrens' toys
    3. peoples' opinions
    4. users's data
  - Correct:
    1. employees' benefits
    2. children's toys
    3. people's opinions
    4. users' data
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Write with nouns and verbs, not adjectives and adverbs

- **Description**: Write with nouns and verbs, not adjectives and adverbs. Strong words carry meaning better than modified weak words
- **Rule ID**: STRUNK_NOUNS_VERBS_001
- **Category**: content
- **Priority**: 9
- **Reason**: Nouns and verbs carry the core meaning. Adjectives and adverbs often compensate for weak word choices
- **Consequences**: Over-reliance on modifiers creates wordy, weak writing
- **Philosophy**: Choose strong base words over weak words with modifiers
- **Examples**:
  - Weak:
    1. walked very quickly
    2. extremely important
    3. really good
  - Strong:
    1. rushed
    2. critical
    3. excellent
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use positive form

- **Description**: Use positive form. Tell what IS, not what ISN'T. 'He usually came late' not 'He was not very often on time'
- **Rule ID**: STRUNK_POSITIVE_FORM_001
- **Category**: content
- **Priority**: 9
- **Reason**: Positive statements are clearer and more direct. Easier to understand what actually happens
- **Consequences**: Negative forms require mental processing to understand the actual situation
- **Philosophy**: Direct communication - state reality clearly
- **Examples**:
  - Negative:
    1. He was not very often on time
    2. The report is not available
    3. This feature is not supported
  - Positive:
    1. He usually came late
    2. The report is unavailable
    3. This feature is unsupported
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Distinguish between dash and hyphen usage

- **Description**: Distinguish between dash and hyphen usage. Use em dashes (—) for parenthetical breaks, interruptions, or to set off explanatory material. Use hyphens (-) for compound words, prefixes, and line breaks. En dashes (–) are for ranges and connections between equal elements.
- **Rule ID**: STRUNK_DASH_HYPHEN_001
- **Category**: content
- **Priority**: 7
- **Reason**: Proper dash and hyphen usage creates clear visual distinctions between different types of breaks and connections, improving readability and professional appearance.
- **Consequences**: Incorrect dash/hyphen usage creates visual inconsistency and can confuse readers about the relationship between ideas. Overuse of hyphens where dashes belong weakens the prose.
- **Philosophy**: Different punctuation marks serve specific semantic purposes—using them correctly helps readers understand the precise relationship between concepts.
- **Examples**:
  - Incorrect:
    1. The API - which handles authentication - was updated
    2. twenty-five to thirty users
    3. self-contained component
    4. The server crashed-we lost all data
  - Correct:
    1. The API—which handles authentication—was updated
    2. twenty-five to thirty users
    3. self-contained component
    4. The server crashed—we lost all data
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Know your audience and write for them

- **Description**: Know your audience and write for them. Ask 'Who is the intended audience?' if unclear. Generally Sitebender users are not developers - avoid technical jargon unless clearly addressing experts
- **Rule ID**: AUDIENCE_AWARENESS_001
- **Category**: content
- **Priority**: 10
- **Reason**: Content must match audience knowledge and needs. Technical language excludes non-technical users
- **Consequences**: Wrong audience level creates confusion, exclusion, or condescension
- **Philosophy**: Write for the reader, not the writer
- **Examples**:
  - Technical: Configure the RESTful API endpoint parameters
  - User Friendly: Set up your connection settings
- **Default Audience**: Sitebender end users (designers, hobbyists, laypersons) not enterprise developers
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use semicolon to separate independent clauses

- **Description**: Use semicolon to separate independent clauses not joined by conjunction. 'The meeting ran late; we missed dinner' not 'The meeting ran late, we missed dinner'
- **Rule ID**: STRUNK_SEMICOLON_001
- **Category**: content
- **Priority**: 8
- **Reason**: Comma splice is grammatically incorrect and creates run-on sentences
- **Consequences**: Comma splices confuse readers about sentence boundaries and relationships
- **Philosophy**: Proper punctuation supports clear meaning
- **Examples**:
  - Comma Splice:
    1. The server crashed, all data was lost
    2. She studied hard, the test was still difficult
  - Correct:
    1. The server crashed; all data was lost
    2. She studied hard, but the test was still difficult
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Enclose parenthetic expressions between commas

- **Description**: Enclose parenthetic expressions between commas. 'The report, which was due yesterday, is still incomplete'
- **Rule ID**: STRUNK_PARENTHETIC_001
- **Category**: content
- **Priority**: 7
- **Reason**: Commas signal that information is supplementary, not essential to the main statement
- **Consequences**: Missing commas make it unclear what information is essential vs supplementary
- **Philosophy**: Punctuation should clarify meaning and information hierarchy
- **Examples**:
  - Correct:
    1. The manager, who started last month, called a meeting
    2. My brother, an engineer, designed the bridge
  - Wrong:
    1. The manager who started last month called a meeting
    2. My brother an engineer designed the bridge
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Make the paragraph the unit of composition

- **Description**: Make the paragraph the unit of composition. Begin each paragraph with a topic sentence that states the main idea
- **Rule ID**: STRUNK_PARAGRAPH_UNITY_001
- **Category**: content
- **Priority**: 8
- **Reason**: Paragraphs with clear topic sentences help readers follow the argument and understand structure
- **Consequences**: Paragraphs without clear focus confuse readers about the main point
- **Philosophy**: Each paragraph should advance one main idea
- **Examples**:
  - Clear: Pagewright components ensure accessibility. Every component includes proper ARIA labels, keyboard navigation, and semantic structure.
  - Unfocused: Pagewright has many features. Components are accessible. We also have good performance. Users like the interface.
- **Applies To**:
  1. documentation
  2. essays
  3. user_interface

## Place quotation marks correctly with periods and commas

- **Description**: Place quotation marks correctly with periods and commas. In American English, periods and commas always go inside quotation marks, regardless of whether they are part of the quoted material. This applies to both direct quotes and when referring to titles or specific terms.
- **Rule ID**: STRUNK_QUOTATION_MARKS_001
- **Category**: content
- **Priority**: 8
- **Reason**: Consistent quotation mark placement follows established American English conventions and maintains professional appearance in documentation and user interfaces.
- **Consequences**: Incorrect quotation mark placement appears unprofessional and can confuse readers about what is being quoted. In technical documentation, this inconsistency undermines credibility.
- **Philosophy**: Typographical conventions serve as shared standards that allow readers to focus on content rather than being distracted by formatting inconsistencies.
- **Examples**:
  - Incorrect:
    1. He said "Hello world". The function is called "getData".
    2. The error message was "File not found"; please check the path.
    3. Click the "Save" button, then close the dialog.
  - Correct:
    1. He said "Hello world." The function is called "getData."
    2. The error message was "File not found;" please check the path.
    3. Click the "Save" button, then close the dialog.
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use active voice

- **Description**: Use active voice. 'We decided' not 'It was decided'. 'The committee rejected the proposal' not 'The proposal was rejected'
- **Rule ID**: STRUNK_ACTIVE_VOICE_001
- **Category**: content
- **Priority**: 10
- **Reason**: Active voice is direct, clear, and assigns responsibility. Shows who does what
- **Consequences**: Passive voice obscures agency and creates wordy, weak sentences
- **Philosophy**: Direct communication - show who acts
- **Examples**:
  - Passive:
    1. Mistakes were made
    2. The system was updated
    3. Errors will be reported
  - Active:
    1. We made mistakes
    2. Engineers updated the system
    3. The app will report errors
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Omit needless words

- **Description**: Omit needless words. Delete phrases like 'the fact that', 'in order to', 'for the purpose of'
- **Rule ID**: STRUNK_OMIT_NEEDLESS_001
- **Category**: content
- **Priority**: 10
- **Reason**: Every word should earn its place. Extra words dilute meaning and waste reader's time
- **Consequences**: Verbose writing obscures meaning and tests reader patience
- **Philosophy**: Clarity through economy - no gratuitous words
- **Examples**:
  - Verbose: The fact that she was late is due to the reason that traffic was bad
  - Clear: She was late because of traffic
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Form possessive singular by adding 's

- **Description**: Form possessive singular by adding 's: James's, Mars's, the witness's. This applies to all singular nouns
- **Rule ID**: STRUNK_POSSESSIVE_001
- **Category**: content
- **Priority**: 7
- **Reason**: Consistent possessive formation eliminates confusion and follows standard English rules
- **Consequences**: Inconsistent possessives (James' vs James's) create style inconsistency
- **Philosophy**: Consistency in grammar supports clear communication
- **Examples**:
  - Correct:
    1. James's book
    2. Mars's surface
    3. the witness's testimony
  - Wrong:
    1. James' book
    2. Mars' surface
    3. the witness' testimony
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Write at 8th grade reading level maximum

- **Description**: Write at 8th grade reading level maximum for Sitebender content. Use simple sentences and common words unless technical precision requires complexity
- **Rule ID**: PLAIN_LANGUAGE_LEVEL_001
- **Category**: content
- **Priority**: 9
- **Reason**: 8th grade level ensures accessibility for most readers while maintaining precision
- **Consequences**: Complex language excludes users and increases cognitive load
- **Philosophy**: Universal understanding through clear communication
- **Examples**:
  - Complex: Utilize this functionality to accomplish your objective
  - Clear: Use this feature to reach your goal
- **Context**: Sitebender targets designers, hobbyists, and laypersons - not enterprise developers
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Express coordinate ideas in similar form

- **Description**: Express coordinate ideas in similar form. Use parallel construction in series and comparisons
- **Rule ID**: STRUNK_PARALLEL_CONSTRUCTION_001
- **Category**: content
- **Priority**: 8
- **Reason**: Parallel structure makes relationships clear and creates rhythm that aids comprehension
- **Consequences**: Mixed constructions confuse readers about relationships between ideas
- **Philosophy**: Similar ideas deserve similar expression
- **Examples**:
  - Not Parallel: The system is fast, reliable, and has good security
  - Parallel: The system is fast, reliable, and secure
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use definite, specific, concrete language

- **Description**: Use definite, specific, concrete language. 'A period of unfavorable weather' → 'Rain'. 'A considerable amount of' → 'Much'
- **Rule ID**: STRUNK_CONCRETE_LANGUAGE_001
- **Category**: content
- **Priority**: 10
- **Reason**: Concrete words create clear mental images. Vague language forces readers to guess meaning
- **Consequences**: Abstract language creates confusion and misunderstanding
- **Philosophy**: Precision in language creates precision in thought
- **Examples**:
  - Vague:
    1. A period of unfavorable weather
    2. A considerable amount of
    3. At this point in time
  - Concrete:
    1. Rain
    2. Much
    3. Now
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use serial comma before 'and' in series

- **Description**: Use serial comma before 'and' in series: 'A, B, and C' not 'A, B and C'
- **Rule ID**: STRUNK_SERIAL_COMMA_001
- **Category**: content
- **Priority**: 8
- **Reason**: Serial comma prevents ambiguity and misreading. Eliminates confusion about grouping
- **Consequences**: Missing serial comma can create unintended associations or unclear meaning
- **Philosophy**: Clarity over brevity - one character prevents misunderstanding
- **Examples**:
  - Unclear: I invited my parents, Einstein and Tesla (sounds like parents ARE Einstein and Tesla)
  - Clear: I invited my parents, Einstein, and Tesla (three separate parties)
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Avoid beginning sentences with 'there is/are'

- **Description**: Avoid beginning sentences with 'there is/are'. These constructions create weak, indirect openings. Instead, lead with the actual subject or a more direct statement. This creates stronger, more engaging prose that gets to the point quickly.
- **Rule ID**: STRUNK_AVOID_THERE_ARE_001
- **Category**: content
- **Priority**: 8
- **Reason**: Eliminating 'there is/are' openings creates more direct, engaging prose by putting the real subject first and reducing unnecessary words.
- **Consequences**: Overusing 'there is/are' constructions creates weak, wordy prose that delays getting to the main point, potentially losing reader attention and reducing impact.
- **Philosophy**: Strong writing leads with meaningful subjects and active constructions rather than delaying the real content with filler words.
- **Examples**:
  - Weak:
    1. There are several bugs in the code
    2. There is a problem with the server
    3. There are three options available
  - Strong:
    1. Several bugs exist in the code
    2. The server has a problem
    3. Three options are available
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Place emphatic words at the end of sentences

- **Description**: Place emphatic words at the end of sentences. 'Socialism is a good thing, I suppose' → 'I suppose socialism is a good thing'
- **Rule ID**: STRUNK_EMPHATIC_END_001
- **Category**: content
- **Priority**: 8
- **Reason**: The end position receives natural emphasis in English. Important words should go there
- **Consequences**: Burying important words in the middle weakens impact and clarity
- **Philosophy**: Sentence structure should support meaning and emphasis
- **Examples**:
  - Weak:
    1. Socialism is a good thing, I suppose
    2. The server crashed, unfortunately
  - Emphatic:
    1. I suppose socialism is a good thing
    2. Unfortunately, the server crashed
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Maintain verb tense consistency

- **Description**: Maintain verb tense consistency throughout passages. Once you establish a tense for describing events or procedures, maintain that tense throughout the section unless there's a clear logical reason to shift. This applies especially to documentation, tutorials, and procedural text.
- **Rule ID**: STRUNK_TENSE_CONSISTENCY_001
- **Category**: content
- **Priority**: 8
- **Reason**: Consistent verb tense creates smooth reading flow and prevents confusion about when actions occur. In technical documentation, tense shifts can make procedures unclear.
- **Consequences**: Inconsistent tense creates jarring reading experiences and can confuse users about the sequence or timing of actions, especially in instructional content.
- **Philosophy**: Consistent grammatical patterns allow readers to focus on content meaning rather than being distracted by structural inconsistencies.
- **Examples**:
  - Incorrect:
    1. First, open the file. Then you will save it. Next, we closed the application.
    2. The user clicks the button and then selected an option.
    3. Configure the settings, then you have tested the connection.
  - Correct:
    1. First, open the file. Then save it. Next, close the application.
    2. The user clicks the button and then selects an option.
    3. Configure the settings, then test the connection.
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Keep related words together

- **Description**: Keep related words together. 'He only found two coins' → 'He found only two coins'. Place modifiers near what they modify
- **Rule ID**: STRUNK_RELATED_WORDS_001
- **Category**: content
- **Priority**: 8
- **Reason**: Separated related words create confusion about what modifies what
- **Consequences**: Misplaced words can completely change meaning or create ambiguity
- **Philosophy**: Word order should reflect logical relationships
- **Examples**:
  - Separated:
    1. He only found two coins
    2. She almost ate everything
  - Together:
    1. He found only two coins
    2. She ate almost everything
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use 'that' for restrictive clauses, 'which' for non-restrictive

- **Description**: Use 'that' for restrictive clauses, 'which' for non-restrictive. 'The car that is red' (specific car) vs 'The car, which is red' (additional info)
- **Rule ID**: STRUNK_THAT_WHICH_001
- **Category**: content
- **Priority**: 8
- **Reason**: That/which distinction clarifies whether information is essential or supplementary
- **Consequences**: Wrong usage creates ambiguity about what information is critical
- **Philosophy**: Grammar should clarify meaning, not obscure it
- **Examples**:
  - Restrictive: The report that was filed yesterday needs review (specific report)
  - Non Restrictive: The report, which was filed yesterday, needs review (additional info about the report)
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## No gratuitous anything (Occam's Razor)

- **Description**: No gratuitous anything (Occam's Razor correctly understood). If two solutions solve the problem equally, choose the simpler. Every element must justify its existence by supporting the goal
- **Rule ID**: OCCAMS_RAZOR_001
- **Category**: content
- **Priority**: 10
- **Reason**: Entities should not be multiplied without necessity. Complexity should serve purpose, not ego
- **Consequences**: Gratuitous elements waste cognitive resources and obscure core purpose
- **Philosophy**: Every word, sentence, paragraph, feature must have a purpose that supports the objective
- **Examples**:
  - Gratuitous: Unnecessary adjectives, redundant explanations, decorative but meaningless elements
  - Purposeful: Every element chosen because it advances understanding or serves the user's needs
- **Scope**:
  1. content
  2. design
  3. code
  4. features
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface
  5. code

## Use comma after introductory expressions

- **Description**: Use comma after introductory expressions. When starting a sentence with introductory words, phrases, or clauses, place a comma after them to separate them from the main clause. This helps readers identify where the introduction ends and the main sentence begins.
- **Rule ID**: STRUNK_INTRODUCTORY_COMMA_001
- **Category**: content
- **Priority**: 8
- **Reason**: Introductory commas provide essential visual breaks that help readers parse sentence structure correctly and understand the relationship between introductory elements and main clauses.
- **Consequences**: Without introductory commas, readers may misparse sentences, leading to confusion about meaning and awkward reading rhythm. This is particularly problematic in technical documentation where precision is crucial.
- **Philosophy**: Clear punctuation serves as visual syntax that guides readers through complex ideas, mirroring how code uses indentation and brackets to show structure.
- **Examples**:
  - Incorrect:
    1. After the meeting we discussed the results
    2. In the morning the server crashed
    3. Because of the error users couldn't login
  - Correct:
    1. After the meeting, we discussed the results
    2. In the morning, the server crashed
    3. Because of the error, users couldn't login
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use 'data' as a plural noun

- **Description**: Use 'data' as a plural noun. In formal writing, treat 'data' as plural ('data are', 'these data show'), not singular. Use 'datum' for the singular form when referring to a single piece of information, though 'data point' is also acceptable in modern usage.
- **Rule ID**: STRUNK_DATA_PLURAL_001
- **Category**: content
- **Priority**: 7
- **Reason**: Proper treatment of 'data' as plural maintains formal writing standards and demonstrates attention to linguistic precision, which is especially important in technical and scientific contexts.
- **Consequences**: Using 'data is' instead of 'data are' can appear informal or imprecise in professional documentation, potentially undermining credibility in technical contexts.
- **Philosophy**: Linguistic precision in technical writing mirrors the precision expected in code—both reflect attention to detail and professional standards.
- **Examples**:
  - Incorrect:
    1. The data is stored in the database
    2. This data shows clear trends
    3. Data is being processed
  - Correct:
    1. The data are stored in the database
    2. These data show clear trends
    3. Data are being processed
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Use 'fewer' for countable nouns, 'less' for mass nouns

- **Description**: Use 'fewer' for countable nouns, 'less' for mass nouns. Use 'fewer' when you can count individual items ('fewer errors', 'fewer users'). Use 'less' for quantities that cannot be counted individually ('less time', 'less memory', 'less complexity').
- **Rule ID**: STRUNK_FEWER_LESS_001
- **Category**: content
- **Priority**: 7
- **Reason**: The fewer/less distinction reflects logical differences between countable and uncountable quantities, maintaining precision in technical and professional communication.
- **Consequences**: Using 'less' with countable nouns sounds informal and can distract readers from your content, potentially undermining professional credibility in formal documents.
- **Philosophy**: Language precision mirrors the logical distinctions that matter in programming—different types of quantities deserve different grammatical treatment.
- **Examples**:
  - Incorrect:
    1. less bugs
    2. less features
    3. less options
    4. less iterations
  - Correct:
    1. fewer bugs
    2. fewer features
    3. fewer options
    4. fewer iterations
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Murder your darlings

- **Description**: Murder your darlings - cut beautiful prose that doesn't serve the purpose. Personal attachment to clever writing shouldn't override clarity and goal
- **Rule ID**: MURDER_DARLINGS_001
- **Category**: content
- **Priority**: 9
- **Reason**: Beautiful but purposeless content distracts from the main goal. Every sentence must earn its place
- **Consequences**: Keeping irrelevant beautiful content confuses readers and obscures purpose
- **Philosophy**: Purpose over personal attachment - serve the reader's needs
- **Origin**: Sir Arthur Quiller-Couch - when writing doesn't serve the story, cut it regardless of beauty
- **Examples**:
  - Darling: Elaborate metaphor that sounds clever but confuses the point
  - Clear: Direct statement of the concept
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Avoid qualifiers

- **Description**: Avoid qualifiers like 'rather', 'very', 'pretty', 'quite'. Use definite language or choose stronger words
- **Rule ID**: STRUNK_AVOID_QUALIFIERS_001
- **Category**: content
- **Priority**: 9
- **Reason**: Qualifiers weaken statements and add vagueness. Strong words stand alone
- **Consequences**: Qualifiers make writing tentative and unconvincing
- **Philosophy**: Confidence in expression - say what you mean clearly
- **Examples**:
  - Qualified:
    1. rather difficult
    2. very important
    3. pretty good
    4. quite sure
  - Definite:
    1. difficult
    2. crucial
    3. excellent
    4. certain
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Avoid succession of loose sentences

- **Description**: Avoid succession of loose sentences. Vary sentence structure. Connect related ideas with subordination and coordination
- **Rule ID**: STRUNK_SENTENCE_VARIETY_001
- **Category**: content
- **Priority**: 8
- **Reason**: Monotonous sentence patterns create boring, choppy prose. Variety creates flow and emphasizes relationships
- **Consequences**: All simple sentences create choppy, elementary writing style
- **Philosophy**: Sentence structure should support meaning and create readable rhythm
- **Examples**:
  - Choppy: The user clicked submit. The form validated. The data was saved. A confirmation appeared.
  - Varied: When the user clicked submit, the form validated and saved the data, then displayed a confirmation.
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface

## Handle split infinitives thoughtfully

- **Description**: Handle split infinitives thoughtfully. While the traditional rule against split infinitives has relaxed in modern usage, generally avoid splitting infinitives unless it creates more natural, clearer expression. When an adverb fits naturally between 'to' and the verb, splitting may be acceptable.
- **Rule ID**: STRUNK_SPLIT_INFINITIVES_001
- **Category**: content
- **Priority**: 7
- **Reason**: Thoughtful handling of infinitives maintains smooth prose flow while allowing for natural expression. Extreme adherence can create awkward phrasing, but unnecessary splits can sound casual.
- **Consequences**: Awkward infinitive handling can make prose sound either overly stiff or too casual. In professional documentation, this affects perceived credibility and readability.
- **Philosophy**: Grammar rules should serve clarity and naturalness—rigid adherence that harms comprehension defeats the purpose of good writing.
- **Examples**:
  - Weak:
    1. To really understand the concept
    2. To carefully review each item
    3. To boldly go where no one has gone
  - Strong:
    1. To understand the concept thoroughly
    2. To review each item carefully
    3. To go boldly where no one has gone
- **Applies To**:
  1. component_text
  2. documentation
  3. essays
  4. user_interface
