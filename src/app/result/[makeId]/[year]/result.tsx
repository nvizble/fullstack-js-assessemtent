"use client";

import {Suspense, useEffect, useState} from 'react';
import {FilterMenu} from "@/components/ui/filter";
import {Card, CardContent} from "@/components/ui/card";

interface Model {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

const Result = ({ makeId, year }: { makeId: string; year: string }) => {
    let [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = process.env.NEXT_PUBLIC_URL_GET_MODELS;
            const response = await fetch(`${API_URL}/makeId/${makeId}/modelyear/${year}?format=json`);
            const result = await response.json();
            setData(result.Results!);
        };
        fetchData();
    }, [makeId, year]);

    return (
        <div>
            <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4"}>
                <CardContent className={"flex flex-col gap-2"}>
                    {data.map((model: Model) => (
                        <ul className={"flex gap-8 md:px-10 sm:px-6 !pt-8"}>
                            <li key={model.Model_ID}>
                                <span className={"font-bold text-red-500"}>Model: </span>{model.Make_Name +" "+ model.Model_Name}
                            </li>
                        </ul>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default Result;
