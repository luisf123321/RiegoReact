import React from 'react';

const ButtonCard = ({onPress,text}) => {
    return (
        <div>
            <button className='btn btn-primary' type="button" onClick={onPress}>
                {text}
            </button>
        </div>
    );
}

export default ButtonCard;
