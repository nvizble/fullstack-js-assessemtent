import { FilterMenu } from "@/components/ui/filter"
import { Car } from 'lucide-react';
import {Card, CardContent} from "@/components/ui/card";

export default function Home() {
    return (
        <main className={"mx-auto w-full h-screen p-12"}>
            <FilterMenu/>
            <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full bg-background border-r-4 text-center font-bold text-2xl text-red-500 p-4"}>
                <CardContent>
                    <Car className={"text-red-500 opacity-10 mx-auto"} size={150}/>
                </CardContent>
            </Card>
        </main>
    )
}
