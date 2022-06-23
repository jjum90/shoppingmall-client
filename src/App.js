import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Link, Route, Routes } from 'react-router-dom';
import ProductInfoList from "./components/ProductInfoList";
import CustomerInfo from './components/CustomerInfo';
import OrderInfoList from './components/OrderInfoList';
import Axios from 'axios';
import './App.css';


/**
 * 멤버 정보 조회 함수
 * @param {*} 
 * @returns 
 */
function useMemberFetch() {
  const[memberPayload, setMemberPayload] = useState(null);
  const[memberLoading, setMemberLoading] = useState(true);
  const[memberError, setMemberError] = useState('');
  const callMemberAPI = async() => {
    try {
      const {data} = await Axios.get('http://localhost:8080/api/v1.0/member/1');
      setMemberPayload(data);
    } catch (error) {
      setMemberError('fail get member info');
    } finally {
      setMemberLoading(false);
    }
  };

  useEffect(()=>{
    callMemberAPI();    
  }, [])

  return {memberPayload, memberLoading, memberError, setMemberPayload, setMemberLoading}
}

/**
 * 상품 목록 조회 함수
 * @param {*} url 
 * @returns 
 */
function useProductFetch() {
  const[productPayload, setProductPayload] = useState([]);
  const[productLoading, setProductLoading] = useState(true);
  const[productError, setProductError] = useState('');
  const callProductAPI = async() => {
    try {
      const {data} = await Axios.get('http://localhost:8080/api/v1.0/product');
      setProductPayload(data);
    } catch (error) {
      setProductError('fail get product infos');
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(()=>{
    callProductAPI();    
  }, [])

  return {productPayload, productLoading, productError, setProductPayload, setProductLoading}
}

/**
 * 결제하기 함수
 * @param {*}
 * @returns 
 */
 function usePaymentFetch(inputPayment, totalAmount, productPayload, memberPayload, memberLoading, setMemberPayload, setMemberLoading) {

  function getOrderInfo() {
    const mappingData = {
      '자동' : 'AUTO',
      '포인트' : 'POINT',
      '적립금' : 'MILEAGE',
      'PG' : 'PG'
    }
    const products = [];
    for (const product of productPayload) {
      products.push({
        id : product.id,
        name : product.name,
        price : product.price,
        selectQuantity : product.selectQuantity
      })
    }

    return  {
      memberId : memberPayload.id,
      payType : mappingData[inputPayment.current.value.trim()],
      totalAmount : totalAmount,
      order : {
        products : products
      }
    }
  }

  Axios.post('http://localhost:8080/api/v1.0/order', getOrderInfo())
    .then(function (response) {
      if(response.status == 200){
          alert('Success payment process!');
      } else {
          alert('Fail payment process!');
      }
  }).catch(function (error) {
      console.log(error);
      alert('Fail payment process!')
  });

}

function App () {
  const {memberPayload, memberLoading, memberError, setMemberPayload, setMemberLoading} = useMemberFetch();
  const {productPayload, productLoading, productError, setProductPayload, setProductLoading} = useProductFetch();
  const [totalAmount, setTotalAmount] = useState(0);
  const inputPayment = useRef();

  useEffect(()=>{
    console.log(productPayload);
    setTotalAmount(productPayload.reduce((accumlator, object)=>{
      return accumlator + (object.price * object.selectQuantity);
    }, 0))
  }, [productPayload])

  const handleIncrease = (id, data) => {
    setProductPayload(
      productPayload.map((info) => {
        return id === info.id ? {...info, ...data} : info;
      })
    );
  }
  
  const handleDecrease = (id, data) => {
    setProductPayload(
      productPayload.map((info) => {
        return id === info.id ? {...info, ...data} : info;
      })
    );
  }

  const useHandlePayment = (e) => {
    usePaymentFetch(inputPayment, totalAmount, productPayload, memberPayload, memberLoading, setMemberPayload, setMemberLoading);
  }

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={
        <div>
          <h1 className='App-header'>ShoppingMall</h1>
          <div className='Container-Wrapper'>
            <div className='Product-Container'>
              <h3>상품 목록</h3>
              <div>
                {productLoading && <progress value="50" max="100"></progress>}
                {!productLoading && productError && <span>{productError}</span> }
                {!productLoading && !productError && <ProductInfoList data={productPayload} onIncrease={handleIncrease} onDecrease={handleDecrease}></ProductInfoList>}
              </div>
              <h3>총 결제 금액</h3>
              <div>{totalAmount}</div>
            </div>
            
            <div className='Customer-Container'>
                <h3>고객 정보</h3>  
                <div className='Customer-Item'>
                  {memberLoading && <progress value="50" max="100"></progress>}
                  {!memberLoading && memberError && <span>{memberError}</span> }
                  {!memberLoading && !memberError && <CustomerInfo {...memberPayload}></CustomerInfo> }
                </div>
            </div>
            <div className='Payment-Container'>
                <h3>결제 타입 정보</h3>
                <div className='Customer-Item'>
                  <div className='Customer-Sub-Item'>1. 자동 </div>
                  <div className='Customer-Sub-Item'>2. 포인트 </div>
                  <div className='Customer-Sub-Item'>3. 적립금 </div>
                  <div className='Customer-Sub-Item'>4. PG </div>
                </div>
                <h3>결제 타입 입력</h3>
                <div className='Customer-Item'>
                  <input ref={inputPayment} className='Customer-Sub-Item' placeholder='결제 타입을 입력해주세요...'/>
                  <button className='btnStyle Customer-Sub-Item' onClick={useHandlePayment}>결제하기</button>
                </div>
            </div>
          </div>
        </div>
       }/>

       <Route path="/order" element={
        <div>
          <h1 className='App-header'>ShoppingMall</h1>
          <div className='Container-Wrapper'>
             <div className='Product-Container'>
                <h3>주문 목록</h3>
               <OrderInfoList/>
             </div>
          </div>
          <div className='Customer-Container'>
                <h3>고객 정보</h3>  
                <div className='Customer-Item'>
                  {memberLoading && <progress value="50" max="100"></progress>}
                  {!memberLoading && memberError && <span>{memberError}</span> }
                  {!memberLoading && !memberError && <CustomerInfo {...memberPayload}></CustomerInfo> }
                </div>
            </div>
        </div>
       }/>
      </Routes>
      <div>
          <Link to ="/">
              <button className='btnStyle'>
                  상품 리스트
              </button>            
          </Link>
          <Link to ="/order">
              <button className='btnStyle'>
                  주문 리스트
              </button>            
          </Link>
      </div>
    </Fragment>
        
  );
}

export default App;
