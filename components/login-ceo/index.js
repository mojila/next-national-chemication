import React from 'react'
import { withRouter } from 'next/router'
import { Form, Label, FormGroup, Input, Row, Col, Button } from 'reactstrap'
import { auth } from '../../firebase'
import ReactLoading from 'react-loading'

class LoginCEO extends React.Component {
    state = {
        error: '',
        email: '',
        password: '',
        loading: false
    }
    
    onSubmit(e) {
        let { email, password } = this.state
        let { router } = this.props

        this.setState({ loading: true })

        auth.signInWithEmailAndPassword(email, password)
            .then((userInfo) => {
                localStorage.setItem('ceo-uid', userInfo.user.uid)
                this.setState({ loading: false })
                router.push('/dashboard/ceo')
            })
            .catch((error) => this.setState({ loading: false, error: 'User tidak ada atau Kombinasi Email dan Password Salah, silahkan ulangi' }))

        e.preventDefault()
    }
    
    render() {
        let { router } = this.props
        let { error, email, password, loading } = this.state

        return (
            <div>
                <Form onSubmit={ this.onSubmit.bind(this) }>
                    <Row className="p-3 mb-1 bg-white rounded shadow">
                        <Col>
                            <Button onClick={ () => router.push('/') } size="sm" color="light" className="shadow">Beranda</Button>
                        </Col>
                        <Col>
                            <p className="m-0 p-0 text-uppercase h6 text-right">
                                Login Peserta CEO
                            </p>
                        </Col>
                    </Row>
                    { error && <Row className="p-3 mb-1 bg-danger rounded shadow">
                        <Col>
                            <p className="m-0 p-0 text-white text-center font-weight-bold small text-capitalize">{ error }</p>
                        </Col>
                    </Row> }
                    <Row className="p-3 mb-1 bg-white rounded shadow">
                        <Col md="12">
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" value={ email } onChange={ (e) => this.setState({ email: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" value={ password } onChange={ (e) => this.setState({ password: e.target.value }) } required/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="p-3 bg-white rounded shadow">
                        <Button color="success" block>
                        { loading 
                            ? <ReactLoading className="mx-auto" width={ 24 } height={ 24 } type="spin" color="white"/>
                            : "Login"
                        }
                        </Button>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default withRouter(LoginCEO)