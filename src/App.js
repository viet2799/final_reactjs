import React from 'react';
import Header from './components/Header';
import {Row, Col} from 'antd';
import './App.css';


function App() {
  return (
      <div className="App">
          <Row gutter={15} style={{margin: 'auto'}}>
              <Col lg={20}>
                  <Header/>
              </Col>
          </Row>
      </div>
  );
}
export default App;

