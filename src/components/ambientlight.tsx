'use client'
import React, { FC } from "react";
import { Orbs } from "./orbs";

interface IProps {
};

const AmbientLight:FC<IProps> = (props) => {
    return (
        <div>
            <Orbs />
        </div>
    )
};

export default AmbientLight;