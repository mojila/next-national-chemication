import React from 'react'
import Head from 'next/head'
import RegisterECLeader from '../../../components/register-ec-leader'

class Dozen extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Ketua</title>
                </Head>
                <div>
                    <RegisterECLeader/>
                </div>
            </div>
        )
    }
}

export default Dozen