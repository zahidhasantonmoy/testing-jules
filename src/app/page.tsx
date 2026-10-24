import HomePageContent from "./home-page-content";

export default function Home() {
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Zahid Hasan Tonmoy",
  "jobTitle": "MERN Full Stack Developer & AI Agent Developer",
  "url": "https://zahidhasantonmoy.vercel.app",
  "sameAs": [
    "https://github.com/zahidhasantonmoy",
    "https://www.linkedin.com/in/zahidhasantonmoy"
  ],
  "description": "Hello! I'm Zahid Hasan Tonmoy, a MERN Full Stack Developer, Data Analyst, AI Agent Developer, and Digital Marketer based in Dhaka, Bangladesh.\nI build end-to-end web applications using MongoDB, Express.js, React, and Node.js \u2014 and I specialise in transforming complex data into actionable insights, building intelligent AI solutions, and crafting effective digital strategies to drive growth.\nMy journey in technology and marketing has equipped me with a unique blend of full-stack engineering, analytical prowess, creative problem-solving, and a deep understanding of digital landscapes.",
  "knowsAbout": [
    "Web Development",
    "Machine Learning",
    "MERN Stack",
    "Data Analysis",
    "AI Agent Development"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dhaka",
    "addressCountry": "Bangladesh"
  }
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomePageContent />
    </>
  );
}
