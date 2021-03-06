import React from "react";
import PropTypes from "prop-types";

function Post(props) {
  
  return(
    
    <React.Fragment>
      
      
      <div onClick = {() => props.whenPostClicked(props.id)}>
        <h3>title: {props.postTitle} - body: {props.postBody}</h3>
        <h3>time: {props.timeStamp}</h3>
        <h3>post-score: {props.postScore}</h3>
        <h3>id: {props.id}</h3>
        <hr />
      </div>
    </React.Fragment>
  );
}

Post.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postBody: PropTypes.string,
  // timeStamp: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Post;