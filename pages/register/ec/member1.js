import React from 'react'
import Head from 'next/head'
import RegisterECMember1 from '../../../components/register-ec-member1'

class Member1 extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Anggota 1</title>
                </Head>
                <div>
                    <RegisterECMember1/>
                </div>
            </div>
        )
    }
}

export default Member1