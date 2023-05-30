import React, { Fragment } from "react";
import "./landing.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Landing() {
  const items = [1, 2, 3, 4, 5, 6];
  const bootcampsBenefits = [{'Rapid Skill Acquisition':'Bootcamps are designed to provide accelerated learning experiences, allowing participants to quickly gain practical skills in a relatively short period.'},{ 'Industry-Relevant Training':'Bootcamps are typically tailored to meet the needs of specific industries, ensuring that participants gain knowledge that is applicable to the job market.'}, {'Career Transition Opportunities':'Bootcamps offer an accessible pathway for individuals looking to switch careers or enter new industries.'},{ 'Networking and Mentorship':'Bootcamps provide an environment for participants to build valuable connections within the industry.'},{'Job Placement Support':'A significant advantage of bootcamps is the emphasis on job placement and career support.'},{'Cost and Time Efficiency':'Compared to traditional degree programs, bootcamps are relatively shorter in duration and more cost-effective.'}]
  return (
    <Fragment>
      <div className="center-element box">
        <h1 className="main-heading">
          Unlock Your <nav id="custom-text-decoration" style={{backgroundColor:'red'}}>Learning Potential</nav>: Redefine Your Skills and Fuel Success
          with <nav id="custom-text-decoration" style={{backgroundColor:'yellow'}}>Dynamic Bootcamps!</nav>
        </h1>
        <img
          className="title-img"
          src="https://freepngimg.com/thumb/school/32760-6-students-learning-transparent.png"
          alt=""
        />
      </div>
      <br/><br/><br/>
      <br/>
      <h1 className="label">Explore Top Bootcamps</h1>
      <div className="bootcamps-container box center-element">
        {items.map((item, key) => (
            <Card key={key} sx={{ maxWidth: 300, minWidth: 300 }}>
              <CardMedia
                sx={{ height: 100 }}
                image="/"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard {item}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Mahan
                </Typography>
                <div className="cost-rating-conatiner center-element">
                  <nav>COST</nav>
                  <nav>Rating</nav>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <h1 className="label">Benefits of Bootcamps</h1>
      <div className="box benefits-container">
        {
          bootcampsBenefits.map((item, key) =>(
            <div key={key} className="item">
              <h2>{Object.keys(item)}</h2>
              <br />
              <p>{Object.values(item)}</p>
            </div>
          ))
        }
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <footer id='footer' className="center-element">
        <h1>LearnX</h1>
        <p className="about">LearnX is a Bootcamp application where you find numerous bootcamps with different courses. Each bootcamp is beautifully described with all the major skills. Moreover, it streamlines access to course content</p>
        <nav>&copy; All Rights Reserved | <nav style={{color: 'skyblue', display:'inline-block'}}>Paul Industries</nav></nav>
      </footer>
        <p className="credit">Design By - Mahan</p>
    </Fragment>
  );
}
