import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Dashboard from '../../../components/dashboard-ceo';

class CEO extends React.Component {
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
                    <title>Dashboard CEO</title>
                </Head>
                <div>
                    <Dashboard/>
                </div>
            </div>
        )
    }
}

export default CEO