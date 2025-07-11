function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 flex flex-col items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
            About TechNexus <i className="fas fa-store text-gray-800 dark:text-white"></i>
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to TechNexus, your ultimate destination for high-quality products and an unparalleled online shopping experience!
            Since our inception in 2023, we've been passionately committed to connecting you with the items you love,
            delivered right to your doorstep.
          </p>
        </section>
        <div className="w-full flex justify-center py-6">
          <img
            src="https://images.pexels.com/photos/164572/pexels-photo-164572.jpeg"
            alt="TechNexus Company Overview"
            className="rounded-lg shadow-xl w-full md:w-3/4 object-cover border-4 border-blue-200 dark:border-blue-700"
          />
        </div>
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-600 dark:text-blue-400">
            Our Vision & Values <i className="fas fa-eye text-blue-600 dark:text-blue-400"></i>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
            At TechNexus, our vision is to create a seamless, enjoyable, and trustworthy shopping environment. We are driven by core values that shape every interaction and decision:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <i className="fas fa-handshake fa-3x text-blue-500 dark:text-blue-300 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Customer Focus</h3>
              <p className="text-gray-700 dark:text-gray-300">Your satisfaction guides every decision. We're dedicated to providing exceptional service and support.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <i className="fas fa-shield-alt fa-3x text-green-500 dark:text-green-300 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Uncompromised Quality</h3>
              <p className="text-gray-700 dark:text-gray-300">We meticulously curate our product selection, ensuring superior quality and reliability in every item.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <i className="fas fa-lightbulb fa-3x text-yellow-500 dark:text-yellow-300 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Constant Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">We continuously evolve our platform and expand our product range to meet your changing needs and desires.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <i className="fas fa-balance-scale fa-3x text-purple-500 dark:text-purple-300 mb-4"></i>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Honest Integrity</h3>
              <p className="text-gray-700 dark:text-gray-300">We operate with complete transparency and unwavering honesty in all our business dealings.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
            What We Offer <i className="fas fa-gift text-green-600 dark:text-green-400"></i>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Vast Selection</h3>
              <p className="text-gray-700 dark:text-gray-300">From cutting-edge electronics to trendy apparel, home essentials, and unique gifts, our diverse catalog has something for everyone.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Seamless Shopping</h3>
              <p className="text-gray-700 dark:text-gray-300">Enjoy a user-friendly interface, intuitive navigation, and a secure, fast checkout process. Your privacy and security are our top priorities.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Dedicated Support</h3>
              <p className="text-gray-700 dark:text-gray-300">Our friendly customer support team is always ready to assist you. Your questions and feedback help us grow!</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            Join Our Community! <i className="fas fa-users text-purple-600 dark:text-purple-400"></i>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Be part of the TechNexus family! Follow us on social media for the latest updates, exclusive deals, and community events.
          </p>
          <div className="flex justify-center space-x-6 text-3xl">
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors duration-300" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-200 transition-colors duration-300" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-blue-400 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-100 transition-colors duration-300" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-300" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          </p>
        </section>
        <section className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-4xl font-bold mb-4 text-red-600 dark:text-red-400">
            Get in Touch <i className="fas fa-phone-alt text-red-600 dark:text-red-400"></i>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-2">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            Email us at: <a href="mailto:support@technexus.com" className="text-blue-600 hover:underline dark:text-blue-400">support@technexus.com</a>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Our support team is available Monday - Friday, 9 AM - 5 PM (Morocco Time - GMT+1).
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;