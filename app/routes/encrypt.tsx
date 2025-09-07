import React from "react";

function Encrypt() {
  return (
    <section className="grid max-w-[896px] grid-cols-4">
      <div className="col-start-1 h-24"></div>
      <div className="col-start-1 flex w-56 justify-start">
        <label
          htmlFor="public-key"
          className="text-brand ml-8 text-right text-2xl"
        >
          message
        </label>
      </div>
      <textarea
        id="message"
        className="focus:border-brand focus:ring-brand bg-background-secondary col-span-3 col-start-2 h-48 rounded border border-none px-5 py-2 text-base focus:ring-1 focus:outline-none"
        placeholder="Paste here"
      />
      <div className="col-start-1 h-12"></div>
      <div className="col-start-1 flex w-56 justify-start">
        <label htmlFor="public-key" className="text-brand ml-8 text-2xl">
          public key
        </label>
      </div>
      <textarea
        id="public-key"
        className="focus:border-brand focus:ring-brand bg-background-secondary col-span-3 col-start-2 h-48 rounded border border-none px-5 py-2 text-base focus:ring-1 focus:outline-none"
        placeholder="Paste here"
      />
      <div className="col-span-2 col-start-1 h-12"></div>
      <button className="border-foreground-secondary text-foreground-secondary active:bg-foreground active:text-background hover:border-hover col-span-3 col-start-2 h-10 w-full cursor-pointer border-1">
        Encrypt
      </button>
    </section>
  );
}

export default Encrypt;
