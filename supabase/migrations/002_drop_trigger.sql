-- Drop the auto-create profile trigger (causes 500 on signup)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
