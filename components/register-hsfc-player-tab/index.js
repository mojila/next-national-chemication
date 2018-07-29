const RegisterHSFCPlayerTab = ({ active }) =>
    <div>
        <div className="d-flex justify-content-between flex-wrap p-3 bg-light border rounded mb-2">
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 1 ? "bg-primary text-white":"bg-light") }>Pemain 1</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 2 ? "bg-primary text-white":"bg-light") }>Pemain 2</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 3 ? "bg-primary text-white":"bg-light") }>Pemain 3</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 4 ? "bg-primary text-white":"bg-light") }>Pemain 4</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 5 ? "bg-primary text-white":"bg-light") }>Pemain 5</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 6 ? "bg-primary text-white":"bg-light") }>Pemain 6</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 7 ? "bg-primary text-white":"bg-light") }>Pemain 7</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 8 ? "bg-primary text-white":"bg-light") }>Pemain 8</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 9 ? "bg-primary text-white":"bg-light") }>Pemain 9</div>
            <div className={ "flex-fill p-1 border rounded m-1 small text-center " + (active === 10 ? "bg-primary text-white":"bg-light") }>Pemain 10</div>
        </div>
    </div>

export default RegisterHSFCPlayerTab