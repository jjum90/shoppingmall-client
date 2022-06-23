import React, {useCallback} from "react";

/**
 * 상품 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const ProductInfo = ({name, price, id, selectQuantity, onIncrease, onDecrease}) => {
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
        lineHeight: '1.5',
        cursor: 'pointer'
    };

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
        <div style={productStyle}>
            <div style={productItemStyle}><b>상품 : {name}</b></div>
            <div style={productItemStyle}>가격 : {price} 원</div>
            <div style={productItemStyle}>선택 갯 수 : {selectQuantity}</div>
            {
                onIncrease && 
                onDecrease &&
                <div style={productItemStyle}>
                    <button style={btnStyle} onClick={useHandleIncrease}>추가</button>
                    <button style={btnStyle} onClick={useHandleDecrease}>삭제</button>
                </div>
            }
        </div>
    );
};

export default ProductInfo;