import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filter";
import Filter from "./components/filter";
import { Suspense } from "react";

export const revalidate = 0;

interface CategoryPageProps {
    params: Promise<{
        categoryId: string;
    }>;
    searchParams: Promise<{
        colorId: string;
        sizeId: string;
    }>;
};

const CategoryPage = async ({
    params,
    searchParams,
} : CategoryPageProps) => {
    const param = await params;
    const searchParam = await searchParams;

    const products = await getProducts({
        categoryId: param.categoryId,
        colorId: searchParam.colorId,
        sizeId: searchParam.sizeId,
    });

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(param.categoryId);
    return ( 
        <div className="bg-white">
            <Container>
                <Billboard data={category.billboard} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilter sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block">
                            <Suspense fallback={<>Loading...</>}>
                                <Filter
                                    valueKey="sizeId"
                                    name="Sizes"
                                    data={sizes}
                                />
                                <Filter
                                    valueKey="colorId"
                                    name="Colors"
                                    data={colors}
                                />
                            </Suspense>
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default CategoryPage;