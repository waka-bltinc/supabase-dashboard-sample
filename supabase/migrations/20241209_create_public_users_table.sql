-- Create custom role type
create type user_role as enum ('user', 'moderator', 'admin');

-- Create public.users table
create table public.users (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  role user_role not null default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.users enable row level security;

-- Simple RLS policies that avoid recursion
-- Users can see their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Authenticated users can view all users (role checking done in application)
create policy "Authenticated users can view users" on public.users
  for select using (auth.role() = 'authenticated');

-- Users can update their own data
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Insert policy for new users
create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Trigger to automatically create public.users entry when auth.users is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_users_updated_at
  before update on public.users
  for each row execute procedure update_updated_at_column();