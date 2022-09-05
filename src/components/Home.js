import React from "react";

const Home = ({token, user}) => {
  return <div className="text-forground">
    {
      (token && user) ?
      <>
        <h1>Welcome Back to Fitness Trac.kr {user.username}!</h1>
        <h2>It's time to create personalized workout routines to reach your goals!</h2>
        <p>Visit the Public Routines and Activities tabs to get some ideas for your routines.</p>
        <p>Create and edit your routines from the My Routines tab.</p>
        <h1>What are you waiting for?</h1>
      </> :
      <>
        <h1>Welcome to Fitness Trac.kr!</h1>
        <h2>Sign up today to create personalized workout routines to reach your goals!</h2>
        <p>Feel free to browse the Public Routines and Activities tabs to get an idea of where to start!</p>
      </>
    }
    </div> 
}

export default Home;