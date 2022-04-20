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
import authHeader from '../../service/auth.header';
import { getProductDetails } from '../../../redux/actions/ProductActions';

const Comments = ({ currentUserId, currentUsername, currentName, slug, product_id }) => {
  console.log(currentUserId);
  const dispatch = useDispatch();
  const getComment = useSelector((state) => state.getReviews);

  const { comment, loading, error } = getComment;

  // const [backendComments, setBackendComments] = useState([]);

  const rootComments = comment && comment.filter((backendComment) => backendComment.parent_id === null);
  //   console.log(rootComments);
  // const canRate = currentUserId !== 1 && currentUsername !== 'admin'; //jika userId saat ini admin/superadmin tidak bisa ngerate
  const cantRate = currentUsername !== 'admin'; //jika userId saat ini admin/superadmin tidak bisa ngerate
  const exsitUser = comment && comment.find((backendComments) => backendComments.user.username === currentUsername); // jika ditemukan user di database maka true
  // console.log(exsitUser);

  const [activeComment, setActiveComment] = useState(null);
  useEffect(() => {
    dispatch(getReviews(slug));
  }, [dispatch, slug]);

  const getReplies = (commentId) => comment.filter((backendComment) => backendComment.parent_id === commentId).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const addComment = (text, bintang = null) => {
    // const data = {
    //   body: text,
    //   parentId,
    //   userId: currentUserId,
    //   rate: bintang,
    //   name: name,
    //   username: username,
    //   createdAt: new Date().toISOString(),
    // };
    const data = {
      body: text,
      rate: bintang,
    };
    axios
      .post(`/api/product/review-product/${product_id}/${currentUserId}`, data, {
        headers: authHeader(),
      })
      .then((comment) => {
        // setBackendComments([comment, ...backendComments]);
        console.log(comment);
        dispatch(getReviews(slug));
        setActiveComment(null);
      })
      .catch((err) => console.log(err));

    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
  };

  const updateComment = (text, bintang, commentId) => {
    // updateCommentApi(text).then(() => {
    //   const updatedBackendComments = comment.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return { ...backendComment, body: text };
    //     }
    //     return backendComment;
    //   });

    // console.log(createdAt);
    // const data = {
    //   body: text,
    //   rate: bintang,
    //   parentId: parentId,
    //   userId: userId,
    //   rate: bintang,
    //   username: username,
    //   name: name,
    //   createdAt: new Date().toISOString(),
    //   id: commentId,
    // };
    const data = {
      body: text,
      rate: bintang,
    };

    axios
      .post(`/api/product/update-review/${product_id}/${commentId}/${currentUserId}`, data, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        dispatch(getProductDetails(slug));
        dispatch(getReviews(slug));
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
          .delete(`https://dobha.000webhostapp.com/api/auth/admin/delete-review/${product_id}/${commentId}`)
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
          <h2>Silahkan Reviews</h2>
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
              currentUsername={currentUsername}
              currentName={currentName}
              cantRate={cantRate}
            />
          ))
        )}
      </div>
      {/* jika exsitUser bernilai true maka harus jadi false agar comment form tidak muncul */}
      {/* {!exsitUser && currentUserId && cantRate ? (
        <>
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Write" currentUsername={currentUsername} currentName={currentName} currentValue={0} handleSubmit={addComment} />
        </>
      ) : null} */}
    </div>
  );
};

export default memo(Comments);
