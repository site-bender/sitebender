# JSX Rules

## Locale Management Patterns

- **Description**: JSX_I18N_002 - Locale Management Patterns: Locale providers must handle locale detection, fallback chains, and regional variations correctly. Support both static and dynamic locale switching. This ensures proper internationalization across different deployment scenarios while maintaining user experience and cultural sensitivity.
- **Rule ID**: JSX_I18N_002
- **Category**: i18n
- **Priority**: 7
- **Reason**: Ensures proper internationalization across different deployment scenarios while maintaining user experience and cultural sensitivity
- **Consequences**: Simplistic locale handling breaks internationalization in complex deployment scenarios and different cultural contexts
- **Philosophy**: Locale Management Patterns - locale detection, fallback chains, and regional variations with support for static and dynamic locale switching
- **Examples**:
  - Correct: <LocaleProvider>
  <DetectFromAcceptLanguageHeader />
  <DetectFrom.UserPreference />
  <FallbackChain locales={["en-US", "en", "es"]} />
  <DateFormat calendar="gregorian" />
  <NumberFormat currency="USD" />
</LocaleProvider>
  - Anti Pattern: <LocaleProvider locale="en" fallback="en" />
- **Applies To**:
  1. .tsx
  2. .jsx

## Data Injection Patterns

- **Description**: Data Injection Patterns - data injection components must specify clear data sources and handle loading/error states consistently. FromElement, FromApi components need fallback strategies.
- **Rule ID**: JSX_MATH_003
- **Category**: math
- **Priority**: 8
- **Reason**: Ensures reactive data flows are predictable and debuggable across complex application states
- **Consequences**: Unclear data dependencies make reactive systems unpredictable and hard to debug
- **Philosophy**: Data Injection Patterns - clear data sources with consistent loading/error state handling
- **Examples**:
  - Correct: <Display id="total">
  <Add>
    <From.Element selector="#subtotal" fallback="0" />
    <From.Api endpoint="/tax-rate" cache="5m" fallback="0.08" />
  </Add>
</Display>
  - Anti Pattern: <Display id="total" formula="subtotal + taxRate" />
- **Applies To**:
  1. .tsx
  2. .jsx

## Collaborative Development Patterns

- **Description**: JSX_DEVTOOLS_002 - Collaborative Development Patterns: Collaborative development components must handle real-time editing, conflict resolution, and team coordination with proper permission management. This ensures collaborative development features work reliably across distributed teams while maintaining project integrity.
- **Rule ID**: JSX_DEVTOOLS_002
- **Category**: devtools
- **Priority**: 7
- **Reason**: Ensures collaborative development features work reliably across distributed teams while maintaining project integrity
- **Consequences**: Unstructured collaboration leads to conflicts and breaks project integrity in distributed team environments
- **Philosophy**: Collaborative Development Patterns - real-time editing, conflict resolution, and team coordination with proper permission management
- **Examples**:
  - Correct: <CollaborativeSession id="team-project">
  <TeamConfiguration>
    <Participants>
      <Developer role="lead" permissions={["admin", "edit", "approve"]} />
      <Designer role="ux" permissions={["edit", "comment"]} />
    </Participants>
  </TeamConfiguration>
  <RealTimeEditing>
    <CrdtSync strategy="operational-transform" />
    <ConflictResolution automatic={true} fallback="manual" />
  </RealTimeEditing>
</CollaborativeSession>
  - Anti Pattern: <SharedEditor users={teamMembers} allowEdit={true} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Dashboard Component Structure

- **Description**: JSX_OBSERVABILITY_001 - Dashboard Component Structure: Dashboard components must maintain proper data flow, real-time updates, and accessibility. All metrics must specify units, ranges, and update frequencies. This ensures observability dashboards provide accurate, timely information while remaining accessible to all team members.
- **Rule ID**: JSX_OBSERVABILITY_001
- **Category**: observability
- **Priority**: 7
- **Reason**: Ensures observability dashboards provide accurate, timely information while remaining accessible to all team members
- **Consequences**: Unstructured dashboards without proper metrics provide misleading information and exclude team members
- **Philosophy**: Dashboard Component Structure - proper data flow, real-time updates, and accessibility with specified units, ranges, and update frequencies
- **Examples**:
  - Correct: <EnvoyWorkflowDashboard>
  <WorkflowCanvas>
    <LibraryNode id="warden" type="governance" status="active">
      <RealTimeMetrics updateInterval="1s">
        <ValidationTime unit="ms" range="0-5000">2300</ValidationTime>
        <ViolationCount>0</ViolationCount>
        <DeveloperSatisfaction>😊</DeveloperSatisfaction>
      </RealTimeMetrics>
    </LibraryNode>
  </WorkflowCanvas>
</EnvoyWorkflowDashboard>
  - Anti Pattern: <Dashboard>
  <Node id="warden" status="ok" />
  <Metric>2.3s</Metric>
</Dashboard>
- **Applies To**:
  1. .tsx
  2. .jsx

## Component Composition Guidelines

- **Description**: Component Composition Guidelines - favor composition over inheritance. Components should be small, focused, and composable. Use children patterns and declarative nesting for flexible composition.
- **Rule ID**: JSX_UNIVERSAL_003
- **Category**: universal
- **Priority**: 9
- **Reason**: Enables complex applications from simple building blocks while maintaining predictable behavior and testability across all Studio libraries
- **Consequences**: Monolithic components become unmaintainable and untestable
- **Philosophy**: Component Composition Guidelines - favor composition over inheritance, small focused composable components
- **Examples**:
  - Correct: <StateMachine name="checkout">
  <State name="cart">
    <Transition on="proceed" to="payment" />
  </State>
  <State name="payment">
    <Authentication required />
    <Transition on="complete" to="confirmation" />
  </State>
</StateMachine>
  - Anti Pattern: <CheckoutWorkflow
  authProvider="oauth"
  paymentGateway="stripe"
  states={checkoutConfig}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Transport Layer Configuration

- **Description**: JSX_EVENTS_002 - Transport Layer Configuration: Event components must specify transport mechanisms, retry policies, and failure handling. Support both local and distributed event delivery. This ensures reliable event delivery across different deployment scenarios while maintaining performance and consistency.
- **Rule ID**: JSX_EVENTS_002
- **Category**: events
- **Priority**: 8
- **Reason**: Ensures reliable event delivery across different deployment scenarios while maintaining performance and consistency
- **Consequences**: Implicit transport assumptions cause events to fail in different deployment environments
- **Philosophy**: Transport Layer Configuration - explicit transport mechanisms, retry policies, and failure handling for reliable event delivery
- **Examples**:
  - Correct: <Channel id="user-actions" transport="websocket" scope="session">
  <RetryPolicy attempts={3} backoff="exponential" />
  <Persistence strategy="memory" maxEvents={1000} />
</Channel>
  - Anti Pattern: <EventBus events={userEvents} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Context-Aware Component Usage

- **Description**: JSX_SEMANTIC_001 - Context-Aware Component Usage: Semantic components must be used in appropriate contexts. Heading components must be properly nested, Article components must contain meaningful content structures. This ensures generated HTML maintains proper semantic structure for accessibility and SEO while leveraging Pagewright's context-aware compilation.
- **Rule ID**: JSX_SEMANTIC_001
- **Category**: semantic
- **Priority**: 8
- **Reason**: Ensures generated HTML maintains proper semantic structure for accessibility and SEO while leveraging Pagewright's context-aware compilation
- **Consequences**: Improper semantic structure breaks accessibility, SEO, and context-aware compilation features
- **Philosophy**: Context-Aware Component Usage - semantic components used in appropriate contexts with proper nesting
- **Examples**:
  - Correct: <Article>
  <Heading><Title>Main Article</Title></Heading>
  <Section>
    <Heading><Title>Section Title</Title></Heading>
    <Paragraph>Content...</Paragraph>
  </Section>
</Article>
  - Anti Pattern: <div>
  <Heading level={3}><Title>Main Article</Title></Heading>
  <Heading level={1}><Title>Section Title</Title></Heading>
</div>
- **Applies To**:
  1. .tsx
  2. .jsx

## Compliance Framework Integration

- **Description**: JSX_GOVERNANCE_003 - Compliance Framework Integration: Compliance validation components must support multiple regulatory frameworks with specific technical and procedural requirements. Use standard compliance identifiers and requirements. This ensures workflows meet regulatory requirements across different jurisdictions while providing automated compliance verification.
- **Rule ID**: JSX_GOVERNANCE_003
- **Category**: governance
- **Priority**: 9
- **Reason**: Ensures workflows meet regulatory requirements across different jurisdictions while providing automated compliance verification
- **Consequences**: Generic compliance checking fails to meet specific regulatory requirements and makes automated verification impossible
- **Philosophy**: Compliance Framework Integration - multiple regulatory frameworks with specific technical and procedural requirements using standard compliance identifiers
- **Examples**:
  - Correct: <ComplianceValidation>
  <RegulatoryFrameworks>
    <Gpdr>
      <DataProcessingLawfulness>
        <ConsentManagement required={true} />
        <DataMinimization enforced={true} />
        <RightToErasure implemented={true} />
      </DataProcessingLawfulness>
      <TechnicalMeasures>
        <EncryptionAtRest required={true} />
        <AccessControls granular={true} />
      </TechnicalMeasures>
    </Gpdr>
    <Hipaa>
      <TechnicalSafeguards>
        <AccessControl unique="user-identification" />
        <AuditControls />
        <Integrity />
      </TechnicalSafeguards>
    </Hipaa>
  </RegulatoryFrameworks>
</ComplianceValidation>
  - Anti Pattern: <ComplianceChecker
  frameworks={["GPDR", "HIPAA"]}
  rules={complianceRules}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Collaborative Workflow Structure

- **Description**: JSX_DISTRIBUTED_003 - Collaborative Workflow Structure: Collaborative components must define clear ownership, permission, and conflict resolution patterns. Support graceful degradation when peers are offline. This ensures collaborative features work reliably across network conditions while maintaining data consistency and user experience.
- **Rule ID**: JSX_DISTRIBUTED_003
- **Category**: distributed
- **Priority**: 8
- **Reason**: Ensures collaborative features work reliably across network conditions while maintaining data consistency and user experience
- **Consequences**: Fragile collaborative patterns fail during network issues and provide poor user experience
- **Philosophy**: Collaborative Workflow Structure - clear ownership, permission, and conflict resolution patterns with graceful degradation
- **Examples**:
  - Correct: <CollaborativeWorkflow id="design-session">
  <Permissions>
    <Owner can="admin" />
    <Collaborator can="edit comment" />
    <Viewer can="read" />
  </Permissions>
  <OfflineStrategy>
    <QueueChanges />
    <SyncOnReconnect />
  </OfflineStrategy>
</CollaborativeWorkflow>
  - Anti Pattern: <SharedWorkspace
  owner="alice"
  collaborators={["bob", "charlie"]}
  requiresConnection={true}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Data-as-Configuration Principle

- **Description**: JSX_UNIVERSAL_001 - Data-as-Configuration Principle: Components must be configured through declarative data structures rather than imperative code. All component behavior should be derivable from props and composition patterns. This ensures all components can be serialized, stored as RDF triples, and reconstructed deterministically, enabling the core Studio principle that 'everything is data.'
- **Rule ID**: JSX_UNIVERSAL_001
- **Category**: universal
- **Priority**: 10
- **Reason**: Ensures all components can be serialized, stored as RDF triples, and reconstructed deterministically. Enables the core Studio principle that 'everything is data.'
- **Consequences**: Components become tightly coupled to imperative behavior and cannot be serialized or stored as data structures
- **Philosophy**: Data-as-Configuration Principle - components configured through declarative data structures rather than imperative code
- **Examples**:
  - Correct: <Authentication>
  <OAuthTwo provider="github" scopes={["read:user"]} />
</Authentication>
  - Anti Pattern: <Authentication onMount={() => setupOAuth("github")} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Translation Component Structure

- **Description**: JSX_I18N_001 - Translation Component Structure: Translation components must use structured keys, support interpolation, and handle pluralization correctly. Maintain type safety for translation keys and parameters. This ensures translations are maintainable, type-safe, and support complex linguistic features while enabling automated translation workflows.
- **Rule ID**: JSX_I18N_001
- **Category**: i18n
- **Priority**: 7
- **Reason**: Ensures translations are maintainable, type-safe, and support complex linguistic features while enabling automated translation workflows
- **Consequences**: Unsafe translation patterns break type safety and make complex linguistic features like pluralization impossible
- **Philosophy**: Translation Component Structure - structured keys, interpolation support, and correct pluralization handling with type safety
- **Examples**:
  - Correct: <Translation
  key="user.greeting.welcome"
  params={{name: userName, count: itemCount}}
  plural="count"
>
  <Zero>Welcome back!</Zero>
  <One>Welcome back, {name}! You have {count} item.</One>
  <Other>Welcome back, {name}! You have {count} items.</Other>
</Translation>
  - Anti Pattern: <Translation key="welcome" values={[userName, itemCount]} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Visual Workflow Canvas Structure

- **Description**: JSX_STATE_002 - Visual Workflow Canvas Structure: Visual workflow components must maintain coordinate systems, support collaborative editing, and provide accessibility features for workflow navigation. This ensures visual workflows are accessible, collaborative, and maintain consistency between visual and logical representations.
- **Rule ID**: JSX_STATE_002
- **Category**: state
- **Priority**: 7
- **Reason**: Ensures visual workflows are accessible, collaborative, and maintain consistency between visual and logical representations
- **Consequences**: Inaccessible visual workflows exclude users and break consistency between visual and logical state representations
- **Philosophy**: Visual Workflow Canvas Structure - coordinate systems, collaborative editing, and accessibility features for workflow navigation
- **Examples**:
  - Correct: <StateMachineWorkflowCanvas>
  <State
    name="initial"
    position={[100, 200]}
    ariaLabel="Initial state at coordinates 100, 200"
  >
    <Transitions>
      <Transition
        to="processing"
        event="start"
        path="curved"
        ariaLabel="Transition to processing on start event"
      />
    </Transitions>
  </State>
  <Grid visible={true} snapTo={25} />
</StateMachineWorkflowCanvas>
  - Anti Pattern: <WorkflowCanvas>
  <Node id="1" x={100} y={200} />
  <Edge from="1" to="2" />
</WorkflowCanvas>
- **Applies To**:
  1. .tsx
  2. .jsx

## Mathematical Component Structure

- **Description**: Mathematical Component Structure - mathematical operation components must have consistent structure with clear operand identification. Use semantic child components like Referent and Comparand.
- **Rule ID**: JSX_MATH_001
- **Category**: math
- **Priority**: 8
- **Reason**: Ensures mathematical expressions are readable, debuggable, and can be reliably converted between JSX and formula notation
- **Consequences**: Unclear operand roles make mathematical expressions unreadable and error-prone
- **Philosophy**: Mathematical Component Structure - consistent structure with clear operand identification using semantic child components
- **Examples**:
  - Correct: <IsGreaterThan>
  <Referent><From.Element selector="#age" /></Referent>
  <Comparand><Value>18</Value></Comparand>
</IsGreaterThan>
  - Anti Pattern: <IsGreaterThan left="#age" right="18" />
- **Applies To**:
  1. .tsx
  2. .jsx

## State Machine Component Design

- **Description**: JSX_STATE_001 - State Machine Component Design: State machine components must define explicit states, transitions, and guards. All state changes must be deterministic and auditable. This ensures application state is predictable, debuggable, and can be visualized or restored from audit logs.
- **Rule ID**: JSX_STATE_001
- **Category**: state
- **Priority**: 8
- **Reason**: Ensures application state is predictable, debuggable, and can be visualized or restored from audit logs
- **Consequences**: Implicit state management makes application behavior unpredictable and impossible to debug or audit
- **Philosophy**: State Machine Component Design - explicit states, transitions, and guards with deterministic and auditable state changes
- **Examples**:
  - Correct: <StateMachine name="document-lifecycle">
  <State name="draft">
    <Transition
      on="publish"
      to="published"
      guard={hasRequiredFields}
    />
  </State>
  <State name="published">
    <Transition on="archive" to="archived" />
    <Transition on="edit" to="draft" />
  </State>
</StateMachine>
  - Anti Pattern: <DocumentEditor
  status={docStatus}
  onStatusChange={setDocStatus}
  rules={statusRules}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## JSX is Not React

- **Description**: JSX is Not React - Studio JSX is a domain-specific language for data-driven components, not React. Understanding this distinction is crucial for proper component design.
- **Rule ID**: JSX_UNIVERSAL_005
- **Category**: universal
- **Priority**: 10
- **Reason**: Studio JSX is a domain-specific language for data-driven components, not React. Understanding this distinction is crucial for proper component design
- **Consequences**: Treating Studio JSX like React leads to imperative patterns that break data-first architecture
- **Philosophy**: JSX is Not React - Studio JSX compiles to data structures, not virtual DOM. Components are data configurations, not stateful objects
- **Examples**:
  - Correct: <Authentication>
  <OAuthTwo provider="github" />
  <WebAuthn fallback />
</Authentication>
  - Anti Pattern: const [auth, setAuth] = useState()
return <AuthProvider value={auth}>{children}</AuthProvider>
- **Applies To**:
  1. .tsx
  2. .jsx

## Identity and Authentication Patterns

- **Description**: JSX_DISTRIBUTED_002 - Identity and Authentication Patterns: Distributed components must properly handle identity verification and capability delegation. Use cryptographic identifiers consistently. This ensures secure collaboration and proper attribution in distributed systems while maintaining user privacy and data integrity.
- **Rule ID**: JSX_DISTRIBUTED_002
- **Category**: distributed
- **Priority**: 8
- **Reason**: Ensures secure collaboration and proper attribution in distributed systems while maintaining user privacy and data integrity
- **Consequences**: Unsafe identity patterns compromise security and break attribution in distributed collaborative systems
- **Philosophy**: Identity and Authentication Patterns - proper identity verification and capability delegation with cryptographic identifiers
- **Examples**:
  - Correct: <CollaborativeText id="doc-456">
  <Identity>
    <DidKey key="did:key:z6Mk..." />
    <Capabilities read write />
  </Identity>
  <Rga showCursors={true} />
</CollaborativeText>
  - Anti Pattern: <CollaborativeText userId="john123" allowEdit={true} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Formula Validation with Monads

- **Description**: Formula Validation with Monads - components that accept formula strings must validate mathematical syntax and variable references. Provide clear error messages for invalid formulas using monadic patterns for safe composition.
- **Rule ID**: JSX_MATH_002
- **Category**: math
- **Priority**: 8
- **Reason**: Prevents runtime errors and provides better development experience when working with mathematical expressions. Monadic patterns ensure safe composition
- **Consequences**: Unvalidated formulas cause runtime errors and unsafe composition breaks mathematical operations
- **Philosophy**: Formula Validation with Monads - validate mathematical syntax and variable references using monadic patterns for safe composition
- **Examples**:
  - Correct: <MathMlDisplay
  formula="E = mc²"
  variables={["E", "m", "c"]}
  onError={handleFormulaError}
/>
  - Anti Pattern: <MathMlDisplay formula={userInput} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Cross-Library Integration Patterns

- **Description**: JSX_UNIVERSAL_004 - Cross-Library Integration Patterns: Components from different libraries must integrate seamlessly. Use consistent naming conventions, data formats, and event patterns across all libraries. This enables complex applications that span multiple domains (authentication + commerce + i18n) while maintaining coherent development experience.
- **Rule ID**: JSX_UNIVERSAL_004
- **Category**: universal
- **Priority**: 9
- **Reason**: Enables complex applications that span multiple domains (authentication + commerce + i18n) while maintaining coherent development experience
- **Consequences**: Conflicting integration patterns make cross-library composition fragile and development experience inconsistent
- **Philosophy**: Cross-Library Integration Patterns - consistent naming conventions, data formats, and event patterns across all libraries
- **Examples**:
  - Correct: <LocaleProvider>
  <Authentication>
    <Cart>
      <Product sku="widget-001">
        <Translation key="product.name" />
      </Product>
    </Cart>
  </Authentication>
</LocaleProvider>
  - Anti Pattern: <I18nWrapper locale={currentLocale}>
  <AuthGuard token={authToken}>
    <CommerceProvider config={commerceConfig}>
      {/* Inconsistent prop names and patterns */}
    </CommerceProvider>
  </AuthGuard>
</I18nWrapper>
- **Applies To**:
  1. .tsx
  2. .jsx

## Schema.org Component Patterns

- **Description**: Schema.org Component Patterns - components that generate Schema.org markup must use proper microdata patterns and maintain semantic consistency with HTML structure.
- **Rule ID**: JSX_SEMANTIC_002
- **Category**: semantic
- **Priority**: 8
- **Reason**: Ensures rich snippets and structured data work correctly while maintaining the declarative nature of Pagewright components
- **Consequences**: Manual microdata conflicts with semantic structure and breaks Schema.org integration
- **Philosophy**: Schema.org Component Patterns - proper microdata patterns with semantic consistency
- **Examples**:
  - Correct: <Recipe>
  <Title>Chocolate Chip Cookies</Title>
  <Author>Jane Chef</Author>
  <Ingredient quantity="2 cups">flour</Ingredient>
  <Instructions step="1">Mix dry ingredients...</Instructions>
</Recipe>
  - Anti Pattern: <div itemScope itemType="https://schema.org/Recipe">
  <Recipe>
    <span itemProp="name">Cookies</span>
  </Recipe>
</div>
- **Applies To**:
  1. .tsx
  2. .jsx

## Authorization Policy Structure

- **Description**: JSX_SECURITY_002 - Authorization Policy Structure: Authorization components must use declarative policy definitions with clear resource and action specifications. Support policy composition and testing. This ensures access control is auditable, testable, and maintainable while preventing privilege escalation vulnerabilities.
- **Rule ID**: JSX_SECURITY_002
- **Category**: security
- **Priority**: 9
- **Reason**: Ensures access control is auditable, testable, and maintainable while preventing privilege escalation vulnerabilities
- **Consequences**: Opaque authorization logic makes security vulnerabilities impossible to detect or audit
- **Philosophy**: Authorization Policy Structure - declarative policy definitions with clear resource and action specifications
- **Examples**:
  - Correct: <Authorization>
  <Rbac>
    <Role name="editor">
      <Permission action="read" resource="articles:*" />
      <Permission action="write" resource="articles:own" />
    </Role>
    <Role name="admin" inherits="editor">
      <Permission action="*" resource="articles:*" />
    </Role>
  </Rbac>
</Authorization>
  - Anti Pattern: <ProtectedRoute
  allowedRoles={["admin", "editor"]}
  checkPermission={(user, resource) => checkAccess(user, resource)}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Cryptographic Component Requirements

- **Description**: JSX_SECURITY_003 - Cryptographic Component Requirements: Cryptographic components must use well-established algorithms, proper key management, and clear security properties. Provide audit trails for cryptographic operations. This ensures cryptographic operations are secure, auditable, and follow current best practices while avoiding common cryptographic pitfalls.
- **Rule ID**: JSX_SECURITY_003
- **Category**: security
- **Priority**: 9
- **Reason**: Ensures cryptographic operations are secure, auditable, and follow current best practices while avoiding common cryptographic pitfalls
- **Consequences**: Unsafe cryptographic patterns expose systems to security vulnerabilities and compliance violations
- **Philosophy**: Cryptographic Component Requirements - well-established algorithms, proper key management, and clear security properties with audit trails
- **Examples**:
  - Correct: <ZeroKnowledge>
  <Proof
    algorithm="zk-SNARK"
    statement="age >= 18"
    without={["name", "birthdate"]}
  />
  <Verify circuit="age-verification-v2.circom" />
</ZeroKnowledge>
  - Anti Pattern: <Encryption algorithm="custom" key={userPassword} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Developer Feedback Integration

- **Description**: JSX_OBSERVABILITY_004 - Developer Feedback Integration: Developer feedback components must provide contextual prompts, structured data collection, and trend analysis. Integrate feedback with performance metrics for correlation analysis. This ensures developer experience feedback is actionable and can drive systematic improvements to development workflows.
- **Rule ID**: JSX_OBSERVABILITY_004
- **Category**: observability
- **Priority**: 7
- **Reason**: Ensures developer experience feedback is actionable and can drive systematic improvements to development workflows
- **Consequences**: Generic feedback without context provides no actionable insights and fails to improve development workflows
- **Philosophy**: Developer Feedback Integration - contextual prompts, structured data collection, and trend analysis with performance metrics correlation
- **Examples**:
  - Correct: <WorkflowFeedback>
  <DeveloperSatisfaction>
    <FeedbackPrompt
      trigger="workflow-completion"
      context={{
        executionTime: "3.2s",
        errorCount: 0,
        workflowType: "ci-pipeline"
      }}
    >
      How was your experience with this CI pipeline execution?
      <Emojis>😱 😟 😐 😊 🤩</Emojis>
      <OptionalComment placeholder="What could be improved?" />
    </FeedbackPrompt>
    <CorrelationTracking>
      <TrackMetrics>
        <ExecutionTime />
        <ErrorFrequency />
        <CognitiveBurden />
      </TrackMetrics>
    </CorrelationTracking>
  </DeveloperSatisfaction>
</WorkflowFeedback>
  - Anti Pattern: <FeedbackWidget>
  <RatingScale min={1} max={5} />
  <CommentBox />
</FeedbackWidget>
- **Applies To**:
  1. .tsx
  2. .jsx

## Real-Time Monitoring Patterns

- **Description**: JSX_GOVERNANCE_004 - Real-Time Monitoring Patterns: Workflow monitoring components must provide real-time violation detection, automatic response capabilities, and comprehensive audit trails. Support both critical and warning level violations with appropriate responses. This ensures workflow governance is enforced continuously and violations are detected and responded to immediately.
- **Rule ID**: JSX_GOVERNANCE_004
- **Category**: governance
- **Priority**: 9
- **Reason**: Ensures workflow governance is enforced continuously and violations are detected and responded to immediately
- **Consequences**: Basic monitoring without response capabilities allows violations to persist and cause system damage
- **Philosophy**: Real-Time Monitoring Patterns - real-time violation detection, automatic response capabilities, and comprehensive audit trails with appropriate violation responses
- **Examples**:
  - Correct: <WorkflowMonitoring>
  <ContractCompliance>
    <RealTimeValidation>
      <CheckBounds continuously={true} />
      <ValidateConnections on="execution" />
      <VerifyPermissions before="sensitive-operations" />
    </RealTimeValidation>
    <ViolationDetection>
      <UnauthorizedConnections severity="critical" />
      <SecurityBoundaryBreach severity="critical" />
      <ResourceLimitExceeded severity="warning" />
    </ViolationDetection>
    <AutomaticResponse>
      <OnCriticalViolation>
        <HaltExecution immediately={true} />
        <NotifySecurityTeam />
        <IsolateWorkflow />
      </OnCriticalViolation>
    </AutomaticResponse>
  </ContractCompliance>
</WorkflowMonitoring>
  - Anti Pattern: <Monitor
  checkCompliance={true}
  alertOnViolation={true}
  logLevel="info"
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Authentication Provider Patterns

- **Description**: JSX_SECURITY_001 - Authentication Provider Patterns: Authentication components must support multiple providers, graceful fallbacks, and clear success/failure states. Avoid hardcoding secrets in components. This ensures secure and flexible authentication while maintaining user experience across different authentication scenarios.
- **Rule ID**: JSX_SECURITY_001
- **Category**: security
- **Priority**: 9
- **Reason**: Ensures secure and flexible authentication while maintaining user experience across different authentication scenarios
- **Consequences**: Insecure authentication patterns expose secrets and provide poor fallback experience
- **Philosophy**: Authentication Provider Patterns - multiple providers, graceful fallbacks, and clear success/failure states without hardcoded secrets
- **Examples**:
  - Correct: <Authentication>
  <OAuthTwo
    provider="github"
    clientIdFrom="env:GITHUB_CLIENT_ID"
    scopes={["read:user"]}
  />
  <WebAuthn fallback />
  <OnFailure><Redirect to="/login" /></OnFailure>
</Authentication>
  - Anti Pattern: <Authentication
  githubClientSecret="abc123..."
  providers={["github"]}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Workflow Orchestration Patterns

- **Description**: JSX_EVENTS_003 - Workflow Orchestration Patterns: Event-driven workflows must be composable and recoverable. Use explicit state machines for complex orchestration patterns. This ensures complex business processes are reliable, auditable, and can recover gracefully from failures.
- **Rule ID**: JSX_EVENTS_003
- **Category**: events
- **Priority**: 8
- **Reason**: Ensures complex business processes are reliable, auditable, and can recover gracefully from failures
- **Consequences**: Implicit workflow coupling makes business processes brittle and impossible to debug or recover
- **Philosophy**: Workflow Orchestration Patterns - composable and recoverable event-driven workflows with explicit state machines
- **Examples**:
  - Correct: <Workflow name="order-processing">
  <On event="order:created">
    <TriggerWorkflow name="validate-payment" />
  </On>
  <On event="payment:confirmed">
    <Pipe>
      <TriggerWorkflow name="reserve-inventory" />
      <TriggerWorkflow name="send-confirmation" />
    </Pipe>
  </On>
</Workflow>
  - Anti Pattern: <OrderProcessor
  onOrderCreated={validatePayment}
  onPaymentConfirmed={[reserveInventory, sendConfirmation]}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## AI Safety Constraint Patterns

- **Description**: JSX_GOVERNANCE_002 - AI Safety Constraint Patterns: AI workflow safety components must define explicit forbidden patterns, required components, and validation pipelines. All AI-generated workflows must be validated against these constraints. This prevents AI assistants from generating insecure or non-compliant workflows while maintaining development velocity.
- **Rule ID**: JSX_GOVERNANCE_002
- **Category**: governance
- **Priority**: 10
- **Reason**: Prevents AI assistants from generating insecure or non-compliant workflows while maintaining development velocity
- **Consequences**: Implicit AI safety assumptions allow dangerous workflow generation that bypasses security and compliance requirements
- **Philosophy**: AI Safety Constraint Patterns - explicit forbidden patterns, required components, and validation pipelines for AI-generated workflows
- **Examples**:
  - Correct: <AiWorkflowSafety>
  <GenerationConstraints>
    <ForbiddenPatterns>
      <Pattern name="direct-database-access" reason="security" />
      <Pattern name="bypass-authentication" reason="security" />
      <Pattern name="unencrypted-transmission" reason="compliance" />
    </ForbiddenPatterns>
    <RequiredComponents>
      <Component name="input-validation" />
      <Component name="error-handling" />
      <Component name="audit-logging" />
    </RequiredComponents>
  </GenerationConstraints>
  <ValidationPipeline>
    <PreValidation>
      <SecurityScanning />
      <ComplianceChecking />
    </PreValidation>
  </ValidationPipeline>
</AiWorkflowSafety>
  - Anti Pattern: <AIGuard
  blockedPatterns={dangerousPatterns}
  requiredFeatures={["validation", "logging"]}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Standard HTML Attributes

- **Description**: JSX_UNIVERSAL_006: Standard HTML Attributes - Use `for` instead of `htmlFor` and `class` instead of `className` since Studio's JSX compiles to vanilla HTML, not React components. Studio JSX doesn't have JavaScript reserved word conflicts like React does.
- **Rule ID**: JSX_UNIVERSAL_006
- **Category**: universal
- **Priority**: 9
- **Reason**: Studio JSX doesn't have JavaScript reserved word conflicts like React does, so standard HTML attributes should be used for clarity and consistency with the final HTML output
- **Consequences**: Using React-style props like htmlFor and className creates unnecessary abstraction and confusion since Studio JSX compiles to vanilla HTML where for and class are the natural attributes
- **Philosophy**: Standard HTML Attributes - Studio JSX compiles to vanilla HTML, not React components, so use standard HTML attributes that match the final output
- **Examples**:
  - Correct: <Label for="email-input">Email Address</Label>
<Input id="email-input" class="form-control" type="email" />
  - Anti Pattern: <Label htmlFor="email-input">Email Address</Label>
<Input id="email-input" className="form-control" type="email" />
- **Applies To**:
  1. .tsx
  2. .jsx

## Cryptographic Contract Structure

- **Description**: JSX_GOVERNANCE_001 - Cryptographic Contract Structure: Workflow governance components must define cryptographically verifiable contracts with clear requirements, compliance frameworks, and verification mechanisms. All contracts must be deterministic and auditable. This ensures architectural governance is unbreakable and provides cryptographic proof of compliance for critical business workflows.
- **Rule ID**: JSX_GOVERNANCE_001
- **Category**: governance
- **Priority**: 10
- **Reason**: Ensures architectural governance is unbreakable and provides cryptographic proof of compliance for critical business workflows
- **Consequences**: Unverifiable governance configuration allows violations to go undetected and makes compliance impossible to prove
- **Philosophy**: Cryptographic Contract Structure - cryptographically verifiable contracts with clear requirements, compliance frameworks, and verification mechanisms
- **Examples**:
  - Correct: <WorkflowGovernance>
  <WorkflowContract id="ci-cd-pipeline">
    <RequiredComponents>
      <Component name="security-scan" mandatory={true} />
      <Component name="warden-validation" mandatory={true} />
    </RequiredComponents>
    <ComplianceRequirements>
      <Gpdr dataRetention="P2Y" anonymization="required" />
      <Sox auditTrail="complete" approvalRequired={true} />
    </ComplianceRequirements>
  </WorkflowContract>
  <CryptographicVerification>
    <WorkflowSignature algorithm="Ed25519" />
    <IntegrityHash algorithm="SHA-256" />
  </CryptographicVerification>
</WorkflowGovernance>
  - Anti Pattern: <WorkflowConfig
  requirements={["security-scan", "validation"]}
  compliance={complianceRules}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Performance Monitoring Patterns

- **Description**: JSX_OBSERVABILITY_002 - Performance Monitoring Patterns: Performance monitoring components must aggregate data from multiple sources, handle missing data gracefully, and provide historical context for current metrics. This ensures performance monitoring provides actionable insights while handling the complexities of distributed systems and intermittent data.
- **Rule ID**: JSX_OBSERVABILITY_002
- **Category**: observability
- **Priority**: 7
- **Reason**: Ensures performance monitoring provides actionable insights while handling the complexities of distributed systems and intermittent data
- **Consequences**: Simplistic performance monitoring fails in distributed systems and provides misleading insights without proper data handling
- **Philosophy**: Performance Monitoring Patterns - data aggregation from multiple sources, graceful missing data handling, and historical context for current metrics
- **Examples**:
  - Correct: <BenchmarkAggregator>
  <CollectFrom>
    <ProductionDeployments />
    <DevelopmentEnvironments />
    <TestRuns />
  </CollectFrom>
  <Metrics>
    <Latency percentiles={[50, 90, 99, 99.9]} />
    <Throughput window="1m" />
    <MemoryUsage peak={true} average={true} />
  </Metrics>
  <HandleMissingData strategy="interpolate" maxGap="5m" />
  <StoreTo tripleStore="benchmarks" retention="30d" />
</BenchmarkAggregator>
  - Anti Pattern: <PerformanceMonitor metrics={["latency", "throughput"]} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Event Component Structure

- **Description**: JSX_EVENTS_001 - Event Component Structure: Event components must follow the triple pattern (subject-predicate-object) and maintain referential transparency. All events must be serializable. This ensures event-driven architectures are debuggable, auditable, and can be replayed or analyzed using RDF tools.
- **Rule ID**: JSX_EVENTS_001
- **Category**: events
- **Priority**: 8
- **Reason**: Ensures event-driven architectures are debuggable, auditable, and can be replayed or analyzed using RDF tools
- **Consequences**: Opaque event handling makes debugging impossible and breaks audit trail capabilities
- **Philosophy**: Event Component Structure - triple pattern (subject-predicate-object) with referential transparency and serializable events
- **Examples**:
  - Correct: <Button>
  <Publishes
    event="user:clicked:save-button"
    payload={documentId}
    timestamp="auto"
  />
  Save Document
</Button>
  - Anti Pattern: <Button onClick={() => saveDocument(doc.id)}>
  Save Document
</Button>
- **Applies To**:
  1. .tsx
  2. .jsx

## Conditional Rendering Structure

- **Description**: Conditional Rendering Structure - conditional rendering components must have explicit condition and consequence components. Avoid implicit boolean coercion.
- **Rule ID**: JSX_REACTIVE_001
- **Category**: reactive
- **Priority**: 8
- **Reason**: Makes conditional logic explicit and debuggable, especially important when conditions involve complex mathematical expressions
- **Consequences**: Implicit boolean coercion makes conditional logic hard to debug and understand
- **Philosophy**: Conditional Rendering Structure - explicit condition and consequence components without implicit boolean coercion
- **Examples**:
  - Correct: <ShowIf>
  <Condition>
    <IsGreaterThan>
      <Referent><FromElement selector="#score" /></Referent>
      <Comparand><Value>80</Value></Comparand>
    </IsGreaterThan>
  </Condition>
  <Consequence>
    <Display>Excellent work!</Display>
  </Consequence>
</ShowIf>
  - Anti Pattern: <ShowIf condition="score > 80">Excellent work!</ShowIf>
- **Applies To**:
  1. .tsx
  2. .jsx

## Visual Workflow Integration

- **Description**: JSX_OBSERVABILITY_003 - Visual Workflow Integration: Visual workflow components must maintain semantic consistency between visual representation and data model. Support collaborative editing with proper conflict resolution. This ensures visual workflows remain synchronized with their underlying data while supporting real-time collaboration.
- **Rule ID**: JSX_OBSERVABILITY_003
- **Category**: observability
- **Priority**: 7
- **Reason**: Ensures visual workflows remain synchronized with their underlying data while supporting real-time collaboration
- **Consequences**: Visual-only workflows without semantic meaning break synchronization and make collaboration impossible
- **Philosophy**: Visual Workflow Integration - semantic consistency between visual representation and data model with collaborative editing support
- **Examples**:
  - Correct: <WorkflowCanvas>
  <LibraryNode
    id="validation"
    semanticType="governance.validation"
    position={[200, 300]}
    ariaLabel="Validation node at position 200, 300"
  >
    <Inputs>
      <Port name="codebase" type="file[]" required={true} />
    </Inputs>
    <Outputs>
      <Port name="violations" type="violation[]" />
    </Outputs>
  </LibraryNode>
  <Connection
    from="validation.violations"
    to="autofix.input"
    semanticType="error-recovery"
    bidirectional={false}
  />
</WorkflowCanvas>
  - Anti Pattern: <Canvas>
  <Box id="1" x={200} y={300}>Validation</Box>
  <Line from="1" to="2" />
</Canvas>
- **Applies To**:
  1. .tsx
  2. .jsx

## Multi-Modal Interface Patterns

- **Description**: JSX_DEVTOOLS_001 - Multi-Modal Interface Patterns: Developer tool components must support multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes. This ensures development tooling is accessible and usable across different workflows while maintaining consistent behavior.
- **Rule ID**: JSX_DEVTOOLS_001
- **Category**: devtools
- **Priority**: 7
- **Reason**: Ensures development tooling is accessible and usable across different workflows while maintaining consistent behavior
- **Consequences**: Single-mode interfaces exclude users and create inconsistent development experiences across different workflows
- **Philosophy**: Multi-Modal Interface Patterns - multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes
- **Examples**:
  - Correct: <QuartermasterInterface>
  <VoiceGuidedSetup>
    <AiAssistant provider="claude" fallback="text" />
    <ConversationalConfig accessible={true} />
  </VoiceGuidedSetup>
  <GuiWizard fallback="voice" />
  <CliInterface scriptable={true} />
</QuartermasterInterface>
  - Anti Pattern: <ConfigWizard mode="gui" />
- **Applies To**:
  1. .tsx
  2. .jsx

## CRDT Component Configuration

- **Description**: JSX_DISTRIBUTED_001 - CRDT Component Configuration: CRDT components must specify unique identifiers, merge strategies, and synchronization policies. All distributed state changes must be commutative and idempotent. This ensures distributed components maintain consistency across network partitions and concurrent edits in collaborative environments.
- **Rule ID**: JSX_DISTRIBUTED_001
- **Category**: distributed
- **Priority**: 8
- **Reason**: Ensures distributed components maintain consistency across network partitions and concurrent edits in collaborative environments
- **Consequences**: Missing distributed state configuration breaks consistency and collaborative features in network partitions
- **Philosophy**: CRDT Component Configuration - unique identifiers, merge strategies, and synchronization policies for distributed state
- **Examples**:
  - Correct: <DistributedCounter
  id="shared-counter-123"
  mergeStrategy="lww"
  syncPolicy="immediate"
>
  <SyncWithPeers maxPeers={5} />
  <ConflictResolution strategy="automatic" />
</DistributedCounter>
  - Anti Pattern: <Counter value={count} onChange={setCount} />
- **Applies To**:
  1. .tsx
  2. .jsx

## Product Component Modeling

- **Description**: JSX_COMMERCE_001 - Product Component Modeling: Product components must maintain referential integrity, support variant relationships, and handle inventory tracking. Use semantic component names that reflect business domain. This ensures commerce components accurately represent business relationships while maintaining data consistency across complex product catalogs.
- **Rule ID**: JSX_COMMERCE_001
- **Category**: commerce
- **Priority**: 7
- **Reason**: Ensures commerce components accurately represent business relationships while maintaining data consistency across complex product catalogs
- **Consequences**: Flat product structure breaks referential integrity and makes complex product relationships unmanageable
- **Philosophy**: Product Component Modeling - referential integrity, variant relationships, and inventory tracking with semantic business domain names
- **Examples**:
  - Correct: <Product sku="WIDGET-001" name="Deluxe Widget">
  <Variant name="color" options={["red", "blue"]} affects="price" />
  <Variant name="size" options={["S", "M", "L"]} affects="inventory" />
  <BasePrice currency="USD">29.99</BasePrice>
  <Inventory>
    <TrackQuantity />
    <ReserveOnAddToCart />
  </Inventory>
</Product>
  - Anti Pattern: <Product
  sku="WIDGET-001"
  variants={[{color: "red", size: "S", price: 29.99}]}
/>
- **Applies To**:
  1. .tsx
  2. .jsx

## Progressive Enhancement Integration

- **Description**: Progressive Enhancement Integration - components must work without JavaScript and enhance progressively when client-side functionality is available. Use data-enhance attributes for enhancement hints.
- **Rule ID**: JSX_UNIVERSAL_002
- **Category**: universal
- **Priority**: 9
- **Reason**: Ensures accessibility, performance, and reliability across all network conditions while maintaining the full interactive experience when possible
- **Consequences**: Client-only functionality breaks accessibility and fails without JavaScript
- **Philosophy**: Progressive Enhancement Integration - components work without JavaScript and enhance when available
- **Examples**:
  - Correct: <Form data-enhance="realtime-validation">
  <Input name="email" type="email" required />
  <Button type="submit">Submit</Button>
</Form>
  - Anti Pattern: <Form onSubmit={handleSubmit}>
  <ValidatedInput name="email" validator={emailValidator} />
</Form>
- **Applies To**:
  1. .tsx
  2. .jsx

## Progressive Enhancement and Data Attributes

- **Description**: Progressive Enhancement and Data Attributes - components must use props that compile to data-enhance HTML output attributes for progressive enhancement. Props control enhancement behavior, not HTML attributes directly. Enhancement behavior must be additive, not replacing base functionality.
- **Rule ID**: JSX_SEMANTIC_003
- **Category**: semantic
- **Priority**: 8
- **Reason**: Ensures semantic HTML works perfectly without JavaScript while providing rich interactions when available. Clarifies that data-enhance is HTML output, not JSX props
- **Consequences**: JavaScript-dependent functionality or direct HTML attributes break progressive enhancement
- **Philosophy**: Progressive Enhancement and Data Attributes - props compile to data-enhance HTML attributes, enhancement behavior is additive
- **Examples**:
  - Correct: <Article readingProgress={true}>
  <Heading><Title>Long Article</Title></Heading>
  <Section lazyLoad={true}>
    <Paragraph>Content...</Paragraph>
  </Section>
</Article>
  - Anti Pattern: <Article data-enhance="reading-progress" onScrollProgress={updateProgress}>
  <LazySection loader={<Spinner />}>
    <Paragraph>Content...</Paragraph>
  </LazySection>
</Article>
- **Applies To**:
  1. .tsx
  2. .jsx

## Blueprint Validation and Marketplace

- **Description**: JSX_DEVTOOLS_003 - Blueprint Validation and Marketplace: Blueprint components must enforce cryptographic signing, security scanning, and version management for community sharing. This ensures shared blueprints are secure, verified, and properly versioned while enabling community collaboration.
- **Rule ID**: JSX_DEVTOOLS_003
- **Category**: devtools
- **Priority**: 7
- **Reason**: Ensures shared blueprints are secure, verified, and properly versioned while enabling community collaboration
- **Consequences**: Unsecured blueprint sharing exposes security vulnerabilities and breaks trust in community collaboration
- **Philosophy**: Blueprint Validation and Marketplace - cryptographic signing, security scanning, and version management for community sharing
- **Examples**:
  - Correct: <BlueprintMarketplace>
  <CommunityBlueprints>
    <CryptographicSigning algorithm="Ed25519" required={true} />
    <WardenValidation automatic={true} />
    <SecurityScanning depth="deep" />
  </CommunityBlueprints>
  <Publishing>
    <MetadataValidation schema="blueprint-v2" />
    <VersionControl semantic={true} />
  </Publishing>
</BlueprintMarketplace>
  - Anti Pattern: <BlueprintShare community={true} validation="optional" />
- **Applies To**:
  1. .tsx
  2. .jsx

## Financial Calculation Accuracy

- **Description**: JSX_COMMERCE_002 - Financial Calculation Accuracy: Financial calculations must use proper decimal arithmetic and currency handling. All monetary amounts must specify currency and precision requirements. This prevents financial calculation errors and ensures compliance with currency regulations while maintaining audit trails for financial operations.
- **Rule ID**: JSX_COMMERCE_002
- **Category**: commerce
- **Priority**: 8
- **Reason**: Prevents financial calculation errors and ensures compliance with currency regulations while maintaining audit trails for financial operations
- **Consequences**: Unsafe financial calculations cause monetary errors and compliance violations in financial operations
- **Philosophy**: Financial Calculation Accuracy - proper decimal arithmetic and currency handling with specified currency and precision requirements
- **Examples**:
  - Correct: <PriceCalculation>
  <BasePrice currency="USD" precision={2}>29.99</BasePrice>
  <Tax rate={0.0875} rounding="half-up" />
  <Discount type="percentage" value={10} />
  <Total currency="USD" precision={2} />
</PriceCalculation>
  - Anti Pattern: <PriceCalculation
  price={29.99}
  tax={0.0875}
  discount={0.1}
  total={calculateTotal(29.99, 0.0875, 0.1)}
/>
- **Applies To**:
  1. .tsx
  2. .jsx
