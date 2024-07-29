import { SlideItems } from '@/types';
type Props = {
    slidePosition: number;
    slideItems: SlideItems[];
};
const Slider = ({ slidePosition, slideItems }: Props) => {
    return (
        <div className="overflow-hidden  w-[280px] ">
            <div
                className="flex transform transition-transform duration-300 ease-out "
                style={{
                    transform: `translateX(-${(slidePosition % (slideItems.length * 2)) * 100}%)`,
                }}
            >
                {slideItems.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.img}
                        alt={slide.title}
                        className="rounded-md object-cover h-full w-full"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
