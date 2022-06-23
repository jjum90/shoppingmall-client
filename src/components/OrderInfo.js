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
            <div style={productItemStyle}><b> :</b></div>
            <div style={productItemStyle}>가격 : 원</div>
            <div style={productItemStyle}>선택 갯 수 :</div>
        </div>
    );
};

export default OrderInfo;