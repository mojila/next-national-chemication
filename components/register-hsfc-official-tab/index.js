import React from 'react'

class RegisterHSFCOfficialTab extends React.Component {
    render() {
        let { active } = this.props

        return (
            <div>
                <div className="d-flex p-3 bg-light border rounded mb-2">
                    <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 1 ? "bg-primary text-white":"bg-light") }>Official 1</div>
                    <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 2 ? "bg-primary text-white":"bg-light") }>Official 2</div>
                </div>
            </div>
        )
    }
}

export default RegisterHSFCOfficialTab