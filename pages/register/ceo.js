import React from 'react'
import Head from 'next/head'
import { Container } from 'reactstrap'
import RegisterCEO from '../../components/register-ceo'

class CEO extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Pendaftaran CEO</title>
                </Head>
                <Container className="pt-md-5">
                    <RegisterCEO/>
                </Container>
            </div>
        )
    }
}

export default CEO