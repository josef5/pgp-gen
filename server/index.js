import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as openpgp from "openpgp";
import { useForm } from "react-hook-form";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function NavBar() {
  const location = useLocation();
  return /* @__PURE__ */ jsxs("nav", { className: "bg-background-secondary flex", children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/",
        className: `flex h-12 w-56 items-center justify-center ${location.pathname === "/" ? "bg-background" : ""} text-base`,
        children: "Generate"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/encrypt",
        className: `flex h-12 w-56 items-center justify-center ${location.pathname === "/encrypt" ? "bg-background" : ""} text-base`,
        children: "Encrypt"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/decrypt",
        className: `flex h-12 w-56 items-center justify-center ${location.pathname === "/decrypt" ? "bg-background" : ""} text-base`,
        children: "Decrypt"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mr-4 hidden w-56 md:inline-block" })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(NavBar, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto p-4 pt-16",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Button({
  label,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "submit",
      className: cn(
        "border-foreground-secondary text-foreground-secondary active:bg-background-secondary hover:border-hover disabled:hover:border-foreground-secondary disabled:active:bg-background disabled:active:border-foreground-secondary h-10 cursor-pointer border-1 active:border-none disabled:cursor-default disabled:opacity-25 disabled:active:border-solid",
        className
      ),
      ...props,
      children: children ?? label
    }
  );
}
function Input({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: cn(
        "bg-background-tertiary focus:bg-background-tertiary box-border h-10 border-none px-5 py-2 text-base focus:border-2 focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function Label({
  text,
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      className: cn("text-brand flex justify-start text-xl", className),
      ...props,
      children: children ?? text
    }
  );
}
function Textbox({
  className,
  isCopyable,
  children,
  ...props
}) {
  const copiedOverlayRef = useRef(null);
  const text = String(children);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "bg-background-tertiary relative box-border break-words whitespace-pre-wrap focus:border-2 focus:outline-none",
        className
      ),
      onClick: () => {
        if (text && isCopyable) {
          navigator.clipboard.writeText(text);
          if (copiedOverlayRef.current) {
            copiedOverlayRef.current.style.opacity = "1";
            setTimeout(() => {
              if (copiedOverlayRef.current) {
                copiedOverlayRef.current.style.opacity = "0";
              }
            }, 1e3);
          }
        }
      },
      ...props,
      children: [
        isCopyable && /* @__PURE__ */ jsx(
          "div",
          {
            ref: copiedOverlayRef,
            className: "text-background-tertiary bg-foreground/75 absolute flex h-full w-full items-center justify-center text-2xl opacity-0 transition-opacity duration-300",
            children: "copied"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "px-5 py-2 text-base", children })
      ]
    }
  ) });
}
function meta$3({}) {
  return [{
    title: "PGP Gen - Key Generation"
  }, {
    name: "description",
    content: "Key generation tool"
  }];
}
function Generate() {
  const [generatedKey, setGeneratedKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resultsRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm();
  const isDisabled = !(formState.isDirty && formState.isValid);
  async function onSubmit({
    name,
    email,
    passphrase
  }) {
    setIsGenerating(true);
    setGeneratedKey(null);
    setErrorMessage(null);
    try {
      const keyPair = await openpgp.generateKey({
        userIds: [{
          name,
          email
        }],
        numBits: 2048,
        passphrase
      });
      setGeneratedKey({
        publicKey: keyPair.publicKeyArmored,
        privateKey: keyPair.privateKeyArmored
      });
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error);
      console.error("Key generation failed:", error);
      setErrorMessage(`Key generation failed. ${errorText}`);
    } finally {
      setIsGenerating(false);
    }
  }
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(void 0, {
        keepValues: true
      });
    }
  }, [formState.isSubmitSuccessful, reset]);
  return /* @__PURE__ */ jsx("section", {
    children: /* @__PURE__ */ jsx("form", {
      onSubmit: handleSubmit(onSubmit),
      children: /* @__PURE__ */ jsxs("div", {
        className: "mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-24"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "name",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "name"
        }), /* @__PURE__ */ jsx(Input, {
          id: "name",
          placeholder: "John Doe",
          className: "col-span-3 col-start-1 md:col-start-2",
          ...register("name", {
            required: true
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "email",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "email?"
        }), /* @__PURE__ */ jsx(Input, {
          id: "email",
          type: "email",
          placeholder: "john.doe@example.com",
          className: "col-span-3 col-start-1 md:col-start-2",
          ...register("email", {
            required: false
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "passphrase",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "passphrase?"
        }), /* @__PURE__ */ jsx(Input, {
          id: "passphrase",
          type: "password",
          placeholder: "••••••",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: "false",
          className: "col-span-3 col-start-1 md:col-start-2",
          ...register("passphrase", {
            required: false
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "col-span-full md:col-start-2",
          disabled: isDisabled,
          children: "Generate"
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12",
          ref: resultsRef
        }), isGenerating && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            children: "Generating..."
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), errorMessage && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "text-foreground-error bg-background-error col-span-3 col-start-1 md:col-start-2",
            children: errorMessage
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), generatedKey && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Label, {
            className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
            children: "public key"
          }), /* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            isCopyable: true,
            children: generatedKey.publicKey
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          }), /* @__PURE__ */ jsx(Label, {
            className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
            children: "private key"
          }), /* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            isCopyable: true,
            children: generatedKey.privateKey
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        })]
      })
    })
  });
}
const generate = UNSAFE_withComponentProps(Generate);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: generate,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function Textarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "bg-background-tertiary focus:bg-background-tertiary box-border h-48 rounded-none border-none px-5 py-2 text-base focus:border-2 focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function meta$2({}) {
  return [{
    title: "PGP Gen - Message Decryption"
  }, {
    name: "description",
    content: "Message decryption tool"
  }];
}
function Decrypt() {
  const [decryptedMessage, setDecryptedMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const resultsRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm();
  async function onSubmit({
    encrypted,
    passphrase,
    privateKey
  }) {
    setDecryptedMessage(null);
    setErrorMessage(null);
    setIsDecrypting(true);
    try {
      const privateKeyObj = await openpgp.key.readArmored(privateKey);
      if (passphrase) {
        await privateKeyObj.keys[0].decrypt(passphrase);
      }
      const message = await openpgp.message.readArmored(encrypted);
      const {
        data
      } = await openpgp.decrypt({
        message,
        privateKeys: privateKeyObj.keys
      });
      setTimeout(() => {
        var _a;
        window.scrollTo({
          top: ((_a = resultsRef.current) == null ? void 0 : _a.offsetTop) ?? 0,
          behavior: "smooth"
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
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(void 0, {
        keepValues: true
      });
    }
  }, [formState.isSubmitSuccessful, reset]);
  const isDisabled = !(formState.isDirty && formState.isValid);
  return /* @__PURE__ */ jsx("section", {
    children: /* @__PURE__ */ jsx("form", {
      onSubmit: handleSubmit(onSubmit),
      children: /* @__PURE__ */ jsxs("div", {
        className: "mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-24"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "encrypted",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "encrypted"
        }), /* @__PURE__ */ jsx(Textarea, {
          id: "encrypted",
          placeholder: "Paste here",
          className: "col-span-3 col-start-1 md:col-start-2",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: "false",
          ...register("encrypted", {
            required: true
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "public-key",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "private key"
        }), /* @__PURE__ */ jsx(Textarea, {
          id: "private-key",
          placeholder: "Paste here",
          className: "col-span-3 col-start-1 md:col-start-2",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: "false",
          ...register("privateKey", {
            required: true
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "passphrase",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "passphrase?"
        }), /* @__PURE__ */ jsx(Input, {
          id: "passphrase",
          type: "password",
          placeholder: "Type here",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: "false",
          className: "col-span-3 col-start-1 md:col-start-2",
          ...register("passphrase", {
            required: false
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "col-span-full md:col-start-2",
          disabled: isDisabled,
          children: "Decrypt"
        }), /* @__PURE__ */ jsx("div", {
          ref: resultsRef,
          className: "col-span-full col-start-1 h-12"
        }), isDecrypting && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            children: "Decrypting..."
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), errorMessage && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "text-foreground-error bg-background-error col-span-3 col-start-1 md:col-start-2",
            children: errorMessage
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), decryptedMessage && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Label, {
            className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
            children: "decrypted"
          }), /* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            isCopyable: true,
            children: decryptedMessage
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        })]
      })
    })
  });
}
const decrypt = UNSAFE_withComponentProps(Decrypt);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: decrypt,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "PGP Gen - Message Encryption"
  }, {
    name: "description",
    content: "Message encryption tool"
  }];
}
function Encrypt() {
  const [encryptedMessage, setEncryptedMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const resultsRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm();
  async function onSubmit({
    message,
    publicKey
  }) {
    setEncryptedMessage(null);
    setErrorMessage(null);
    setIsEncrypting(true);
    try {
      const publicKeyObj = await openpgp.key.readArmored(publicKey);
      const {
        data
      } = await openpgp.encrypt({
        message: openpgp.message.fromText(message),
        publicKeys: publicKeyObj.keys
      });
      setTimeout(() => {
        var _a;
        window.scrollTo({
          top: ((_a = resultsRef.current) == null ? void 0 : _a.offsetTop) ?? 0,
          behavior: "smooth"
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
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(void 0, {
        keepValues: true
      });
    }
  }, [formState.isSubmitSuccessful, reset]);
  const isDisabled = !(formState.isDirty && formState.isValid);
  return /* @__PURE__ */ jsx("section", {
    children: /* @__PURE__ */ jsx("form", {
      onSubmit: handleSubmit(onSubmit),
      children: /* @__PURE__ */ jsxs("div", {
        className: "mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-24"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "message",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "message"
        }), /* @__PURE__ */ jsx(Textarea, {
          id: "message",
          placeholder: "Paste here",
          className: "col-span-3 col-start-1 md:col-start-2",
          ...register("message", {
            required: true
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Label, {
          htmlFor: "public-key",
          className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
          children: "public key"
        }), /* @__PURE__ */ jsx(Textarea, {
          id: "public-key",
          placeholder: "Paste here",
          className: "col-span-3 col-start-1 md:col-start-2",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: "false",
          ...register("publicKey", {
            required: true
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          className: "col-span-full md:col-start-2",
          disabled: isDisabled,
          children: "Encrypt"
        }), /* @__PURE__ */ jsx("div", {
          ref: resultsRef,
          className: "col-span-full col-start-1 h-12"
        }), isEncrypting && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            children: "Encrypting..."
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), errorMessage && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Textbox, {
            className: "text-foreground-error bg-background-error col-span-3 col-start-1 md:col-start-2",
            children: errorMessage
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full col-start-1 h-12"
          })]
        }), encryptedMessage && /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Label, {
            className: "col-span-3 col-start-1 mb-2 md:col-span-1 md:ml-8",
            children: "encrypted"
          }), /* @__PURE__ */ jsx(Textbox, {
            className: "col-span-3 col-start-1 md:col-start-2",
            isCopyable: true,
            children: encryptedMessage
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full col-start-1 h-12"
        })]
      })
    })
  });
}
const encrypt = UNSAFE_withComponentProps(Encrypt);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: encrypt,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "PGP Gen - 404 Not Found"
  }, {
    name: "description",
    content: "Page not found"
  }];
}
function NotFound() {
  return /* @__PURE__ */ jsx("section", {
    children: /* @__PURE__ */ jsxs("div", {
      className: "mr-4 ml-4 grid max-w-[896px] grid-cols-3 md:ml-0 md:grid-cols-4",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full col-start-1 h-24"
      }), /* @__PURE__ */ jsx("p", {
        className: "col-start-1 ml-4",
        children: "404 - Not Found"
      })]
    })
  });
}
const _404 = UNSAFE_withComponentProps(NotFound);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _404,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/pgp-gen/assets/entry.client-DjMX9T_K.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/pgp-gen/assets/root-BACYWZPc.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js"], "css": ["/pgp-gen/assets/root-3pPHNKmB.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/generate": { "id": "routes/generate", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/pgp-gen/assets/generate-BIqjMOw6.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js", "/pgp-gen/assets/index.esm-Dj_4ZMYr.js", "/pgp-gen/assets/input-CvqOa1x3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/decrypt": { "id": "routes/decrypt", "parentId": "root", "path": "decrypt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/pgp-gen/assets/decrypt-916_Fgwd.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js", "/pgp-gen/assets/index.esm-Dj_4ZMYr.js", "/pgp-gen/assets/input-CvqOa1x3.js", "/pgp-gen/assets/textarea-B_ZhPkk4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/encrypt": { "id": "routes/encrypt", "parentId": "root", "path": "encrypt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/pgp-gen/assets/encrypt-C0vlNVyC.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js", "/pgp-gen/assets/index.esm-Dj_4ZMYr.js", "/pgp-gen/assets/textarea-B_ZhPkk4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/404": { "id": "routes/404", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/pgp-gen/assets/404-BnZl8XCm.js", "imports": ["/pgp-gen/assets/chunk-PVWAREVJ-XSx8T8tY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/pgp-gen/assets/manifest-36a97f8a.js", "version": "36a97f8a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/pgp-gen/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/generate": {
    id: "routes/generate",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/decrypt": {
    id: "routes/decrypt",
    parentId: "root",
    path: "decrypt",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/encrypt": {
    id: "routes/encrypt",
    parentId: "root",
    path: "encrypt",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
