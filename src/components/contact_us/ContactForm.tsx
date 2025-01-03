const ContactForm = () => {
    return (
      <div className="p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Contact Us!</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Phone Number</label>
            <div className="flex items-center gap-2">
              <select className="p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>US</option>
                <option>IN</option>
                <option>UK</option>
              </select>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="flex-1 p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium">Reason</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500">
              <option value="">Select reason</option>
              <option value="query">General Query</option>
              <option value="project">Project Discussion</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium">How can we help?</label>
            <textarea
              placeholder="Tell us a little about the project..."
              className="w-full p-3 border border-gray-300 rounded-lg bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            ></textarea>
          </div>
          <button className="w-full bg-pink-500 text-white p-3 rounded-lg font-bold hover:bg-pink-600">
            Get Started
          </button>
        </form>
      </div>
    );
  };
  
  export default ContactForm;
  