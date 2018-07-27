import React from 'react'
import Head from 'next/head'
import Member2CEO from '../../../../components/member2-ceo'

class Member2 extends React.Component {
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
                    <title>Isi Biodata Member 2</title>
                </Head>
                <div>
                    <Member2CEO/>
                </div>
            </div>
        )
    }
}

export default Member2