import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../../lib/client";

function BlogCard(props) {
  const classN =
    props.isHorizontal == true ? "relative h-72 w-72" : "relative h-72 w-full";
  return (
    <Link href={`/blogs/${props.data.slug.current}`}>
      <div className="mb-5 cursor-pointer hover:scale-105 transition duration-300 ease-out">
        <div className={classN}>
          <Image
            src={urlFor(props.data.mainImage).url()}
            layout="fill"
            alt="blog card image"
            className="rounded-lg"
          />
        </div>
        <div className="py-2">
          <h2 className="text-xl line-clamp-1 font-bold text-ellipsis">
            {props.data.title}
          </h2>
          <h5 className="text-sm text-gray-500 w-full line-clamp-2">
            {props.data.subtitle}
          </h5>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
