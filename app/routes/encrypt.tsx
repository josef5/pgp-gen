import React from "react";

function Encrypt() {
  return (
    <section className="mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4">
      <div className="col-span-full col-start-1 h-24"></div>
      <label
        htmlFor="public-key"
        className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8"
      >
        message
      </label>
      <textarea
        id="message"
        className="bg-background-secondary col-span-3 col-start-1 box-border h-48 rounded-none border-none px-5 py-2 text-base focus:border-2 focus:bg-neutral-50 focus:outline-none md:col-start-2"
        placeholder="Paste here"
      />
      <div className="col-span-full col-start-1 h-12"></div>
      <label
        htmlFor="public-key"
        className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8"
      >
        public key
      </label>
      <textarea
        id="public-key"
        className="bg-background-secondary col-span-3 col-start-1 box-border h-48 rounded-none border-none px-5 py-2 text-base focus:border-2 focus:bg-neutral-50 focus:outline-none md:col-start-2"
        placeholder="Paste here"
      />
      <div className="col-span-2 col-start-1 h-12"></div>
      <button className="border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover col-span-full h-10 cursor-pointer border-1 active:border-none md:col-start-2">
        Encrypt
      </button>
    </section>
  );
}

export default Encrypt;
