import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "../../components/Quote/Quote";
import "./QuotesPage.css";
import { Pagination, Select, MultiSelect } from "@mantine/core";
import AddQuote from "../../components/modals/AddQuote";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [activePage, setPage] = useState(1);
  const [valueFilter, setValueFilter] = useState([]);
  const [valueSelect, setValueSelect] = useState("createdAt");
  const [addQuote, setAddQuote] = useState(false);
  const tagsString = valueFilter.toString();
  const [tags, setTags] = useState([]);
  const dataToShowFilter = tags.map((tag) => {
    return {
      value: tag,
      label: `${tag[0].toUpperCase()}${tag.slice(1, tag.length)}`,
    };
  });

  const dataSort = [
    { value: "author", label: "Author" },
    { value: "content", label: "Content" },
    { value: "createdAt", label: "Date of create" },
    { value: "downvotesCount", label: "Down Votes Count" },
    { value: "upvotesCount", label: "Up Votes Count" },
  ];
  const sortDirection =
    valueSelect === "author" || valueSelect === "content" ? "asc" : "desc";
  const pageSize = 5;
  const [totalQuotes, setTotalQuotes] = useState(1);
  const totalPages = Math.ceil(totalQuotes / pageSize);

  const getTags = () => {
    axios
      .get(`http://localhost:8000/tags`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setTags(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getTags();
    axios
      .get(
        `http://localhost:8000/quotes?pageSize=${pageSize}&page=${activePage}&tags=${tagsString}&sortBy=${`${valueSelect}`}&sortDirection=${sortDirection}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setQuotes(response.data.quotes);
        setTotalQuotes(response.data.quotesCount);
        // console.log(response.data.quotes);
      })
      .catch((error) => {
        // console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, totalQuotes, valueFilter, valueSelect, addQuote]);
  return (
    <div className="quotes">
      <div className="quotes-func">
        <Select
          label="Sort Quotes by:"
          placeholder="Select a Property"
          data={dataSort}
          value={valueSelect}
          onChange={setValueSelect}
          clearable
        />
        <MultiSelect
          style={{ maxWidth: "50%" }}
          data={dataToShowFilter}
          label="Select tags to filter Quotes:"
          placeholder="Pick tags that you like"
          value={valueFilter}
          onChange={setValueFilter}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
        />
        <AddQuote render={setAddQuote} />
      </div>
      {quotes.map((quote) => (
        <Quote
          key={quote.id}
          content={quote.content}
          authorName={quote.author}
          upvotesCount={quote.upvotesCount}
          downvotesCount={quote.downvotesCount}
          givenVote={quote.givenVote}
          id={quote.id}
        />
      ))}

      <Pagination
        className="pagination"
        page={activePage}
        onChange={setPage}
        onClick={window.scrollTo(0, 0)}
        total={totalPages}
        color="teal"
        radius="md"
      />
    </div>
  );
};

export default QuotesPage;
