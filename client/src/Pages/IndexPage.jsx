import React, { useEffect, useState } from 'react';
import Post from '../Post';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  
  try {
    useEffect(() => {
      fetch('http://localhost:4000/post').then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }, []);
  } catch (err) {
    throw err;
  }

  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
}
