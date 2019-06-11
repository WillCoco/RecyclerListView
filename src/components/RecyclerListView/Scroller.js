import React from 'react';

/**
 * 滚动包装
 *  加载完后计算容器布局
 *  滚动事件修改currentIndex
 *  提供滚动到指定位置
 */
export default (props) => {
  return (
   <div>
     {props.children}
   </div>
  )
}