import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Textarea from "@/components/textarea";
import Textbox from "@/components/textbox";
import * as openpgp from "openpgp";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type DecryptFormData = {
  encrypted: string;
  passphrase?: string;
  privateKey: string;
};

function Decrypt() {
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, reset } =
    useForm<DecryptFormData>();

  async function onSubmit({
    encrypted,
    passphrase,
    privateKey,
  }: DecryptFormData) {
    setDecryptedMessage(null);
    setErrorMessage(null);
    setIsDecrypting(true);

    try {
      const privateKeyObj = await openpgp.key.readArmored(privateKey);

      // Decrypt the private key with passphrase if provided
      if (passphrase) {
        await privateKeyObj.keys[0].decrypt(passphrase);
      }

      const message = await openpgp.message.readArmored(encrypted);

      const { data } = await openpgp.decrypt({
        message,
        privateKeys: privateKeyObj.keys,
      });

      // Scroll to the results
      setTimeout(() => {
        window.scrollTo({
          top: resultsRef.current?.offsetTop ?? 0,
          behavior: "smooth",
        });
      }, 100);

      setDecryptedMessage(data);
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);

      console.error(errorText);
      setErrorMessage(`Encryption failed. ${errorText}`);
    } finally {
      setIsDecrypting(false);
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
            htmlFor="encrypted"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            encrypted
          </Label>
          <Textarea
            id="encrypted"
            placeholder="Paste here"
            className="col-span-3 col-start-1 md:col-start-2"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            {...register("encrypted", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Label
            htmlFor="public-key"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            private key
          </Label>
          <Textarea
            id="private-key"
            placeholder="Paste here"
            className="col-span-3 col-start-1 md:col-start-2"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            {...register("privateKey", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Label
            htmlFor="passphrase"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            passphrase?
          </Label>
          <Input
            id="passphrase"
            type="password"
            placeholder="Type here"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            className="col-span-3 col-start-1 md:col-start-2"
            {...register("passphrase", { required: false })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Button
            type="submit"
            className="col-span-full md:col-start-2"
            disabled={isDisabled}
          >
            Decrypt
          </Button>
          <div
            ref={resultsRef}
            className="col-span-full col-start-1 h-12"
          ></div>
          {isDecrypting && (
            <>
              <Textbox className="col-span-3 col-start-1 md:col-start-2">
                Decrypting...
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
          {decryptedMessage && (
            <>
              <Label className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8">
                decrypted
              </Label>
              <Textbox
                className="col-span-3 col-start-1 md:col-start-2"
                isCopyable
              >
                {decryptedMessage}
              </Textbox>
            </>
          )}
          <div className="col-span-full col-start-1 h-12"></div>
        </div>
      </form>
    </section>
  );
}

export default Decrypt;
