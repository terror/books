import React from 'react';

const Volume = (props: any) => {
    const { title, author, link } = props.item;
    return (
        <div>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <h3>{link}</h3>
        </div>
    );
};

export default Volume;
