import React, { useEffect } from "react";
import { client, urlFor } from "./../../lib/client";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { convertDateToFormat } from "../../lib/utils";
import PortableText from "react-portable-text";
import Head from "next/head";

function blog(props) {
  useEffect(() => {}, []);
  const blog = props.blog;

  return (
    <div>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.subtitle} />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="px-10 md:px-20 py-5 max-w-7xl mx-auto">
        <img
          alt="blog main image"
          className="h-80 w-full object-fill"
          src={urlFor(blog.mainImage).toString()}
        />
        <h2 className="header py-2">{blog.title}</h2>
        <h2 className="text-lg text-gray-600">{blog.category}</h2>
        <h2 className="text-lg text-gray-500">
          {convertDateToFormat(blog._createdAt)}
        </h2>
        <div className="mt-10 mb-20">
          <PortableText
            content={blog.body}
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            serializers={{
              h2: (props) => (
                <h2 className="my-5 text-3xl font-bold" {...props} />
              ),
              h2: (props) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              h4: (props) => <p className="my-5 text-base" {...props} />,
              p: (props) => <p className="my-5 text-base" {...props} />,
              li: ({ children }) => (
                <li className="ml-5 list-disc" {...children} />
              ),
              image: (props) => {
                return (
                  <img
                    src={urlFor(props.asset).toString()}
                    alt="content image"
                    className="h-72 my-10 w-full object-fill"
                  />
                );
              },
              link: ({ href, children }) => (
                <a href={href} className="tex-blue-500 hover:blue">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default blog;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
         current
        }
    }`;
  const blogs = await client.fetch(query);

  const paths = blogs.map((blog) => ({
    params: {
      slug: blog.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug]{_id,_createdAt,subtitle,mainImage,title,subtitle,"category":categories[0]->title,body}[0]`;

  const blog = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
    revalidate: 3600,
  };
};
