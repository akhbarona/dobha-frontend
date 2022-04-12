import CommentForm from './CommentForm';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
const Comment = ({ comment, replies, setActiveComment, activeComment, updateComment, deleteComment, addComment, parentId = null, currentUserId, currentUsername, currentName }) => {
  //proses awal menerima dari componen comments.js
  //comment -> isinya -> {id,body,username,userId,parentId,createdAt}
  //replies -> isinya data yang memiliki parentId yg sudah di filter dulu lalu diurutkan dari terkecil ke terbesar berdasarkan waktunya
  //setActiveComment -> untuk merubah/mengirimkan sebuah state apakah mau diedit atau direply
  //activeComment -> mengirimkan sebuah data objek {id,type}
  //updateComment -> untuk mengupdate comment
  //addComment -> untuk menambah comment
  //deletComment -> untuk menghapus comment
  //   console.log(replies, 'punyanya commentid', comment.id);
  //   console.log(currentUserId, '', comment.userId);
  // console.log(comment);
  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === 'editing'; //ketika activeComment ada dan idnya,typenya sama maka bernilai true
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === 'replying'; //ketika activeComment ada dan idnya,typenya sama maka bernilai true
  //   console.log(isReplying, ' ', comment.id, ' ', activeComment);
  const fiveMinutes = 10000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes; //waktu saat ini - waktu yang lalu apakah lebih > menit yang sekrang, jika kondisi lebih besar fiveMinutes  maka akan dapat menjalakan variabel canEdit

  const canDelete = currentUsername === 'admin'; //user dan admin bisa hapus komen

  //   const canReply = Boolean(currentUserId); //isinya true selama sesi user saat ini ada
  const canReply = currentUsername === 'admin'; //isinya true selama sesi user saat ini ada
  //   console.log(canReply);
  //   const canEdit = currentUserId === comment.userId && !timePassed; // bisa ngedit dengan syarat userId saat ini sama dengan id comment punyanya tapi dibatasi waktu selama 1menit
  // const canEdit = currentUserId === comment.userId;
  const canEdit = currentUsername === comment.username;
  // const [bintang, setBintang] = useState(0);

  // console.log('ini di comment', bintang);
  const replyId = parentId ? parentId : comment.id; //Jika si comment memiliki parentId maka kondisi menjadi true dan parentId dieksekusi, jika tidak sebaliknya
  const createdAt = new Date(comment.createdAt).toLocaleDateString(); //membuat jam memiliki format --/--/----
  const countRate = (rate) => {
    const starsTotal = 5;
    const starPercentage = (rate / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  };
  return (
    <div key={comment.id} className="comment test">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <Link to="#" data-toggle="tooltip" data-placement="top" title={comment.username}>
            <div className="comment-author">{comment.name}</div>
          </Link>
          <div>{createdAt}</div>
        </div>
        {comment.username !== 'admin' ? (
          <div className="stars-comment">
            <div className="stars-outer">
              <div className="stars-inner" style={{ width: countRate(comment.rate) }}></div>
            </div>
            <span className="number-rating">{comment.rate}</span>
          </div>
        ) : undefined}

        {/* dibawah ini kondisi dimana isEditing sedang false */}
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {/* dibawah ini kondisi diamana isEditing sedang true*/}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text, bintang) => updateComment(text, bintang, comment.id, comment.username, comment.parentId, comment.userId, comment.name)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            currentValue={comment.rate}
          />
        )}
        <div className="comment-actions">
          {/* dibawah ini kondisi canReply selalu true karena di variabel diatas diset seperti itu makanya setiap komen pasti ada reply*/}
          {canReply && (
            <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>
              Reply
            </div>
          )}
          {/* dibawah ini kondisi canEdit bisa tampil & diklik apabila kentuan divariabel diatas bernilai true */}
          {canEdit && (
            <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
              Edit
            </div>
          )}
          {/* dibawah ini kondisi canDelete bisa tampil & diklik apabila kentutan divariabel diatas bernilai true */}
          {canDelete && (
            <div className="comment-action" onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>
        {/* dibawah ini kondisi jika isReplying true maka ditampilkan form ngisi komennya */}
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleSubmit={(text, currentName, currentUsername) => addComment(text, null, replyId, currentName, currentUsername)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            currentUserId={currentUserId}
          />
        )}
        {/* dibawah ini ketika replies di array [] length-nya lebih dari 0 tidak kosong maka dijalankan child commentnya */}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Comment);
