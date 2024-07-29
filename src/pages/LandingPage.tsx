import Slider from '@/components/Slider';
import { useState } from 'react';
import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import CircularSlider from '@/components/CircularSlider';
import i1 from '../assets/image 1.png';
import i2 from '../assets/image 2.png';
import i3 from '../assets/image 3.png';
import i6 from '../assets/image 6.png';
import i5 from '../assets/image 5.png';
const LandingPage = () => {
    const [slidePosition, setSlidePosition] = useState(0);

    const slideItems = [
        { title: 'Slide 1', img: `${i1}` },
        { title: 'Slide 2', img: `${i2}` },
        { title: 'Slide 3', img: `${i3}` },
        { title: 'Slide 4', img: `${i5}` },
        { title: 'Slide 5', img: `${i6}` },
        { title: 'Slide 6', img: `${i6}` },
    ];
    const totalSlides = slideItems.length;

    const handleNextSlide = (direction: string) => {
        let nextPosition;
        if (direction === 'forward') {
            nextPosition = (slidePosition + 1) % totalSlides;
        } else {
            nextPosition = (slidePosition - 1 + totalSlides) % totalSlides;
        }

        setSlidePosition(nextPosition);
    };
    return (
        <div className="overflow-x-hidden flex flex-col ">
            <CircularSlider slidePosition={slidePosition} slideItems={slideItems} />
            <div className="absolute top-0 right-0 h-[500px] w-[70%] rounded-b-full bg-orange-300 z100">
                <div
                    className="flex justify-between w-[70%]"
                    style={{ transform: `translateY(115%) translateX(20%) ` }}
                >
                    <div className="flex justify-center flex-col gap-5 ">
                        <button onClick={() => handleNextSlide('forward')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-8 rounded-full bg-orange-400 "
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                                />
                            </svg>
                        </button>
                        <button onClick={() => handleNextSlide('backward')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-8 rounded-full bg-orange-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                />
                            </svg>
                        </button>
                    </div>
                    <Slider slidePosition={slidePosition} slideItems={slideItems} />
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={5}
                            stroke="white"
                            className="size-6 rounded-full bg-orange-400 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-12 mt-[40%]">
                <div className="grid md:grid-cols-2 gap-5">
                    <img src={landingImage} />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <span className="font-bold text-3xl tracking-tighter">
                            Order takeaway even faster!
                        </span>
                        <span>
                            Download the App for faster ordering and personalized recommendations
                        </span>
                        <img src={appDownloadImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
