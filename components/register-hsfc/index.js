import React from 'react'
import { Container } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'

class RegisterHSFCInfo extends React.Component {
    render() {
        return (
            <div>
                <Container className="pt-md-5 pt-sm-1">
                    <RegisterHSFCTab/>
                </Container>
            </div>
        )
    }
}

export default withRouter(RegisterHSFCInfo)