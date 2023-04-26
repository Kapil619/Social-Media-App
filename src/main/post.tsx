import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { Post as IPost } from "./main";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import "firebase/auth";
import userimg from "./userimg.svg";

//photo fix
import { getAuth } from "firebase/auth";

const authh = getAuth();
const user = auth.currentUser;
//photofix
interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  //fixing photo error

  const { post } = props;

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postID", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  useEffect(() => {
    getLikes();
  }, []);

  let photourl = <i className="fa-sharp fa-light fa-user"></i>;
  return (
    <>
      <Card
        className="col-md-3 userpostcard"
        style={{
          display: "inline-block",
          margin: "15px 15px",
          minWidth: "5rem",
          border: ".5px solid purple",
        }}
      >
        <Card.Header style={{ display: "flex", height: "50px" }}>
          <div>
            <img
              style={{ borderRadius: "50%", overflow: "hidden" }}
              src={userimg || ""}
              width="32px"
              height="32px"
              alt="pic"
            />
          </div>
          <p
            style={{
              display: "inline-block",
              fontSize: "1rem",
              margin: "auto 8px",
              fontWeight: "600",
            }}
          >
            {post.username}
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {" "}
            <h3> {post.title}</h3>
          </Card.Title>
          <Card.Text>{post.description}</Card.Text>
          <span onClick={hasUserLiked ? disLike : addLike}>
            {hasUserLiked ? (
              <>
                <i
                  className=" likebtn fa fa-solid fa-heart fa-lg"
                  style={{ color: "#ff0000", fontSize: "28px" }}
                ></i>
              </>
            ) : (
              <>
                {" "}
                <i
                  className=" likebtn fa fa-lg fa-thin fa-heart-o"
                  style={{ color: "#ff0000", fontSize: "28px" }}
                ></i>
              </>
            )}
            {""}
          </span>
          {likes && (
            <p style={{ fontWeight: "500" }}> Likes: {likes?.length}</p>
          )}{" "}
        </Card.Body>
      </Card>
    </>
  );

  {
    /* <div className="user-post">
        <div className="title">
          <h2> {post.title}</h2>
        </div>
        <div className="body">
          <p> {post.description} </p>
        </div>
        <div className="footer">
          <p>@{post.username}</p>
          <button onClick={hasUserLiked ? disLike : addLike}>
            {hasUserLiked ? <>&#9825;</> : <> &#10084;</>}
            {""}
          </button>
          {likes && <p> Likes:{likes?.length}</p>}
        </div>
      </div> */
  }
};
