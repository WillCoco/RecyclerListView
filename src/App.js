import React from 'react';
import RecyclerListView from './components/RecyclerListView';
import './App.css';

function App() {
  return (
    <div className="App" style={{position: 'relative', top: '100px'}}>
      <RecyclerListView
        // data={[{name: "test1", title: 'title1'}]}
        height={50}
        rowRender={(data, index) => {
          return (
            <div style={{height: '50px', border: '1px solid', boxSizing: 'border-box'}}>
              <span>{data.name}</span>
              <span>{data.title}</span>
              <span>...{index}</span>
            </div>
          )
        }}
      />
      <div>1231</div>
    </div>
  );
}

export default App;
