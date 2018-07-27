import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'

class RegisterHSFCInfo extends React.Component {
    render() {
        return (
            <div>
                <Container className="pt-md-5 pt-sm-1">
                    <RegisterHSFCTab active={1}/>
                    <div className="p-3 border rounded">
                        <Row>
                            <Col>
                                
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

export default withRouter(RegisterHSFCInfo)