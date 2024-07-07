import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/posts";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/posts/${id}`);
      handleDelete(id);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button
              disabled={loading}
              onClick={() => handleDeletePost(post.id)}
              type="submit"
            >
              {loading ? "In progress..." : "Delete Post"}
            </button>
            <button
              style={{ backgroundColor: "#b3b3b3", marginLeft: "0.8rem" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
