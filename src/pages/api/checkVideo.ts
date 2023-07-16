import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: string;
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);

  const link = req.query.link as string;
  const videoId = link.split("v=")[1] as string;
  
  fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.pageInfo.totalResults === 0) {
          return res.status(404).json({ response: "Video Not Found", id: videoId });
      }

      
      return res.status(200).json({ response: "Video Found", id: videoId });
    });
}
