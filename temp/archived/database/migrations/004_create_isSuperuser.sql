CREATE OR REPLACE FUNCTION "isSuperuser"(user_id UUID)
RETURNS boolean AS $$
DECLARE
    superuser_accounts UUID[];
BEGIN
    -- Fetch the superuser accounts setting
    BEGIN
        superuser_accounts := current_setting('app.superuser_accounts', TRUE)::uuid[];
    EXCEPTION WHEN others THEN
        RAISE NOTICE 'Superuser accounts setting is missing or invalid. Please configure app.superuser_accounts.';
        RETURN FALSE;
    END;

    -- Check if the user is a superuser
    IF user_id IS NULL THEN
        RAISE NOTICE 'User ID is NULL. Cannot determine superuser status.';
        RETURN FALSE;
    END IF;

    RETURN user_id = ANY(superuser_accounts);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add configuration for superuser accounts
COMMENT ON FUNCTION public."isSuperuser"(user_id UUID) IS 'Checks if the current user has superuser privileges. Logs misconfigurations in app.superuser_accounts and handles edge cases gracefully. Configure superuser accounts by setting app.superuser_accounts to an array of account UUIDs.';
