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

    return(
        <div style={productStyle}>
            <div style={productItemStyle}><b> :</b></div>
            <div style={productItemStyle}>가격 : 원</div>
            <div style={productItemStyle}>선택 갯 수 :</div>
        </div>
    );
};

export default OrderInfo;