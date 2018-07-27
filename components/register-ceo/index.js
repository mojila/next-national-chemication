import React from 'react'
import { withRouter } from 'next/router'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import ReactLoading from 'react-loading'
import { database, auth } from '../../firebase'
import { userInfo } from 'os';

class RegisterCEO extends React.Component {
    state = {
        error: '',
        success: false,
        teamName: '',
        email: '',
        password: '',
        passwordVerify: '',
        school: '',
        city: '',
        loading: false
    }
    
    onSubmit(e) {
        this.setState({ loading: true })
        let { teamName, email, password, school, city } = this.state

        auth.createUserWithEmailAndPassword(email, password)
        .then((userInfo) => {
            database.ref('pesertaCEO/' + userInfo.user.uid).set({
                teamName, email, school, city
            })
            .then(() => {
                this.setState({ success: true, loading: false })
            })
        })
        .catch((error) => this.setState({ error, loading: false }))

        e.preventDefault()
    }
    
    render() {
        let { router } = this.props
        let { loading, error, success, teamName, email, password, passwordVerify, school, city } = this.state

        return (
            <div>
                <Form onSubmit={ this.onSubmit.bind(this) }>
                    <Row className="bg-white p-3 shadow rounded mb-1">
                        <Col>
                            <Button onClick={ () => router.push('/') } size="sm" color="light" className="shadow">Beranda</Button>
                        </Col>
                        <Col>
                            <p className="h6 text-uppercase mt-1 text-right">Pendaftaran Akun</p>
                        </Col>
                    </Row>
                    { success && <Row className="bg-success p-3 shadow rounded mb-1">
                        <Col>
                            <p className="text-white m-0 p-0 small">Pendaftaran Berhasil Silahkan Login.</p>
                        </Col>
                        <Col>
                            <Button onClick={ () => router.push('/login/ceo') } size="sm" color="light" className="shadow float-right">
                                Login
                            </Button>
                        </Col>
                    </Row> }
                    { password.length > 0 && password !== passwordVerify &&
                    <Row className="bg-danger p-3 shadow rounded mb-1">
                        <Col>
                            <p className="text-white small p-0 m-0">
                            { password.length < 8 && 'Password Minimal 8 Karakter Dengan Kombinasi Angka dan Huruf' }
                            </p>
                            <p className="text-white small p-0 m-0">
                            { password !== passwordVerify && 'Password Tidak Cocok' }
                            </p>
                        </Col>
                    </Row> }
                    <Row className="bg-white p-3 shadow rounded mb-1">
                        <Col md="6">
                            <FormGroup>
                                <Label>Nama Tim</Label>
                                <Input value={ teamName } onChange={ (e) => this.setState({ teamName: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Sekolah</Label>
                                <Input value={ school } onChange={ (e) => this.setState({ school: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Kota</Label>
                                <Input value={ city } onChange={ (e) => this.setState({ city: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" value={ email } onChange={ (e) => this.setState({ email: e.target.value }) } required />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" value={ password } onChange={ (e) => this.setState({ password: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Ulangi Password</Label>
                                <Input  type="password" value={ passwordVerify } onChange={ (e) => this.setState({ passwordVerify: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="p-3 bg-white shadow rounded">
                        <Col>
                            <Button color="success" block disabled={ password.length < 8 && password !== passwordVerify || password.length < 1 }>
                            { loading
                                ? <ReactLoading className="mx-auto" type="spin" width={ 24 } height={ 24 } color="white"/>
                                : "Daftar"
                            }
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default withRouter(RegisterCEO)