import { useState } from 'react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const activeStepId = 4;
    const steps = [
        {
            id: 1,
            title: 'Order Placed',
            image: '/step1.png',
            description: 'We received your order',
        },
        {
            id: 2,
            title: 'In Transit',
            image: '/step2.png',
            description: 'Your order is on the way',
        },
        {
            id: 3,
            title: 'Deliver',
            image: '/step3.png',
            description: 'Courier is heading your way',
        },
        {
            id: 4,
            title: 'Delivered',
            image: '/step4.png',
            description: 'Package delivered to your address',
        },
    ];

    const handleTrackOrder = () => {
        
        if (orderId.trim() === 'DARTEST1') {
            setTrackingResult(1);
        } else {
            setTrackingResult(0);
        }
    };

  return (
    <div className=" max-w-md mx-auto h-screen mt-10 px-5">
        <p className='flex items-center justify-center bg-red-500 text-white'>use <span className='text-xl px-2'> DARTEST1 </span> for testing purpose only</p>
        <h2 className="text-2xl font-bold mb-4 text-center">Track My Order</h2>
        <input
            type="text"
            placeholder="Enter your order number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-blue-600 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
            onClick={handleTrackOrder}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center"
        >
            Track Order
        </div>

        {
            trackingResult == 1 && (
                <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold text-center mb-8">Track Your Order</h2>

                {/* Steps with Connecting Lines */}
                <div className="relative flex items-center justify-between">
                    
                    {/* Connecting Lines Behind */}
                    <div className="absolute top-[38px] left-0 w-full flex z-0">
                    {steps.slice(0, -1).map((step) => (
                        <div
                        key={step.id}
                        className={`flex-1 h-1 ${
                            step.id < activeStepId ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        />
                    ))}
                    </div>

                    {/* Step Icons + Titles */}
                    {steps.map((step) => {
                    const isActive = step.id === activeStepId;
                    const isCompleted = step.id < activeStepId;

                    let borderStyle = '';
                    if (isCompleted) borderStyle = 'border-green-500';
                    else if (isActive) borderStyle = 'border-blue-500';

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
                        <div
                            className={`rounded-full p-2 bg-white transition-all duration-300 ${
                            borderStyle ? 'border-4 ' + borderStyle : ''
                            }`}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL + step.image}`}
                                alt={step.title}
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                        <span
                            className={`text-center text-sm mt-2 ${
                            isActive
                                ? 'font-semibold text-blue-600'
                                : isCompleted
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }`}
                        >
                            {step.title}
                        </span>
                        </div>
                    );
                    })}
                </div>

                {/* Description Box Below Steps (Only Active Step) */}
                <div className="mt-6 flex justify-center">
                    <div className="bg-blue-100 text-blue-800 text-sm rounded-md px-4 py-3 text-center max-w-md w-full shadow-sm">
                    {
                        steps.find((step) => step.id === activeStepId)?.description ||
                        'No description available.'
                    }
                    </div>
                </div>
                </div>
            )
        }

        {
            trackingResult == 0 && (
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className='flex justify-center'>
                        <img
                            src="/charmander_question.png"
                            alt="No Order Found"
                            className="w-62 h-62 object-contain"
                        />
                    </div>
                    <p className='font-semibold text-5xl text-center'>No Order Found</p>
                </div>
            )
        }
    </div>
  );
};

export default TrackOrder;
