"use client"
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SparklesIcon} from "lucide-react";
import {useUserRole} from "@/hooks/useUserRole";

const DashboardBtn = () => {
    const { isLoading } = useUserRole()

    if(isLoading) return null;

    return (
        <Link href={"/dashboard"}>
            <Button className={"gap-2 font-medium"} size={"sm"}>
                <SparklesIcon className={'size-4'} />
                Discover
            </Button>
        </Link>
    );
};

export default DashboardBtn;
