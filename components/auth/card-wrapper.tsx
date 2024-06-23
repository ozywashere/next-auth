"use client";

import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Header from "@/components/auth/header";
import {Social} from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle?: string;
    headerDescription?: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocial?: boolean;

}

const CardWrapper = ({
                         children,
                         headerTitle,
                         headerDescription,
                         backButtonLabel,
                         backButtonHref,
                         showSocial
                     }: CardWrapperProps) => {
    return (
        <Card className="w-[510px] shadow-md">
            <CardHeader>
                <Header title={headerTitle as string} description={headerDescription as string}/>
            </CardHeader>
            <CardContent>

                {children}
            </CardContent>
            {
                showSocial && (
                    <CardContent>
                        {/*<Social/>*/}
                        <Social/>
                    </CardContent>
                )
            }
            <CardFooter>
                <BackButton
                    label={backButtonLabel as string}
                    href={backButtonHref as string}
                />

            </CardFooter>
        </Card>
    );
};

export default CardWrapper;