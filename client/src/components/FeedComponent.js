import React, { useState, useEffect } from "react";
import LikeCount from './LikeCount';


const LiveFeed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPostsByCategory('all');
  }, []);


  const fetchPostsByCategory = async (category) => {
    setLoading(true)
    setError('')


    try {

      const response = await fetch(`http://localhost:5000/posts/${category}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }

      });

      if (response.ok) {
        const posts = await response.json();
        setFilteredPosts(posts);
        setActiveCategory(category)
      }


    } catch (err) {
      console.error(err)
      setError('Server Error Please Try again.')
    }

  };

  return (
    <div style={{ gridArea: 'feed' }}>
      <div className="rounded shadow border" style={{ overflow: "hidden" }}>
        <div className="text-center my-2 py-3">
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("all")}>All</button>
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("technology")}>Tech</button>
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("programming")}>Programming</button>
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("math")}>Math</button>
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("fintech")}>Fintech</button>
          <button className="btn btn-primary mx-3 rounded" onClick={() => fetchPostsByCategory("techadvice")}>Advice</button>
        </div>
        <h2 className='text-center card-title-bg text-white p-2 mb-0'>My Feed</h2>
        <div style={{
          height: '400px',
          overflowY: 'auto',
          borderRadius: '7px',
          padding: '0.5rem 1rem'
        }}>
          {filteredPosts.length === 0 ? (
            <p className="text-center">No posts yet.</p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.post_id} className='mb-3 p-3 border rounded my-posts-heading-color'>
                <h5>{post.post_title}</h5>
                <p>{post.post_text}</p>
                <small className="text-muted">
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
  )
}

export default LiveFeed;
