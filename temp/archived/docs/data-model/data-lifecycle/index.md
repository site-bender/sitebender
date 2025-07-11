# Data Lifecycle

Data creation, updates, archival, and deletion patterns, including soft deletes and historical tracking.

## Philosophy

**Preserve Data Integrity**: Data lifecycle management balances operational needs with data preservation, ensuring that important information is never lost while maintaining system performance.

## Creation Patterns

### Immutable Creation

New records are created with complete audit trails:

```sql
-- Standard creation pattern with metadata
CREATE OR REPLACE FUNCTION create_with_metadata(
  table_name TEXT,
  data JSONB,
  creator_id UUID DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  new_id UUID;
  sql_query TEXT;
BEGIN
  new_id := gen_random_uuid();
  
  -- Add standard metadata to creation data
  data := data || jsonb_build_object(
    'id', new_id,
    'created_at', NOW(),
    'created_by', COALESCE(creator_id, current_user_id()),
    'updated_at', NOW(),
    'version', 1
  );
  
  -- Dynamic insert (simplified example)
  sql_query := format('INSERT INTO %I SELECT * FROM jsonb_populate_record(NULL::%I, $1)', 
                      table_name, table_name);
  EXECUTE sql_query USING data;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;
```

### Versioned Creation

Some entities maintain version history from creation:

```sql
-- Example: Document versioning
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  current_version_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id)
);

CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  changes_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id),
  
  UNIQUE(document_id, version_number)
);

-- Automatically create first version on document creation
CREATE OR REPLACE FUNCTION create_initial_document_version()
RETURNS TRIGGER AS $$
DECLARE
  version_id UUID;
BEGIN
  -- Create initial version
  INSERT INTO document_versions (
    document_id, version_number, content, created_by
  ) VALUES (
    NEW.id, 1, '', NEW.created_by
  ) RETURNING id INTO version_id;
  
  -- Link to current version
  UPDATE documents 
  SET current_version_id = version_id 
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Update Patterns

### Optimistic Concurrency

Prevent concurrent update conflicts:

```sql
-- Add version column to tables that need concurrency control
ALTER TABLE posts ADD COLUMN version INTEGER NOT NULL DEFAULT 1;

-- Update function with version checking
CREATE OR REPLACE FUNCTION update_with_version_check(
  table_name TEXT,
  record_id UUID,
  updates JSONB,
  expected_version INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  current_version INTEGER;
  sql_query TEXT;
BEGIN
  -- Check current version
  sql_query := format('SELECT version FROM %I WHERE id = $1', table_name);
  EXECUTE sql_query INTO current_version USING record_id;
  
  IF current_version IS NULL THEN
    RAISE EXCEPTION 'Record not found';
  END IF;
  
  IF current_version != expected_version THEN
    RAISE EXCEPTION 'Version conflict: expected %, got %', expected_version, current_version;
  END IF;
  
  -- Perform update with version increment
  updates := updates || jsonb_build_object(
    'updated_at', NOW(),
    'updated_by', current_user_id(),
    'version', current_version + 1
  );
  
  sql_query := format('UPDATE %I SET (%s) = (%s) WHERE id = $1', 
                      table_name, 
                      (SELECT string_agg(key, ',') FROM jsonb_each(updates)),
                      (SELECT string_agg('($2->>''' || key || ''')::' || pg_typeof(value), ',') 
                       FROM jsonb_each(updates)));
  EXECUTE sql_query USING record_id, updates;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

### Change Tracking

Comprehensive change history:

```sql
CREATE TABLE change_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What changed
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  
  -- Change details
  field_name TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  change_type change_type NOT NULL,  -- 'create', 'update', 'delete'
  
  -- Context
  changed_by UUID REFERENCES users(id),
  change_reason TEXT,
  
  -- Timing
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Grouping related changes
  change_batch_id UUID NOT NULL
);

-- Automatic change tracking trigger
CREATE OR REPLACE FUNCTION track_field_changes()
RETURNS TRIGGER AS $$
DECLARE
  old_record JSONB;
  new_record JSONB;
  batch_id UUID;
  field_name TEXT;
  old_val JSONB;
  new_val JSONB;
BEGIN
  batch_id := gen_random_uuid();
  
  IF TG_OP = 'UPDATE' THEN
    old_record := to_jsonb(OLD);
    new_record := to_jsonb(NEW);
    
    -- Compare each field
    FOR field_name IN SELECT jsonb_object_keys(new_record) LOOP
      old_val := old_record -> field_name;
      new_val := new_record -> field_name;
      
      IF old_val IS DISTINCT FROM new_val THEN
        INSERT INTO change_history (
          entity_type, entity_id, field_name,
          old_value, new_value, change_type,
          changed_by, change_batch_id
        ) VALUES (
          TG_TABLE_NAME, NEW.id, field_name,
          old_val, new_val, 'update',
          current_user_id(), batch_id
        );
      END IF;
    END LOOP;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
```

## Deletion Patterns

### Soft Deletion

Preserve data while marking as deleted:

```sql
-- Add soft delete columns to important tables
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE posts ADD COLUMN deleted_by UUID REFERENCES users(id);
ALTER TABLE posts ADD COLUMN deletion_reason TEXT;

-- Soft delete function
CREATE OR REPLACE FUNCTION soft_delete(
  table_name TEXT,
  record_id UUID,
  reason TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  sql_query TEXT;
BEGIN
  sql_query := format(
    'UPDATE %I SET deleted_at = NOW(), deleted_by = %L, deletion_reason = %L WHERE id = %L AND deleted_at IS NULL',
    table_name, current_user_id(), reason, record_id
  );
  
  EXECUTE sql_query;
  
  -- Log the deletion
  INSERT INTO activity_log (
    event_type, action, entity_type, entity_id,
    user_id, event_data
  ) VALUES (
    'data_change', 'soft_delete', table_name, record_id,
    current_user_id(),
    jsonb_build_object('reason', reason)
  );
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Views that exclude soft-deleted records
CREATE VIEW active_posts AS
SELECT * FROM posts WHERE deleted_at IS NULL;
```

### Cascading Deletion

Controlled cascade behavior:

```sql
-- Custom cascade deletion for complex relationships
CREATE OR REPLACE FUNCTION cascade_post_deletion()
RETURNS TRIGGER AS $$
BEGIN
  -- Soft delete comments when post is soft deleted
  IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
    UPDATE comments 
    SET deleted_at = NEW.deleted_at,
        deleted_by = NEW.deleted_by,
        deletion_reason = 'parent_post_deleted'
    WHERE post_id = NEW.id AND deleted_at IS NULL;
    
    -- Remove from collections
    DELETE FROM collection_items 
    WHERE content_id = NEW.id AND content_type = 'post';
    
    -- Clear caches
    PERFORM clear_post_cache(NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_deletion_cascade
  AFTER UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION cascade_post_deletion();
```

## Archival Patterns

### Time-Based Archival

Move old data to archive tables:

```sql
-- Archive table structure matches main table
CREATE TABLE posts_archive (LIKE posts INCLUDING ALL);

-- Partition archive by year
CREATE TABLE posts_archive_2023 PARTITION OF posts_archive
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

-- Automatic archival function
CREATE OR REPLACE FUNCTION archive_old_posts()
RETURNS INTEGER AS $$
DECLARE
  archived_count INTEGER;
BEGIN
  -- Archive posts older than 2 years that are not "featured"
  WITH archived AS (
    DELETE FROM posts
    WHERE created_at < NOW() - INTERVAL '2 years'
      AND NOT is_featured
      AND deleted_at IS NULL
    RETURNING *
  )
  INSERT INTO posts_archive SELECT * FROM archived;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  
  -- Log archival
  INSERT INTO activity_log (
    event_type, action, entity_type,
    event_data
  ) VALUES (
    'system_event', 'archive', 'posts',
    jsonb_build_object(
      'archived_count', archived_count,
      'criteria', 'older_than_2_years_not_featured'
    )
  );
  
  RETURN archived_count;
END;
$$ LANGUAGE plpgsql;
```

### Selective Archival

Archive based on business rules:

```sql
-- Archive inactive user data
CREATE OR REPLACE FUNCTION archive_inactive_users()
RETURNS INTEGER AS $$
DECLARE
  archived_count INTEGER;
BEGIN
  -- Users inactive for 3+ years with no published content
  WITH inactive_users AS (
    SELECT u.id
    FROM users u
    LEFT JOIN posts p ON u.id = p.author_id AND p.status = 'published'
    WHERE u.last_login_at < NOW() - INTERVAL '3 years'
      AND u.status = 'active'
      AND p.id IS NULL  -- No published content
  ),
  archived AS (
    UPDATE users 
    SET status = 'archived',
        archived_at = NOW(),
        archived_reason = 'inactive_no_content'
    WHERE id IN (SELECT id FROM inactive_users)
    RETURNING *
  )
  INSERT INTO users_archive SELECT * FROM archived;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  RETURN archived_count;
END;
$$ LANGUAGE plpgsql;
```

## Recovery Patterns

### Restoration from Soft Delete

Controlled data restoration:

```sql
CREATE OR REPLACE FUNCTION restore_soft_deleted(
  table_name TEXT,
  record_id UUID,
  restore_reason TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  sql_query TEXT;
  was_deleted BOOLEAN;
BEGIN
  -- Check if record is soft deleted
  sql_query := format('SELECT deleted_at IS NOT NULL FROM %I WHERE id = %L', 
                      table_name, record_id);
  EXECUTE sql_query INTO was_deleted;
  
  IF NOT was_deleted THEN
    RAISE EXCEPTION 'Record is not deleted or does not exist';
  END IF;
  
  -- Restore the record
  sql_query := format(
    'UPDATE %I SET deleted_at = NULL, deleted_by = NULL, deletion_reason = NULL WHERE id = %L',
    table_name, record_id
  );
  EXECUTE sql_query;
  
  -- Log the restoration
  INSERT INTO activity_log (
    event_type, action, entity_type, entity_id,
    user_id, event_data
  ) VALUES (
    'data_change', 'restore', table_name, record_id,
    current_user_id(),
    jsonb_build_object('restore_reason', restore_reason)
  );
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

### Point-in-Time Recovery

Version-based data recovery:

```sql
-- Restore document to specific version
CREATE OR REPLACE FUNCTION restore_document_version(
  doc_id UUID,
  target_version INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  version_content TEXT;
  new_version_id UUID;
  next_version INTEGER;
BEGIN
  -- Get content from target version
  SELECT content INTO version_content
  FROM document_versions
  WHERE document_id = doc_id AND version_number = target_version;
  
  IF version_content IS NULL THEN
    RAISE EXCEPTION 'Version % not found for document %', target_version, doc_id;
  END IF;
  
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1 INTO next_version
  FROM document_versions
  WHERE document_id = doc_id;
  
  -- Create new version with restored content
  INSERT INTO document_versions (
    document_id, version_number, content,
    changes_summary, created_by
  ) VALUES (
    doc_id, next_version, version_content,
    format('Restored from version %s', target_version),
    current_user_id()
  ) RETURNING id INTO new_version_id;
  
  -- Update current version pointer
  UPDATE documents 
  SET current_version_id = new_version_id
  WHERE id = doc_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

## Generated TypeScript Lifecycle

Type-safe lifecycle management:

```typescript
// Auto-generated lifecycle interfaces
interface LifecycleMetadata {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy?: string;
  version: number;
  deletedAt?: Date;
  deletedBy?: string;
  deletionReason?: string;
}

interface ArchivalInfo {
  archivedAt: Date;
  archivedReason: string;
  archiveLocation: string;
}

// Lifecycle service with type safety
class DataLifecycleService {
  async softDelete<T extends { id: string }>(
    entity: T,
    reason?: string
  ): Promise<boolean> {
    // Type-safe soft deletion
  }
  
  async restore<T extends { id: string }>(
    entityType: string,
    entityId: string,
    reason?: string
  ): Promise<T | null> {
    // Type-safe restoration
  }
  
  async getChangeHistory(
    entityType: string,
    entityId: string
  ): Promise<ChangeHistory[]> {
    // Complete change history
  }
  
  async createVersion<T>(
    entity: T,
    changes: Partial<T>
  ): Promise<T> {
    // Versioned updates with conflict detection
  }
}
```

## Lifecycle Policies

### Automated Policies

Data lifecycle rules enforced automatically:

```sql
-- Policy configuration table
CREATE TABLE lifecycle_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  policy_type lifecycle_policy_type NOT NULL,  -- 'retention', 'archival', 'deletion'
  
  -- Policy rules
  conditions JSONB NOT NULL,    -- When policy applies
  actions JSONB NOT NULL,       -- What actions to take
  
  -- Execution
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_executed_at TIMESTAMPTZ,
  next_execution_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Example policies
INSERT INTO lifecycle_policies (entity_type, policy_type, conditions, actions) VALUES
('posts', 'archival', 
 '{"age_days": 730, "status": ["draft"], "no_activity_days": 365}',
 '{"action": "archive", "notify_author": true}'),
('user_sessions', 'deletion',
 '{"age_days": 30, "is_active": false}',
 '{"action": "hard_delete"}'),
('activity_log', 'archival',
 '{"age_days": 365}',
 '{"action": "move_to_archive", "compress": true}');
```

## Monitoring & Alerts

### Lifecycle Health

Monitor data lifecycle operations:

```sql
-- Lifecycle operation monitoring
CREATE VIEW lifecycle_health AS
SELECT 
  entity_type,
  policy_type,
  COUNT(*) as total_operations,
  COUNT(*) FILTER (WHERE success = true) as successful_operations,
  AVG(execution_time_ms) as avg_execution_time,
  MAX(executed_at) as last_execution
FROM lifecycle_operations
WHERE executed_at > NOW() - INTERVAL '30 days'
GROUP BY entity_type, policy_type;
```

> **📖 Related Documentation**  
> - **[Data Integrity](../data-integrity/index.md)** - Constraints during lifecycle transitions
> - **[Activity Tracking](../activity-tracking/index.md)** - Logging lifecycle events
> - **[Access Control](../access-control/index.md)** - Permissions for lifecycle operations
