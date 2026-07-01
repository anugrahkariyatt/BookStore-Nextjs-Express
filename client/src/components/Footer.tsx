const Footer = () => {
  return (
    <footer className="w-full bg-stone-900 text-stone-400 py-10 px-6 border-t border-stone-800 pb-24 sm:pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold text-lg tracking-wide">
            BookSoter
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed">
            Your quiet corner for discovering your next favorite read. Curated
            stories delivered to your digital doorstep.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                All Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                New Releases
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Bestsellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Special Offers
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
            Customer Care
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200 transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <p>&copy; {new Date().getFullYear()} BookSoter. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-stone-300">
            Twitter
          </a>
          <a href="#" className="hover:text-stone-300">
            Instagram
          </a>
          <a href="#" className="hover:text-stone-300">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
