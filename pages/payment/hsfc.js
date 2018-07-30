import React from 'react'
import Head from 'next/head'
import PaymentHSFC from '../../components/payment-hsfc'

const Payment = () =>
    <div>
        <Head>
            <title>Konfirmasi Pembayaran HSFC</title>
        </Head>
        <div>
            <PaymentHSFC/>
        </div>
    </div>

export default Payment