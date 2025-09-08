import TextareaCombo from "~/components/textarea-combo";

function Encrypt() {
  return (
    <section className="mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4">
      <div className="col-span-full col-start-1 h-24"></div>
          <TextareaCombo
            label="message"
        id="message"
        placeholder="Paste here"
      />
      <div className="col-span-full col-start-1 h-12"></div>
          <TextareaCombo
            label="public key"
        id="public-key"
        placeholder="Paste here"
      />
      <div className="col-span-2 col-start-1 h-12"></div>
          <button
            type="submit"
            className="border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover col-span-full h-10 cursor-pointer border-1 active:border-none md:col-start-2"
          >
        Encrypt
      </button>
        </div>
      </form>
    </section>
  );
}

export default Encrypt;
