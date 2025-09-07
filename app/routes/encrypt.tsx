import React from "react";

function Encrypt() {
  return (
    <section className="grid max-w-[1120px] grid-cols-5">
      <div className="flex w-56 justify-center">
        <label htmlFor="public-key" className="mt-24 text-2xl text-teal-500">
          public key
        </label>
      </div>
      <textarea
        id="public-key"
        className="col-span-3 mt-24 h-48 rounded border border-none bg-neutral-200 px-5 py-2 text-base focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
        placeholder="Paste here"
      />
      <button className="col-span-3 col-start-2 mt-4 h-10 w-full cursor-pointer border-1 border-neutral-800 text-neutral-800 hover:border-neutral-400 active:bg-neutral-900 active:text-neutral-100">
        Encrypt
      </button>
    </section>
  );
}

export default Encrypt;
