import { ClipboardProvider } from "./context/ClipboardProviders";

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ClipboardProvider>{children}</ClipboardProvider>
);

export default AppProviders;
