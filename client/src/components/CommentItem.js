import React from "react";
import "../css/CommentItem.css";

class CommentItem extends React.Component {
  render() {
    const { comment, onDeleteMe } = this.props;
    return (
      <div className="message-board-comment-item">
        <p>{this.props.comment.text}</p>
        <button type="button" className="delete-button" onClick={onDeleteMe}>
          x
        </button>
        <button type="button" className="edit-button">
          Edit
        </button>
        <input
          type="text"
          className="hidden"
          name={this.props.comment.id}
          value={this.props.comment.text}
        />
        <button
          className="submit-button hidden"
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
