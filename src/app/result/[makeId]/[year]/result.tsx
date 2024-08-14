"use client"
import {useEffect, useState, useMemo} from 'react';
import {Card, CardContent} from "@/components/ui/card"

interface Model {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

const Result = ({ makeId, year }: { makeId: string; year: string }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const API_URL = process.env.NEXT_PUBLIC_URL_GET_MODELS;
                const response = await fetch(`${API_URL}/makeId/${makeId}/modelyear/${year}?format=json`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                const result = await response.json();
                setData(result.Results!);
            } catch (error) {
                console.error("Error fetching data: ", error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [makeId, year]);

    const contentToDisplay = useMemo(() => {
        if (isLoading) {
            return (
                <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4 text-center font-bold text-2xl text-red-500 p-12"}>
                    <CardContent>
                        Loading...
                    </CardContent>
                </Card>
            )
        }

        if (data.length === 0) {
            return (
                <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4 text-center font-bold text-2xl text-red-500 p-12"}>
                    <CardContent>
                        There is no available models.
                    </CardContent>
                </Card>
            )
        }

        return (
            <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4"}>
                <CardContent className={"flex flex-col gap-2"}>
                    <ul className={"flex flex-col gap-8 md:px-10 sm:px-6 !pt-8"}>
                        { data.map((model: Model) => (
                            <li key={model.Model_ID}>
                                <span className={"font-bold text-red-500"}>Model: </span>{model.Make_Name +" "+ model.Model_Name}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        )
    }, [data, isLoading])

    return (
        <div>
            {contentToDisplay}
        </div>
    );
};

export default Result;
