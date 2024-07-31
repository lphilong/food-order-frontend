import { faqs, features } from '@/variables';
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
                    <h2 className="font-bold text-5xl">Why xFood?</h2>
                    <ul className="flex gap-5 flex-col">
                        {features.map((feature, index) => (
                            <li key={index}>
                                <span className="font-bold">{feature.title}</span>
                                <span>{feature.des}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="font-bold text-5xl">Frequently Asked Questions</h2>

                <span id="more" className={isExpanded ? '' : 'hidden'}>
                    {faqs.map((faq, index) => (
                        <div className="flex gap-5 flex-col">
                            <h3 key={index} className="font-bold text-3xl">
                                {faq.question}
                            </h3>
                            <p>{faq.answer}</p>

                            <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        </div>
                    ))}
                </span>
                <button
                    id="toggleButton"
                    className="font-bold hover:text-orange-300 bg-gray-200 text-xl text-black hover:border-orange-300 border py-2 w-full"
                    onClick={toggleContent}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            </div>
        </div>
    );
};

export default Introduction;
