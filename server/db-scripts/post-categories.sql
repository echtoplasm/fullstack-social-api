
create table social_posts (
  post_id serial primary key, 
  user_id int not null, 
  post_title varchar(255),
  post_text varchar(1200) not null, 
  created_at timestamp default now() not null, 
  updated_at timestamp default now() not null
)

INSERT INTO social_posts (user_id, post_title, post_text) VALUES 
  (2, 'Machine Learning Model Help', 'Working on a neural network for image classification. Any tips on preventing overfitting?'),
  
  (2, 'Smart Contract Security Question', 'Building my first DeFi protocol. What are the most common security vulnerabilities I should watch out for?'),
  
  (3, 'Calculus Integration Problem', 'Stuck on this integration by parts problem. The function has nested logarithms and I cannot figure out the right substitution.'),
  
  (3, 'Python Performance Issues', 'My sorting algorithm is running too slowly on large datasets. Should I switch to a different approach or optimize the current one?'),
  
  (1, 'React vs Vue Decision', 'Starting a new project and torn between React and Vue. What factors should I consider for a medium-sized web application?'),
  
  (2, 'Cryptocurrency Trading Bot', 'Built an automated trading system using Python. The math behind the indicators is more complex than I expected!'),
  
  (3, 'Database Query Optimization', 'My PostgreSQL joins are taking forever. Any indexing strategies that could help speed things up?'),
  
  (1, 'Linear Algebra in Graphics', 'Working on a 3D renderer and the matrix math is blowing my mind. How did you all learn to visualize these transformations?'),
  
  (2, 'Blockchain Consensus Mechanisms', 'Deep diving into proof-of-stake vs proof-of-work. The mathematical guarantees are fascinating but complex.'),
  
  (3, 'API Rate Limiting Strategy', 'Implementing rate limiting for my REST API. What algorithms work best for preventing abuse while maintaining good UX?');


/* social posts and users table above are for continuity purposes, those tables were
made before the rest of this SQL script. */


create table social_categories (
  category_id serial primary key,
  category_name varchar(255) not null unique,
  category_description text not null, 
  created_at timestamp default now()
);

insert into social_categories (category_name, category_description) values 
  ('Technology', 'Generalized discussion about anything in the broader field of technology.'),

  ('Programming', 'Generalized discussion about anything in the broader field of programming.'),

  ('Math', 'Generalized discussion about anything in the broader field of math.'),

  ('Fintech', 'Generalized discussion about anything in the broader field of financial technology'),

  ('Tech advice', 'Generalized tech advice');


create table social_post_category_assignments (
  assignment_id serial primary key, 
  post_id int not null, 
  category_id int not null,
  created_at timestamp default now(),

  constraint fk_social_category_assignments 
    foreign key (category_id)
    references social_categories(category_id),

  constraint fk_social_posts_assignments 
    foreign key (post_id)
    references social_posts(post_id)
);


INSERT INTO social_post_category_assignments (post_id, category_id) VALUES 
  -- Assign categories to original posts first (posts 1-3)
  (1, 1), -- iPhone jailbreak -> Technology
  (1, 5), -- iPhone jailbreak -> Tech advice
  
  (2, 2), -- Recursion -> Programming  
  (2, 3), -- Recursion -> Math
  
  (3, 1), -- W3 con -> Technology
  (3, 2), -- W3 con -> Programming
  
  -- New posts (assuming they start from post_id 4)
  (4, 2), -- ML Model -> Programming
  (4, 3), -- ML Model -> Math
  (4, 5), -- ML Model -> Tech advice
  
  (5, 2), -- Smart Contract -> Programming
  (5, 4), -- Smart Contract -> Fintech
  (5, 5), -- Smart Contract -> Tech advice
  
  (6, 3), -- Calculus -> Math
  (6, 5), -- Calculus -> Tech advice
  
  (7, 2), -- Python Performance -> Programming
  (7, 5), -- Python Performance -> Tech advice
  
  (8, 1), -- React vs Vue -> Technology
  (8, 2), -- React vs Vue -> Programming
  (8, 5), -- React vs Vue -> Tech advice
  
  (9, 2), -- Trading Bot -> Programming
  (9, 3), -- Trading Bot -> Math
  (9, 4), -- Trading Bot -> Fintech
  
  (10, 1), -- Database Query -> Technology
  (10, 2), -- Database Query -> Programming
  (10, 5); -- Database Query -> Tech advice

create table education_posts(
  post_id serial primary key,
  user_id int not null
  post_title varchar not null,
  post_text text not null,
  post_description varchar(1000) not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table education_categories(
  category_id serial primary key,
  category_name varchar(255) not null,
  category_description varchar(1000) not null,
  created_at datetime default now()
);

create table education_post_category_assignments(
  assignment_id serial primary key,
  post_id int not null, 
  category_id int not null, 
  created_at timestamp default now(),

  constraint fk_education_category_assignments
    foreign key (category_id)
    references education_categories(category_id),
  
  constraint fk_education_posts_assignments
    foreign key (post_id)
    references education_posts(post_id)
)

/*================================*/

INSERT INTO post_likes (user_id, post_id) VALUES 
  -- Post 1: Machine Learning Model Help (3 likes)
  (1, 1),
  (2, 1),
  (3, 1),
  
  -- Post 2: Smart Contract Security Question (2 likes)
  (1, 2),
  (3, 2),
  
  -- Post 3: Calculus Integration Problem (2 likes)
  (2, 3),
  (1, 3),
  
  -- Post 4: Python Performance Issues (3 likes)
  (1, 4),
  (2, 4),
  (3, 4),
  
  -- Post 5: React vs Vue Decision (2 likes)
  (2, 5),
  (3, 5),
  
  -- Post 6: Cryptocurrency Trading Bot (3 likes)
  (1, 6),
  (2, 6),
  (3, 6),
  
  -- Post 7: Database Query Optimization (1 like)
  (1, 7),
  
  -- Post 8: Linear Algebra in Graphics (2 likes)
  (2, 8),
  (3, 8),
  
  -- Post 9: Blockchain Consensus Mechanisms (3 likes)
  (1, 9),
  (2, 9),
  (3, 9),
  
  -- Post 10: API Rate Limiting Strategy (1 like)
  (2, 10);
