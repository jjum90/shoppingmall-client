import React, {useCallback} from "react";

/**
 * 주문 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const OrderInfo = ({info}) => {
    const productStyle = {
        margin : '0 auto',
        padding : '16px 0',
        margin : '8px',
        fontSize: '1rm',
        borderBottom: '1px solid #eaeaea'
    };

    const productItemStyle = {
        padding : '10px',
        margin : '0 auto',
        margin : '8px',
        fontSize: '1rm',
    };

    return(
        <div style={productStyle}>
            <div style={productItemStyle}>총 결제 금액 : {info.amount}원</div>
            <div>
                {info.products.map((product, idx) => (
                    <div style={productItemStyle} key={product.id}>
                        <h4> 주문 상품 정보 {idx + 1}</h4>
                        <div>상품명 : {product.name}</div>
                        <div>가격 : {product.price}</div>
                        <div>개 수 : {product.selectQuantity}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderInfo;