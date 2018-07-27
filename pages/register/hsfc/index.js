import React from 'react'
import Head from 'next/head'
import RegisterHSFCInfo from '../../../components/register-hsfc'

class RegisterHSFC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran HSFC: Info dasar</title>
                </Head>
                <div>
                    <RegisterHSFCInfo/>
                </div>
            </div>
        )
    }
}

export default RegisterHSFC