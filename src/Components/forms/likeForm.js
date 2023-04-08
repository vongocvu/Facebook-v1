import ShowTabName from "../tooltip";
import { likePost } from "../functions/likePost";

const Icons = [
  {
    reactName: 'Like',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png",
    reactColor: "rgb(32, 120, 244)"
  },
  {
    reactName: 'Love',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_2_oedhc5.png",
    reactColor: "rgb(243, 62, 88)"
  },
  {
    reactName: 'Care',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699904/download_seagzp.png",
    reactColor: "rgb(247, 177, 37)"
  },
  {
    reactName: 'Haha',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_3_mbo4ro.png",
    reactColor: "rgb(247, 177, 37)"
  },
  {
    reactName: 'Wow',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_4_lnca0a.png",
    reactColor: "rgb(247, 177, 37)"
  },
  {
    reactName: 'Sad',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_5_urve0n.png",
    reactColor: "rgb(247, 177, 37)"
  },
  {
    reactName: 'Angry',
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_6_j9a2pc.png",
    reactColor: "rgb(233, 113, 15)"
  },
]


const ReactsForm  = ({ id, user, dataReact, type, message}) => {

  const handleLikePost = (icon) => {
    likePost(id, {
          user: user._id,
          reactName: icon.reactName,
          reactUrl: icon.reactUrl,
          reactColor: icon.reactColor
        }, 
      type
    )
    dataReact({user: user, ...icon})
  }

  return (
     <div className="flex cart-bg bg-gray-200 rounded-3xl py-2 px-2 animate-box">
         {
          Icons.map((icon, index) => (
              <div key={index} className={` ${message ? 'w-[20px] h-[20px]' : 'w-[40px] h-[40px]'} mx-1 `}>
                <ShowTabName tabName={icon.reactName} position="top">
                   <img onClick={ e => handleLikePost(icon)} className="w-full h-full cursor-pointer animate-icon" src={icon.reactUrl} alt={icon.reactName} />
                </ShowTabName>
              </div>
          ))
       }
     </div>
  )
}

export default ReactsForm