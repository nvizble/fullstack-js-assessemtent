"use client"
import { useEffect, useState } from "react";
import {  Card, CardContent  } from "@/components/ui/card"
import {  Button  } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

const apiUrl = process.env.NEXT_PUBLIC_URL_GET_MAKES;
const currentYear = new Date().getFullYear();
const years : string[] = [];

for (let i = 2015; i <= currentYear ; i++){
    years.push(i.toString());
}

interface Maker {
    MakeId: string;
    MakeName: string;
    VehicleTypeId?: number;
    VehicleTypeName?: string;
}

export function FilterMenu  () {
    const [makers, setMakers] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMaker, setSelectedMaker] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${apiUrl}`);
                const data = await response.json();

                setMakers(data.Results!.sort((a: Maker, b: Maker) => a.MakeName.localeCompare(b.MakeName)));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        if (selectedYear !== "" && selectedMaker !== "") {
            setIsButtonDisabled(false);
            return
        }
        setIsButtonDisabled(true)
    }, [selectedYear, selectedMaker]);

    const handleButtonClick = (makerId: string, year: string) => {
        router.push(`/result/${makerId}/${year}`);
    }

    return (
        <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit px-4 py-3 mb-8"}>
            <CardContent className={"flex justify-around gap-6 px-4 py-3"}>
                <Select onValueChange={(value: string) => {
                    setSelectedMaker(value)
                }}>
                    <SelectTrigger className={"w-64 drop-shadow-md content-center"}>
                        <SelectValue placeholder={"Select a brand"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {makers.map((maker: Maker) => (
                            <SelectItem key={maker.MakeId} value={maker.MakeId}>
                                {maker.MakeName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value: string) => {
                    setSelectedYear(value)
                }}>
                    <SelectTrigger className={"w-48 drop-shadow-md"}>
                        <SelectValue placeholder={"Select a year"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button disabled={isButtonDisabled} className={"bg-green-500 hover:bg-green-800 disabled:bg-red-500 w-32 cursor-pointer"} onClick={() => {handleButtonClick(selectedMaker, selectedYear)}}>
                    Next
                </Button>
            </CardContent>
        </Card>
    )
}
