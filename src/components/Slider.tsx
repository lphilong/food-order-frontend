import { SlideItems } from '@/types';
type Props = {
    slidePosition: number;
    slideItems: SlideItems[];
};
const Slider = ({ slidePosition, slideItems }: Props) => {
    return (
        <div className="lg:overflow-hidden  lg:w-[280px]  ">
            <div
                className="lg:flex lg:transform lg:transition-transform lg:duration-300 lg:ease-out "
                style={{
                    transform: `translateX(-${(slidePosition % (slideItems.length * 2)) * 100}%)`,
                }}
            >
                {slideItems.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.img}
                        alt={slide.title}
                        className="lg:rounded-md lg:object-cover lg:h-full lg:w-full  max-sm:hidden"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
