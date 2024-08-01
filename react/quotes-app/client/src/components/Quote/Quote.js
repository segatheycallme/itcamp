import React, { useState } from "react";
import "./Quote.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Quote = ({
  id,
  content,
  authorName,
  upvotesCount,
  downvotesCount,
  givenVote,
}) => {
  const [vote, setVote] = useState(givenVote);
  const [upVotesCount, setUpVotesCount] = useState(upvotesCount);
  const [downVotesCount, setDownVotesCount] = useState(downvotesCount);
  const totalPercent = 100;
  const percentPerVote = totalPercent / (upVotesCount + downVotesCount);
  const upvotesPercent =
    upVotesCount === 0 ? 0 : Math.round(upVotesCount * percentPerVote);
  const color =
    upvotesPercent <= 20
      ? "color1"
      : upvotesPercent > 20 && upvotesPercent <= 40
      ? "color2"
      : upvotesPercent > 40 && upvotesPercent <= 60
      ? "color3"
      : upvotesPercent > 60 && upvotesPercent <= 80
      ? "color4"
      : upvotesPercent > 80 && upvotesPercent <= 95
      ? "color5"
      : "color6";
  let classBtnVote1 = vote === "upvote" ? "upvote-class" : "vote-class";
  let classBtnVote2 = vote === "downvote" ? "downvote-class" : "vote-class";

  const upvoteMessage =
    vote === "upvote"
      ? "Delete your vote"
      : vote === "downvote"
      ? "Delete Downvote first"
      : "I like this quote";
  const downvoteMessage =
    vote === "downvote"
      ? "Delete your vote"
      : vote === "upvote"
      ? "Delete Upvote first"
      : "I don't like this quote";

  const postUpvote = () => {
    axios
      .post(`http://localhost:8000/quotes/${id}/upvote`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data.givenVote);
        setUpVotesCount(upVotesCount + 1);
        setVote(response.data.givenVote);
        toast("Successfully Votes Up!", {
          icon: "👍",
          style: {
            borderRadius: "0.8rem",
            backgroundColor: "#4e7768",
            color: "#f0fffa",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
          },
        });
      })
      .catch((error) => {
        // console.log(error)
      });
  };
  const deleteUpvote = () => {
    axios
      .delete(`http://localhost:8000/quotes/${id}/upvote`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data.givenVote);
        setUpVotesCount(upVotesCount - 1);
        setVote(response.data.givenVote);
        toast("Successfully Deleted Vote!", {
          icon: "✐",
          style: {
            borderRadius: "0.8rem",
            backgroundColor: "#4e7768",
            color: "#f0fffa",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
          },
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const postDownvote = () => {
    axios
      .post(`http://localhost:8000/quotes/${id}/downvote`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data.givenVote);
        setDownVotesCount(downVotesCount + 1);
        setVote(response.data.givenVote);
        toast("Successfully Votes Down!", {
          icon: "👎",
          style: {
            borderRadius: "0.8rem",
            backgroundColor: "#4e7768",
            color: "#f0fffa",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
          },
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const deleteDownvote = () => {
    axios
      .delete(`http://localhost:8000/quotes/${id}/downvote`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data.givenVote);
        setDownVotesCount(downVotesCount - 1);
        setVote(response.data.givenVote);
        toast("Successfully Deleted Vote!", {
          icon: "✐",
          style: {
            borderRadius: "0.8rem",
            backgroundColor: "#4e7768",
            color: "#f0fffa",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 4px 6px -1px, rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
          },
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className="quote">
      <div className="left">
        <button
          disabled={vote === "downvote"}
          className={`btn2 ${classBtnVote1} tooltip`}
          onClick={() =>
            vote === "none"
              ? postUpvote()
              : vote === "upvote"
              ? deleteUpvote()
              : () => {}
          }
        >
          &#129081;
          <span class="tooltiptext">{upvoteMessage}</span>
        </button>
        <p className={`percent ${color}`}>{upvotesPercent}%</p>
        <p className="ratio">
          {upVotesCount} / {downVotesCount}
        </p>
        <button
          disabled={vote === "upvote"}
          className={`btn2 ${classBtnVote2} tooltip`}
          onClick={() =>
            vote === "none"
              ? postDownvote()
              : vote === "downvote"
              ? deleteDownvote()
              : () => {}
          }
        >
          &#129083;
          <span class="tooltiptext">{downvoteMessage}</span>
        </button>
      </div>
      <div className="right">
        <p className="content">{content}</p>
        <p className="author">Author: {authorName}</p>
      </div>
    </div>
  );
};

export default Quote;
