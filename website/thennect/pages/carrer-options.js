import React from "react";
import Head from "next/head";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Accordion from "./../components/Accordion";

function carrerOptions() {
  const arr = [
    {
      key: 0,
      title: "Medical",
      description: [
        "MBBS",
        "BDS",
        "BSc Veterinary Science",
        "Diploma in Clinical Research",
        "BSc Nursing",
        "BSc Forensic Science",
        "Bachelor of Naturopathy and Yogic Sciences",
        "Stem Cell Therapy",
        "Bachelor of Homoeopathic Medicine and Surgery",
        "Bachelor of Ayurvedic Medicine and Surgery",
        "Bachelor of Pharmacy",
        "Diploma in Orthopaedics",
        "B.Tech Biomedical Engineering",
        "B.Tech Biotechnology",
        "Bachelor of Physiotherapy",
        "BSc in Zoology",
        "B. Science (Hons) in Zoology",
        "BSc in Advanced Zoology and Biotechnology",
        "BSc in Zoology and Animal Biotechnology",
        "Bachelor of Paramedical Technology",
        "Bachelor of Occupational Therapy",
        "BSc in Aquaculture (Fishery Microbiology)",
        "BSc Microbiology",
        "BSc Animal Husbandry and Dairying",
        "BSc Radiology",
        "BSc Biology",
        "BSc Agriculture",
      ],
    },
    {
      key: 1,
      title: "Engineering",
      description: [
        "Bachelor of Technology",
        "Bachelor of Engineering",
        "Automobile Engineering",
        "Aerospace Engineering",
        "Nuclear Engineering",
        "Systems Engineering",
        "Geotechnical Engineering",
        "Electrical and Electronics",
        "B.Tech Nanotechnology",
        "Mechanical Engineering",
        "Civil Engineering",
        "Mining Engineering",
        "Petroleum Engineering",
        "Software Engineering",
        "Diploma in Architecture",
        "Marine Engineering",
        "Industrial Engineering",
        "Chemical Engineering",
        "Electronics & Communication Engineering",
        "B.E Mechanical Engineering",
        "Bachelor of Engineering in Construction Technology",
        "Naval Architecture",
        "Bachelor of Construction Technology",
        "Bachelor of Planning",
      ],
    },
    {
      key: 2,
      title: "Commerce",
      description: [
        "BA Economics",
        "BA English Literature",
        "BA Mathematics",
        "Bachelor of Business Studies (BBS)",
        "BBM Course",
        "BCom Hons",
        "BA in Statistics",
        "BSc Statistics",
        "BSc Economics",
        "BBA",
        "BBA with Specialisations",
        "BA LLB",
        "BBA LLB",
        "BCom LLB",
        "BBA MBA Integrated Course",
        "BA Culinary Arts",
        "Bachelor of Hotel Management",
        "BSc Hotel Management",
        "Bachelor of Catering Technology",
        "BHM in Culinary Arts",
        "Bachelor of Elementary Education",
        "CA Course",
        "CS Course",
        "CMA (Cost & Management Accountant)",
        "CFA Course (Chartered Financial Analyst)",
      ],
    },
    {
      key: 3,
      title: "Arts",
      description: [
        "BA in History and Archaeology",
        "BA in Hindi",
        "BA in Humanities",
        "BA in Finance",
        "BA in Foreign Languages (example- French)",
        "BA in Regional Languages (example- Malayalam)",
        "BA in Journalism and Mass Communication",
        "BA in Literature",
        "BA in Philosophy",
        "BA in Music",
        "BA in Theatre",
        "BA in Yoga and Naturopathy",
        "BA in Tourism and Hospitality Management",
        "BA in Library Science",
        "BA in Applied Science",
        "BA in Advertising",
        "BA in Fine Arts",
        "BA in Mathematics",
        "BA in Retail Management",
        "BA in Fashion Merchandising",
        "BA in Culinary Sciences",
        "BA in Anthropology",
        "BA in Home Science",
        "BA in Hotel Management",
        "BA in Computer Applications",
        "BA in Finance and Insurance",
        "BA in Interior Designing",
        "BA in Psychology",
        "BA in Economics",
        "BA in Animation and Multimedia",
        "Bachelors Degree in Economics",
        "BCA (BA course also available!)",
        "B Architecture",
        "BA + LL.B.",
        "BBA + LL.B.",
        "BBA (Bachelor of Business Administration)",
        "BMS (Bachelor of Management Studies)",
        "Integrated BBA + MBA program (5 years duration)",
        "BHM (Bachelor of Hotel Management)",
        "Retail Management (Diploma)",
        "Bachelor of Physical Education",
        "Diploma in Yoga Education",
        "Bachelor of Fashion Design and Technology",
        "Bachelor of Fashion Communication",
        "B Social Work",
        "Diploma in Retail Management",
        "Diploma in Education Technology",
        "Diploma in Hotel Management",
        "Air Hostess/Cabin Crew training course",
        "Diploma in Event Management",
        "Diploma in Film making and Video Editing",
        "B.El.Ed. (Bachelor of Elementary Education, 4 years long course)",
        "Diploma in Elementary Education",
        "B.P.Ed. (Bachelor of Physical Education)",
        "Primary Teachers Training course (can follow it up B.Ed.)",
        "B.Voc.",
        "D.Voc.",
        "Skill Diploma programs",
        "Domain Skilling programs",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>List of Careers Options and Occupations in India</title>
        <meta
          name="description"
          content="Here is the list of careers options and occupations available"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="">
        <Header />
        <div className="px-5 md:px-20 py-5 mb-10">
          <p className="fontRegular text-lg">
            You are going to spend a lot of time playing the careers game.
            Before you jump into the ring (or even if you’ve already taken the
            plunge), it might be a good idea to know what the game is all about,
            the rules that apply and how you can make the most of it and come
            out a winner. For most students, a career is something that happens
            abruptly after their fun-filled academic life gets over. And most
            aren’t prepared for it.
          </p>
          <h2 className="mt-10 mb-5 text-2xl fontBold">
            List of Careers Options and Occupations in India
          </h2>
          {arr.map((item) => {
            return (
              <Accordion title={item.title} description={item.description} />
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default carrerOptions;
