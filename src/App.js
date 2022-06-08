import React, {useState, useEffect, Fragment} from 'react';
import ProductInfoList from "./components/ProductInfoList";
import CustomerInfo from './components/CustomerInfo';
import Axios from 'axios';
import './App.css';


/**
 * 멤버 정보 조회 함수
 * @param {*} url 
 * @returns 
 */
function useMemberFetch(url) {
  const[memberPayload, setMemberPayload] = useState(null);
  const[memberLoading, setMemberLoading] = useState(true);
  const[memberError, setMemberError] = useState('');
  const callMemberAPI = async() => {
    try {
      const {data} = await Axios.get(url);
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
function useProductFetch(url) {
  const[productPayload, setProductPayload] = useState([]);
  const[productLoading, setProductLoading] = useState(true);
  const[productError, setProductError] = useState('');
  const callProductAPI = async() => {
    try {
      const {data} = await Axios.get(url);
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
 * @param {*} url 
 * @returns 
 */
 function usePaymentFetch(url) {
  const[paymentPayload, setPaymentPayload] = useState([]);
  const[paymentLoading, setPaymentLoading] = useState(true);
  const[paymentError, setPaymentError] = useState('');
  const callPaymentAPI = async() => {
    try {
      const {data} = await Axios.get(url);
      setPaymentPayload(data);
    } catch (error) {
      setPaymentError('fail get product infos');
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(()=>{
    callPaymentAPI();    
  }, [])

  return {paymentPayload, paymentLoading, paymentError, setPaymentPayload, setPaymentLoading}
}

function App () {
  const {memberPayload, memberLoading, memberError, setMemberPayload, setMemberLoading} = useMemberFetch('http://localhost:8080/api/v1.0/member/1');
  const {productPayload, productLoading, productError, setProductPayload, setProductLoading} = useProductFetch('http://localhost:8080/api/v1.0/product');
  // const {paymentPayload, paymentLoading, paymentError, setPaymentPayload, setPaymentLoading} = usePaymentFetch('http://localhost:8080/api/v1.0/order');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    console.log(productPayload);
    setTotalAmount(productPayload.reduce((accumlator, object)=>{
      return accumlator + (object.price * object.selectQuantity);
    }, 0))
  }, [productPayload])

  // useEffect(()=>{
  //   console.log(paymentPayload);
  //   alert('결제가 정상적으로 완료되었습니다.!!!')
  //   useMemberFetch('http://localhost:8080/api/v1.0/member/1');
  // }, [])


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

  const btnStyle  = {
    color: 'white',
    background: 'teal',
    marginRight : '10px',
    padding: '0.375rem 0.75rem',
    border: '1px solid teal',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    lineHeight: '1.5'
  };

  return (
    <Fragment>
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
                <input className="Input-Item" placeholder='결제 타입을 입력해주세요...'/>
                <button style={btnStyle} onClick>결제하기</button>
              </div>
          </div>
        </div>

      </div>

    </Fragment>
        
  );
}

export default App;
