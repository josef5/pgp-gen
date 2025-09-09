import * as openpgp from "openpgp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaCombo from "~/components/textarea-combo";

function Encrypt() {
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<{
    message: string;
    publicKey: string;
  }>();

  async function onSubmit({
    message,
    publicKey,
  }: {
    message: string;
    publicKey: string;
  }) {
    console.log({ message, publicKey });
    try {
      const publicKeyObj = await openpgp.key.readArmored(publicKey);

      const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(message),
        publicKeys: publicKeyObj.keys,
      });

      setEncryptedMessage(encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4">
          <div className="col-span-full col-start-1 h-24"></div>
          <TextareaCombo
            label="message"
            id="message"
            placeholder="Paste here"
            {...register("message")}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <TextareaCombo
            label="public key"
            id="public-key"
            placeholder="Paste here"
            {...register("publicKey")}
          />
          <div className="col-span-2 col-start-1 h-12"></div>
          <button
            type="submit"
            className="border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover col-span-full h-10 cursor-pointer border-1 active:border-none md:col-start-2"
          >
            Encrypt
          </button>
          <div className="col-span-2 col-start-1 h-12"></div>
          {encryptedMessage && (
            <div className="bg-background-secondary col-span-full col-start-2 px-5 py-2">
              {encryptedMessage}
            </div>
          )}
          <div className="col-span-2 col-start-1 h-12"></div>
        </div>
      </form>
    </section>
  );
}

export default Encrypt;
