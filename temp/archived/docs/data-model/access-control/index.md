# Access Control

Row Level Security (RLS) policies, authentication patterns, and authorization strategies for securing data access.

## Philosophy

**Security by Default**: Every table has Row Level Security enabled with explicit policies defining who can access what data. No data is accessible without appropriate authorization.

## Row Level Security (RLS)

### Policy-Based Access

Every table uses RLS policies to control data access at the database level:

```sql
-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profiles
CREATE POLICY user_profile_access ON user_profiles
  USING (user_id = current_user_id());

-- Authors can see their own posts, readers can see published posts
CREATE POLICY post_access ON posts
  USING (
    author_id = current_user_id() OR 
    (status = 'published' AND is_public = true)
  );
```

**Benefits:**
- Database-enforced security (can't be bypassed)
- Automatic filtering of unauthorized data
- Consistent security across all database access
- Clear, auditable authorization rules

### Authentication Context

We use PostgreSQL functions to provide authentication context:

```sql
-- Set current user context for session
CREATE OR REPLACE FUNCTION set_current_user(user_uuid UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_user_id', user_uuid::text, false);
END;
$$ LANGUAGE plpgsql;

-- Get current user context
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_user_id', true), '')::UUID;
END;
$$ LANGUAGE plpgsql;
```

## Authorization Patterns

### Role-Based Access

Different user roles have different data access patterns:

```sql
-- Admins can see all data
CREATE POLICY admin_access ON posts
  USING (user_role() = 'admin');

-- Editors can see draft content for review
CREATE POLICY editor_access ON posts  
  USING (
    user_role() IN ('editor', 'admin') OR
    (status = 'published' AND is_public = true)
  );

-- Readers can only see published content
CREATE POLICY reader_access ON posts
  USING (status = 'published' AND is_public = true);
```

### Content Ownership

Users have different permissions on content they own vs. content from others:

```sql
-- Users can edit their own content
CREATE POLICY user_content_update ON posts
  FOR UPDATE USING (author_id = current_user_id());

-- Users can delete their own content (unless published)
CREATE POLICY user_content_delete ON posts
  FOR DELETE USING (
    author_id = current_user_id() AND 
    status != 'published'
  );
```

### Privacy Controls

Personal data requires explicit permission to access:

```sql
-- Users control visibility of their own profiles
CREATE POLICY profile_visibility ON user_profiles
  USING (
    user_id = current_user_id() OR  -- Own profile
    (is_public = true AND status = 'active')  -- Public profiles only
  );
```

## Generated TypeScript Security

The `pg-to-ts` system includes security context in generated types:

```typescript
// Security context automatically included
interface DatabaseContext {
  currentUserId?: string;
  userRole?: UserRole;
  isAuthenticated: boolean;
}

// Generated query methods respect RLS
class PostRepository {
  // Automatically applies RLS policies
  async findUserPosts(userId: string): Promise<Post[]> {
    // Only returns posts user is authorized to see
    return await this.query('SELECT * FROM posts WHERE author_id = $1', [userId]);
  }
  
  // Throws error if user lacks permission
  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    // RLS policy enforces ownership check
    return await this.query('UPDATE posts SET ... WHERE id = $1', [id]);
  }
}
```

## Security Testing

We thoroughly test all authorization scenarios:

```typescript
// Test that unauthorized access is blocked
test('prevents access to private posts', async () => {
  const privatePost = await createPost({ 
    authorId: 'user1', 
    status: 'draft' 
  });
  
  // Switch to different user context
  await setCurrentUser('user2');
  
  const result = await findPost(privatePost.id);
  expect(result).toBeNull(); // RLS blocks access
});

// Test that authorized access works
test('allows access to own posts', async () => {
  await setCurrentUser('user1');
  
  const ownPost = await createPost({ 
    authorId: 'user1', 
    status: 'draft' 
  });
  
  const result = await findPost(ownPost.id);
  expect(result).toBeDefined(); // RLS allows access
});
```

## Policy Management

### Policy Documentation

Every RLS policy includes comprehensive comments explaining its purpose:

```sql
CREATE POLICY comment_moderation ON comments
  USING (
    author_id = current_user_id() OR           -- Own comments
    user_role() IN ('moderator', 'admin') OR   -- Moderators
    (status = 'approved' AND is_visible = true) -- Public approved comments
  );

COMMENT ON POLICY comment_moderation ON comments IS
  'Controls comment visibility: users see own comments, moderators see all comments, 
   public sees only approved visible comments. Prevents access to flagged or 
   pending comments by non-moderators.';
```

### Policy Evolution

RLS policies can be updated as authorization requirements change:

```sql
-- Add new access pattern
DROP POLICY IF EXISTS old_policy_name ON table_name;
CREATE POLICY new_policy_name ON table_name
  USING (new_authorization_logic);
```

## Security Audit

### Built-in Logging

RLS policy violations are automatically logged by PostgreSQL:

```sql
-- Enable policy violation logging
SET log_statement = 'all';
SET log_min_messages = 'warning';
```

### Access Pattern Analysis

Regular analysis of data access patterns helps identify security issues:

```sql
-- Find unusual access patterns
SELECT 
  table_name,
  current_user_id(),
  count(*) as access_count,
  array_agg(DISTINCT operation) as operations
FROM audit_log 
WHERE created_at > NOW() - INTERVAL '1 day'
GROUP BY table_name, current_user_id()
HAVING count(*) > 1000;  -- Flag high-volume access
```

> **📖 Related Documentation**  
> - **[Data Integrity](../data-integrity/index.md)** - How constraints support security
> - **[User Identity](../user-identity/index.md)** - Authentication and user management
> - **[Activity Tracking](../activity-tracking/index.md)** - Audit logging and monitoring
