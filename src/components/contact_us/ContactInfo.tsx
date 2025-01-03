const ContactInfo = () => {
    return (
      <div className="bg-blue-100 p-8 space-y-6 rounded-lg">
        <h2 className="text-3xl font-bold">
          Let’s discuss on something <span className="text-pink-500">cool</span> together
        </h2>
        <div className="space-y-4 text-lg">
          <p>
            📧 <a href="mailto:ineeze@gmail.com" className="text-pink-500">ineeze@gmail.com</a>
          </p>
          <p>
            📞 <a href="tel:+919910795482" className="text-pink-500">+91 9910795482</a>
          </p>
          <p>📍 XYZ, Gurugram, Haryana</p>
        </div>
        <iframe
          src="https://maps.google.com/maps?q=Gurugram,%20Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="200"
          className="rounded-lg border"
          loading="lazy"
        ></iframe>
        <div className="flex space-x-6 pt-4 text-pink-500 text-2xl">
          <a href="#" className="hover:text-pink-700">📘</a>
          <a href="#" className="hover:text-pink-700">📸</a>
          <a href="#" className="hover:text-pink-700">💬</a>
          <a href="#" className="hover:text-pink-700">🔗</a>
        </div>
      </div>
    );
  };
  
  export default ContactInfo;
  