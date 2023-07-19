import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const inter = Inter({ subsets: ["latin"] });
import Chapters from "../components/chapters";
import ChapterList from "@/components/chapterList";
import VideoCard from "@/components/videoCard";
import Options from "@/components/options";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const vid = context.query.v as string;
    
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

      <div className='flex justify-between'>
          <div className="mx-5">

            <VideoCard videoData={videoData} />

            {(videoData.chapters.length > 1)
              && (
                <div>
                <ChapterList chapters={videoData.chapters} />
                </div>
              )}

          </div>

          <div className="mx-5 w-2/5">
            <Options duration={videoData.duration} />
          </div>
      </div>


        
      
    </main>
  );
}