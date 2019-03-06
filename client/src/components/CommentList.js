import React from "react";
import CommentItem from "./CommentItem";
import "../css/CommentList.css";

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentArray: [this.props.comments]
    };
  }
  render() {
    const { onDelete } = this.props;
    return (
      <div className="message-board-comment-list">
        {this.props.comments.map((comment, index) => (
          <CommentItem
            comment={comment}
            onDeleteMe={() => onDelete(comment.id)}
            key={index}
          />
        ))}
      </div>
    );
  }
}
