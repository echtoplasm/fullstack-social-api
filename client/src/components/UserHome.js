import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import LikeCount from './LikeCount';
import LiveFeed from './FeedComponent';

const LoggedInProfile = () => {
  const { id } = useParams();
  const userId = id;


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Move useState hooks to component level
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [allUsersPosts, setAllUsersPosts] = useState([]);



  const [userProfile, setUserProfile] = useState({
    username: '',
    first_name: '',
    last_name: '',
    location: '',
    biography: ''
  });

  const [comments, setComments] = useState({
    comment_id: null,
    user_id: null,
    post_id: null,
    comment_text: '',
    created_at: null,
    update_at: null
  });

  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`);
        const userData = await response.json();

        if (response.ok) {
          setUserProfile({
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name, // Fixed: was userData.email
            location: userData.location, // Fixed: was userData.locale
            biography: userData.biography
          });
        } else {
          setError('Failed to load user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [userId]);


  // This will be the effect for the feed
  /*
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        // Fixed: GET requests don't need body
        const response = await fetch(`http://localhost:5000/posts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
          const posts = await response.json();
          setAllPosts(posts);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
        setError("Network Error. Please try again.");
      }
    };

    fetchAllPosts();
  }, []);

*/

  // This will be the effect for the users posts only on the dashboard, this will eventually be a place that they can see their interactions with each of their posts 
  useEffect(() => {
    const fetchAllPostsForUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${userId}/posts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
          const posts = await response.json();
          setAllUsersPosts(posts);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (err) {
        console.error(err);
        setError("Network Error. Please try again.");
      }
    };

    fetchAllPostsForUser();
  }, []);


  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        user_id: userId,
        post_title: postTitle,
        post_text: postText
      };

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const newPost = await response.json();
        setAllPosts(prevPosts => [newPost, ...prevPosts]);
        // Clear form
        setPostTitle("");
        setPostText("");
        setSuccess("Post created successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create new post");
      }
    } catch (err) {
      console.error(err.message);
      setError("Network Error. Please try again");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="pt-5">
        <div
          className="main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 6fr 2fr',
            gridTemplateRows: 'auto auto',
            gap: '1.5rem',
            gridTemplateAreas: `
            "profile newpost myposts"
            "profile feed myposts"
          `,
            minHeight: '70vh'
          }}
        >

          {/* Profile Section */}
          <div style={{ gridArea: 'profile', gridRow: 'span 2' }}>
            <div className="rounded shadow border h-100">
              <h2 className="text-center card-title-bg rounded-top p-2 text-white">My Profile</h2>
              <div className='p-3'>
                <div className='my-3 border my-posts-heading-color rounded p-2'>
                  <strong>Username:</strong> {userProfile?.username}
                </div>
                <div className='my-3 border my-posts-heading-color rounded p-2'>
                  <strong>First Name:</strong> {userProfile?.first_name}
                </div>
                <div className='my-3 border my-posts-heading-color rounded p-2'>
                  <strong>Last Name:</strong> {userProfile?.last_name}
                </div>
                <div className='my-3 border my-posts-heading-color rounded p-2'>
                  <strong>Location:</strong> {userProfile?.location}
                </div>
                <div className='my-3 border my-posts-heading-color rounded p-2'>
                  <strong>Biography:</strong> {userProfile?.biography}
                </div>
              </div>
            </div>
          </div>

          {/* New Post Section */}
          <div style={{ gridArea: 'newpost' }}>
            <div className="rounded text-center shadow h-auto border">
              <div className="card-body">
                <h2 className="text-center  p-2 rounded-top text-white card-title-bg">New Post</h2>
                <form onSubmit={onSubmitForm}>
                  <div className="form-floating mx-3">
                    <input
                      type="text"
                      className="form-control"
                      id="postTitle"
                      placeholder='post title'
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                    />
                    <label htmlFor="postTitle" className="form-label">Post Title</label>
                  </div>
                  <div style={{ maxHeight: '300px' }} className="mx-3 my-2 form-floating">
                    <textarea
                      style={{ maxHeight: '225px' }}
                      className="form-control"
                      id="postText"
                      rows="3"
                      value={postText}
                      placeholder='post-content'
                      onChange={(e) => setPostText(e.target.value)}
                      required
                    />
                    <label htmlFor="postText" className="form-label">Post Content</label>
                  </div>
                  <button type="submit" className="btn btn-primary mb-3">Create Post</button>
                </form>
              </div>
            </div>
          </div>

          {/* My Posts Section */}
          <div style={{ gridArea: 'myposts', gridRow: 'span 2' }}>
            <div className="shadow rounded-bottom h-100 border">
              <div className="card-body">
                <h2 className='text-center card-title-bg p-2 rounded-top text-white'>My Posts</h2>
                <div style={{
                  height: 'auto',
                  overflowY: 'auto',
                  padding: '1rem'
                }}>
                  {allUsersPosts.length === 0 ? (
                    <p>No posts yet.</p>
                  ) : (
                    allUsersPosts.map((post) => (
                      <div key={post.post_id} className="mb-3 p-3 border rounded my-posts-heading-color">
                        <h5>{post.post_title}</h5>
                        <p>{post.post_text}</p>
                        <small className="text-muted mt-0">
                          Created: {new Date(post.created_at).toLocaleDateString()}
                        </small>
                        <div className='mt-2'>
                          <LikeCount post_id={post.post_id} />
                        </div>
                      </div>
                    ))
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Feed Section */}
          {/*<div style={{ gridArea: 'feed' }}>
            <div className="rounded shadow-sm" style={{ overflow: "hidden" }}>
              <h2 className='text-center card-title-bg text-white p-2 mb-0' style={{ borderRadius: '7px 7px 0 0' }}>My Feed</h2>
              <div style={{
                height: '300px',
                overflowY: 'auto',
                borderRadius: '7px',
                padding: '0.5rem 1rem'
              }}>
                {allPosts.length === 0 ? (
                  <p className="text-center">No posts yet.</p>
                ) : (
                  allPosts.map((post) => (
                    <div key={post.post_id} className='mb-3 p-3 border rounded my-posts-heading-color'>
                      <h5>{post.post_title}</h5>
                      <p>{post.post_text}</p>
                      <small className="text-muted">
                        Created: {new Date(post.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div> */}
          <LiveFeed />
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
      @media (max-width: 768px) {
        .main-grid {
          grid-template-columns: 1fr !important;
          grid-template-areas: 
            "profile"
            "newpost"
            "myposts"
            "feed" !important;
        }
      }
      
      @media (max-width: 992px) and (min-width: 769px) {
        .main-grid {
          grid-template-columns: 1fr 1fr !important;
          grid-template-areas: 
            "profile newpost"
            "myposts myposts"
            "feed feed" !important;
        }
      }
      
      @media (max-width: 1200px) and (min-width: 993px) {
        .main-grid {
          grid-template-columns: 3fr 4fr 3fr !important;
        }
      }
    `}</style>
    </div>
  );
};

export default LoggedInProfile;
