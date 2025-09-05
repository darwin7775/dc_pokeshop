import Carousel from "../Components/Slider/Carousel";
import { useState, useEffect  } from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import { FaCircle, FaStar } from "react-icons/fa";
import { FaDiamond,FaCartShopping } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import Swal from 'sweetalert2';

const Home = () => {

    const seriesList = [
        { id:1, name: "Scarlet and Violet" },
        { id:2, name: "Sun and Moon" },
        { id:3, name: "Sword and Shield" },
        { id:4, name: "XY Eras" }
    ];

    const cardRarity = [
        { id:1, name:'Common', shape: <FaCircle />, color: 'text-black' },
        { id:2, name:'Uncommon', shape: <FaDiamond />, color: 'text-black' },
        { id:3, name:'Rare', shape: <FaStar />, color: 'text-black' },
        { id:4, name:'Double Rare', shape: <><FaStar /><FaStar /></>, color: 'text-black' },
        { id:5, name:'Ace Spec', shape: <FaStar />, color: 'text-pink-500' },
        { id:6, name:'Illustration Rare', shape: <FaStar />, color: 'text-amber-400' },
        { id:7, name:'Ultra Rare', shape: <><FaStar /><FaStar /></>, color: 'text-gray-300' },
        { id:8, name:'Special Illustration Rare', shape: <><FaStar /><FaStar /></>, color: 'text-amber-400' },
        { id:9, name:'Hyper Rare', shape: <><FaStar /><FaStar /><FaStar /></>, color: 'text-amber-400' },
        { id:10, name:'Shiny Rare', shape: <CiStar />, color: 'text-amber-400' },
        { id:11, name:'Promo', shape: <FaStar />, color: 'text-red-500' },
    ];

    const cardData = [
        { title: "Pikachu V", description: "Electric-type card", price: 12.99, type_id: 10, image: "/pikachu_v.png", series_id: 1, quantity:2 },
        { title: "Charizard GX", description: "Fire-type card", price: 35.0, type_id: 7, image: "/charizard_gx.png", series_id: 2, quantity:2 },
        { title: "Eevee VMAX", description: "Cute evolution", price: 18.5, type_id: 7, image: "/eevee_vmax.png", series_id: 3, quantity:2 },
        { title: "Mewtwo EX", description: "Psychic power", price: 27.75, type_id: 7, image: "/mewtwo_ex.png", series_id: 1, quantity:2 },
        { title: "Gengar", description: "Ghost-type", price: 9.99, type_id: 3, image: "/gengar.png", series_id: 4, quantity:2 },
    ];

    const [selectedSeries, setSelectedSeries] = useState([]);
    const [selectedRarities, setSelectedRarities] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [modalCard, setModalCard] = useState(null);
    const [sortAlpha, setSortAlpha] = useState('asc');
    const [sortPrice, setSortPrice] = useState('low');
    const [sortRarity, setSortRarity] = useState('none');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;

    const filteredCards = cardData.filter(card => {
        const matchesSeries = selectedSeries.length === 0 || selectedSeries.includes(card.series_id);
        const matchesRarity = selectedRarities.length === 0 || selectedRarities.includes(card.type_id);
        return matchesSeries && matchesRarity;
    });

    const handleSeriesChange = (seriesId) => {
        setSelectedSeries(prev =>
            prev.includes(seriesId) 
                ? prev.filter(id => id !== seriesId) 
                : [...prev, seriesId]
        );
    };

    const sortedCards = [...filteredCards]
    .sort((a, b) => {
        // Alphabetical sorting
        if (sortAlpha === 'asc') {
            const alpha = a.title.localeCompare(b.title);
            if (alpha !== 0) return alpha;
        } else if (sortAlpha === 'desc') {
            const alpha = b.title.localeCompare(a.title);
            if (alpha !== 0) return alpha;
        }

        // Rarity sorting
        if (sortRarity === 'asc') return a.type_id - b.type_id;
        if (sortRarity === 'desc') return b.type_id - a.type_id;

        // Price sorting
        if (sortPrice === 'low') return a.price - b.price;
        if (sortPrice === 'high') return b.price - a.price;

        return 0;
    });

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(sortedCards.length / cardsPerPage);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [sortAlpha, sortPrice, sortRarity, selectedSeries, selectedRarities]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showModal && modalCard) {
            setSelectedQuantity(1);
        }
    }, [showModal, modalCard]);
    return (
        <div className="w-full max-w-4xl mx-auto p-3">
            <Carousel />
            {showScrollTop && (
                <div
                    onClick={scrollToTop}
                    className="cursor-pointer fixed bottom-6 md:right-6  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
                >
                    ↑ Top
                </div>
            )}
            <div className="flex justify-end lg:hidden px-4 mt-4">
                <div 
                    onClick={() => setShowSidebar(!showSidebar)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showSidebar ? 'Hide Filters' : 'Show Filters'}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 mt-5 gap-4">
                {/* Sidebar */}
                <aside className={`
                    w-full lg:w-1/4 p-4 bg-white rounded shadow
                    ${showSidebar ? 'block' : 'hidden'}
                    lg:block
                `}>
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Series</h2>
                    {seriesList.map(series => (
                        <div key={series.id} className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedSeries.includes(series.id)}
                                    onChange={() => handleSeriesChange(series.id)}
                                    className="mr-2"
                                />
                                {series.name}
                            </label>
                        </div>
                    ))}

                     {/* Rarity Filter */}
                    <hr className="my-4" />
                    <h2 className="text-xl font-bold mb-2 text-blue-600">Card Rarity</h2>
                    {cardRarity.map(rarity => (
                        <div key={rarity.id} className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRarities.includes(rarity.id)}
                                    onChange={() => {
                                        setSelectedRarities(prev =>
                                            prev.includes(rarity.id)
                                                ? prev.filter(id => id !== rarity.id)
                                                : [...prev, rarity.id]
                                        );
                                    }}
                                    className="mr-2"
                                />
                                <span className="flex items-center gap-1">
                                    <span className={`text-sm flex ${rarity.color}`}>{rarity.shape}</span>
                                    <span>{rarity.name}</span>
                                </span>
                            </label>
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 bg-white rounded shadow">
                    {/* Top Section */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold mb-2 flex items-center">
                            <IoIosInformationCircle /> Search Results For:
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div>
                                <label className="mr-2">Alphabet:</label>
                                <select
                                    value={sortAlpha}
                                    onChange={e => setSortAlpha(e.target.value)}
                                    className="border rounded p-1"
                                >
                                    <option value="">Select</option>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                </select>
                            </div>

                            <div>
                                <label className="mr-2">Price:</label>
                                <select
                                    value={sortPrice}
                                    onChange={e => setSortPrice(e.target.value)}
                                    className="border rounded p-1"
                                >
                                    <option value="">Select</option>
                                    <option value="low">Lowest to Highest</option>
                                    <option value="high">Highest to Lowest</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentCards.length > 0 ? (
                            currentCards.map((card, index) => {
                                const rarity = cardRarity.find(r => r.id === card.type_id);
                                return (
                                    <div key={index} className="border rounded p-4 bg-gray-50 shadow flex flex-col">
                                        <img
                                            src={`${import.meta.env.BASE_URL + card.image}`}
                                            alt={card.title}
                                            className="w-full h-48 object-contain mb-3"
                                        />
                                        <hr />
                                        <h3 className="text-lg font-bold">{card.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{card.description}</p>

                                        {rarity && (
                                            <div className="flex items-center mb-1 border rounded border-blue-600 justify-center">
                                                <span className={`flex mr-2 ${rarity.color} text-lg`}>
                                                    {rarity.shape}
                                                </span>
                                                <span className="text-sm text-gray-700">{rarity.name}</span>
                                            </div>
                                        )}

                                        <p className="text-blue-600 font-semibold mb-2">₱{card.price.toFixed(2)}</p>
                                        <div
                                            className="flex items-center cursor-pointer mt-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => {
                                                setModalCard(card);
                                                setSelectedQuantity(1);
                                                setShowModal(true);
                                            }}
                                        >
                                            <FaCartShopping className="mr-1" />
                                            Add to Cart
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center text-center py-10">
                                <img
                                    src={`${import.meta.env.BASE_URL}sad_charizard.png`}
                                    alt="Sad Charizard"
                                    className="h-40 mb-4"
                                />
                                <p className="text-gray-600 text-lg font-semibold">
                                    No cards found for your search.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-6 flex-wrap">
                        <div className="space-x-2 flex cursor-pointer">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {showModal && modalCard && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40 p-3">
                            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4 relative animate-fade-in">

                            <div
                                className="hover:scale-155 transition-transform duration-500"
                                style={{
                                    transform: 'rotateX(8deg) rotateY(-6deg)',
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <img 
                                src={`${import.meta.env.BASE_URL + modalCard.image}`}
                                 alt={modalCard.title} className="w-full h-48 object-contain mb-4" />
                            </div>



                            <h2 className="text-lg font-bold mb-1">{modalCard.title}</h2>
                            <p className="text-gray-600 text-sm mb-3">{modalCard.description}</p>
                            <p className="text-blue-600 font-semibold text-md mb-4">₱{modalCard.price.toFixed(2)}</p>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold">Quantity:</span>
                                <div className="flex items-center border rounded px-2 py-1">
                                <button
                                    className="px-2 text-lg text-gray-600 hover:text-red-500"
                                    onClick={() =>
                                    setSelectedQuantity((prev) => Math.max(1, prev - 1))
                                    }
                                >
                                    −
                                </button>
                                <span className="px-4 text-md font-medium">{selectedQuantity}</span>
                                <button
                                    className="px-2 text-lg text-gray-600 hover:text-green-500"
                                    onClick={() => {
                                        if (selectedQuantity < modalCard.quantity) {
                                        setSelectedQuantity((prev) => prev + 1);
                                        } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops!',
                                            text: `Only ${modalCard.quantity} in stock.`,
                                            confirmButtonColor: '#3085d6'
                                        });
                                        }
                                    }}
                                >
                                +
                                </button>
                                </div>
                            </div>

                                <div
                                    onClick={() => {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Added to Cart',
                                            confirmButtonColor: '#3085d6'
                                        });
                                        setShowModal(false);
                                    }}
                                    className="cursor-pointer w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                                >
                                    Add {selectedQuantity} to Cart
                                </div>
                                <div
                                    className="bg-red-500 text-white cursor-pointer flex justify-center p-2 mt-1"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Home;
