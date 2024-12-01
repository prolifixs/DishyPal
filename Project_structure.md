1. Project Overview:
DishyPal is designed as an AI-driven kitchen assistant, aiming to enhance users' cooking experiences by providing intelligent meal planning, recipe recommendations, and interactive cooking guidance.

Key Features:

Meal Planning:

Users can set up meal plans for breakfast, lunch, and dinner.
The system offers AI-generated meal plans for up to 30 days.
Users can incorporate meal plans from other users, given proper authorization.
Recipes:

Users can create and share recipes, including meal names, descriptions, and ingredient lists.
A chatbot feature allows users to discover recipes from online sources like Facebook, TikTok, Instagram, and YouTube, as well as from other users within the app.
By providing a video link, the CookWizard can analyze and generate a cooking process along with a list of ingredients.
CookWizard:

Offers step-by-step cooking guidance, complete with timers and the option to display instructions in text or video format.
Grocery Inventory:

Users can maintain a list of available groceries by scanning or manually entering items via the CookMate mobile app.
The system cross-references the inventory with selected recipes to identify missing ingredients.
Grocery List:

Users can compile shopping lists and compare prices from multiple vendors such as Walmart, Walgreens, and Target.
The platform facilitates online purchases from multiple vendors in a single transaction.
Community Engagement:

A community section enables users to discuss current cooking trends and vote on best practices.
Device Integration:

Users can link mobile devices and CookMate-compatible appliances (e.g., blenders, stoves) to the web app for enhanced interaction.
Subscription Model:

Free Users:
Limited to generating and manually updating meal plans for up to 7 days.
Restricted to one cooking timer.
Cannot add missing items to the grocery list from a cooking process.
Ineligible for online grocery shopping through the platform.
Permitted to link only one CookMate device, excluding mobile phones.
Premium Users:
Access to extended features beyond the free tier limitations.
Technical Structure: The project is organized into several modules, each corresponding to the features mentioned above. The codebase includes components for user authentication, AI-driven meal planning, recipe management, grocery inventory tracking, and device integration.

Recommendations:

Documentation: Enhance the README file to provide clear setup instructions, usage guidelines, and contribution protocols.
Testing: Implement comprehensive unit and integration tests to ensure code reliability and maintainability.
Security: Incorporate robust authentication and authorization mechanisms to protect user data and maintain privacy.
Scalability: Design the system architecture to handle a growing user base and increased data volume efficiently.


2. CurrentProject Structure:


DishyPal/
        C:.
    │   favicon.ico
    │   globals.css
    │   layout.tsx
    │   page.tsx
    │
    ├───create-recipe
    │       page.tsx
    │
    ├───explore
    │       page.tsx
    │
    ├───fonts
    │       GeistMonoVF.woff
    │       GeistVF.woff
    │
    ├───grocery
    │       page.tsx
    │
    ├───login
    │       page.tsx
    │
    ├───meal-plan
    │       page.tsx
    │
    ├───notifications
    │       page.tsx
    │
    ├───profile
    │       page.tsx
    │
    ├───recipe-wizard
    │   └───[id]
    │           mockData.ts
    │           page.tsx
    │           types.ts
    │
    ├───recipes
    │   ├───details
    │   │   └───[id]
    │   │           page.tsx
    │   │
    │   └───preview
    │       └───[id]
    │               page.tsx
    │
    ├───settings
    │       page.tsx
    │
    └───user-post-detail
    │   └───[id]        
    ├───components
    │           page.tsx
    │           page.tsx
    │           recipe-steps.tsx
    │           RecipeCard.tsx
    │           RecipeWizardContent.tsx      
    │           RecipeWizardLeftMenu.tsx     
    │           sidebar.tsx
    │           user-post-detail.tsx
    │
    └───ui
            accordion.tsx
            avatar.tsx
            badge.tsx
            button.tsx
            calendar.tsx
            card.tsx
            checkbox.tsx
            dialog.tsx
            dropdown-menu.tsx
            input.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            calendar.tsx
            card.tsx
            checkbox.tsx
            dialog.tsx
            dropdown-menu.tsx
            input.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            card.tsx
            checkbox.tsx
            dialog.tsx
            dropdown-menu.tsx
            input.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            checkbox.tsx
            dialog.tsx
            dropdown-menu.tsx
            input.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            input.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            label.tsx
            popover.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            progress.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            select.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            separator.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            textarea.tsx
            tooltip.tsx
            table.tsx
            tabs.tsx
            textarea.tsx
            tooltip.tsx
            tabs.tsx
            textarea.tsx
            tooltip.tsx
            textarea.tsx
            tooltip.tsx
    

```

3. Main Features:


- User authentication (Login/Register)
- Dashboard with recent and trending recipes
- Grocery management system
- Meal planning calendar
- Recipe browsing and details
- Social features (Explore page, user posts)
- Recipe wizard for step-by-step cooking guidance
- User profile and settings
- Notification system


4. Libraries and Frameworks:


- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui (UI component library)
- Lucide React (Icons)
- React Icons (Additional icons)
- next/font (Font optimization)
- next/image (Image optimization)
- Prisma (ORM)
- Supabase (Database)


5. Schema.sql structure

*** 
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing types if they exist
drop type if exists "shopping_list_status" cascade;
drop type if exists "meal_time" cascade;
drop type if exists "interaction_type" cascade;
drop type if exists "notification_type" cascade;

-- Create ENUMs
create type "shopping_list_status" as enum ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');
create type "meal_time" as enum ('morning', 'afternoon', 'evening');
create type "interaction_type" as enum ('like', 'save', 'share', 'comment');
create type "notification_type" as enum ('like', 'comment', 'follow', 'mention', 'system');

-- Drop all existing tables (in correct order)
drop table if exists "shopping_items" cascade;
drop table if exists "shopping_lists" cascade;
drop table if exists "product_vendors" cascade;
drop table if exists "products" cascade;
drop table if exists "vendors" cascade;
drop table if exists "grocery_inventory" cascade;
drop table if exists "social_links" cascade;
drop table if exists "meals" cascade;
drop table if exists "meal_plans" cascade;
drop table if exists "interactions" cascade;
drop table if exists "notifications" cascade;
drop table if exists "recipe_task_steps" cascade;
drop table if exists "recipe_tasks" cascade;
drop table if exists "recipe_preset_steps" cascade;
drop table if exists "recipe_timers" cascade;
drop table if exists "recipe_presets" cascade;
drop table if exists "ingredients" cascade;
drop table if exists "recipe_ingredients" cascade;
drop table if exists "recipes" cascade;
drop table if exists "posts" cascade;
drop table if exists "subscriptions" cascade;
drop table if exists "devices" cascade;
drop table if exists "user_notification_settings" cascade;
drop table if exists "user_follows" cascade;
drop table if exists "profiles" cascade;
drop table if exists "users" cascade;

-- Create base tables
create table "users" (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "profiles" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade unique,
    username text unique not null,
    full_name text,
    avatar_url text,
    bio text,
    preferences jsonb default '{}',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "user_follows" (
    follower_id uuid references users(id) on delete cascade,
    following_id uuid references users(id) on delete cascade,
    created_at timestamptz default now(),
    primary key (follower_id, following_id)
);

create table "notifications" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    type notification_type not null,
    content text not null,
    read boolean default false,
    created_at timestamptz default now()
);

create table "user_notification_settings" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade unique,
    email_enabled boolean default true,
    push_enabled boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "devices" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    name text not null,
    type text not null,
    push_token text,
    is_active boolean default true,
    last_active timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "subscriptions" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade unique,
    plan text not null,
    status text not null,
    current_period_end timestamptz not null,
    amount decimal not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "recipes" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    name text not null,
    description text,
    cuisine text,
    instructions text not null,
    video_url text,
    prep_time_hours integer default 0,
    prep_time_minutes integer default 0,
    cook_time_hours integer default 0,
    cook_time_minutes integer default 0,
    difficulty text,
    calories integer,
    servings integer,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "ingredients" (
    id uuid primary key default uuid_generate_v4(),
    recipe_id uuid references recipes(id) on delete cascade,
    name text not null,
    quantity text not null,
    unit text not null,
    notes text,
    created_at timestamptz default now()
);

create table "interactions" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    recipe_id uuid references recipes(id) on delete cascade,
    type interaction_type not null,
    content text,
    created_at timestamptz default now(),
    unique(user_id, recipe_id, type)
);

create table "recipe_presets" (
    id uuid primary key default uuid_generate_v4(),
    recipe_id uuid references recipes(id) on delete cascade,
    title text not null,
    created_at timestamptz default now()
);

create table "recipe_timers" (
    id uuid primary key default uuid_generate_v4(),
    preset_id uuid references recipe_presets(id) on delete cascade,
    hours integer not null,
    minutes integer not null,
    created_at timestamptz default now()
);

create table "recipe_preset_steps" (
    id uuid primary key default uuid_generate_v4(),
    preset_id uuid references recipe_presets(id) on delete cascade,
    content text not null,
    "order" integer not null,
    created_at timestamptz default now()
);

create table "posts" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    recipe_id uuid references recipes(id) on delete cascade,
    content text not null,
    likes_count integer default 0,
    comments_count integer default 0,
    shares_count integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "meal_plans" (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    date timestamptz not null,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "meals" (
    id uuid primary key default uuid_generate_v4(),
    meal_plan_id uuid references meal_plans(id) on delete cascade,
    recipe_id uuid references recipes(id) on delete cascade,
    type meal_time not null,
    servings integer,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "grocery_inventory" (
    id bigserial primary key,
    user_id uuid references users(id) on delete cascade,
    name text not null,
    quantity decimal not null,
    unit text not null,
    expiry_date timestamptz,
    category text,
    barcode text,
    notes text,
    is_deleted boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "shopping_lists" (
    id bigserial primary key,
    user_id uuid references users(id) on delete cascade,
    name text not null,
    status shopping_list_status default 'DRAFT',
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table "shopping_items" (
    id bigserial primary key,
    shopping_list_id bigint references shopping_lists(id) on delete cascade,
    name text not null,
    quantity decimal not null,
    unit text not null,
    is_purchased boolean default false,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create updated_at trigger function
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
do $$
declare
    t record;
begin
    for t in 
        select table_name 
        from information_schema.columns 
        where column_name = 'updated_at' 
        and table_schema = 'public'
    loop
        execute format('
            drop trigger if exists set_updated_at on %I;
            create trigger set_updated_at
            before update on %I
            for each row
            execute function handle_updated_at();
        ', t.table_name, t.table_name);
    end loop;
end;
$$ language plpgsql;

-- Create indexes
create index if not exists idx_profiles_user_id on profiles(user_id);
create index if not exists idx_notifications_user_id on notifications(user_id);
create index if not exists idx_recipes_user_id on recipes(user_id);
create index if not exists idx_ingredients_recipe_id on ingredients(recipe_id);
create index if not exists idx_interactions_user_id on interactions(user_id);
create index if not exists idx_interactions_recipe_id on interactions(recipe_id);
create index if not exists idx_posts_user_id on posts(user_id);
create index if not exists idx_posts_recipe_id on posts(recipe_id);
create index if not exists idx_meal_plans_user_id on meal_plans(user_id);
create index if not exists idx_meals_meal_plan_id on meals(meal_plan_id);
create index if not exists idx_meals_recipe_id on meals(recipe_id);
create index if not exists idx_shopping_lists_user_id on shopping_lists(user_id);
create index if not exists idx_shopping_items_shopping_list_id on shopping_items(shopping_list_id);

-- Enable Row Level Security
alter table users enable row level security;
alter table profiles enable row level security;
alter table notifications enable row level security;
alter table recipes enable row level security;
alter table ingredients enable row level security;
alter table interactions enable row level security;
alter table posts enable row level security;
alter table meal_plans enable row level security;
alter table meals enable row level security;
alter table shopping_lists enable row level security;
alter table shopping_items enable row level security;

-- Create RLS Policies
create policy "Users can view their own data"
    on users for select
    using (auth.uid()::uuid = id);

create policy "Users can update their own data"
    on users for update
    using (auth.uid()::uuid = id);

create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid()::uuid = user_id);

create policy "Users can view their own notifications"
    on notifications for select
    using (auth.uid()::uuid = user_id);

create policy "Users can manage their own recipes"
    on recipes for all
    using (auth.uid()::uuid = user_id);

create policy "Recipes are viewable by everyone"
    on recipes for select
    using (true);

create policy "Recipe owners can manage ingredients"
    on ingredients for all
    using (auth.uid()::uuid in (
        select user_id from recipes where id = recipe_id
    ));

create policy "Ingredients are viewable by everyone"
    on ingredients for select
    using (true);

create policy "Users can manage their own interactions"
    on interactions for all
    using (auth.uid()::uuid = user_id);

create policy "Users can manage their own posts"
    on posts for all
    using (auth.uid()::uuid = user_id);

create policy "Posts are viewable by everyone"
    on posts for select
    using (true);

create policy "Users can manage their own meal plans"
    on meal_plans for all
    using (auth.uid()::uuid = user_id);

create policy "Users can manage their own shopping lists"
    on shopping_lists for all
    using (auth.uid()::uuid = user_id);

create policy "Users can manage their own shopping items"
    on shopping_items for all
    using (exists (
        select 1 from shopping_lists 
        where id = shopping_list_id 
        and user_id = auth.uid()::uuid
    ));
***

