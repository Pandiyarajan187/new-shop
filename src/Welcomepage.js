
// import React from "react";
// import Button from "@material-ui/core/Button";
// import MobileStepper from "@material-ui/core/MobileStepper";
// import Paper from "@material-ui/core/Paper";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import Typography from "@material-ui/core/Typography";
// import { useTheme } from '@material-ui/core/styles'
// import {KeyboardArrowLeft} from "@material-ui/icons/KeyboardArrowLeft";
 
// const MyCollection = [
//   {
//     imgPath:
// "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/2_a25aff7a-b5c4-4565-a111-6e1ce2d5b5f0.png",
//   },
//   {
//     imgPath:
// "http://www.mouawad.com/images/home/og.jpg",
//   },
//   {
//     imgPath:
// "https://www.android.com/static/2016/img/one/carousel/xiaomi_phones_a3-global_1x.png",
//   },
// ];
 
// const Welcome = () => {
//   const CollectionSize = MyCollection.length;
//   // const theme = useTheme();
//   const [index, setActiveStep] = React.useState(0);
 
//   const goToNextPicture = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };
 
//   return (
//     <div
//       style={{
//         marginLeft: "40%",
//       }}
//     >
//       <h2>shopping Cart</h2>
//       <div
//         style={{
//           maxWidth: 600,
//           flexGrow: 1,
//         }}
//       >
//         <Paper
//           square
//           elevation={0}
//           style={{
//             height: 50,
//             display: "flex",
//             // paddingLeft: theme.spacing(4),
//             // backgroundColor: theme.palette.background.default,
//             alignItems: "center",
//           }}
//         >
//           <Typography>{MyCollection[index].label}</Typography>
//         </Paper>
//         <img
//           src={MyCollection[index].imgPath}
//           style={{
//             height: 255,
//             width: "100%",
//             maxWidth: 400,
//             display: "block",
//             overflow: "hidden",
//           }}
//           alt={MyCollection[index].label}
//         />
//         <MobileStepper
//           variant="text"
//           position="static"
//           index={index}
//           steps={CollectionSize}
//           nextButton={
//             <Button
//               size="small"
//               onClick={goToNextPicture}
//               disabled={index === CollectionSize - 1}
//             >
//               Next
//               {/* {theme.direction !== "rtl" ? (
//                 <KeyboardArrowRight />
//               ) : (
//                 <KeyboardArrowLeft />
//               )} */}
//             </Button>
//           }
//         />
//       </div>
//     </div>
//   );
// };
 
// export default Welcome;
//6.30

import React from 'react'

function Welcomepage() {
  return (
    <div>Welcomepage</div>
  )
}

export default Welcomepage








// import React, {useState} from 'react'
// import './Slider.css'
// import BtnSlider from './BtnSlider'
// import dataSlider from './dataSlider'

// export default function Slider() {

//     const [slideIndex, setSlideIndex] = useState(1)

//     const nextSlide = () => {
//         if(slideIndex !== dataSlider.length){
//             setSlideIndex(slideIndex + 1)
//         } 
//         else if (slideIndex === dataSlider.length){
//             setSlideIndex(1)
//         }
//     }

//     const prevSlide = () => {
//         if(slideIndex !== 1){
//             setSlideIndex(slideIndex - 1)
//         }
//         else if (slideIndex === 1){
//             setSlideIndex(dataSlider.length)
//         }
//     }

//     const moveDot = index => {
//         setSlideIndex(index)
//     }

//     return (
//         <div className="container-slider">
//             {dataSlider.map((obj, index) => {
//                 return (
//                     <div
//                     key={obj.id}
//                     className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
//                     >
//                         <img 
//                         src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} 
//                         />
//                     </div>
//                 )
//             })}
//             <BtnSlider moveSlide={nextSlide} direction={"next"} />
//             <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

//             <div className="container-dots">
//                 {Array.from({length: 5}).map((item, index) => (
//                     <div 
//                     onClick={() => moveDot(index + 1)}
//                     className={slideIndex === index + 1 ? "dot active" : "dot"}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     )
// }





