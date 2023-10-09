import React, {useState, useEffect} from "react";
import {getCommentsData} from "../../data/comments"
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsContainer = ({className, logginedUserId}) => {
    const [comments, setComments] = useState([]);
    // xem dữ liệu của comments.js
    const mainComments = comments.filter((comment) => comment.parent === null);
    const [affectedComment, setAffectedComment] = useState(null);

    useEffect(() => {
        (async () => {
            const commentData = await getCommentsData();
            setComments(commentData);
        })();
    }, []);

    const addCommentHandler = (value, parent=null, replyOnUser=null) => {
        const newComment = {
            _id: Math.random().toString(),
            user: {
                _id: "a",
                name: "Mohammad Rezaii",
            },
            desc: value,
            post: "1",
            parent: parent,
            replyOnUser: replyOnUser,
            createdAt: new Date().toISOString(),
        };
        setComments((curState) => {
            return [newComment,...curState]
        });
        setAffectedComment(null);
    };

    // Tìm comment với ID cần sửa => dùng map tìm ra
    // Set giá trị value lại cho comment
    const updateCommentHandler = (value, commentId) => {
        const updatedComment = comments.map((comment) => {
            if(comment._id === commentId){
                return {...comment, desc: value};
            }
            return comment
        });
        setComments(updatedComment);
        setAffectedComment(null);
    };

    // deleteComment, using filter
    const deleteCommentHandler = (commentId) => {
        const updatedComment = comments.filter((comment) => {
            return comment._id !== commentId
        });
        setComments(updatedComment);
    };

    const getRepliesHandler = (commentId) => {
        return comments
            .filter((comment) => comment.parent === commentId)
            .sort((a, b) => {
            return (
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        });
    };
    
    return (
        <div className={`${className}`}>
            <CommentForm 
                btnLabel="Send"
                formSubmitHandler={(value) => addCommentHandler(value)}
            />
            <div className="space-y-4 mt-8">
                {mainComments.map((comment) => (
                    <Comment 
                        key={comment._id}
                        comment={comment}
                        logginedUserId={logginedUserId}
                        affectedComment={affectedComment}
                        setAffectedComment={setAffectedComment}
                        addComment={addCommentHandler}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={getRepliesHandler(comment._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;