/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import ContentPost from "./ContentPost";

const ShowPost = () => {

  const { user } = useSelector(state => ({ ...state }))
  

  const [Posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);


  const fecthData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/v1/post/getPosts/${user._id}/${limit}`)
      .then((response) => {
        setPosts([...response.data]);
        if (response.data.length < limit) {
          setHasMore(false);
        } else {
          setLimit(limit + 10);
        }
      });
  };
  useEffect(() => {
    fecthData();
  }, []);

  const fetchMoreData = () => {
    hasMore && fecthData();
  };
  return (
    <InfiniteScroll
      dataLength={Posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4 className="text-center my-4">Loading...</h4>}
      endMessage={<div className="text-center my-4">It is the post last !</div>}
    >
      {Posts.map((post, i) => (
        <ContentPost key={i} data={post}/>
      ))}
    </InfiniteScroll>
  );
};


export default ShowPost