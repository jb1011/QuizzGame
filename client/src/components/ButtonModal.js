import React from 'react'

function ButtonModal({ toggleModal }) {
    return (
        <div onClick={toggleModal}>
            <div>
                <div className=''>
                    <p>Find me.</p>
                </div>
            </div>
        </div>
    )
}

export default ButtonModal