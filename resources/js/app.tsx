import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { Container, createRoot } from "react-dom/client";
import "../css/app.css";
import { Layout } from "./Layout.tsx";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
createInertiaApp({
  id: "app",
  resolve: (name: string) => {
    const pages = import.meta.glob("./pages/**/*.tsx", {
      eager: true,
    });

    const page = pages[`./pages/${name}.tsx`];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (page as any).default.layout ??= (page: React.ReactNode) => (
      <Layout>{page}</Layout>
    );

    return page;
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
