import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class RegisterHSFCInfo extends React.Component {
    state = {
        loading: true,
        schoolName: '',
        city: '',
        address: '',
        telephone: '',
        coverLetter: '',
        coverLetterSaving: false,
        saving: false
    }
    
    componentDidMount() {
        this.mounted = true
        
        if (this.mounted) {
            let uid = localStorage.getItem('hsfc-uid')
            
            if (uid) {
                this.setState({ coverLetterSaving: true })

                database.ref('pesertaHSFC/'+uid).child('school').once('value')
                .then((school) => this.setState({
                    schoolName: school.val().name,
                    city: school.val().city,
                    address: school.val().address,
                    telephone: school.val().telephone,
                    coverLetter: school.val().coverLetter,
                    loading: false,
                    coverLetterSaving: false
                }))
            } else {
                this.setState({ loading: false })
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    onSubmit(e) {
        let uid = localStorage.getItem('hsfc-uid') || database.ref('pesertaHSFC').push().key
        let { schoolName, city, address, telephone, coverLetter } = this.state
        let { router } = this.props

        this.setState({ saving: true })

        database.ref('pesertaHSFC/'+uid).child('school').update({
            name: schoolName, city, address, telephone, coverLetter
        })
        .then(() => localStorage.setItem('hsfc-uid', uid))
        .then(() => router.push('/register/hsfc/official1'))

        e.preventDefault()
    }

    onUploadCoverLetter(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('hsfc-uid') || database.ref('pesertaHSFC').push().key
        localStorage.setItem('hsfc-uid', uid)
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('school')
        let storageRef = storage.ref('pesertaHSFC/'+uid).child('school').child('coverLetter').child(file.name)

        this.setState({ coverLetterSaving: true })
        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ coverLetter: downloadURL })
            .then(() => this.setState({ coverLetter: downloadURL, coverLetterSaving: false }))
        })
    }

    render() {
        let { loading, schoolName, city, address, telephone, coverLetter,
            coverLetterSaving, saving
        } = this.state

        return (
            <div>
                <Container className="pt-md-5 pt-sm-1">
                    <RegisterHSFCTab active={1}/>
                    { loading && <ReactLoading width={64} height={64} color="green" type="spin" className="mx-auto mt-5"/> }
                    { !loading && <Form onSubmit={ this.onSubmit.bind(this) }>
                        <div className="p-3 bg-light border rounded mb-2">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Nama Sekolah</Label>
                                        <Input size="sm" value={schoolName} onChange={e => this.setState({ schoolName: e.target.value })} required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Kota</Label>
                                        <Input size="sm" value={city} onChange={e => this.setState({ city: e.target.value })} required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Alamat</Label>
                                        <Input size="sm" value={address} onChange={e => this.setState({ address: e.target.value })} required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">No. Telpon</Label>
                                        <Input size="sm" value={telephone} onChange={e => this.setState({ telephone: e.target.value })} required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Upload Surat Pengantar dari Sekolah</Label>
                                        <Input type="file" onChange={this.onUploadCoverLetter.bind(this)}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <div className="p-3 mt-4 bg-success rounded text-center text-white small">
                                        { !coverLetterSaving && !coverLetter && "Upload Foto Surat Pengantar" }
                                        { coverLetterSaving && <center><ReactLoading width={32} height={32} type="spin" color="white"/></center> }
                                        { !coverLetterSaving && coverLetter && <center><img src={ coverLetter } className="img-fluid"/></center> }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 bg-light rounded border mb-5">
                            <Row>
                                <Col md="6">

                                </Col>
                                <Col md="6">
                                    <Button disabled={!coverLetter} type="submit" className="float-right" color="outline-primary" size="sm">
                                    { saving && <ReactLoading className="mx-auto" width={24} height={24} type="spin" color="white"/> }
                                    { !saving && "Simpan dan Lanjutkan" }
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form> }
                </Container>
            </div>
        )
    }
}

export default withRouter(RegisterHSFCInfo)