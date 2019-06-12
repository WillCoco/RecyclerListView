import React, { useEffect, useRef, useState } from 'react';
import Scroller from './Scroller';


export default (props) => {
  const {
    data = Array.from(new Array(1000)).map((a, index) => ({name: 'asdf1---', title: index})),
    height = 100,
    initIndex = 0,
    bound = 2, // 上/下超出格数
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const [sum, setSum] = useState(0);

  const scroller = useRef(null);

  useEffect(() => {
    const { clientHeight, clientWidth } = scroller.current;

    const maxSum = Math.ceil((clientHeight / height) + bound * 2);

    console.log(sum, 'sum');
    console.log(Math.min(maxSum, data.length), 'maxSum');
    console.log(clientHeight,height, 'summm');
    setSum(Math.min(maxSum, data.length));
  }, []);

  console.log(currentIndex, 'currentIndex');

  const handleScroll = (e) => {
    if (e.target.scrollTop && currentIndex !== Math.floor(e.target.scrollTop / height)){
      setCurrentIndex(Math.min(Math.floor(e.target.scrollTop / height), data.length - sum));
    }
  };

  return (
   <div
     style={{display: 'flex', flex: 1, height: '400px', border: '1px solid red', overflow: 'scroll', scrollBehavior: 'smooth'}}
     ref={scroller}
     onScroll={handleScroll}
   >
     <div style={{border: '1px solid blue', paddingTop: currentIndex * height, transform: `translateY(${currentIndex * height})`}}>
       {
         Array.from(new Array(sum)).map((item, index) => {
           return (
             <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
               <img style={{width: height, height: height}} src='http://pic18.nipic.com/20120204/8339340_144203764154_2.jpg' alt=""/>
               { props.rowRender(data[currentIndex + index], index) }
             </div>
           )
         })
       }
     </div>

   </div>
  )
}