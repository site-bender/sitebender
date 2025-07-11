# User Identity

User authentication, profile management, and identity verification approaches.

## Philosophy

**Progressive Identity**: Users start with minimal required information and can progressively add more identity details as they engage more deeply with the platform.

## Core Identity Model

### User Accounts

The foundational user identity structure:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email email_address NOT NULL UNIQUE,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  
  -- Authentication
  password_hash TEXT,  -- NULL for social auth users
  auth_provider auth_provider DEFAULT 'local',  -- 'local', 'google', 'github', etc.
  provider_user_id TEXT,  -- External provider ID
  
  -- Account status
  status user_status NOT NULL DEFAULT 'active',  -- 'active', 'suspended', 'deleted'
  role user_role NOT NULL DEFAULT 'reader',      -- 'reader', 'author', 'editor', 'admin'
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  email_verified_at TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT unique_provider_user UNIQUE (auth_provider, provider_user_id)
);
```

### User Profiles

Extended profile information separate from core identity:

```sql
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  -- Public profile
  display_name TEXT,
  username TEXT UNIQUE,  -- Optional public identifier
  bio TEXT,
  avatar_url web_url,
  website_url web_url,
  location TEXT,
  
  -- Privacy settings
  is_public BOOLEAN NOT NULL DEFAULT false,
  show_email BOOLEAN NOT NULL DEFAULT false,
  show_location BOOLEAN NOT NULL DEFAULT false,
  
  -- Preferences
  timezone TEXT DEFAULT 'UTC',
  language TEXT DEFAULT 'en',
  theme TEXT DEFAULT 'auto',  -- 'light', 'dark', 'auto'
  
  -- Metadata
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  profile_completed_at TIMESTAMPTZ
);
```

## Authentication Strategies

### Multi-Provider Support

Support for various authentication methods:

```sql
CREATE TYPE auth_provider AS ENUM (
  'local',      -- Email/password
  'google',     -- Google OAuth
  'github',     -- GitHub OAuth
  'apple',      -- Apple Sign In
  'magic_link'  -- Passwordless email
);

-- Track authentication events
CREATE TABLE auth_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  event_type auth_event_type NOT NULL,  -- 'login', 'logout', 'failed_login'
  provider auth_provider NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Session Management

Secure session tracking:

```sql
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,  -- Hashed session token
  
  -- Session metadata
  ip_address INET,
  user_agent TEXT,
  device_info JSONB,
  
  -- Expiration
  expires_at TIMESTAMPTZ NOT NULL,
  last_used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Security flags
  is_active BOOLEAN NOT NULL DEFAULT true,
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT
);

-- Auto-cleanup expired sessions
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at) 
  WHERE is_active = true;
```

## Email Verification

### Verification Workflow

Email verification with secure tokens:

```sql
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email email_address NOT NULL,
  
  -- Verification token (store hash, send plain token)
  token_hash TEXT NOT NULL UNIQUE,
  
  -- Expiration and usage
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  verified_at TIMESTAMPTZ,
  attempts INTEGER NOT NULL DEFAULT 0,
  
  -- Rate limiting
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_attempt_at TIMESTAMPTZ
);

-- Limit verification attempts
CREATE INDEX idx_email_verifications_attempts 
  ON email_verifications(email, created_at) 
  WHERE verified_at IS NULL;
```

### Email Change Process

Secure email address updates:

```sql
-- When user requests email change
CREATE TABLE email_change_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  old_email email_address NOT NULL,
  new_email email_address NOT NULL,
  
  -- Dual verification (old and new email)
  old_email_verified BOOLEAN NOT NULL DEFAULT false,
  new_email_verified BOOLEAN NOT NULL DEFAULT false,
  
  -- Tokens for both emails
  old_email_token_hash TEXT,
  new_email_token_hash TEXT,
  
  -- Completion
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Generated TypeScript Identity

Type-safe identity management:

```typescript
// Auto-generated from schema
interface User {
  id: string;
  email: EmailAddress;
  emailVerified: boolean;
  authProvider: AuthProvider;
  status: UserStatus;
  role: UserRole;
  createdAt: Date;
  lastLoginAt?: Date;
}

interface UserProfile {
  userId: string;
  displayName?: string;
  username?: string;
  bio?: string;
  avatarUrl?: WebUrl;
  isPublic: boolean;
  preferences: UserPreferences;
}

// Identity service with type safety
class IdentityService {
  async authenticateUser(
    provider: AuthProvider,
    credentials: AuthCredentials
  ): Promise<AuthResult> {
    // Type-safe authentication logic
  }
  
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    // Respects RLS policies for profile access
  }
  
  async verifyEmail(
    token: string
  ): Promise<{ success: boolean; user?: User }> {
    // Secure token verification with attempt limiting
  }
}
```

## Privacy & Security

### Data Protection

User data protection with configurable privacy:

```sql
-- Privacy-aware profile views
CREATE VIEW public_profiles AS
SELECT 
  p.user_id,
  p.display_name,
  p.username,
  CASE WHEN p.is_public THEN p.bio ELSE NULL END as bio,
  CASE WHEN p.is_public THEN p.avatar_url ELSE NULL END as avatar_url,
  CASE WHEN p.show_location AND p.is_public THEN p.location ELSE NULL END as location
FROM user_profiles p
JOIN users u ON p.user_id = u.id
WHERE u.status = 'active' AND p.is_public = true;
```

### Account Deletion

GDPR-compliant account deletion:

```sql
-- Soft delete with data retention
CREATE OR REPLACE FUNCTION delete_user_account(target_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Mark user as deleted
  UPDATE users 
  SET status = 'deleted', 
      email = 'deleted-' || id || '@deleted.local',
      password_hash = NULL,
      last_login_at = NULL
  WHERE id = target_user_id;
  
  -- Clear personal data from profile
  UPDATE user_profiles
  SET display_name = NULL,
      bio = NULL,
      avatar_url = NULL,
      website_url = NULL,
      location = NULL,
      is_public = false
  WHERE user_id = target_user_id;
  
  -- Revoke all sessions
  UPDATE user_sessions 
  SET is_active = false, 
      revoked_at = NOW(), 
      revoked_reason = 'account_deleted'
  WHERE user_id = target_user_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;
```

## User Onboarding

### Progressive Registration

Minimal initial signup with progressive enhancement:

```sql
-- Track onboarding progress
CREATE TABLE user_onboarding (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  -- Onboarding steps
  email_verified BOOLEAN NOT NULL DEFAULT false,
  profile_completed BOOLEAN NOT NULL DEFAULT false,
  first_content_created BOOLEAN NOT NULL DEFAULT false,
  preferences_set BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- Completion percentage (calculated)
  completion_percentage INTEGER GENERATED ALWAYS AS (
    (CASE WHEN email_verified THEN 25 ELSE 0 END +
     CASE WHEN profile_completed THEN 25 ELSE 0 END +
     CASE WHEN first_content_created THEN 25 ELSE 0 END +
     CASE WHEN preferences_set THEN 25 ELSE 0 END)
  ) STORED
);
```

### Welcome Experience

Personalized onboarding flow:

```typescript
interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional: boolean;
  action: OnboardingAction;
}

class OnboardingService {
  async getOnboardingStatus(userId: string): Promise<OnboardingStep[]> {
    // Returns personalized onboarding checklist
  }
  
  async completeOnboardingStep(
    userId: string, 
    stepId: string
  ): Promise<OnboardingProgress> {
    // Updates progress and triggers next steps
  }
}
```

## Identity Analytics

### User Insights

Understanding user behavior patterns:

```sql
-- User activity summary
CREATE VIEW user_activity_summary AS
SELECT 
  u.id,
  u.created_at as signup_date,
  u.last_login_at,
  COUNT(DISTINCT s.id) as total_sessions,
  COUNT(DISTINCT DATE(s.created_at)) as active_days,
  o.completion_percentage as onboarding_progress
FROM users u
LEFT JOIN user_sessions s ON u.id = s.user_id
LEFT JOIN user_onboarding o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.created_at, u.last_login_at, o.completion_percentage;
```

> **📖 Related Documentation**  
> - **[Access Control](../access-control/index.md)** - How RLS protects user data
> - **[Data Integrity](../data-integrity/index.md)** - Identity validation constraints
> - **[Activity Tracking](../activity-tracking/index.md)** - User behavior and audit logging
