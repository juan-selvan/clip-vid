import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const vid = context.query.id as string;
    console.log(`\n\n${vid}\n\n`)
    if (vid == "" || vid == undefined || vid == null) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
          query: { error: 'Video not found' },
        },
      };
    }
    const res = await fetch(`http://localhost:3000/api/getInfo?v=${vid}`);
    const data = await res.json();
  
    if (data.response === "Video not found") 
    {
      return {
        redirect: {
          destination: '/',
          permanent: false,
          query: { error: 'Video not found' },
        },
      };
    } 
    else 
    {
      return { props: { data: data.response } };
    }
  };
  
export default function VidInfo({data} : {data: any}) { //TODO: Later on, change any to a type for safety
  const router = useRouter();
  const [videoData, setVideoData] = useState(data);
  
  return (
    <main>
      <div className={`flex justify-between px-8 py-10`}>
        <h1>[Logo] ClipVid</h1>
        <h1>Dark Mode</h1>
      </div>
      <h1 className={`text-center text-9xl font-semibold my-12 w-full`}>
        Title: {videoData.title}
        <br></br>
        Duration: {videoData.duration}
        <br></br>
        Views: {videoData.views}
        <br></br>
        Channel: {videoData.channel}
        <br></br>
        Thumbnail: <Image alt="thumbnail" src={videoData.thumbnail} width={500} height={500}/>
      </h1>
    </main>
  );
}
