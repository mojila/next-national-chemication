import React from 'react'
import Head from 'next/head'
import RegisterECConfirmation from '../../../components/register-ec-confirmation'

class EC extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Konfirmasi</title>
                </Head>
                <div>
                    <RegisterECConfirmation/>
                </div>
            </div>
        )
    }
}

export default EC