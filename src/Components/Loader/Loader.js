/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Loader.css";

export default () => (
  <>
    <div className='loading-container'>
      <div className='loading'></div>
      <div id='loading-text'>Loading</div>
    </div>
  </>
);
