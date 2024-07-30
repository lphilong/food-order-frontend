import { SlideItems } from '@/types';
const degToRad = (deg: number) => deg * (Math.PI / 180);
type Props = {
    slidePosition: number;
    slideItems: SlideItems[];
};
const CircularSlider = ({ slidePosition, slideItems }: Props) => {
    const size = 500;
    const symbolSize = 10;
    const radius = size / 2;
    const center = radius;

    const calculatePosition = (angle: number) => {
        const angleRad = degToRad(angle);
        const x = radius * Math.cos(angleRad) + center - symbolSize;
        const y = radius * Math.sin(angleRad) + center - symbolSize;
        return { x, y };
    };

    const positions = slideItems.map((_, index) =>
        calculatePosition((360 / slideItems.length) * index),
    );

    return (
        <div
            className="flex h-[400px]  z-50 pointer-events-none items-end absolute right-0 overflow-hidden  "
            style={{ transform: `translateX(-35%) translateY(45%)` }}
        >
            <div
                className="w-[600px] h-[600px] rounded-full relative "
                style={{
                    transform: `rotate(-${slidePosition * (360 / slideItems.length)}deg)`,
                }}
            >
                {positions.map((pos, index) => (
                    <img
                        key={index}
                        className="`w-[20%] h-[20%] rounded-full absolute"
                        style={{
                            left: pos.x,
                            top: pos.y,
                        }}
                        src={slideItems[index].img}
                        alt={slideItems[index].title}
                    />
                ))}
            </div>
        </div>
    );
};

export default CircularSlider;
