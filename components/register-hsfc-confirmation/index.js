import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'
import RegisterHSFCPlayerTab from '../register-hsfc-player-tab'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class RegisterHSFCConfirmation extends React.Component {
    confirm() {
        let { router } = this.props

        localStorage.removeItem('hsfc-uid')
        router.push('/')
    }

    render() {
        let { router } = this.props

        return (
            <Container className="pt-md-5">
                <RegisterHSFCTab active={4}/>
                    <div className="p-3 bg-white rounded border mb-2">
                        <div className="text-capitalize text-center">
                            Dengan mengeklik tombol konfirmasi maka anda telah menyetujui segala ketentuan dan peraturan yang ada.
                            dan bertanggung jawab atas kebenaran informasi yang telah di berikan. Semua Data akan disimpan setelah klik Konfirmasi.
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded border mb-2">
                        <Row>
                            <Col md="6">
                                <Button size="sm" color="outline-secondary" onClick={ () => router.push('/register/hsfc/player10') }>Kembali</Button>
                            </Col>
                            <Col md="6">
                                <Button className="float-right" size="sm" color="outline-success" onClick={ this.confirm.bind(this) }>Konfirmasi</Button>
                            </Col>
                        </Row>
                    </div>
            </Container>
        )
    }
}

export default withRouter(RegisterHSFCConfirmation)