import React from 'react'
import Head from 'next/head'

import { Container, Row, Col } from 'reactstrap'
import ReactLoading from 'react-loading'
import { database } from '../../../firebase'

class Print extends React.Component {
    state = {
        teamName: '',
        code: '',
        loading: true
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ceo-uid')
            let code = uid.substr(-5, 5)

            database.ref('pesertaCEO/'+uid).child('teamName').once('value')
                .then((snap) => this.setState({ teamName: snap.val(), code, loading: false }))
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }
    
    render() {
        let date = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let { loading, teamName, code } = this.state

        return (
            <div>
                <Head>
                    <title>Pendaftaran EC: Bukti Pendaftaran</title>
                </Head>
                <div>
                    <Container className="pt-md-5">
                        <Row>
                            <Col>
                                <div className="rounded bg-light border">
                                    <div className="p-3 border-bottom d-flex">
                                        <div>
                                            <img src="/static/images/logo.webp" width={64} />
                                        </div>
                                        <div className="flex-fill text-center">
                                            <div>Bukti Pendaftaran</div>
                                            <div className="small">Diterima pada {date.toLocaleDateString('id-ID', options)}</div>
                                        </div>
                                    </div>
                                    <div className="p-2 border-bottom">
                                        <div className="text-center">KODE</div>
                                        <div>
                                            { loading && <ReactLoading type="spin" className="mx-auto" width={32} height={32} color="green" />}                                            
                                            { !loading && <h2 className="text-center">{ code }</h2> }
                                        </div>
                                        <div className="text-center">NAMA TIM</div>
                                        <div>
                                            { loading && <ReactLoading type="spin" className="mx-auto" width={32} height={32} color="green" />}
                                            { !loading && <h2 className="text-center">{ teamName }</h2> }
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="text-center small">National Chemication 2018 - www.nationalchemication.com</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="text-center">Tekan CTRL + p untuk Print atau simpan berupa pdf</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Print