'use client'
// Implementing search functionality
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
       {data.map((post) => (
        <PromptCard 
        key = {post._id}
        post = {post}
        handleTagClick = {handleTagClick}
         />
       ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout,setSearchTimeout] = useState(null);
  const [searchedResult,setSearchedResult] = useState([]);
  const [posts,setPosts] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(()=>{
      const searchResult = filterPrompts(e.target.value);
      setSearchedResult(searchResult);
    },5009)
  }

  const handleTag = (tagName)=>{
    setSearchText(tagName);
    const searchTag = filterPrompts(tagName);
    setSearchedResult(searchTag);
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[])

  return (
   <section className = "feed">
    <form className = "relative w-full flex-center">
     <input  
      type = "text"
      placeholder="search for a tag or a username"
      value = {searchText}
      onChange = {handleSearchChange}
      required
      className = "search_input peer"
     />
    </form>

    {searchText ? (
      <PromptCardList 
      data = {searchedResult}
      handleTagClick={handleTag}
    />
    ) : (
      <PromptCardList 
      data = {posts}
      handleTagClick={handleTag}
    />
    )}
   
    
   </section>
  )
}

export default Feed
