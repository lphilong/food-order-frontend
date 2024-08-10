import { faqs, features } from '../config/introduction';
import { useState } from 'react';

const Introduction = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="flex gap-2 flex-col text-justify">
            <div className="flex gap-10 flex-col">
                <div className="flex gap-10 flex-col">
                    <h2 className="font-bold text-5xl max-sm:text-2xl">Why xFood?</h2>
                    <ul className="flex gap-5 flex-col">
                        {features.map((feature, index) => (
                            <li key={index}>
                                <span className="font-bold max-sm:text-base">{feature.title}</span>
                                <span className="max-sm:text-base">{feature.des}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="font-bold text-5xl max-sm:text-2xl">Frequently Asked Questions</h2>

                <span id="more" className={isExpanded ? '' : 'hidden'}>
                    {faqs.map((faq, index) => (
                        <div className="flex gap-5 flex-col" key={index}>
                            <h3 className="font-bold text-3xl max-sm:text-xl">{faq.question}</h3>
                            <p>{faq.answer}</p>

                            <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        </div>
                    ))}
                </span>
                <button id="toggleButton" className="font-bold hover:text-orange-300 bg-gray-200 text-xl text-black hover:border-orange-300 border py-2 w-full" onClick={toggleContent}>
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            </div>
        </div>
    );
};

export default Introduction;
