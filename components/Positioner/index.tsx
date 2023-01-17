import dynamic from "next/dynamic"

const Positioner = dynamic(()=> import("./Positioner"), {
    ssr: false,
});

export default Positioner