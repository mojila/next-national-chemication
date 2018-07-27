import React from 'react'
import Head from 'next/head'
import RegisterECMember2 from '../../../components/register-ec-member2'

class Member2 extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Anggota 2</title>
                </Head>
                <div>
                    <RegisterECMember2/>
                </div>
            </div>
        )
    }
}

export default Member2