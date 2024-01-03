// Basic layout to use for pages

import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <Meta />
      <Navbar />
      {children}
    </>
  );
}
