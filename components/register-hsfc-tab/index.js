import React from 'react'

class RegisterHSFCTab extends React.Component {
    render() {
        let { active } = this.props

        return (
            <div>
                <div className="d-flex p-3 bg-light border rounded mb-2">
                    <div className={ "flex-fill p-2 border rounded small text-center " + (active === 1 ? "bg-primary text-white":"bg-light") }>Info Dasar</div>
                </div>
            </div>
        )
    }
}

export default RegisterHSFCTab