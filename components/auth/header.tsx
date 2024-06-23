import React from 'react';
import {Poppins} from "next/font/google";

import {cn} from "@/lib/utils";
const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]});

interface HeaderProps {
    title: string;
    description: string;
}

const Header = ({title,description}:HeaderProps) => {


    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className={cn("text-3xl font-semibold  mb-[10px] drop-shadow-md",font.className)}>{title}</h1>
            <p className="mb-11 text-base">{description}</p>
        </div>
    );
};

export default Header;