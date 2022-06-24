import React from 'react';
import './Component.css';
/**
 * 멤버 정보 컴포넌트
 * @param {*} param0 
 * @returns 
 */
const CustomerInfo = ({name, mileage, points, coupons}) => {


    return (
        <div>    
            <div className='customer_item_style'>1. 고객 이름 : {name}</div>
            <div className='customer_item_style'>2. 고객 마일리지 : {mileage.balance}</div>
            <div className='customer_item_style'>3. 고객 포인트
                {points.map(point => (
                    <div className='customer_item_style' key={point.id}> 
                        <div> - 잔여 포인트 {point.balance}, 만료일 {point.expiryDate}</div>
                    </div>
                ))}
            </div>
            <div className='customer_item_style'>4. 고객 할인 쿠폰
                {coupons.map(coupon => (
                    <div className='customer_item_style' key={coupon.id}> - {coupon.discountRate}% </div>
                ))}
            </div>
        </div>
    );
}

export default CustomerInfo;