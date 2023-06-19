import React from 'react'
import { useState, useEffect } from 'react'
const Github = () => {
 
    const [userValue,setUserValue]  = useState('');
    const [github,setGithub] = useState([]);
    const findTheUser = (e)=>{
           e.preventDefault();
    }

    useEffect(()=>{
        const githubUrl = `https://api.github.com/search/users?q=${userValue}`
         const requestData = async ()=>{
              try {
                 const requestData = await fetch(githubUrl);
                 const reponseData = await requestData.json();
                 const userData = reponseData.items;
                 const extractData = userData.map(results=>{
                    return results;
                })
                setGithub(extractData);
              }
              catch(err){
                   console.log("API has some issues", err.message);
              }
         }
         requestData();
    },[userValue]);
  return (
    <>
       <form onSubmit={findTheUser}>
           <h2>Search GitHub users in second</h2>
            <input type='text' onChange={(e)=>setUserValue(e.target.value)} placeholder='search users...'></input>
            <div className='github-user'>
                  {
                    github.map((items)=>(
                       <div className='github-account' key={items.id}>
                           <h3>{items.login}</h3>
                           <h4>{items.id}</h4>
                           <div className='cover'>
                               <img src = {items.avatar_url} alt = {items.avatar_url} />
                           </div>
                           <a target='_blank' href= {items.html_url}>Profile Link - {items.login}</a>
                           <a target='_blank' href= {items.repos_url}>Repository Url -  <br/> {items.repos_url}</a>
                           <a  target='_blank' href= {items.html_url}>Profile-Link - <br/>  {items.html_url}</a>
                           <a target='_blank' href= {items.starred_url}>Favourite Repository - <br/> {items.starred_url}</a>
                           <a target='_blank' href= {items.following_url}>Following -<br/>  {items.following_url}</a>
                           
                       </div>
                    ))
                  }
            </div>
       </form>
    </>
  )
}

export default Github