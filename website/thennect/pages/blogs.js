import React, { useState, useEffect } from "react";
import { client, urlFor } from "../lib/client.js";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import BlogCard from "./../components/Blogs/BlogCard";
import Head from "next/head";

function blogs(props) {
  const [startID, setStartID] = useState(16);
  const [loadMore, setLoadMore] = useState(true);
  const [allBlogs, setAllBlogs] = useState(props.allBlogs);

  useEffect(() => {}, []);

  const fetchMore = async () => {
    var endID = startID + 16;
    const query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle,slug}|order(_createdAt desc)[$startID...$endID]`;
    // const query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}|order(_createdAt desc)[0...2]`;
    try {
      const response = await client.fetch(query, { startID, endID });
      if (response.length == 0) {
        setLoadMore(false);
      }
      response.map((blog) => {
        setAllBlogs((prev) => [...prev, blog]);
      });
      if (response.length < 16) setLoadMore(false);
      setStartID(endID);
    } catch (error) {
      console.error(error);
      alert(error + "");
    }
  };

  return (
    <div>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Read most trending articles covering various fields on TheNnect"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      {/* trending blogs */}
      <div className="px-5 md:px-20 py-5">
        <h2 className="header mb-2">Trending blogs</h2>
        <div className="flex overflow-scroll space-x-5 scrollbar-hide p-3 -ml-3">
          {props.trendingBlogs.map((data) => (
            <BlogCard isHorizontal={true} data={data} key={data._id} />
          ))}
        </div>
      </div>

      <div className="px-5 md:px-20 my-5">
        <h2 className="header mb-2">All blogs</h2>
        <div className="lg:grid-col-4 sm:grid-col-2 mx-auto grid grid-cols-1 gap-5 md:grid-cols-4">
          {allBlogs.map((data) => (
            <BlogCard isHorizontal={false} data={data} key={data._id} />
          ))}
        </div>
        {loadMore ? (
          <div className="w-full flex items-center justify-center my-4 ">
            <button
              className="py-1 px-2 border-gray-500 border-2 rounded-lg"
              onClick={fetchMore}
            >
              Load more
            </button>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default blogs;

export const getServerSideProps = async () => {
  const query1 = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle,slug}[0...5]`;

  const trendingBlogs = await client.fetch(query1);

  const query2 = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle,slug}|order(_createdAt desc)[$startID...$endID]`;
  const allBlogs = await client.fetch(query2, { startID: 0, endID: 16 });

  return {
    props: {
      trendingBlogs,
      allBlogs,
    },
  };
};
