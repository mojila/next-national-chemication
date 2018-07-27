import React from 'react'
import { withRouter } from 'next/router'
import { Container, Row, Col, Button } from 'reactstrap'
import Tab from '../register-ec-tab'

class RegisterECConfirmation extends React.Component {
    confirm() {
        let uid = localStorage.getItem('ec-uid')
        let set = sessionStorage.setItem('ec-uid', uid)
        let { router } = this.props

        localStorage.removeItem('ec-uid')
        router.push('/register/ec/print')
    }

    render() {
        let { router } = this.props

        return (
            <Container className="pt-md-5">
                <Row>
                    <Col>
                        <Tab active={ 6 }/>
                        <div className="p-3 bg-white rounded border mb-2">
                            <div className="text-capitalize text-center">
                                Dengan mengeklik tombol konfirmasi maka anda telah menyetujui segala ketentuan dan peraturan yang ada.
                                dan bertanggung jawab atas kebenaran informasi yang telah di berikan.
                            </div>
                        </div>
                        <div className="p-2 bg-white rounded border mb-2">
                            <Row>
                                <Col md="6">
                                    <Button size="sm" color="outline-secondary" onClick={ () => router.push('/register/ec/member2') }>Kembali</Button>                                    
                                </Col>
                                <Col md="6">
                                    <Button className="float-right" size="sm" color="outline-success" onClick={ this.confirm.bind(this) }>Konfirmasi</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(RegisterECConfirmation)