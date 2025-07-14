import React, { useState, useEffect } from "react";
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const LikeCount = ({ post_id }) => {
  const [likes, setLikes] = useState({ length: 0 });
  const [refreshLikes, setRefreshLikes] = useState({ length: 0 })
  const { id } = useParams();
  const user_id = id;



  const fetchLikesForPost = async () => {

    if (!post_id) return;

    try {
      console.log(`Fetching likes for post ${post_id}`);
      const response = await fetch(`http://localhost:5000/posts/${post_id}/likes`);

      console.log(`Response status for post ${post_id}:`, response.status);

      if (response.ok) {
        const data = await response.json();
        console.log(`Data received for post ${post_id}:`, data);
        setLikes({ length: data.length });
      } else {
        console.log(`Failed response for post ${post_id}`);
      }
    } catch (err) {
      console.error(`Error for post ${post_id}:`, err);
    }
  };

  useEffect(() => {
    fetchLikesForPost();
  }, [post_id]);




  // this is for testing purposes because in a production environment there will be JWT auth or cookies containing the users id rather than having to fetch all user data

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${user_id}`);
      const userData = await response.json();
    } catch (err) {
      console.error(err)
    }
  }

  const addLikeClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post_id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: parseInt(user_id) })
      })

      if (response.ok) {
        const data = await response.json();
        await fetchLikesForPost();
      }

    } catch (err) {
      console.error(err)
    }

  }

  console.log(`Rendering LikeCount for post ${post_id}, likes:`, likes);
  return (
    <div>
      <button className="btn like-logo" onClick={addLikeClick}>
        <MdOutlineFavoriteBorder />
      </button>
      <span className='like-count'>{likes.length}</span>

    </div>
  )
};

export default LikeCount;
