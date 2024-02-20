import ButtonHomepage from "@/components/ui/button-homepage";
import { ScrollContainer } from "../../components/ScrollContainer";
import Link from "next/link";

export default function Page(){
  return(
    <>
      <ScrollContainer/>
      <section className="flex justify-center pb-10">
        <Link href={"/showroom"}><ButtonHomepage/></Link>
      </section>
    </>
  )
}