const Newsletterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-[#5A3A31]">
        Subscribe now & get 20% off
      </p>
      <p className="text-[#5A3A31]/80 mt-3 max-w-md mx-auto text-sm">
        Join our VIP newsletter to unlock exclusive early access to new releases, special discounts, and seasonal style guides.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none "
        />
        <button
          type="submit"
          className="bg-[#5A3A31] text-white font-bold text-xs px-10 py-4 hover:bg-[#432A23] transition-colors"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletterbox;
