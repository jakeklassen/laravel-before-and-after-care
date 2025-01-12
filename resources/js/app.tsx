import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { Container, createRoot } from "react-dom/client";
import "../css/app.css";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
createInertiaApp({
  id: "app",
  resolve: (name: string) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", {
      eager: true,
    });

    return pages[`./Pages/${name}.tsx`];
  },
  setup({
    el,
    App,
    props,
  }: {
    el: Container;
    App: React.ElementType;
    props: Record<string, unknown>;
  }) {
    createRoot(el).render(<App {...props} />);
  },
});
