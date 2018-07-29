import React from 'react'
import Head from 'next/head'
import RegisterHSFCOfficial1 from '../../../components/register-hsfc-official1'

class RegisterHSFC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran HSFC: Official 1</title>
                </Head>
                <div>
                    <RegisterHSFCOfficial1/>
                </div>
            </div>
        )
    }
}

export default RegisterHSFC