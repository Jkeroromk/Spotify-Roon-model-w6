import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Posts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLonding] = useState();
  const [searchId, setSearch] = useState(id);


  function OnSearch(){
    fetchPosts(searchId);
  }

  function OnSearchKeyPress(key){

    if(key === 'Enter'){
      fetchPosts(searchId);
    }
  }
  
  async function fetchPosts(userId) {
    setLonding(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPost(data);
    setLonding(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <>
      <div className="post__search">
        <button onClick={() => navigate('/')}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input type="number" 
          value={searchId} 
          onChange={(event) => setSearch(event.target.value)} 
          onKeyUp={(event) => OnSearchKeyPress(event.key)}/>
          <button onClick={() => OnSearch()}>Enter</button>
        </div>
      </div>
      {loading ? (
        new Array(10).fill(0).map((_, index) => (
          <div className="post" key={index}>
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div>
        ))
      ) : (
        post.map((post) => (
          <div className="post" key={post.id}>
            <div className="post__title">{post.title}</div>
            <p className="post__body">{post.body}</p>
          </div>
        ))
      )}
    </>
  );
};

export default Posts;
