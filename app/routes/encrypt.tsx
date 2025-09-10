import * as openpgp from "openpgp";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Textarea from "@/components/textarea";
import Textbox from "@/components/textbox";

function Encrypt() {
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, reset } = useForm<{
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
    setEncryptedMessage(null);
    setErrorMessage(null);

    try {
      const publicKeyObj = await openpgp.key.readArmored(publicKey);

      const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(message),
        publicKeys: publicKeyObj.keys,
      });

      // Scroll to the encrypted message
      setTimeout(() => {
        window.scrollTo({
          top: messageRef.current?.offsetTop ?? 0,
          behavior: "smooth",
        });
      }, 100);

      setEncryptedMessage(encrypted);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);

      console.error(errorText);
      setErrorMessage(`Encryption failed. ${errorText}`);
    }
  }

  // Reset form after successful submission
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(undefined, { keepValues: true });
    }
  }, [formState.isSubmitSuccessful, reset]);

  const isDisabled = !(formState.isDirty && formState.isValid);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4">
          <div className="col-span-full col-start-1 h-24"></div>
          <Textarea
            label="message"
            id="message"
            placeholder="Paste here"
            {...register("message", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Textarea
            label="public key"
            id="public-key"
            placeholder="Paste here"
            {...register("publicKey", { required: true })}
          />
          <div className="col-span-2 col-start-1 h-12"></div>
          <button
            type="submit"
            className="border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover disabled:hover:border-foreground-secondary disabled:active:bg-background disabled:active:border-foreground-secondary col-span-full h-10 cursor-pointer border-1 active:border-none disabled:cursor-default disabled:opacity-25 disabled:active:border-solid md:col-start-2"
            disabled={isDisabled}
          >
            Encrypt
          </button>
          <div className="col-span-full col-start-1 h-12"></div>

          {errorMessage && (
            <>
              <div className="col-span-full bg-red-100 px-5 py-2 text-red-700 md:col-start-2">
                {errorMessage}
              </div>
              <div className="col-span-full col-start-1 h-12"></div>
            </>
          )}
          {encryptedMessage && (
            <>
              <h3 className="text-brand col-span-3 col-start-1 mb-2 flex justify-start text-right text-xl md:col-span-1 md:ml-8">
                encrypted
              </h3>
              <div
                ref={messageRef}
                className="bg-background-tertiary col-span-3 col-start-1 box-border rounded-none border-none px-5 py-2 text-base break-words focus:border-2 focus:outline-none md:col-start-2 md:whitespace-pre-wrap"
              >
                {encryptedMessage}
              </div>
            </>
          )}
          <div className="col-span-full col-start-1 h-12"></div>
        </div>
      </form>
    </section>
  );
}

export default Encrypt;
