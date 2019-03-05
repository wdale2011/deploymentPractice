import React from "react";
import "../css/MessageBoardApp.css";
import CommentList from "./CommentList";
import commentdata from "../data";

/* Your task 
  1.) Pass comments down to CommentList (using props)
  2.) Create a CommentItem component
  3.) Render a single CommentItem with data
  4.) Don't forget CSS
*/

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: commentdata
    };
  }
  render() {
    return (
      <div className="message-board-app">
        <nav>
          <form>
            <input type="text" name="search" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </nav>
        <CommentList comments={this.state.comments} />
        <div className="add-comment">
          <form>
            <input type="text" name="comment" placeholder="Your opinion here" />
            <button type="submit">Comment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageBoardApp;
