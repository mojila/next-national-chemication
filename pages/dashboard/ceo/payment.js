import React from 'react'
import Head from 'next/head'
import PaymentCEO from '../../../components/payment-ceo'

class Payment extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pembayaran</title>
                </Head>
                <div>
                    <PaymentCEO/>
                </div>
            </div>
        )
    }
}

export default Payment