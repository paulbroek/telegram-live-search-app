import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPlusSquare, FaTimes } from "react-icons/fa";
import axios from "axios";
import https from "https";

const REST_HOST = process.env.REACT_APP_API_HOST;
const REST_PORT = process.env.REACT_APP_API_PORT;
const REST_URL = `http://${REST_HOST}:${REST_PORT}`;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const myReqInfo = { httpsAgent: agent };

export default function Search() {
  // Search component has a search input field, and search results view below it
  // You can opt to always update the search results, when the user types, but this can be slow for many search results
  // Simple change 'rerenderOn' to 'searchTerm' for updates on every keystroke, and 'searchTermDebounched', for updates every X milliseconds (line 12)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDebounced] = useDebounce(searchTerm, 150);
  const [searchData, setSearchData] = useState([]);

  const rerenderOn = searchTermDebounced;
  //   const rerenderOn = searchTerm;

  // todo: move search result to Telegram conversation
  const onAddSearchResult = (quote) => {};
  //   const onAddSearchResult = (book) => {
  //     console.log(`adding id=${book.id}`);
  //     let selectedBookIds = selectedBooks.map((x) => x.id);
  //     // console.log(`ids: ${JSON.stringify(selectedBookIds)}`);
  //     // only add if id is new
  //     if (!selectedBookIds.includes(book.id)) {
  //       setSelectedBooks([...selectedBooks, book]);
  //     } else {
  //       console.log(`nothing to add, quote already in grid`);
  //     }
  //   };

  useEffect(() => {
    console.log("running axios request");
    axios
      .get(`${REST_URL}/search/full_text/einstein`, myReqInfo)
      .then((res) => {
        console.log(`axios data res: `, res.data);
      }, []);
  }, []);

  useEffect(() => {
    console.log("rerenders search");
    onChangeSearchInput(rerenderOn);
    // if (searchTermDebounced) {
    //   onChangeSearchInput(searchTermDebounced);
    // } else {
    //   setSearchData([]);
    // }
  }, [rerenderOn]);

  const onChangeSearchInput = (debSearchTerm) => {
    console.log("filtering search results based on updated search term");
    // call fastapi search API
    axios
      .get(`${REST_URL}/search/full_text/${debSearchTerm}`, myReqInfo)
      .then((res) => {
        console.log(`axios data res: `, res.data);
        const result = res.data;

        if (result.length) {
          // rerenders component on every keystroke..
          setSearchData(result);
        } else {
          setSearchData([]);
        }
      }, []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setSearchTerm("");
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn"
          id="clearSearchInput"
          title="clear search input"
        >
          <FaTimes />
        </button>
      </form>
      {searchData.slice(0, 20).map((val, key) => {
        return (
          <div className="user" key={key}>
            <button
              className="btn"
              id="addSearchResult"
              title="send quote to Telegram bot"
              onClick={() => onAddSearchResult(val)}
            >
              <FaPlusSquare />
            </button>{" "}
            {val.text}, {val.author_name}
          </div>
        );
      })}
    </div>
  );
}
