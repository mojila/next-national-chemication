import React from 'react'
import Head from 'next/head'
import RegisterHSFCOfficial2 from '../../../components/register-hsfc-official2'

class RegisterHSFC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran HSFC: Official 2</title>
                </Head>
                <div>
                    <RegisterHSFCOfficial2/>
                </div>
            </div>
        )
    }
}

export default RegisterHSFC