"use client";
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}
const Filter = ({
    data,
    name,
    valueKey
} : FilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        if (typeof window !== 'undefined') {
            const url = qs.stringifyUrl({
                url: window.location.href,
                query
            }, {skipNull: true});
    
            router.push(url);
        }
    }
    return ( 
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4"/>
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button className={cn("rounded-md, text-sm, text-gray-800 p-2 bg-white border border-gray-300 hover:bg-gray-300", selectedValue === filter.id && "bg-black text-white hover:bg-gray-700")} onClick={() => onClick(filter.id)}>
                            {filter.name}
                        </Button>
                    </div>    
                ))}
            </div>
        </div>
     );
}
 
export default Filter;