import React from "react";
import "../css/CommentItem.css";

class CommentItem extends React.Component {
  render() {
    return (
      <div className="message-board-comment-item">
        <p>{this.props.comment.text}</p>
        <button type="button" class="delete-button">
          x
        </button>
        <button type="button" class="edit-button">
          Edit
        </button>
        <input
          type="text"
          class="hidden"
          name={this.props.comment.id}
          value={this.props.comment.text}
        />
        <button
          class="submit-button hidden"
          name={this.props.comment.id}
          submit
        >
          Submit
        </button>
      </div>
    );
  }
}
export default CommentItem;
