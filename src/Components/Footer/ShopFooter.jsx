import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const ShopFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Download App */}
        <div>
            <h3 className="text-lg font-semibold mb-4">Download App</h3>
            <div>
                <img
                    src={`${import.meta.env.BASE_URL}appstore.png`}
                    alt="App Store"
                    className="h-8 mb-1"
                />

                <img
                    src={`${import.meta.env.BASE_URL}playstore.png`}
                    alt="Playstore"
                    className="h-8"
                />
            </div>
            <div className="flex gap-4 mt-4">
                <a href="#" className="text-xl hover:text-blue-600"><FaFacebookF /></a>
                <a href="#" className="text-xl hover:text-pink-500"><FaInstagram /></a>
                <a href="#" className="text-xl hover:text-sky-500"><FaTwitter /></a>
            </div>
            <p className='text-sm mt-2'>© 2025 DC Pokeshop. All Rights Reserved.</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Shipping Info</a></li>
          </ul>
        </div>

        {/* DC POKESHOP */}
        <div>
          <h3 className="text-lg font-semibold mb-4">DC POKESHOP</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Terms and Condition</a></li>
            <li><a href="#" className="hover:underline">Privacy Policies</a></li>
          </ul>
        </div>

        {/* Payment Method with Images */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="flex flex-wrap gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-8 border p-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="h-8 border p-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-8 border p-1"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ShopFooter;