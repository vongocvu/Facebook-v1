/* eslint-disable react-hooks/exhaustive-deps */
import { faGear, faPhotoVideo, faSortDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../logo"
import { useSelector } from "react-redux"
import TextareaAutosize from "react-textarea-autosize";


import './Stories.scss'
import {  useRef, useState } from "react"
import { useNavigate } from "react-router"
import tableColor from "../data/tableColor";
import LoadingChatBox from "../loadings/LoadingChatBox"
import axios from "axios";

 const Stories = () => {
     const navigate = useNavigate()
     const { user } = useSelector(state => ({ ...state }))

     const fileRef = useRef(null)
     const imageRef = useRef(null)
     const btnEditImageRef = useRef(null)
     const textRef = useRef(null)
     const optionRef = useRef(null)

     const [ loading, setLoading ] = useState(false)
     const [ inputFile, setInputFile ] = useState([])
     const [ showImage, setShowImage ] = useState(false)
     const [ urlImage, setUrlImage ] = useState("")
     const [ addTextForImage, setAddTextForImage ] = useState(false)
     const [ chooseFont, setChooseFont ] = useState(false)
     const [ choosedFont, setChoosedFont ] = useState('HeadLine')
     const [ FontShow, setFontShow ] = useState("'Tilt Prism', cursive")
     const [ showColor, setColor ] = useState('white')
     const [ drag, setDrag ] = useState(false)
     const [ TextArr, setTextArr ] = useState([])


     const handelOpenFile = () => {
        fileRef?.current?.click()
     }

     const handelGetImage = (e) => {
        setInputFile(e.target.files)
        setUrlImage(URL.createObjectURL(e.target.files[0]))
        setShowImage(true)
     }

     const handelShowChooseFont = () => {
      setChooseFont(!chooseFont)
     }

     const handleAddTextForImage = () => {
      setTextArr([...TextArr, {
        content: "",
        top: 10,
        left: 10,
        color: showColor,
        fontSize: 50 ,
        fontFamily: FontShow
      }])
     }

    const handleChoosedFont = (e) => {
      setChoosedFont(e.target.innerText);
      setFontShow(e.target.getAttribute('codefont'))
    }

     const handlerChoosedColor = (color) => {
        setColor(color)
     }

     const handleOutCreateStory = () => {
        navigate('/')
     }

    const onMouseDown = (e) => {
      setDrag(true);
    };

    const onMouseUp = () => {
      setDrag(false);
    };

    const onMouseMove = (e, index) => {
      if (drag) {

        let imageWidth = imageRef.current.getBoundingClientRect().width;
        let textWidth = textRef.current.getBoundingClientRect().width;
        let imageHeight = imageRef.current.getBoundingClientRect().height;
        let textHeight = textRef.current.getBoundingClientRect().height;

        TextArr[index].top = (parseInt(e.pageY) - parseInt(imageRef?.current?.getBoundingClientRect().top)) / (parseInt(imageHeight) / 100) - (( parseInt(textHeight / (parseInt(imageHeight / 100))) / 2))
        TextArr[index].left = (parseInt(e.pageX) - parseInt(imageRef?.current?.getBoundingClientRect().left)) / (parseInt(imageWidth) / 100) - (( parseInt(textWidth / (parseInt(imageWidth / 100))) / 2))

        setTextArr([...TextArr])
      }
    };

      const onBlur = () => {
        setTextArr(TextArr?.filter(text => text.text !== ""))
      }


     const handleCancelStory = () => {
      setUrlImage("")
      setShowImage(false)
      setInputFile([])
      setAddTextForImage(false)
     }

     const handleSetTextValue = (index, e) => {
        TextArr[index].content = e.target.value
        setTextArr([...TextArr])
     }

     const handleSubmitStory = async () => {
          setLoading(true)

          const formData = new FormData()
          formData.append('author', user._id)
          formData.append('image', inputFile[0] ? inputFile[0] : "")
          formData.append('background', "")

          await axios.post(`${process.env.REACT_APP_API}/v1/storie/addStorie`, formData)
          .then( async res => {
            await axios.post(`${process.env.REACT_APP_API}/v1/storie/updateStorie/${res.data._id}`, {
              text: TextArr
            })
             setLoading(false)
             navigate('/')
          })
     }

   return (
    <div className="fixed inset-0 z-[55]">
      {loading && <LoadingChatBox />}
        <div className="w-full h-screen grid grid-cols-10 ">
            <div className="col-span-2 h-full secondary-bg px-3 b-full flex flex-col">
              <div className="flex h-[60px] items-center"> 
                   <div onClick={handleOutCreateStory} className="w-[40px] h-[40px] flex-center primary-bg rounded-full mr-2 cart-hover cursor-pointer">
                     <FontAwesomeIcon icon={faXmark} className="primary-text text-2xl"/>
                   </div>
                   <Logo/>
              </div>
              <div className="flex justify-between primary-text mt-5">
                <h3 className="text-2xl font-bold">Your story</h3>
                <div className="w-[40px] h-[40px] flex-center cart-bg rounded-full">
                  <FontAwesomeIcon icon={faGear} className="text-xl" />
                </div>
              </div>
              <div className="flex items-center my-4">
                <div className="w-[60px] h-[60px]">
                  <img className="w-full h-full rounded-full" src={user?.avatar} alt={user.username}/>
                </div>
                <div className="ml-3 primary-text font-bold">
                  <h3>{user.username}</h3>
                </div>
              </div>
              <hr className="b-full"/>
              <div className="flex-1">
              {
                showImage &&
                <>
                  <div ref={btnEditImageRef} onClick={handleAddTextForImage} className="flex p-3 items-center cart-hover my-2 rounded-lg cursor-pointer">
                    <div className="w-[40px] h-[40px] flex-center cart-bg text-white rounded-full">Aa</div>
                    <h3 className="text-md font-medium text-white ml-2">Add text</h3>
                  </div>
                  <div ref={optionRef} className="optionsRef w-full secondary-bg rounded-lg">
                        <div onClick={handelShowChooseFont} className="flex b-full px-4 py-2 cursor-pointer rounded-lg relative">
                              <span className="pr-4 primary-text font-medium">Aa</span>
                              <div className="flex-1 flex justify-between primary-text bg-transparent border-0 outline-none h-full">
                                    <h3>{choosedFont}</h3>
                                    <FontAwesomeIcon icon={faSortDown} />
                              </div>
                              {
                              chooseFont && 
                              <div className="absolute py-2 px-3 primary-text  w-[101%] right-[-2px] left-[-1px] top-[110%] bg-red-800 rounded-lg b-full secondary-bg z-10">
                                  <div codefont="'Tilt Prism', cursive" onClick={handleChoosedFont} className="py-1 px-2 cart-hover rounded-lg">Headline</div>
                                  <div codefont="Facebook Script App Light" onClick={handleChoosedFont} className="py-1 px-2 cart-hover rounded-lg">Casual</div>
                                  <div codefont="'Roboto Condensed', sans-serif" onClick={handleChoosedFont} className="py-1 px-2 cart-hover rounded-lg">Fancy</div>
                                  <div codefont="'Oswald', sans-serif" onClick={handleChoosedFont} className="py-1 px-2 cart-hover rounded-lg">Simple</div>
                                  <div codefont="'Quicksand', sans-serif" onClick={handleChoosedFont} className="py-1 px-2 cart-hover rounded-lg">Clean</div>
                              </div>
                              }
                          </div>
                          <div className="w-full mt-3 b-full flex flex-wrap pl-4 pt-4 pb-1 rounded-lg">
                              {
                              tableColor.map(( color, index ) => (
                                <div onClick={ e => handlerChoosedColor(color.codeColor)} className="w-[22px] h-[22px] mr-2 mb-3 rounded-full b-full cursor-pointer hover:opacity-80" key={index} style={{'backgroundColor': `${color.codeColor}`}}>
                                </div>
                              ))
                              }
                          </div>
                      </div>
                  </>
              }
              </div>
              <hr className="b-full"/>
              {
                 showImage &&
                  <div className="flex justify-center py-5">
                      <button onClick={handleCancelStory} className="px-12 mr-1 py-1 cart-bg text-white rounded-lg hover:opacity-80">Discard</button>
                      <button onClick={handleSubmitStory} className="px-12 ml-1 py-1 bg-blue-500 text-white rounded-lg hover:opacity-80">Share Story</button>
                  </div>
              }
            </div>

            <div className="col-span-8 h-full primary-bg flex-center">
              {
                !showImage &&
                  <div className="flex">
                    <div onClick={handelOpenFile} className="w-[220px] h-[330px] mr-3 rounded-lg choose-options1 hover:opacity-90 flex-center cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-[50px] h-[50px] flex-center primary-bg rounded-full primary-text b-full">
                          <FontAwesomeIcon icon={faPhotoVideo} />
                          <input ref={fileRef} onChange={handelGetImage} type="file" className="hidden" />
                        </div>
                        <div className="text-white font-bold mt-2">Create a photo story</div>
                      </div>
                    </div>
                    <div className="w-[220px] h-[330px] ml-3 rounded-lg choose-options2 hover:opacity-90 flex-center cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-[50px] h-[50px] flex-center primary-bg rounded-full primary-text b-full">
                           <span className="font-bold">Aa</span>
                        </div>
                        <div className="text-white font-bold mt-2">Create a text story</div>
                      </div>
                    </div>
                  </div>
              }

                {
                  showImage && 
                    <div className="w-[1000px] h-[800px] secondary-bg rounded-lg b-full p-5 flex flex-col ">
                       <h3 className="primary-text mb-5">Preview</h3>
                       <div className="flex-1 w-full primary-bg rounded-lg b-full flex-center">
                           <div className={`w-[400px] h-[650px] relative ${addTextForImage && 'border-2 rounded-lg '}`}>
                                <img className="w-full h-full rounded-lg b-full object-contain " src={urlImage}  alt="iamge preview"/>
                                   <div ref={imageRef} 
                                        className={`absolute inset-0 w-full h-full bg-black bg-opacity-10`}> 
                                        {
                                          TextArr?.map((text, i) => (
                                            <TextareaAutosize
                                              onMouseDown = { e => onMouseDown()}
                                              onMouseUp = { e => onMouseUp()}
                                              onMouseMove = { e => onMouseMove(e, i)}
                                              onBlur={ e => onBlur()}
                                              key={i}
                                              ref={textRef} 
                                              minRows={1}
                                              maxRows={100}
                                              maxLength={200}
                                              value={text.content}
                                              onChange={ e => handleSetTextValue(i, e)} 
                                              style={{ 'userSelect': 'none', 'fontFamily': `${FontShow}`,'color':`${showColor}`, 'position': 'absolute',
                                               'top': `${text.top}%`, 'left': `${text.left}%`, 'lineHeight': `50px`,
                                                'fontSize': `${text.fontSize * (parseInt(imageRef.current.getBoundingClientRect().height) / 100)}%`}} 
                                              className={`select-none w-full hover:cursor-move custom_scroll text-center bg-transparent outline-none resize-none`}
                                              placeholder="Start typing"/>
                                          ))
                                        }
                                  </div>
                            </div>
                       </div>
                       
                    </div>
                }
            </div>
        </div>

    </div>
   )
 }


 export default Stories