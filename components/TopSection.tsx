import Image from "next/image"

export function TopSection() {
    return (
        <div className="relative h-[100px] w-screen border-b-1 border-red shadow-md">
            <Image
                className="object-contain-top"
                src={"/RetroRevive_background.jpg"}
                alt={"store background"}
                fill
            />

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <Image
                    className="object-contain"
                    src={"/RetroRevive_logo.png"}
                    alt={"store logo"}
                    width={80}
                    height={80}
                />
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <Image
                    className="object-contain"
                    src={"/RetroRevive_text.png"}
                    alt={"store logo"}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}