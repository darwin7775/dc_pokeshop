import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PokeCart = () => {
    const navigate = useNavigate();

    const cardData = [
        { title: "Pikachu V", description: "Electric-type card", price: 12.99, type_id: 10, image: "/pikachu_v.png", series_id: 1, quantity:2 },
        { title: "Charizard GX", description: "Fire-type card", price: 35.0, type_id: 7, image: "/charizard_gx.png", series_id: 2, quantity:7 },
        { title: "Eevee VMAX", description: "Cute evolution", price: 18.5, type_id: 7, image: "/eevee_vmax.png", series_id: 3, quantity:2 },
        { title: "Mewtwo EX", description: "Psychic power", price: 27.75, type_id: 7, image: "/mewtwo_ex.png", series_id: 1, quantity:2 },
        { title: "Gengar", description: "Ghost-type", price: 9.99, type_id: 3, image: "/gengar.png", series_id: 4, quantity:2 },
    ];

    const initialItems = [
        {
            id: 1,
            title: 'Pikachu V',
            price: 12.99,
            quantity: 2,
            image: '/pikachu_v.png',
        },
        {
            id: 2,
            title: 'Charizard GX',
            price: 35.0,
            quantity: 1,
            image: '/charizard_gx.png',
        },
    ];

    const paymentMethods = [
        {
            id:1,
            name:'Cash on Delivery'
        },
        {
            id:2,
            name:'Paypal'
        },
        {
            id:3,
            name:'Visa'
        },
        {
            id:4,
            name:'Master Card'
        },
    ];

    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].name);
    const [cartItems, setCartItems] = useState(initialItems);

    const handleQuantityChange = (id, newQuantity) => {
        // Access cardData here (it's in component scope)
        const cartItem = cartItems.find(item => item.id === id);
        const stockItem = cardData.find(card => card.title === cartItem.title);

        if (!stockItem) return;

        let maxStock = stockItem.quantity; // max stock available
        let value = parseInt(newQuantity) || 1;

        if (value == maxStock) {
            Swal.fire({
                icon: 'warning',
                title: 'Not enough stock!',
                text: `Only ${maxStock} in stock.`,
                confirmButtonColor: '#3085d6',
            });
            value = maxStock; // adjust to max stock
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
            item.id === id ? { ...item, quantity: value } : item
            )
        );
    };
    
    const checkout = () => {
        Swal.fire({
            title: 'Proceed to Checkout?',
            text: 'Are you sure you want to place this order?',
            imageUrl: import.meta.env.BASE_URL+'/pokemons.png', // <-- your custom image here
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Pokemon',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Order Placed!',
                    text: 'Your order has been successfully placed.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
                navigate('/');
            }
        });
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto p-4 lg:h-screen">
            <div className='flex justify-between items-center'>
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Your PokeCart</h2>
                <Link to={'/'}>
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 underline">Go Back</h2>
                </Link>
            </div>
            
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Cart Items */}
                <div className="flex-1 overflow-y-auto max-h-[80vh] sm:max-h-[30rem] scroll-smooth">
                    <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-4 text-gray-700">
                        <div>Item</div>
                        <div>Price</div>
                        <div>Qty</div>
                        <div>Total</div>
                    </div>

                    {cartItems.map((item) => {
                        const stockItem = cardData.find(card => card.title === item.title);

                        return (
                            <div key={item.id} className="grid grid-cols-4 items-center border-b py-4">
                                {/* Item */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    <img 
                                    src={`${import.meta.env.BASE_URL + item.image}`}
                                    alt={item.title} className="w-14 h-14 object-contain" />
                                    <span className="font-medium text-sm">{item.title}</span>
                                </div>

                                {/* Price */}
                                <div className="text-sm">₱{item.price.toFixed(2)}</div>

                                {/* Quantity (Editable Input) */}
                                <div className="text-sm">
                                    <input
                                        type="number"
                                        min={1}
                                        max={stockItem ? stockItem.quantity : 10}  // <-- use stockItem here
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="w-16 border rounded px-2 py-1 text-center"
                                    />
                                </div>

                                {/* Total */}
                                <div className="text-sm font-semibold text-blue-600">
                                    ₱{(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Note Textarea */}
                                <div className="col-span-4 mt-3">
                                    <label htmlFor={`note-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Note:
                                    </label>
                                    <textarea
                                        id={`note-${item.id}`}
                                        value={item.note}
                                        onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                        rows={6} // taller
                                        className="w-full border rounded px-3 py-2 text-sm resize-y"
                                        placeholder="Write any special instructions or notes here..."
                                    />
                                </div>                       
                            </div>
                        );
                        })
                    }

                </div>

                {/* Right: Subtotal */}
                <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded shadow-md h-fit">
                    <h3 className="text-lg font-semibold mb-4">Summary</h3>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Subtotal:</span>
                        <span className="font-bold">₱{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Shipping Fee:</span>
                        <span className="font-bold">₱{(10).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Total:</span>
                        <span className="font-bold">₱{(10 + subtotal).toFixed(2)}</span>
                    </div>
                    {/* Payment Method */}
                    <fieldset className="mb-6 border p-3">
                        <legend className="text-md font-semibold text-gray-700 mb-2">Payment Methods</legend>
                        <div className="space-y-2">
                            {paymentMethods.map(method => (
                            <label key={method.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.name}
                                    checked={selectedPayment === method.name}
                                    onChange={() => setSelectedPayment(method.name)}
                                    className="accent-blue-600"
                                />
                                <span>{method.name}</span>
                            </label>
                            ))}
                        </div>
                    </fieldset>
                    <div onClick={checkout} className="text-center cursor-pointer w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Proceed to Checkout
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokeCart;
