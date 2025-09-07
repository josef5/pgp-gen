import React from "react";

function Encrypt() {
  return (
    <section className="grid max-w-[1120px] grid-cols-5">
      <div className="flex w-56 justify-center">
        <label htmlFor="public-key" className="text-brand mt-24 text-2xl">
          public key
        </label>
      </div>
      <textarea
        id="public-key"
        className="focus:border-brand focus:ring-brand bg-background-secondary col-span-3 mt-24 h-48 rounded border border-none px-5 py-2 text-base focus:ring-1 focus:outline-none"
        placeholder="Paste here"
      />
      <button className="border-foreground-secondary text-foreground-secondary active:bg-foreground active:text-background hover:border-hover col-span-3 col-start-2 mt-4 h-10 w-full cursor-pointer border-1">
        Encrypt
      </button>
    </section>
  );
}

export default Encrypt;
