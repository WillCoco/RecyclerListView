import React, { useEffect, useRef, useState } from 'react';
import Scroller from './Scroller';


export default (props) => {
  const {
    // data = [
    //   {name: 'asdf1', title: '11111'},
    //   {name: 'asdf2', title: '22222'},
    //   {name: 'asdf3', title: '33333'},
    //   {name: 'asdf4', title: '44444'},
    //   {name: 'asdf5', title: '55555'},
    //   {name: 'asdf6', title: '66666'},
    //   {name: 'asdf7', title: '77777'},
    //   {name: 'asdf8', title: '88888'},
    // ],
    data = Array.from(new Array(100)).map((a, index) => ({name: 'asdf1---', title: index})),
    height = 10,
    initIndex = 0,
    bound = 2, // 上/下超出格数
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const [sum, setSum] = useState(0);

  const scroller = useRef(null);

  useEffect(() => {
    const { clientHeight, clientWidth } = scroller.current;

    const maxSum = Math.ceil((clientHeight / height) + bound);

    console.log(sum, 'sum');
    console.log(Math.min(maxSum, data.length), 'maxSum');
    console.log(clientHeight,height, 'summm');
    setSum(Math.min(maxSum, data.length));
  }, []);

  console.log(currentIndex, 'currentIndex');

  const handleScroll = (e) => {
    if (e.target.scrollTop && currentIndex !== Math.floor(e.target.scrollTop / 50)){
      // console.log('setCurrentIndex(', Math.floor(e.target.scrollTop / 50))
      console.log(e.target.scrollTop, 199191919)
      setCurrentIndex(Math.min(Math.floor(e.target.scrollTop / 50), data.length - sum));
    }
  };

  return (
   <div
     style={{display: 'flex', flex: 1, height: '200px', border: '1px solid red', overflow: 'scroll', scrollBehavior: 'smooth'}}
     ref={scroller}
     onScroll={handleScroll}
   >
     <div style={{border: '1px solid blue', paddingTop: currentIndex * height, transform: `translateY(${currentIndex * height})`}}>
       {
         Array.from(new Array(sum)).map((item, index) => {
           return (
             <div key={index}>
               <img style={{width: 100, height: 100}} src='http://pic18.nipic.com/20120204/8339340_144203764154_2.jpg' alt=""/>
               { props.rowRender(data[currentIndex + index], index) }
             </div>
           )
         })
       }
     </div>

   </div>
  )
}