import * as openpgp from "openpgp";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Textarea from "@/components/textarea";
import Textbox from "@/components/textbox";
import Button from "@/components/button";
import Label from "@/components/label";

type EncryptFormData = {
  message: string;
  publicKey: string;
};

function Encrypt() {
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, reset } =
    useForm<EncryptFormData>();

  async function onSubmit({ message, publicKey }: EncryptFormData) {
    setEncryptedMessage(null);
    setErrorMessage(null);
    setIsEncrypting(true);

    try {
      const publicKeyObj = await openpgp.key.readArmored(publicKey);

      const { data } = await openpgp.encrypt({
        message: openpgp.message.fromText(message),
        publicKeys: publicKeyObj.keys,
      });

      // Scroll to the results
      setTimeout(() => {
        window.scrollTo({
          top: resultsRef.current?.offsetTop ?? 0,
          behavior: "smooth",
        });
      }, 100);

      setEncryptedMessage(data);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);

      console.error(errorText);
      setErrorMessage(`Encryption failed. ${errorText}`);
    } finally {
      setIsEncrypting(false);
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
          <Label
            htmlFor="message"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            message
          </Label>
          <Textarea
            id="message"
            placeholder="Paste here"
            className="col-span-3 col-start-1 md:col-start-2"
            {...register("message", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Label
            htmlFor="public-key"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            public key
          </Label>
          <Textarea
            id="public-key"
            placeholder="Paste here"
            className="col-span-3 col-start-1 md:col-start-2"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            {...register("publicKey", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Button
            type="submit"
            className="col-span-full md:col-start-2"
            disabled={isDisabled}
          >
            Encrypt
          </Button>
          <div
            ref={resultsRef}
            className="col-span-full col-start-1 h-12"
          ></div>
          {isEncrypting && (
            <>
              <Textbox className="col-span-3 col-start-1 md:col-start-2">
                Encrypting...
              </Textbox>
              <div className="col-span-full col-start-1 h-12"></div>
            </>
          )}
          {errorMessage && (
            <>
              <Textbox className="text-foreground-error bg-background-error col-span-3 col-start-1 md:col-start-2">
                {errorMessage}
              </Textbox>
              <div className="col-span-full col-start-1 h-12"></div>
            </>
          )}
          {encryptedMessage && (
            <>
              <Label className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8">
                encrypted
              </Label>
              <Textbox
                className="col-span-3 col-start-1 md:col-start-2"
                isCopyable
              >
                {encryptedMessage}
              </Textbox>
            </>
          )}
          <div className="col-span-full col-start-1 h-12"></div>
        </div>
      </form>
    </section>
  );
}

export default Encrypt;
