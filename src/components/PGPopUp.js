import React from 'react';
import './Component.css';
/**
 * 멤버 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const PGPopUp = ({handleTogglePopUp, handleClickPayment}) => {
    return (
        <div className='popup'>
            <div className='popup_inner'>
            <h1 className="popup_header">PG 결제창</h1>
            <button className='payment_popup_btn_style' onClick={handleClickPayment}>결제하기</button>
            <button className='payment_popup_btn_style' onClick={handleTogglePopUp}>닫기</button>
            </div>
        </div>
    );
}

export default PGPopUp;