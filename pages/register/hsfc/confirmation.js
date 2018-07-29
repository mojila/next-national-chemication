import React from 'react'
import Head from 'next/head'
import RegisterHSFCConfirmation from '../../../components/register-hsfc-confirmation'

class HSFC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran HSFC: Konfirmasi</title>
                </Head>
                <div>
                    <RegisterHSFCConfirmation/>
                </div>
            </div>
        )
    }
}

export default HSFC