import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import AppLayout from "~/layouts/AppLayout";
import Script from "next/script";
import { type ReactNode } from "react";
import GuestLayout from "~/layouts/GuestLayout";
// import GuestLayout from "~/layouts/GuestLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  const renderCoreComponent = () => (
    <>
      <script
        type="module"
        defer
        src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"
      ></script>
      <Component {...pageProps} />
    </>
  );

  return (
    <>
      <ClerkProvider {...pageProps}>
        {/* <AppLayout>{renderCoreComponent()}</AppLayout> */}

        <SignedInView>{renderCoreComponent()}</SignedInView>
        <SignedOutView>{renderCoreComponent()}</SignedOutView>
      </ClerkProvider>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </>
  );
};

const SignedInView = ({ children }: { children: ReactNode }) => {
  return (
    <SignedIn>
      <AppLayout>{children}</AppLayout>
    </SignedIn>
  );
};

const SignedOutView = ({ children }: { children: ReactNode }) => {
  return (
    <SignedOut>
      <GuestLayout>{children}</GuestLayout>
    </SignedOut>
  );
};

export default api.withTRPC(MyApp);
