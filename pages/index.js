import React from 'react'
import Head from 'next/head'
import { Container, Row, Col, Button } from 'reactstrap'
import RegisterCard from '../components/register-card'
import Router from 'next/router'
import NProgress from 'nprogress'

class Index extends React.Component {
    constructor(props) {
        super(props)

        Router.onRouteChangeStart = () => NProgress.start()
        Router.onRouteChangeComplete = () => NProgress.done()
        Router.onRouteChangeError = () => NProgress.done()
    }

    render() {
        return (
            <div>
                <Head>
                    <title>National Chemication</title>
                </Head>
                <Container className="pt-md-5">
                    <Row>
                        <Col md="4">
                            <RegisterCard title="CEO: CHEMICAL ENGINEERING OLYMPIAD" login register loginLink="/login/ceo" registerLink="/register/ceo" guideLink="http://nationalchemication.com/">
                                Chemical Engineering Olympiad (CEO) merupaan kegiatan kompetisi kimia yang ditujukan untuk siswa/i SMA/MA Sederajat.
                            </RegisterCard>
                        </Col>
                        <Col md="4">
                            <RegisterCard title="EC: Energy Competition" register registerLink="/register/ec" guideLink="http://nationalchemication.com/">
                                Energy Competition (EC) adalah kompetisi karya tulis ilmiah dalam bidang yang ditujukan untuk Mahasiswa/Mahasiswi S1/Diploma se-Indonesia.
                            </RegisterCard>
                        </Col>
                        <Col md="4">
                            <RegisterCard title="HSFC: High School Futsal Competition" register payment paymentLink="/payment/hsfc" registerLink="/register/hsfc" guideLink="http://nationalchemication.com/">
                            High School Futsal Competition (HSFC) merupakan kegiatan perlombaan futsal yang ditujuan untuk siswa/i SMK/SMA/MA Sederajat.
                            </RegisterCard>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Index