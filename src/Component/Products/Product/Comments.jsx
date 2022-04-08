import { useEffect, useState, memo, createRef } from 'react';
import axios from 'axios';
import './Comments.css';
import Comment from './Comment';
import CommentForm from './CommentForm';
// import { updateComment as updateCommentApi, deleteComment as deleteCommentApi } from './api';

import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../../redux/actions/Reviews';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
const Comments = ({ currentUserId, currentUsername, currentName }) => {
  console.log(currentUsername);
  const dispatch = useDispatch();
  const getComment = useSelector((state) => state.getReviews);

  const { comment, loading, error } = getComment;

  const [backendComments, setBackendComments] = useState([]);

  const rootComments = comment.filter((backendComment) => backendComment.parentId === null);
  //   console.log(rootComments);
  const canRate = currentUserId !== 1 && currentUsername !== 'admin'; //jika userId saat ini admin/superadmin tidak bisa ngerate
  const exsitUser = comment.find((backendComments) => backendComments.userId === currentUserId); // jika ditemukan user di database maka true
  console.log(exsitUser);

  const [activeComment, setActiveComment] = useState(null);
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const getReplies = (commentId) => comment.filter((backendComment) => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const addComment = (text, bintang = null, parentId = null, name = null, username = null) => {
    const data = {
      body: text,
      parentId,
      userId: currentUserId,
      rate: bintang,
      name: name,
      username: username,
      createdAt: new Date().toISOString(),
    };
    axios
      .post('http://localhost:3001/comments', data)
      .then((comment) => {
        // setBackendComments([comment, ...backendComments]);
        console.log(comment);
        dispatch(getReviews());
        setActiveComment(null);
      })
      .catch((err) => console.log(err));

    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
  };

  const updateComment = (text, bintang, commentId, username, parentId, userId, name) => {
    // updateCommentApi(text).then(() => {
    //   const updatedBackendComments = comment.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return { ...backendComment, body: text };
    //     }
    //     return backendComment;
    //   });

    // console.log(createdAt);
    const data = {
      body: text,
      rate: bintang,
      parentId: parentId,
      userId: userId,
      rate: bintang,
      username: username,
      name: name,
      createdAt: new Date().toISOString(),
      id: commentId,
    };
    axios
      .put(`http://localhost:3001/comments/${commentId}`, data)
      .then((res) => {
        console.log(res);
        dispatch(getReviews());
        setActiveComment(null);
      })
      .catch((err) => console.log(err));
    // console.log(bintang);
    // setBackendComments(updatedBackendComments);

    // });
  };

  const deleteComment = (commentId) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/comments/${commentId}`)
          .then((res) => {
            console.log(res);
            dispatch(getReviews());
            Swal.fire('Deleted', 'Comment has been deleted', 'success');
          })
          .catch((err) => Swal.fire('Upss!', `${err}`, 'error'));
      }
    });
  };

  return (
    <div className="comments">
      <div className="comments-container">
        {loading ? (
          <div className="loading">
            <Spinner animation="border" variant="warning" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          rootComments &&
          rootComments.map((rootComment) => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={currentUserId}
              canRate={canRate}
            />
          ))
        )}
      </div>
      {/* jika exsitUser bernilai true maka harus jadi false agar comment form tidak muncul */}
      {!exsitUser && currentUserId && canRate ? (
        <>
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Write" currentUsername={currentUsername} currentName={currentName} currentValue={0} handleSubmit={addComment} />
        </>
      ) : null}
    </div>
  );
};

export default memo(Comments);
