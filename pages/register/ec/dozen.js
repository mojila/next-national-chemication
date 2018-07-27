import React from 'react'
import Head from 'next/head'
import RegisterECDozen from '../../../components/register-ec-dozen'

class Dozen extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Dosen Pembimbing</title>
                </Head>
                <div>
                    <RegisterECDozen/>
                </div>
            </div>
        )
    }
}

export default Dozen