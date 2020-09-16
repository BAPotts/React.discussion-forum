import React from 'react';
import PropTypes from 'prop-types';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { connect } from 'react-redux';

class PostControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPost: null,
      editing: false
    }
  }

  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }

  handleAddingNewPostToList = (newPost) => {
    const { dispatch } = this.props;
    const { id, postTitle, postBody, timeStamp } = newPost;
    const action = {
      type: 'ADD_POST',
      id: id,
      postTitle: postTitle,
      postBody: postBody,
      timeStamp: timeStamp
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.props.masterPostList[id];
    this.setState({
      selectedPost: selectedPost
    });
  }

  handleEditClick = () => {
    this.setState({
      editing: true
    });
  }
  
  handleIncrementingPostScore = (postToIncrement) => {
    const { dispatch } = this.props;
    const { id, postTitle, postBody, timeStamp, postScore } = postToIncrement;
    const action = {
      type: 'ADD_POST',
      id: id,
      postTitle: postTitle,
      postBody: postBody,
      timeStamp: timeStamp,
      postScore: postScore + 1
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedPost: null
    });
  }

  handleDecrementingPostScore = (postToDecrement) => {
    const { dispatch } = this.props;
    const { id, postTitle, postBody, timeStamp, postScore } = postToDecrement;
    const action = {
      type: 'ADD_POST',
      id: id,
      postTitle: postTitle,
      postBody: postBody,
      timeStamp: timeStamp,
      postScore: postScore - 1
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedPost: null
    });
  }

  // else if (this.state.selectedKeg != null) {
  //   currentlyVisibleState = <KegDetail keg = {this.state.selectedKeg} onClickingDecrement = {this.handleDecrementPint} //new
  //   onClickingEdit = {this.handleEditClick}/> //new
  //   buttonText = "Return to Keg List";

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <NewPostForm post = {this.state.selectedPost} onEditPost = {this.handleEditingPostInList} />
      buttonText = "Return to Post List";

    } else if (this.state.selectedPost != null) {
      currentlyVisibleState = 
      <PostDetail 
        post = {this.state.selectedPost} 
        onClickingDelete = {this.handleDeletingPost} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Post List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewPostForm onNewPostCreation={this.handleAddingNewPostToList}  />;
      buttonText = "Return to Post List";
    } else {
      currentlyVisibleState = <PostList postList={this.props.masterPostList} onPostSelection={this.handleChangingSelectedPost} />;
      buttonText = "Add Post";
    }
    
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      
        <button onClick = {this.handleClick}>upvote: {this.state.count}</button>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    masterPostList: state.masterPostList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

PostControl.propTypes = {
  masterPostList: PropTypes.object
}

PostControl = connect(mapStateToProps)(PostControl);

export default PostControl;