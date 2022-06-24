import React from "react";
import './Component.css';

/**
 * 상품 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const ProductInfo = ({name, price, id, selectQuantity, onIncrease, onDecrease}) => {
    const useHandleIncrease = (e) => {
        onIncrease(id, {name, price, id, selectQuantity : ++selectQuantity});
    };

    const useHandleDecrease = (e) => {
        let resultQauntity = --selectQuantity;
        if(resultQauntity <= 0) {
            resultQauntity = 0;
        }
        onDecrease(id, {name, price, id, selectQuantity : resultQauntity});
    };

    return(
        <div className='product_style'>
            <div className="product_item_style"><b>상품 : {name}</b></div>
            <div className="product_item_style">가격 : {price} 원</div>
            <div className="product_item_style">선택 갯 수 : {selectQuantity}</div>
            {
                onIncrease && 
                onDecrease &&
                <div className="product_item_style">
                    <button className="btn_style" onClick={useHandleIncrease}>추가</button>
                    <button className="btn_style" onClick={useHandleDecrease}>삭제</button>
                </div>
            }
        </div>
    );
};

export default ProductInfo;