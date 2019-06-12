import React, { useEffect, useRef, useState } from 'react';
import Scroller from './Scroller';


export default (props) => {
  const {
    data = Array.from(new Array(1000)).map((a, index) => ({name: 'asdf1---', title: index})),
    height = 100,
    initIndex = 0,
    bound = 10, // 上/下超出格数
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const [sum, setSum] = useState(0);

  //  每一项的位置
  const [y, setY] = useState([]);

  const scroller = useRef(null);

  useEffect(() => {
    const { clientHeight, clientWidth } = scroller.current;

    const maxSum = Math.ceil((clientHeight / height) + bound * 2);

    console.log(Math.min(maxSum, data.length), 'sum');
    const qty = Math.min(maxSum, data.length)
    setSum(qty);
  }, []);

  console.log(currentIndex, 'currentIndex');

  const handleScroll = (e) => {
    if (e.target.scrollTop && currentIndex !== Math.floor(e.target.scrollTop / height)){

      // 新可视区第一个item
      const newCurrentIndex = Math.min(Math.floor(e.target.scrollTop / height), data.length - sum);

      // 滑动方向
      const isDectrionUp = newCurrentIndex > currentIndex;

      setCurrentIndex(newCurrentIndex);

      // 复用item第一个的index
      const topIndex = Math.max(0, (currentIndex - bound -1) % sum); // 最上方的item index

      // 复用item最后一个的index
      const bottomIndex = topIndex + sum;

      //  到达更新位置
      if (currentIndex > 10) {
        console.log(currentIndex, 'currentIndex11')
        if (isDectrionUp) {
          y[topIndex] = (y[topIndex] || 0) + (sum * height)
          console.log(y, 'xinweizi')
        } else {
          y[bottomIndex] = (y[topIndex] || 0) - (sum * height)
        }
        setY(y);
      }
    }
  };

  const getOffsetY = (index) => {
    // 到达开始移动临界，上下多余item对称时
    console.log(Math.floor(currentIndex / sum), '移动了几圈')
    const topIndex = Math.max(0, (currentIndex - bound -1) % sum); // 最上方的item index
    console.log(topIndex, 'topIndex')
    if (index <= topIndex && currentIndex > bound -1) {
      console.log((sum), 111)
      return sum * height + Math.floor(currentIndex / sum) * height
    }
    return 0;
  };


  return (
   <div
     style={{display: 'flex', flex: 1, height: '400px', overflow: 'scroll', scrollBehavior: 'smooth'}}
     ref={scroller}
     onScroll={handleScroll}
   >
     <div style={{/*paddingTop: currentIndex * height, transform: `translateY(${currentIndex * height})`*/}}>
       {
         Array.from(new Array(sum)).map((item, index) => {
           console.log(y[index], 'y[index]')
           return (
             <div key={index} style={{display: 'flex', flexDirection: 'row', transform:`translateY(${y[index] || 0}px)`}}>
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