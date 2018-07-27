import React from 'react'
import Head from 'next/head'
import MemberCEO from '../../../../components/member-ceo'

class Member extends React.Component {
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
                    <title>Sunting Anggota</title>
                </Head>
                <div>
                    <MemberCEO/>
                </div>
            </div>
        )
    }
}

export default Member