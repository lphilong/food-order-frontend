import Slider from '@/components/Slider';
import { useCallback, useMemo, useState } from 'react';
import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import CircularSlider from '@/components/CircularSlider';
import i1 from '../assets/image 1.png';
import i2 from '../assets/image 2.png';
import i3 from '../assets/image 3.png';
import i6 from '../assets/image 6.png';
import i5 from '../assets/image 5.png';
import { useNavigate } from 'react-router-dom';
import Introduction from '@/components/Introduction';
const LandingPage = () => {
    const [slidePosition, setSlidePosition] = useState(0);
    const navigate = useNavigate();
    const slideItems = useMemo(
        () => [
            { title: 'Slide 1', img: `${i1}` },
            { title: 'Slide 2', img: `${i2}` },
            { title: 'Slide 3', img: `${i3}` },
            { title: 'Slide 4', img: `${i5}` },
            { title: 'Slide 5', img: `${i6}` },
            { title: 'Slide 6', img: `${i6}` },
        ],
        [],
    );
    const totalSlides = slideItems.length;

    const handleNextSlide = useCallback(
        (direction: string) => {
            setSlidePosition((prevPosition) => {
                if (direction === 'forward') {
                    return (prevPosition + 1) % totalSlides;
                } else {
                    return (prevPosition - 1 + totalSlides) % totalSlides;
                }
            });
        },
        [totalSlides],
    );

    return (
        <div className=" flex flex-col ">
            <div className="w-[25%] max-md:w-full">
                <div className="flex flex-col text-justify justify-between gap-10 lg:mt-[30%] max-md:items-center">
                    <header className="text-5xl font-bold text-orange-300">Delicious</header>
                    <span>
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Facilisis habitant risus donec ac sociosqu. Nisi pretium ut fusce
                        curabitur et. Parturient sodales porttitor pellentesque ex maximus hac erat scelerisque egestas. Nisi pretium ut fusce
                        curabitur et. Parturient sodales porttitor pellentesque ex maximus hac erat scelerisque egestas.
                    </span>
                    <button
                        onClick={() => navigate('/restaurant')}
                        className="font-bold hover:text-orange-500  text-xl text-white bg-orange-300 rounded-full border py-2 w-[50%] "
                    >
                        Get started
                    </button>
                </div>
                <div className="lg:absolute lg:top-0 lg:right-0 lg:h-[600px] lg:w-[70%] lg:rounded-b-full lg:bg-orange-300 lg:flex lg:justify-center max-md:hidden  ">
                    <CircularSlider slidePosition={slidePosition} slideItems={slideItems} />
                    <div className="lg:flex lg:justify-between lg:w-[70%] lg:items-center" style={{ transform: `translateY(-3%)` }}>
                        <div className="lg:flex lg:justify-center lg:flex-col lg:gap-5 ">
                            <button onClick={() => handleNextSlide('forward')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="lg:size-8 lg:rounded-full lg:bg-orange-400 "
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </button>
                            <button onClick={() => handleNextSlide('backward')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="lg:size-8 lg:rounded-full lg:bg-orange-400"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                            </button>
                        </div>
                        <Slider slidePosition={slidePosition} slideItems={slideItems} />
                        <div className="lg:flex lg:items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={5}
                                stroke="white"
                                className="lg:size-6 lg:rounded-full lg:bg-orange-400 "
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12 mt-[15%] ">
                <Introduction />
                <div className="grid md:grid-cols-2 gap-5">
                    <img src={landingImage} />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster!</span>
                        <span>Download the App for faster ordering and personalized recommendations</span>
                        <img src={appDownloadImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
