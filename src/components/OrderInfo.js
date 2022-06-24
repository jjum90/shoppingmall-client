import React, {useCallback} from "react";

/**
 * 주문 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const OrderInfo = ({info}) => {

    return(
        <div className="product_style">
            <div className="product_item_style">총 결제 금액 : {info.amount}원</div>
            <div>
                {info.products.map((product, idx) => (
                    <div className="product_item_style" key={product.id}>
                        <h4> 주문 상품 정보 {idx + 1}</h4>
                        <div>상품명 : {product.name}</div>
                        <div>가격 : {product.price}</div>
                        <div>개 수 : {product.selectQuantity}</div>
                    </div>
                ))}
            </div>
            <div className="product_item_style">
                <button className='btn_style'>주문 취소</button>
            </div>
        </div>
    );
};

export default OrderInfo;