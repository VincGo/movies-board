import React from 'react';

const Title = ({title}) => {
    return (
        <div>
            <h1 className={"title"}>{title}</h1>
            <div className={"title-decoration"} />
        </div>
    );
};

export default Title;