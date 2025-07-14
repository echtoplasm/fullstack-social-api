const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

app.use(cors());
app.use(express.json()); //give access to the req.body via json 

app.use(cors({
  origin: 'http://localhost:3000', // or whatever port your React app runs on
  credentials: true
}));

// -- ROUTES -- //

// USERS
// create user 
app.post("/users/new", async (req, res) => {

  try {
    const {
      username,
      first_name,
      last_name,
      email,
      locale,
      phone_number,
      biography
    } = req.body;

    if (!username || !first_name || !last_name || !email) {
      return res.status(400).json({
        error: "Missing one or more required fields, double check and try again!"
      })
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        error: "Please provide a valid email"
      })
    }

    const query = (
      `
      insert into users
      (username, first_name, last_name, email, locale, phone_number, biography)
      values ($1, $2, $3, $4, $5, $6, $7) 
      returning *
      `
    )

    const values = [
      username,
      first_name,
      last_name,
      email,
      locale || null,
      phone_number || null,
      biography || null
    ]

    const result = await pool.query(query, values);
    const newUser = result.rows[0];

    res.json(newUser);

    // Todo add the CDN url for profile picture 

  } catch (err) {
    console.error(err)
  }
})


// update user 
app.put("/users/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const updates = req.body;

    const setClause = [];
    const values = [];
    let paramCounter = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        setClause.push(`${key} = $${paramCounter}`);
        values.push(value);
        paramCounter++;
      }
    }

    values.push(id);

    if (setClause.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const query = `
      UPDATE users 
      SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $${paramCounter}
      RETURNING *
    `;

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err)
  }
})

// delete user 
app.delete("/users/:id", async (req, res) => {

  try {
    const { id } = req.params;


    const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    res.json({
      message: "User deleted successfully",
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err)
  }

})

// get user 
app.get("/users/:id", async (req, res) => {

  try {
    const { id } = req.params;

    const values = [];
    values.push(id);

    const query = 'SELECT * FROM users WHERE user_id = $1';
    const result = await pool.query(query, values);

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err)
  }
})

//== POSTS ==//

// i think i can carry over the sessions data for the user id to be added to the social posts

// I should just be able to make the created_at timestamp empty since it has a default value

// new post //

//TODO add auth session tokens for associating users with their posts

app.post("/posts", async (req, res) => {

  try {

    const {
      user_id,
      post_title,
      post_text
    } = req.body

    const query = (
      `
      INSERT into social_posts
      (user_id, post_title, post_text)
      values ($1, $2, $3)
      returning *
      `
    );

    const values = [
      user_id,
      post_title || null,
      post_text
    ];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err)
  }

})

// delete post // 

app.delete("/posts/:id", async (req, res) => {

  try {
    const { id } = req.params
    const deletePost = await pool.query("DELETE FROM social_posts WHERE post_id = $1", [id])

    res.json("Post was deleted");

  } catch (err) {
    console.error(err)
  }
})

// get all posts for a user
app.get("/:id/posts", async (req, res) => {

  try {
    const { id } = req.params
    const getAllPosts = await pool.query(" SELECT * FROM social_posts WHERE user_id = $1", [id])

    res.json(getAllPosts.rows)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" })
  }

})

// get all posts for the feed // 

app.get("/posts/all", async (req, res) => {

  try {
    const getEveryPosts = await pool.query(`
      SELECT 
        sp.post_id,
        sp.user_id,
        sp.post_title,
        sp.post_text,
        sp.created_at,
        sp.updated_at,
        STRING_AGG(sc.category_name, ', ' ORDER BY sc.category_name) as categories,
        COUNT(pl.like_id) as like_count
      FROM social_posts sp
      LEFT JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id
      LEFT JOIN social_categories sc ON spca.category_id = sc.category_id
      LEFT JOIN post_likes pl ON sp.post_id = pl.post_id
      GROUP BY sp.post_id, sp.user_id, sp.post_title, sp.post_text, sp.created_at, sp.updated_at
      ORDER BY sp.created_at DESC
    `);

    res.json(getEveryPosts.rows);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server Error" });
  }
});


// get all technology related posts for the feed

app.get("/posts/technology", async (req, res) => {

  try {
    const getAllTechPosts = await pool.query(
      "SELECT sp.post_id, sp.post_title, sp.post_text, sp.user_id, sp.created_at FROM social_posts sp JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id JOIN social_categories sc on spca.category_id = sc.category_id WHERE sc.category_name='Technology' ORDER BY sp.created_at DESC"
    );

    res.json(getAllTechPosts.rows);

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// get all math related posts for the feed 

app.get("/posts/math", async (req, res) => {
  try {
    const getAllMathPosts = await pool.query(
      "SELECT sp.post_id, sp.post_title, sp.post_text, sp.user_id, sp.created_at FROM social_posts sp JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id JOIN social_categories sc on spca.category_id = sc.category_id WHERE sc.category_name='Math' ORDER by created_at DESC"
    );

    res.json(getAllMathPosts.rows);

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
});

// get all programming related posts for the feed 

app.get("/posts/programming", async (req, res) => {
  try {
    const getAllProgPosts = await pool.query(
      "SELECT sp.post_id, sp.post_title, sp.post_text, sp.user_id, sp.created_at FROM social_posts sp JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id JOIN social_categories sc on spca.category_id = sc.category_id WHERE sc.category_name='Programming' ORDER by created_at DESC"
    );

    res.json(getAllProgPosts.rows)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// get all fintech posts for the feed

app.get("/posts/fintech", async (req, res) => {
  try {
    const getAllFintechPosts = await pool.query(
      "SELECT sp.post_id, sp.post_title, sp.post_text, sp.user_id, sp.created_at FROM social_posts sp JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id JOIN social_categories sc on spca.category_id = sc.category_id WHERE sc.category_name='Fintech' ORDER by created_at DESC"
    )

    res.json(getAllFintechPosts.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" })
  }
})

// get all tech advice posts for the feed 

app.get("/posts/techadvice", async (req, res) => {
  try {
    const getAllTechAdvicePosts = await pool.query(
      "SELECT sp.post_id, sp.post_title, sp.post_text, sp.user_id, sp.created_at FROM social_posts sp JOIN social_post_category_assignments spca ON sp.post_id = spca.post_id JOIN social_categories sc on spca.category_id = sc.category_id WHERE sc.category_name='Tech advice' ORDER by created_at DESC"
    );

    res.json(getAllTechAdvicePosts.rows);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

//==post_likes==//

//==create a like (user likes a post)

app.post("/posts/:id/likes", async (req, res) => {

  try {
    const { id } = req.params; //post_id -- maybe need to refactoring naming conventions in the URLS
    const { user_id } = req.body;

    //check if user already liked a post 
    const checkQuery = `
      SELECT * FROM post_likes WHERE 
      user_id = $1 and post_id = $2
    `

    const checkExistingLike = await pool.query(checkQuery, [user_id, id]);

    if (checkExistingLike.rows.length > 0) {
      return res.status(400).json({ error: "User already liked that post" })
    }
    const insertQuery = `
      INSERT into post_likes (user_id, post_id) values ($1, $2) RETURNING *
    `

    const result = await pool.query(insertQuery, [user_id, id]);

    // get updated like count 
    const countQuery = "SELECT COUNT(*) as like_count FROM post_likes WHERE post_id = $1"

    const countResult = await pool.query(countQuery, [id])


    res.json({
      like: result.rows[0],
      total_likes: parseInt(countResult.rows[0].like_count)
    })

  } catch (err) {
    console.error(err)
  }

})

//==delete a like 

app.delete("/posts/:id/likes", async (req, res) => {

  try {

    const { id } = req.params
    const { user_id } = req.body

    const checkLikeQuery = (
      `
      SELECT like_id FROM post_likes  WHERE user_id = $1 and post_id = $2
     `
    );


    const checkLike = await pool.query(checkLikeQuery, [user_id, id]);

    if (checkLike.rows.length === 0) {
      return res.status(404).json({
        error: "There is no associated like from this user with that specific post"
      })
    }

    const deleteLike = (`DELETE like_id FROM post_likes  WHERE user_id = $1 and post_id = $2 `)

    const result = await pool.query(deleteLike, [user_id, id]);

    const countQuery = "SELECT COUNT(*) as like_count FROM post_likes WHERE post_id = $1"

    const countResult = await pool.query(countQuery, [id])

    res.json({
      like: result.rows[0],
      total_likes: parseInt(countResult.rows[0].like_count)
    })

  } catch (err) {
    console.error(err)
  }

})



//==get all likes and details of likes for a post as well as the count of likes per post 

app.get("/posts/:post_id/likes", async (req, res) => {

  try {
    const { post_id } = req.params;
    console.log('Received post_id:', post_id);

    const countAllLikesQuery = `
      SELECT COUNT(*) as like_count FROM post_likes WHERE post_id = $1
    `;

    const countAllLikes = await pool.query(countAllLikesQuery, [post_id]);
    const likeCount = parseInt(countAllLikes.rows[0].like_count);

    res.json({
      length: likeCount,
      count: likeCount
    });
  } catch (err) {
    console.error(err);
  }

})

// FEEDS 

// testing route 

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" })
})

//Server 
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server has started on port 5000");
})

