import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs/dist/types/components.server";
import AppLayout from "~/layouts/AppLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // <ClerkProvider {...pageProps}>
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
    // {/* </ClerkProvider> */}
  );
};

export default api.withTRPC(MyApp);
