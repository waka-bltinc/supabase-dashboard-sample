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

-- RLS policies
-- Users can see their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Admin and moderators can see all users
create policy "Admin and moderators can view all users" on public.users
  for select using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Users can update their own data (except role)
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id and 
    (role = (select role from public.users where id = auth.uid()))
  );

-- Only admins can update roles
create policy "Admins can update user roles" on public.users
  for update using (
    exists (
      select 1 from public.users
      where id = auth.uid() and role = 'admin'
    )
  );

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