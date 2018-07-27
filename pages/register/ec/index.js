import React from 'react'
import Head from 'next/head'
import RegisterEC from '../../../components/register-ec'

class EC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Informasi Dasar</title>
                </Head>
                <div>
                    <RegisterEC/>
                </div>
            </div>
        )
    }
}

export default EC