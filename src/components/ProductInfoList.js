import React from "react";
import ProductInfo from "./ProductInfo";

/**
 * 상품 목록 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const ProductInfoList = ({data, onIncrease, onDecrease}) =>{
    const list = data.map((info) => (<ProductInfo key={info.id} {...info} onIncrease={onIncrease} onDecrease={onDecrease} ></ProductInfo>));
    return(
        <div>{list}</div>
    );
}

export default ProductInfoList;