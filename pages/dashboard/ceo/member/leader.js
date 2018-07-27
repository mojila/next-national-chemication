import React from 'react'
import Head from 'next/head'
import LeaderCEO from '../../../../components/leader-ceo'

class Leader extends React.Component {
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
                    <title>Isi Biodata Ketua</title>
                </Head>
                <div>
                    <LeaderCEO/>
                </div>
            </div>
        )
    }
}

export default Leader