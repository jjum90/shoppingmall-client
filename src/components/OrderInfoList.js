import React, { useState, useEffect } from "react";
import Axios from 'axios';
import OrderInfo from "./OrderInfo";

function useOrders() {
    const[orderPayload, setOrderPayload] = useState([]);
    const[orderLoading, setOrderLoading] = useState(true);
    const[orderError, setOrderError] = useState('');
    const callOrderAPI = async() => {
      try {
        const {data} = await Axios.get('http://localhost:8080/api/v1.0/order');
        console.log(data);
        setOrderPayload(data);
      } catch (error) {
        setOrderError('fail get product infos');
      } finally {
        setOrderLoading(false);
      }
    };
  
    useEffect(()=>{
        callOrderAPI();    
    }, [])
  
    return {orderPayload, orderLoading, orderError, setOrderPayload, setOrderLoading}
}

/**
 * 주문 목록 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const OrderInfoList = () =>{
    const {orderPayload, orderLoading, orderError, setOrderPayload, setOrderLoading} = useOrders();
    const list = orderPayload.map((info) => (<OrderInfo key={info.id} info={info} ></OrderInfo>));
    return(
        <div>{list}</div>
    );
}

export default OrderInfoList;