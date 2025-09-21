import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Textbox from "@/components/textbox";
import * as openpgp from "openpgp";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

type GenerateFormData = {
  name: string;
  email?: string;
  passphrase?: string;
};

function Generate() {
  const [generatedKey, setGeneratedKey] = useState<KeyPair | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, reset } =
    useForm<GenerateFormData>();
  const isDisabled = !(formState.isDirty && formState.isValid);

  async function onSubmit({ name, email, passphrase }: GenerateFormData) {
    setIsGenerating(true);
    setGeneratedKey(null);
    setErrorMessage(null);

    try {
      const keyPair = await openpgp.generateKey({
        userIds: [{ name, email }],
        numBits: 2048,
        passphrase,
      });

      setGeneratedKey({
        publicKey: keyPair.publicKeyArmored,
        privateKey: keyPair.privateKeyArmored,
      });
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);
      console.error("Key generation failed:", error);

      setErrorMessage(`Key generation failed. ${errorText}`);
    } finally {
      setIsGenerating(false);
    }
  }

  // Reset form after successful submission
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(undefined, { keepValues: true });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4">
          <div className="col-span-full col-start-1 h-24"></div>
          <Label
            htmlFor="name"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            className="col-span-3 col-start-1 md:col-start-2"
            {...register("name", { required: true })}
          />
          <div className="col-span-full col-start-1 h-12"></div>
          <Label
            htmlFor="email"
            className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8"
          >
            email?
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            className="col-span-3 col-start-1 md:col-start-2"
            {...register("email", { required: false })}
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
            placeholder="••••••"
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
            Generate
          </Button>
          <div
            className="col-span-full col-start-1 h-12"
            ref={resultsRef}
          ></div>
          {isGenerating && (
            <>
              <Textbox className="col-span-3 col-start-1 md:col-start-2">
                Generating...
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
          {generatedKey && (
            <>
              <Label className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8">
                public key
              </Label>
              <Textbox
                className="col-span-3 col-start-1 md:col-start-2"
                isCopyable
              >
                {generatedKey.publicKey}
              </Textbox>
              <div className="col-span-full col-start-1 h-12"></div>
              <Label className="col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8">
                private key
              </Label>
              <Textbox
                className="col-span-3 col-start-1 md:col-start-2"
                isCopyable
              >
                {generatedKey.privateKey}
              </Textbox>
              <div className="col-span-full col-start-1 h-12"></div>
            </>
          )}
        </div>
      </form>
    </section>
  );
}

export default Generate;
