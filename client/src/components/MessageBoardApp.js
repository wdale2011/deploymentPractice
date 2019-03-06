import React from "react";
import "../css/MessageBoardApp.css";
import CommentList from "./CommentList";
import commentdata from "../data";
import axios from "axios";
import AddCommentForm from "./AddCommentForm";

/* Your task 
  1.) Pass comments down to CommentList (using props)
  2.) Create a CommentItem component
  3.) Render a single CommentItem with data
  4.) Don't forget CSS
*/

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      searchText: "",
      comments: []
    };
  }

  // lifecycle hook ran after component is loaded into DOM
  componentDidMount() {
    axios
      .get("http://express-practice-app.herokuapp.com/api/comments")
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.log(error));
  }

  handleDelete = id => {
    axios
      .delete(`http://express-practice-app.herokuapp.com/api/comments/${id}`)
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => console.log(error));
  };

  handleAddComment = commentText => {
    axios
      .post("http://express-practice-app.herokuapp.com/api/comments", {
        text: commentText
      })
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Please enter comment text");
        }
      });
  };

  handleSearchComment = event => {
    event.preventDefault();
    axios
      .get(
        `http://express-practice-app.herokuapp.com/api/comments?filter=${
          this.state.searchText
        }`
      )
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputText = event => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    return (
      <div className="message-board-app">
        <nav>
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={this.state.searchText}
              onChange={this.handleInputText}
            />
            <button type="submit" onClick={this.handleSearchComment}>
              Search
            </button>
          </form>
        </nav>
        <CommentList
          comments={this.state.comments}
          onDelete={this.handleDelete}
        />
        <AddCommentForm onAddComment={this.handleAddComment} />
      </div>
    );
  }
}

export default MessageBoardApp;
