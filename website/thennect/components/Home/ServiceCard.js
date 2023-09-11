import Image from "next/image";
import React from "react";

function ServiceCard(props) {
  // console.log(props.img);
  return (
    <div className="w-full md:w-1/3 align-center justify-start items-center my-2 p-4  md:m-10 shadow-box rounded-lg flex flex-col">
      {props.imgSrc != null ? (
        <Image
          width={40}
          height={40}
          src={props.imgSrc}
          alt={`${props.title} image`}
        />
      ) : null}
      <div className="flex items-center flex-col">
        <h2 className="text-xl fontBold text-center my-2">{props.title}</h2>
        <h3 className="text-sm fontRegular text-center">{props.description}</h3>
      </div>
    </div>
  );
}

export default ServiceCard;
