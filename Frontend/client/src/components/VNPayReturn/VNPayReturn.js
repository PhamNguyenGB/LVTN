import React from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { callbackVNPay } from '../../api/paymentOnlineAPIs';
import { useEffect } from 'react';

const VNPayReturn = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const fetchVNPayData = async () => {
            const queryParams = new URLSearchParams(location.search);

            try {
                const request = await callbackVNPay(queryParams);
                console.log('check request', request);

                if (request.RspCode === '00')
                    setTimeout(() => {
                        history.push('/');
                    }, 5000)
            } catch (error) {
                console.log(error);

            }
        }
        fetchVNPayData();
    }, [])


    return (
        <div style={{ minHeight: '400px' }}>
            <h1>Chúc mừng bạn đã thanh toán thành công</h1>
        </div>
    )
}

export default VNPayReturn
