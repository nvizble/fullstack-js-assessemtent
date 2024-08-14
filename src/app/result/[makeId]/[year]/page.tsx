import {Suspense} from "react";
import {FilterMenu} from "@/components/ui/filter";
import dynamic from "next/dynamic";
import {Card, CardContent} from "@/components/ui/card";

const DynamicComponent = dynamic(() => import("./result"), {
    loading: () => <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4 text-center font-bold text-2xl text-red-500 p-12"}>
                        <CardContent>
                            Loading...
                        </CardContent>
                    </Card>,
    ssr: false,
});

export async function generateStaticParams() {
    const apiUrl = process.env.NEXT_PUBLIC_URL_GET_MAKES;
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_URL_GET_MAKES is not defined');
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (2015 + i).toString());

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.Results) {
        throw new Error('Unexpected data structure');
    }

    const makers = data.Results!;

    return makers.flatMap((maker: any) =>
        years.map((year) => ({
            makeId: maker.MakeId.toString(),
            year,
        }))
    );
}

const Page = ({ params }: { params: { makeId: string; year: string } }) => {
    const { makeId, year } = params;

    return (
        <main className={"w-full h-screen lg:pt-12 md:pt-8 sm:pt-4"}>
            <FilterMenu/>
            <Suspense fallback={
                <Card className={"mx-auto lg:w-3/5 md:w-3/4 sm:w-full h-fit bg-background border-r-4 text-center font-bold text-2xl text-red-500 p-12"}>
                    <CardContent>
                        Loading...
                    </CardContent>
                </Card>
            }>
                <DynamicComponent makeId={makeId} year={year} />
            </Suspense>
        </main>
    );
};

export default Page;
