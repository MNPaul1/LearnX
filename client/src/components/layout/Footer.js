import React from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer id="footer" className="center-element">
        <h1>LearnX</h1>
        <p className="about">
          LearnX is a Bootcamp application where you find numerous bootcamps
          with different courses. Each bootcamp is beautifully described with
          all the major skills. Moreover, it streamlines access to course
          content
        </p>
        <nav>
          &copy; All Rights Reserved |{" "}
          <nav style={{ color: "skyblue", display: "inline-block" }}>
            Paul Industries
          </nav>
        </nav>
      </footer>
      <div className="credit center-element">
        <p>Design By - Mahanandan</p>
        <Link target="_blank" to="https://mahan2001.netlify.app">
        <LaunchIcon fontSize="small" />
        </Link>
      </div>
    </>
  );
};
