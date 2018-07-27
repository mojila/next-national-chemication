import React from 'react'
import Head from 'next/head'
import Member1CEO from '../../../../components/member1-ceo'

class Member1 extends React.Component {
    componentDidMount() {
        let uid = localStorage.getItem('ceo-uid')
        
        if (!uid) {
            Router.push('/login/ceo')
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Isi Biodata Member 1</title>
                </Head>
                <div>
                    <Member1CEO/>
                </div>
            </div>
        )
    }
}

export default Member1