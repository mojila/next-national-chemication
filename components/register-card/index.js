import React from 'react'
import { Button } from 'reactstrap'
import { withRouter } from 'next/router'

class RegisterCard extends React.Component {
    render() {
        let { title, children, login, register, payment, router, loginLink, registerLink, paymentLink, guideLink } = this.props

        return (
            <div>
                <div className="m-1 p-3 shadow rounded" style={{ background: "url('/static/images/ceo.webp')", backgroundSize: 'cover' }}>
                    <div className="mt-2">
                        <p className="h2 bg-white d-inline text-uppercase">
                            { title }
                        </p>
                    </div>
                    <div className="bg-white p-3 mt-2 rounded shadow">
                        <p className="text-capitalize small">
                            { children }
                        </p>
                        <div className="d-flex justify-content-end">
                            <Button size="sm" color="secondary" className="shadow" onClick={ () => window.location = guideLink }>Lihat Petunjuk</Button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div>
                            { login && <Button className="text-uppercase shadow" color="success" block onClick={ () => router.push(loginLink) }>login</Button> }
                            { register && <Button className="text-uppercase shadow" color="primary" block onClick={ () => router.push(registerLink) }>pendaftaran</Button> }
                            { payment && <Button className="text-uppercase shadow" color="warning" block onClick={ () => router.push(paymentLink) }>pembayaran</Button> }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterCard)