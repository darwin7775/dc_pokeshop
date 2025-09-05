import { useState, useEffect } from 'react';

const images = [
  '/news1.jpg',
  '/news2.jpg',
  '/news4.jpg',
];

function Carousel() {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000); // 3 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <div className="relative overflow-hidden rounded-lg p-3">
            <img
                src={`${import.meta.env.BASE_URL + images[current]}`}
                alt={`Slide ${current + 1}`}
                className="w-full h-64 transition-all duration-700 ease-in-out"
            />

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === current ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
