import React from 'react';
import {Link, Route, Routes } from 'react-router-dom';
import OrderInfoList from './OrderInfoList';
/**
 * 멤버 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const CustomerInfo = ({name, mileage, points, coupons}) => {
    const customerItemStyle = {
        padding : '6px',
        margin : '0 auto',
        margin : '5px',
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

    return (
        <div>    
            <div style={customerItemStyle}>1. 고객 이름 : {name}</div>
            <div style={customerItemStyle}>2. 고객 마일리지 : {mileage.balance}</div>
            <div style={customerItemStyle}>3. 고객 포인트
                {points.map(point => (
                    <div style={customerItemStyle} key={point.id}> 
                        <div> - 잔여 포인트 {point.balance}, 만료일 {point.expiryDate}</div>
                    </div>
                ))}
            </div>
            <div style={customerItemStyle}>4. 고객 할인 쿠폰
                {coupons.map(coupon => (
                    <div style={customerItemStyle} key={coupon.id}> - {coupon.discountRate}% </div>
                ))}
            </div>
        </div>
    );
}

export default CustomerInfo;