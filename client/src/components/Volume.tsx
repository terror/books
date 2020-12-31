import React from "react";

const Volume = (props: any) => {
    return (
        <div>
            <h1>{props.item.title}</h1>
            <h2>{props.item.author}</h2>
            <h3>{props.item.link}</h3>
        </div>
    );
};

export default Volume;
